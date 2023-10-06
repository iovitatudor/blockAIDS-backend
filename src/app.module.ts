import { Module } from "@nestjs/common";
import * as path from "path";
import * as process from "process";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users/users.module";
import { User } from "./modules/users/entities/user.entity";
import { FilesModule } from "./common/files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { OrganizationsModule } from "./modules/organizations/organizations.module";
import { Organization } from "./modules/organizations/entities/organization.entity";
import { SpecialistsModule } from "./modules/specialists/specialists.module";
import { Specialist } from "./modules/specialists/entities/specialist.entity";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { Notification } from "./modules/notifications/entities/notification.entity";
import { TasksModule } from "./modules/tasks/tasks.module";
import { TaskType } from "./modules/tasks/entities/task-type.entity";
import { Task } from "./modules/tasks/entities/task.entity";
import { AuthModule } from "./modules/auth/auth.module";
import { BlockchainModule } from "./modules/blockchain/blockchain.module";

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
      entities: [User, Organization, Specialist, Notification, TaskType, Task],
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
    TasksModule,
    AuthModule,
    BlockchainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
