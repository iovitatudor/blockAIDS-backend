import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { FilesService } from "../../../common/files/files.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class CrudUsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly fileService: FilesService,
  ) {
  }

  async createUser(createUserDto: CreateUserDto, avatar): Promise<User> {
    if (avatar) {
      createUserDto.avatar = await this.fileService.createFile(avatar);
    }
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 5);
    }
    return this.userRepository.save(createUserDto);
  }

  findAllUser(page: number = 1): Promise<User[]> {
    const take: number = 1000;
    const skip: number = (take * page) - 1000;

    return this.userRepository.find({
      take: take,
      skip: skip,
      order: {
        id: "DESC",
      },
    });
  }

  async findUser(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (e) {
      throw new HttpException("Could not find any user.", HttpStatus.NOT_FOUND);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ where: { email } });
    } catch (e) {
      throw new HttpException("Could not find any user.", HttpStatus.NOT_FOUND);
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    avatar,
  ): Promise<UpdateResult> {
    if (!id)
      throw new HttpException(
        "id is required",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    if (avatar) {
      updateUserDto.avatar = await this.fileService.createFile(avatar);
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 5);
    }
    return await this.userRepository.update(id, updateUserDto);
  }

  async updateUserPublicKey(
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const user = await this.userRepository.findOne({
      where: {
        public_key: IsNull(),
      },
    });
    return await this.userRepository.update(
      { id: user.id },
      { public_key: updateUserDto.public_key },
    );
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