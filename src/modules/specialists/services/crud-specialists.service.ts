import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateSpecialistDto } from "../dto/create-specialist.dto";
import { UpdateSpecialistDto } from "../dto/update-specialist.dto";
import { Specialist } from "../entities/specialist.entity";
import { FilesService } from "../../../common/files/files.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class CrudSpecialistsService {
  constructor(
    @InjectRepository(Specialist)
    private readonly specialistRepository: Repository<Specialist>,
    private readonly fileService: FilesService,
  ) {
  }

  async create(
    createSpecialistDto: CreateSpecialistDto,
    avatar,
  ): Promise<Specialist> {
    try {
      if (avatar) {
        createSpecialistDto.avatar = await this.fileService.createFile(avatar);
      }
      if (createSpecialistDto.password) {
        createSpecialistDto.password = await bcrypt.hash(
          createSpecialistDto.password,
          5,
        );
      }
      return await this.specialistRepository.save({ ...createSpecialistDto });
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  findAll(): Promise<Specialist[]> {
    return this.specialistRepository.find({
      relations: { organization: true },
      order: { id: "DESC" },
    });
  }

  findByOrganizationId(id: string): Promise<Specialist[]> {
    return this.specialistRepository.find({
      where: { organizationId: id },
      relations: { organization: true },
    });
  }

  async findOne(id: number): Promise<Specialist> {
    try {
      return await this.specialistRepository.findOneOrFail({
        where: { id },
        relations: { organization: true },
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any specialist.",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByEmail(email: string): Promise<Specialist> {
    try {
      return await this.specialistRepository.findOneOrFail({
        where: { email },
        relations: { organization: true },
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any specialist.",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateSpecialistDto: UpdateSpecialistDto,
    avatar,
  ): Promise<UpdateResult> {
    try {
      if (avatar) {
        updateSpecialistDto.avatar = await this.fileService.createFile(avatar);
      }
      if (updateSpecialistDto.password) {
        updateSpecialistDto.password = await bcrypt.hash(
          updateSpecialistDto.password,
          5,
        );
      }
      return await this.specialistRepository.update(id, updateSpecialistDto);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    try {
      return this.specialistRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}