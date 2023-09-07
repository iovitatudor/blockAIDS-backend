import { Module } from "@nestjs/common";
import { CrudOrganizationsService } from "./services/crud-organizations.service";
import { OrganizationsController } from "./organizations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Organization } from "./entities/organization.entity";
import { ValidationOrganizationsService } from "./services/validation-organizations.service";

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [OrganizationsController],
  providers: [CrudOrganizationsService, ValidationOrganizationsService],
})
export class OrganizationsModule {
}
