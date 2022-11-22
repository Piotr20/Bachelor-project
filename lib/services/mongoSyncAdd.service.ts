import Project from "~/models/mongoModals/projectSchema";

export async function addMissingPeopleToProjects(mongoUserid: string, mongoUser: any) {
    mongoUser?.projects?.forEach(async (userProject: any) => {
        const projectById = await Project.findById(userProject?._id);
        let alreadyHasPerson = false;
        projectById?.people?.forEach((personId: any) => {
            if (personId.toString() === mongoUser?._id.toString()) {
                alreadyHasPerson = true;
            }
        });
        if (!alreadyHasPerson) {
            const projectToUpdate = await Project.updateOne(
                { _id: userProject?._id },
                {
                    $push: {
                        people: mongoUserid,
                    },
                }
            );
        }
    });
}
