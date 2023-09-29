import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class SpecialistsResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "John Doe" })
  public name: string;
  @ApiProperty({ example: "johny@gmail.com" })
  public email: string;
  @ApiProperty({ example: "Neurologist" })
  public jobPosition: string;
  @ApiProperty({ example: "johny-avatar.png" })
  public avatar: string;
  @ApiProperty({ example: 1 })
  public organizationId: number;

  public constructor(specialist) {
    this.id = specialist.id;
    this.name = specialist.name;
    this.email = specialist.email;
    this.jobPosition = specialist.job_position;
    this.avatar = specialist.avatar;
    this.organizationId = specialist.organizationId;
  }

  public static collect(specialists): SpecialistsResource[] {
    return specialists.map((specialist) => {
      return new SpecialistsResource(specialist);
    });
  }
}
