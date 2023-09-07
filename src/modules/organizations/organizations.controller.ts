import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse, ApiTags,
} from "@nestjs/swagger";
import { CrudOrganizationsService } from "./services/crud-organizations.service";
import { OrganizationResource } from "./resources/organization.resource";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { ValidationOrganizationsService } from "./services/validation-organizations.service";

@ApiTags("Organizations")
@Controller("organizations")
export class OrganizationsController {
  constructor(
    private readonly crudOrganizationService: CrudOrganizationsService,
    private readonly validationOrganizationService: ValidationOrganizationsService,
  ) {
  }

  @ApiResponse({ status: 200, type: [OrganizationResource] })
  @ApiOperation({ summary: "Get all organizations" })
  @Get()
  async findAll() {
    const users = await this.crudOrganizationService.findAllOrganization();
    return OrganizationResource.collect(users);
  }

  @ApiResponse({ status: 200, type: OrganizationResource })
  @ApiOperation({ summary: "Get organization by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const user = await this.crudOrganizationService.findOrganization(+id);
    return new OrganizationResource(user);
  }

  @ApiResponse({ status: 200, type: OrganizationResource })
  @ApiOperation({ summary: "Create organization" })
  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    await this.validationOrganizationService.validate(
      createOrganizationDto.name,
    );
    const organization = await this.crudOrganizationService.createOrganization(
      createOrganizationDto,
    );
    return new OrganizationResource(organization);
  }

  @ApiResponse({ status: 200, type: OrganizationResource })
  @ApiOperation({ summary: "Update organization" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    await this.validationOrganizationService.validate(
      updateOrganizationDto.name,
      +id,
    );
    await this.crudOrganizationService.updateOrganization(+id, updateOrganizationDto);
    const user = await this.crudOrganizationService.findOrganization(+id);
    return new OrganizationResource(user);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted",
  })
  @ApiOperation({ summary: "Delete organization" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const organization = await this.crudOrganizationService.removeOrganization(+id);
    return new OrganizationResource(organization);
  }
}
