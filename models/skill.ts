import { Project } from "./project";
import { User } from "./user";

export type Skill =
    | {
          _id?: string;
          name?: string;
          imageURL?: string;
          docs?: string;
          category?: string;
          people?: User[] | string[];
          projects?: Project[] | string[];
      }
    | undefined;
