import { Skill } from "./skill";
import { User } from "./user";

export type Project =
    | {
          _id?: string;
          name?: string;
          people?: User[];
          skills?: Skill[] | string[];
          imageURL?: string;
          tag?: string;
          startDate?: Date;
          endDate?: Date;
      }
    | undefined;
