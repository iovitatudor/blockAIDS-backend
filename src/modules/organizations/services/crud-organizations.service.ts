import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateOrganizationDto } from "../dto/create-organization.dto";
import { UpdateOrganizationDto } from "../dto/update-organization.dto";
import { Organization } from "../entities/organization.entity";

@Injectable()
export class CrudOrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {
  }

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationRepository.save(createOrganizationDto);
  }

  findAllOrganization(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  async findOrganization(id: number): Promise<Organization> {
    try {
      return await this.organizationRepository.findOneOrFail({ where: { id } });
    } catch (e) {
      throw new HttpException(
        "Could not find any organization.",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateOrganization(
    id: number,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<UpdateResult> {
    if (!id)
      throw new HttpException(
        "id is required",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return await this.organizationRepository.update(id, updateOrganizationDto);
  }

  removeOrganization(id: number): Promise<{ affected?: number }> {
    if (!id)
      throw new HttpException(
        "id is required",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return this.organizationRepository.delete(id);
  }
}
