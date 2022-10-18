import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "~/lib/helpers/tokenDecode.helper";
import connectMongo from "../../../util/connectMongo";
import User from "../../../models/mongoModals/userSchema";
import Project from "~/models/mongoModals/projectSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    /*   const { authorization } = req.headers;
    const { payload, timeNowInSeconds } = decodeJWT(authorization);

    if (payload?.exp >= timeNowInSeconds) {
        return res.status(200).json({ user: "test" });
    } else {
        return res.send({
            error: "You must be signed in to view the protected content on this page.",
        });
    } */

    try {
        await connectMongo();

        const user = await User.findOne({
            email: "piotrpospiech00@gmail.com",
        });

        /*   const project = await Project.create({
            name: "Timelog Analyzer",
            tag: "TLA",
            imageUrl:
                "https://www.timelog.com/media/754831/timelog_logo_with_payoff.png",
            startDate: "2022-08-08",
            endDate: "2022-12-12",
            people: [user._id],
        }); */

        const projects = await Project.aggregate([
            {
                $match: { _id: user._id },
            },
            {
                $lookup: {
                    from: "Project",
                    localField: "people",
                    foreignField: "_id",
                    as: "projects",
                },
            },
            {
                $unwind: { path: "$users", preserveNullAndEmptyArrays: true },
            },
            {
                $project: {
                []
                },
            },
        ]);

        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
