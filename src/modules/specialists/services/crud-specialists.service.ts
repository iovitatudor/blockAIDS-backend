import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateSpecialistDto } from "../dto/create-Specialist.dto";
import { UpdateSpecialistDto } from "../dto/update-Specialist.dto";
import { Specialist } from "../entities/Specialist.entity";
import { FilesService } from "../../../common/files/files.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class CrudSpecialistsService {
  constructor(
    @InjectRepository(Specialist)
    private readonly SpecialistRepository: Repository<Specialist>,
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
      return await this.SpecialistRepository.save({ ...createSpecialistDto });
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  findAll(): Promise<Specialist[]> {
    return this.SpecialistRepository.find({
      relations: { organization: true },
    });
  }

  findByOrganizationId(id: string): Promise<Specialist[]> {
    return this.SpecialistRepository.find({
      where: { organizationId: id },
      relations: { organization: true },
    });
  }

  async findOne(id: number): Promise<Specialist> {
    try {
      return await this.SpecialistRepository.findOneOrFail({
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
      return await this.SpecialistRepository.update(id, updateSpecialistDto);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    try {
      return this.SpecialistRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}