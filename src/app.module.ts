import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as process from "process";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users/users.module";
import { User } from "./modules/users/entities/user.entity";
import { FilesModule } from "./common/files/files.module";
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

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
      entities: [User],
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "../uploads"),
    }),
    FilesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})


export class AppModule {
}
