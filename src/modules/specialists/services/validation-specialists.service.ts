import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { Specialist } from "../entities/specialist.entity";

@Injectable()
export class ValidationSpecialistsService {
  private readonly validRegex: RegExp;

  constructor(
    @InjectRepository(Specialist) private readonly SpecialistRepository: Repository<Specialist>,
  ) {
    this.validRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  }

  async validateEmail(email: string, id: number = 0): Promise<boolean> {
    this.validateEmailFormat(email);
    return await this.validateUniqueEmail(email, id);
  }

  validateEmailFormat(email: string): boolean {
    if (!this.validRegex.test(email)) {
      throw new HttpException(
        "Please provide valid Email.",
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  async validateUniqueEmail(email: string, id: number = 0): Promise<boolean> {
    const specialists = await this.SpecialistRepository.find({
      where: { email, id: Not(id) },
    });
    if (specialists.length > 0) {
      throw new HttpException(
        "This email is already taken.",
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}