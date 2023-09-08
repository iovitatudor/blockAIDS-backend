import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class TaskTypeResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "Take semi-annual test" })
  public name: string;
  @ApiProperty({ example: "Take semi-annual test..." })
  public description: string;
  @ApiProperty({ example: "1" })
  public reward: string;

  public constructor(taskType) {
    this.id = taskType.id;
    this.name = taskType.name;
    this.description = taskType.description;
    this.reward = taskType.reward;
  }

  public static collect(taskTypes): TaskTypeResource[] {
    return taskTypes.map((taskType) => {
      return new TaskTypeResource(taskType);
    });
  }
}
