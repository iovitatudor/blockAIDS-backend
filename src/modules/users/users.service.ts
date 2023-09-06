import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { FilesService } from "../../common/files/files.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private fileService: FilesService,
  ) {
  }

  async createUser(createUserDto: CreateUserDto, avatar): Promise<User> {
    if (avatar) {
      createUserDto.avatar = await this.fileService.createFile(avatar);
    }
    return this.userRepository.save(createUserDto);
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUser(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (e) {
      throw new HttpException(
        "Could not find any user.",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    avatar,
  ): Promise<User | null> {
    if (!id)
      throw new HttpException(
        "id is required",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    if (avatar) {
      updateUserDto.avatar = await this.fileService.createFile(avatar);
    }
    await this.userRepository.update(id, updateUserDto);
    return await this.findUser(id);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    if (!id)
      throw new HttpException(
        "id is required",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return this.userRepository.delete(id);
  }
}