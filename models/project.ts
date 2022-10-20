export type Project =
    | {
          _id?: string;
          name?: string;
          people?: Array<string>;
          skills?: Array<string>;
          imageURL?: string;
          tag?: string;
          startDate?: Date;
          endDate?: Date;
      }
    | undefined;
