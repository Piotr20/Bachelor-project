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
          projects?: Project[];
          skills?: UserSkill[] | Skill[] | string[];
          imageURL?: string;
          createdAt: Date;
          updatedAt: Date;
      }
    | undefined;

export type UserSkill = { skill?: Skill | string; expertise?: string } | undefined;
