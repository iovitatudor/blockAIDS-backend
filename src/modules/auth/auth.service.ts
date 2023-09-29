import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { AuthTypeEnum } from "./enums/auth-type.enum";
import { CrudUsersService } from "../users/services/crud-users.service";
import { CrudSpecialistsService } from "../specialists/services/crud-specialists.service";
import { UserGenderEnum } from "../users/enums/user-gender.enum";
import { User } from "../users/entities/user.entity";
import { Specialist } from "../specialists/entities/specialist.entity";
import { JwtService } from "@nestjs/jwt";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { ValidationSpecialistsService } from "../specialists/services/validation-specialists.service";
import { ValidationUsersService } from "../users/services/validation-users.service";
import { SpecialistsResource } from "../specialists/resources/specialists.resource";
import { UsersResource } from "../users/resources/users.resource";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly crudUsersService: CrudUsersService,
    private readonly validationUsersService: ValidationUsersService,
    private readonly crudSpecialistsService: CrudSpecialistsService,
    private readonly validationSpecialistsService: ValidationSpecialistsService,
  ) {
  }

  async login(loginAuthDto: LoginAuthDto) {
    if (loginAuthDto.type === AuthTypeEnum.specialist) {
      const specialist = await this.checkSpecialist(loginAuthDto);
      const token = this.generateToken(specialist, loginAuthDto.type);
      const specialistResource = new SpecialistsResource(specialist);
      return { token, type: "specialist", specialist: specialistResource };
    }
    if (loginAuthDto.type === AuthTypeEnum.user) {
      const user = await this.checkUser(loginAuthDto);
      const token = this.generateToken(user, loginAuthDto.type);
      const userResource = new UsersResource(user);
      return { token, type: "user", user: userResource };
    }
    throw new UnauthorizedException({
      message: "Login type filed.",
    });
  }

  async register(registerAuthDto: RegisterAuthDto): Promise<object> {
    let token = null;

    if (registerAuthDto.type === AuthTypeEnum.specialist) {
      await this.validationSpecialistsService.validateEmail(
        registerAuthDto.email,
      );
      const specialist = await this.crudSpecialistsService.create(
        {
          ...registerAuthDto,
          avatar: "avatar-mock.png",
          job_position: null,
          organizationId: registerAuthDto.organizationId,
        },
        null,
      );
      token = this.generateToken(specialist, registerAuthDto.type);
      const specialistResource = new SpecialistsResource(specialist);
      return { token, type: "specialist", specialist: specialistResource };
    }
    if (registerAuthDto.type === AuthTypeEnum.user) {
      await this.validationUsersService.validateEmail(registerAuthDto.email);
      const user = await this.crudUsersService.createUser(
        {
          name: registerAuthDto.name,
          email: registerAuthDto.email,
          password: registerAuthDto.password,
          phone: null,
          birthdate: null,
          avatar: "avatar-mock.png",
          gender: UserGenderEnum.other,
        },
        null,
      );
      token = this.generateToken(user, registerAuthDto.type);
      const userResource = new UsersResource(user);
      return { token, type: "user", user: userResource };
    }

    throw new UnauthorizedException({
      message: "Register type filed.",
    });
  }

  private generateToken(entity: User | Specialist, type: string): string {
    const payload = {
      email: entity.email,
      name: entity.name,
      id: entity.id,
      type,
    };
    return this.jwtService.sign(payload);
  }

  private async checkUser(loginAuthDto: LoginAuthDto) {
    const user = await this.crudUsersService.findByEmail(loginAuthDto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: "Email is incorrect",
      });
    }

    const passwordsEquals = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );

    if (user && passwordsEquals) return user;

    throw new UnauthorizedException({
      message: "Email or password is incorrect",
    });
  }

  private async checkSpecialist(loginAuthDto: LoginAuthDto) {
    const specialist = await this.crudSpecialistsService.findByEmail(
      loginAuthDto.email,
    );

    if (!specialist) {
      throw new UnauthorizedException({
        message: "Email is incorrect",
      });
    }

    const passwordsEquals = await bcrypt.compare(
      loginAuthDto.password,
      specialist.password,
    );

    if (specialist && passwordsEquals) return specialist;

    throw new UnauthorizedException({
      message: "Email or password is incorrect",
    });
  }
}
