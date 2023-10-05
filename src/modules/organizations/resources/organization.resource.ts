import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class OrganizationResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "Healthy Life Clinic" })
  public name: string;
  @ApiProperty({ example: "support@healthy.com" })
  public email: string;
  @ApiProperty({ example: "+010213245504" })
  public phone: string;
  @ApiProperty({ example: "USA" })
  public country: string;
  @ApiProperty({ example: "New-York" })
  public city: string;
  @ApiProperty({ example: "47 W 13th St" })
  public address: string;

  public constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.country = user.country;
    this.city = user.city;
    this.address = user.address;
  }

  public static collect(organization): OrganizationResource[] {
    return organization.map((user) => {
      return new OrganizationResource(user);
    });
  }
}
