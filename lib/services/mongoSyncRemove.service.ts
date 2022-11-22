import Project from "~/models/mongoModals/projectSchema";

export async function removeLegacyPeopleFromProject(mongoUserid: string, mongoUser: any) {
    const matchedProjects = await Project.find({ people: mongoUserid });
    matchedProjects?.forEach(async (project) => {
        let matchFound: boolean = false;
        mongoUser?.projects?.forEach(async (userProject: any) => {
            if (userProject?._id.toString() === project?._id.toString()) {
                // console.log("user", userProject?._id.toString(), "project", project?._id.toString());
                matchFound = true;
            }
        });
        // console.log("if delete", matchFound);
        if (!matchFound) {
            const projectToUpdate = await Project.updateOne(
                { _id: project?._id },
                {
                    $pull: {
                        people: mongoUserid,
                    },
                }
            );
        }
    });
}
