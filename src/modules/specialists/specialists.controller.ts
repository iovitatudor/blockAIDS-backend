import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import {
  ApiConsumes,
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CrudSpecialistsService } from "./services/crud-specialists.service";
import { ValidationSpecialistsService } from "./services/validation-specialists.service";
import { CreateSpecialistDto } from "./dto/create-specialist.dto";
import { UpdateSpecialistDto } from "./dto/update-specialist.dto";
import { SpecialistsResource } from "./resources/specialists.resource";

@ApiTags("Specialists")
@Controller("api/specialists")
export class SpecialistsController {
  constructor(
    private readonly crudSpecialistsService: CrudSpecialistsService,
    private readonly validationSpecialistsService: ValidationSpecialistsService,
  ) {
  }

  @ApiResponse({ status: 200, type: [SpecialistsResource] })
  @ApiOperation({ summary: "Get all specialists" })
  @Get()
  async findAll() {
    const specialists = await this.crudSpecialistsService.findAll();
    return SpecialistsResource.collect(specialists);
  }

  @ApiResponse({ status: 200, type: [SpecialistsResource] })
  @ApiOperation({ summary: "Get specialists by organization id" })
  @Get("/organization/:id")
  async findByOrganizationId(@Param("id") id: string) {
    const specialists =
      await this.crudSpecialistsService.findByOrganizationId(id);
    return SpecialistsResource.collect(specialists);
  }

  @ApiResponse({ status: 200, type: SpecialistsResource })
  @ApiOperation({ summary: "Get specialist by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const specialist = await this.crudSpecialistsService.findOne(+id);
    return new SpecialistsResource(specialist);
  }

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiResponse({ status: 200, type: SpecialistsResource })
  @ApiOperation({ summary: "Create specialist" })
  @Post()
  async create(
    @Body() createSpecialistDto: CreateSpecialistDto,
    @UploadedFile() avatar,
  ) {
    await this.validationSpecialistsService.validateEmail(
      createSpecialistDto.email,
    );
    const createdSpecialist = await this.crudSpecialistsService.create(
      createSpecialistDto,
      avatar,
    );

    const specialist = await this.crudSpecialistsService.findOne(
      createdSpecialist.id,
    );
    return new SpecialistsResource(specialist);
  }

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiResponse({ status: 200, type: SpecialistsResource })
  @ApiOperation({ summary: "Update specialist" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateSpecialistDto: UpdateSpecialistDto,
    @UploadedFile() avatar,
  ) {
    await this.validationSpecialistsService.validateEmail(
      updateSpecialistDto.email,
      +id,
    );
    await this.crudSpecialistsService.update(+id, updateSpecialistDto, avatar);
    const specialist = await this.crudSpecialistsService.findOne(+id);
    return new SpecialistsResource(specialist);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted",
  })
  @ApiOperation({ summary: "Delete specialist" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const specialist = await this.crudSpecialistsService.remove(+id);
    return new SpecialistsResource(specialist);
  }
}