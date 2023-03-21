import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AuthAdminDto } from './dto/signin-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './schemas/admin.model';
import * as bcrypt from 'bcryptjs';
import { ActivateDto } from './dto/activate.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepository: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createAdminDto: CreateAdminDto, res: Response) {
    const { username, hashed_password } = createAdminDto;
    await this.findAdminByName(username);

    const hashedPassword = await bcrypt.hash(hashed_password, 7);

    const admin = await this.adminRepository.create({
      ...createAdminDto,
      hashed_password: hashedPassword,
    });

    const tokens = await this.getTokens(
      admin.id,
      admin.email,
      admin.is_active,
      admin.is_creator,
    );

    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async signIn(authAdminDto: AuthAdminDto, res: Response) {
    const { username } = authAdminDto;

    const admin = await this.adminRepository.findOne({ where: { username } });

    if (!admin) {
      throw new UnauthorizedException('Admin mavjud emas');
    }

    const passwordMatches: boolean = await bcrypt.compare(
      authAdminDto.hashed_password,
      admin.hashed_password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException(`Admin ro'yhatdan o'tmagan`);
    }

    const tokens = await this.getTokens(
      admin.id,
      admin.email,
      admin.is_active,
      admin.is_creator,
    );

    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async logout(req: Request, res: Response) {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      throw new UnauthorizedException(`Nomzod ro'yhatdan o'tmagan`);
    }

    const check = await this.jwtService.verify(refresh_token, {
      publicKey: process.env.REFRESH_TOKEN_KEY,
    });

    const admin = await this.adminRepository.update(
      { hashed_token: null },
      {
        where: { id: check.sub },
        returning: true,
      },
    );

    if (!admin[1][0]) {
      throw new ForbiddenException('Siz tizimda emassiz');
    }

    res.clearCookie('refresh_token');
    return true;
  }

  async refreshToken(req: Request, res: Response) {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      throw new UnauthorizedException(`Nomzod ro'yhatdan o'tmagan`);
    }

    const check = await this.jwtService.verify(refresh_token, {
      publicKey: process.env.REFRESH_TOKEN_KEY,
    });

    const admin = await this.adminRepository.findByPk(check.sub);

    if (!admin) {
      throw new UnauthorizedException(`Nomzod ro'yhatdan o'tmagan`);
    }

    const tokens = await this.getTokens(
      admin.id,
      admin.email,
      admin.is_active,
      admin.is_creator,
    );

    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async activation(activateDto: ActivateDto) {
    const { value, admin_id } = activateDto;

    const condidate = await this.adminRepository.update(
      { is_active: value },
      { where: { id: admin_id, is_active: !value }, returning: true },
    );

    if (!condidate[1][0]) {
      throw new ForbiddenException(`Allaqachon aktiv yoki aktiv emas`);
    }

    return condidate[1][0];
  }

  async activateCreator(activateDto: ActivateDto) {
    const { value, admin_id } = activateDto;

    const condidate = await this.adminRepository.update(
      { is_creator: value },
      { where: { id: admin_id, is_creator: !value }, returning: true },
    );

    if (!condidate) {
      throw new ForbiddenException(`Allaqachon aktiv yoki aktiv emas`);
    }

    return condidate[1][0];
  }

  async findAllAdmins() {
    const admins = await this.adminRepository.findAll({});
    return admins;
  }

  async findOneAdminById(id: number) {
    const admin = await this.adminRepository.findByPk(id);

    if (!admin) {
      throw new NotFoundException(`${id} id'ga ega admin mavjud emas`);
    }

    return admin;
  }

  async updateAdminById(id: number, updateAdminDto: UpdateAdminDto) {
    await this.findOneAdminById(id);

    const admin = await this.adminRepository.update(updateAdminDto, {
      where: { id },
      returning: true,
    });

    return admin[1][0];
  }

  async deleteOneAdminById(id: number) {
    await this.findOneAdminById(id);
    await this.adminRepository.destroy({ where: { id } });

    return { message: `ID ${id}-ga teng bo'lgan admin mavjud emas` };
  }

  private async findAdminByName(username: string) {
    const admin = await this.adminRepository.findOne({
      where: { username },
    });

    if (admin) {
      throw new ForbiddenException('Admin allaqachon mavjud');
    }
  }

  private async getTokens(
    admin_id: number,
    email: string,
    is_active: boolean,
    is_creator: boolean,
  ) {
    const jwtPayload = {
      sub: admin_id,
      email,
      is_active,
      is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async updateRefreshTokenHash(id: number, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 7);

    await this.adminRepository.update(
      { hashed_token: hashedToken },
      { where: { id } },
    );
  }
}
