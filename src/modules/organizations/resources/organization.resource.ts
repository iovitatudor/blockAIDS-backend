import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class OrganizationResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "Healthy Life Clinic" })
  public name: string;

  public constructor(user) {
    this.id = user.id;
    this.name = user.name;
  }

  public static collect(organization): OrganizationResource[] {
    return organization.map((user) => {
      return new OrganizationResource(user);
    });
  }
}
