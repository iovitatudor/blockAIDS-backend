import { Module } from "@nestjs/common";
import { CrudSpecialistsService } from "./services/crud-specialists.service";
import { SpecialistsController } from "./specialists.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Specialist } from "./entities/specialist.entity";
import { FilesService } from "../../common/files/files.service";
import { ValidationSpecialistsService } from "./services/validation-specialists.service";
import { Organization } from "../organizations/entities/organization.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Specialist, Organization])],
  controllers: [SpecialistsController],
  providers: [
    CrudSpecialistsService,
    ValidationSpecialistsService,
    FilesService,
  ],
  exports: [CrudSpecialistsService, ValidationSpecialistsService],
})
export class SpecialistsModule {
}
