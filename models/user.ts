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
          projects?: Array<string>;
          skills?: Array<string>;
          imageURL?: string;
      }
    | undefined;
