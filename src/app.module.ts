import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as process from "process";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users/users.module";
import { User } from "./modules/users/entities/user.entity";
import { FilesModule } from "./common/files/files.module";
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { OrganizationsModule } from "./modules/organizations/organizations.module";
import { Organization } from "./modules/organizations/entities/organization.entity";
import { SpecialistsModule } from "./modules/specialists/specialists.module";
import { Specialist } from "./modules/specialists/entities/specialist.entity";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { Notification } from "./modules/notifications/entities/notification.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./.env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User, Organization, Specialist, Notification],
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "../uploads"),
    }),
    FilesModule,
    UsersModule,
    OrganizationsModule,
    SpecialistsModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
