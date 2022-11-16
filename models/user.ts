import { Project } from "./project";
import { Skill } from "./skill";

export type User =
    | {
          _id?: string;
          name?: string;
          email?: string;
          experienceYears?: number;
          phone?: string;
          department?: string;
          location?: string;
          role?: string;
          projects?: Project[] | string[];
          skills?: Skill[] | string[];
          imageURL?: string;
      }
    | undefined;
