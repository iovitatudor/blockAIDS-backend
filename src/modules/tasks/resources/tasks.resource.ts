import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { OrganizationResource } from "../../organizations/resources/organization.resource";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { UsersResource } from "../../users/resources/users.resource";
import { SpecialistsResource } from "../../specialists/resources/specialists.resource";
import { TaskTypeResource } from "./task-type.resource";

@Injectable()
export class TasksResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "My first task" })
  public name: string;
  @ApiProperty({ example: "2023-07-10" })
  public dateDue: string;
  @ApiProperty({ example: TaskStatusEnum.InProgress })
  public status: TaskStatusEnum;
  @ApiProperty({ example: 342 })
  public points: number;
  @ApiProperty({ example: "My first task description" })
  public description: string;
  @ApiProperty({ example: UsersResource })
  public user: UsersResource;
  @ApiProperty({ example: SpecialistsResource })
  public specialist: SpecialistsResource;
  @ApiProperty({ example: TaskTypeResource })
  public taskType: TaskTypeResource;
  @ApiProperty({ example: OrganizationResource })
  public organization: OrganizationResource;
  @ApiProperty({ example: 2 })
  public specialistId: number;

  public constructor(task) {
    this.id = task.id;
    this.name = task.name;
    this.dateDue = task.due_date;
    this.status = task.status;
    this.points = task.points;
    this.description = task.description;
    this.user = task.user ? new UsersResource(task.user) : null;
    this.specialist = task.specialist
      ? new SpecialistsResource(task.specialist)
      : null;
    this.taskType = task.taskType ? new TaskTypeResource(task.taskType) : null;
    this.organization = task.organization
      ? new OrganizationResource(task.organization)
      : null;
    this.specialistId = task.specialistId;
  }

  public static collect(tasks): TasksResource[] {
    return tasks.map((task) => {
      return new TasksResource(task);
    });
  }
}
