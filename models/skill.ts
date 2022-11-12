import { Project } from "./project";
import { User } from "./user";

export type Skill =
    | {
          _id?: string;
          name?: string;
          imageURL?: string;
          docs?: string;
          people?: User[];
          projects?: Project[];
      }
    | undefined;
