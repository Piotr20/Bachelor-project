import { Skill } from "./skill";
import { User } from "./user";

export type Project =
    | {
          _id?: string;
          name?: string;
          people?: User[];
          skills?: Skill[];
          imageURL?: string;
          tag?: string;
          startDate?: Date;
          endDate?: Date;
      }
    | {
          _id?: string;
          name?: string;
          people?: string[];
          skills?: string[];
          imageURL?: string;
          tag?: string;
          startDate?: Date;
          endDate?: Date;
      }
    | undefined;
