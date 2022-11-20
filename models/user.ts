import { Project } from "./project";
import { Skill } from "./skill";

export type User =
    | ({
          _id?: string;
          name?: string;
          email?: string;
          experienceYears?: number;
          phone?: string;
          department?: string;
          location?: string;
          role?: string;
          projects?: Project[];
          skills?: UserSkill[] | Skill[];
          imageURL?: string;
      } & {
          _id?: string;
          name?: string;
          email?: string;
          experienceYears?: number;
          phone?: string;
          department?: string;
          location?: string;
          role?: string;
          projects?: string[];
          skills?: string[];
          imageURL?: string;
      })
    | undefined;

export type UserSkill = { skill?: Skill & string; expertise?: string };
