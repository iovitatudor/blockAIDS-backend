import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { Organization } from "../entities/organization.entity";

@Injectable()
export class ValidationOrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {
  }

  async validate(name: string, id: number = 0): Promise<boolean> {
    return await this.validateUniqueName(name, id);
  }

  async validateUniqueName(name: string, id: number = 0): Promise<boolean> {
    const users = await this.organizationRepository.find({
      where: { name, id: Not(id) },
    });
    if (users.length > 0) {
      throw new HttpException(
        "This name is already taken.",
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}