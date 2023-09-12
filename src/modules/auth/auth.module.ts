import {forwardRef, Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {Specialist} from "../specialists/entities/specialist.entity";
import {SpecialistsModule} from "../specialists/specialists.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => SpecialistsModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "blockaids-secret",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtModule],
})
export class AuthModule {
}
