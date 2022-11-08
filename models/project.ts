import { Skill } from "./skill";
import { User } from "./user";

export type Project =
    | {
          _id?: string;
          name?: string;
          people?: Array<User | string>;
          skills?: Array<Skill | string>;
          imageURL?: string;
          tag?: string;
          startDate?: Date;
          endDate?: Date;
      }
    | undefined;
