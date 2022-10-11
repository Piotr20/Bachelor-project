export type userSchema =
    | {
          name?: string | null;
          email?: string | null;
          image?: string | null;
      }
    | undefined;

export const userData = {
    schemas: [
        "urn:ietf:params:scim:schemas:core:2.0:User",
        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
    ],
    userName: "bjensen",
    id: "48af03ac28ad4fb88478",
    externalId: "bjensen",
    name: {
        formatted: "Ms. Barbara J Jensen III",
        familyName: "Jensen",
        givenName: "Barbara",
    },
    externalUser: {
        employeeNumber: "701984",
        costCenter: "4130",
        organization: "Universal Studios",
        division: "Theme Park",
        department: "Tour Operations",
        manager: {
            value: "26118915-6090-4610-87e4-49d8ca9f808d",
            $ref: "../Users/26118915-6090-4610-87e4-49d8ca9f808d",
            displayName: "John Smith",
        },
    },
    customExtension: {
        CustomAttribute: "701984",
    },
    meta: {
        resourceType: "User",
        created: "2010-01-23T04:56:22Z",
        lastModified: "2011-05-13T04:42:34Z",
        version: 'W/"3694e05e9dff591"',
        location:
            "https://example.com/v2/Users/2819c223-7f76-453a-919d-413861904646",
    },
    profileImageUrl:
        "https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_960_720.png",
    title: "Software Engineer",
    skills: ["Js", "Css", "Next"],
};
