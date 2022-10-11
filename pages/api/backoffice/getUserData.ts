import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "~/lib/helpers/tokenDecode.helper";
import connectMongo from "../../../util/connectMongo";
import User from "../../../models/mongoModals/testSchema";

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

        const tests = await User.find();

        res.json({ tests });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};
