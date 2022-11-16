import { Project } from "./project";
import { User } from "./user";

export type Skill =
    | ({
          _id?: string;
          name?: string;
          imageURL?: string;
          docs?: string;
          category?: string;
          people?: User[];
          projects?: Project[];
      } & {
          _id?: string;
          name?: string;
          imageURL?: string;
          docs?: string;
          category?: string;
          people?: string[];
          projects?: string[];
      })
    | undefined;
