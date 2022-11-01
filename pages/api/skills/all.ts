import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connectMongo";
import Skill from "~/models/mongoModals/skillSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        const skills = await Skill.find();

        res.json({ skills });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
