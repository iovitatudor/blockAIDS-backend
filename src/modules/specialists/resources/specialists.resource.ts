import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { OrganizationResource } from "../../organizations/resources/organization.resource";

@Injectable()
export class SpecialistsResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "John Doe" })
  public name: string;
  @ApiProperty({ example: "johny@gmail.com" })
  public email: string;
  @ApiProperty({ example: "Neurologist" })
  public job_position: string;
  @ApiProperty({ example: "johny-avatar.png" })
  public avatar: string;
  @ApiProperty({ example: OrganizationResource })
  public organization: OrganizationResource;

  public constructor(specialist) {
    this.id = specialist.id;
    this.name = specialist.name;
    this.email = specialist.email;
    this.job_position = specialist.jobPosition;
    this.avatar = specialist.avatar;
    this.organization = specialist.organization
      ? new OrganizationResource(specialist.organization)
      : null;
  }

  public static collect(specialists): SpecialistsResource[] {
    return specialists.map((specialist) => {
      return new SpecialistsResource(specialist);
    });
  }
}
