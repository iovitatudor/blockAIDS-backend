import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiConsumes, ApiNoContentResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersResource } from "./resources/users.resource";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiResponse({ status: 200, type: [UsersResource] })
  @ApiOperation({ summary: "Get all users" })
  @Get()
  async findAll() {
    const users = await this.usersService.findAllUser();
    return UsersResource.collect(users);
  }

  @ApiResponse({ status: 200, type: UsersResource })
  @ApiOperation({ summary: "Get user by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const user = await this.usersService.findUser(+id);
    return new UsersResource(user);
  }

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiResponse({ status: 200, type: UsersResource })
  @ApiOperation({ summary: "Create user" })
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() avatar) {
    const user = await this.usersService.createUser(createUserDto, avatar);
    return new UsersResource(user);
  }

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiResponse({ status: 200, type: UsersResource })
  @ApiOperation({ summary: "Update user" })
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() avatar) {
    const user = await this.usersService.updateUser(+id, updateUserDto, avatar);
    return new UsersResource(user);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted",
  })
  @ApiOperation({ summary: "Delete user" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const user = await this.usersService.removeUser(+id);
    return new UsersResource(user);
  }
}