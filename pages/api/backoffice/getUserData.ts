import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "~/lib/helpers/tokenDecode.helper";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { authorization } = req.headers;
    const { payload, timeNowInSeconds } = decodeJWT(authorization);

    if (payload?.exp >= timeNowInSeconds) {
        return res.status(200).json({ user: "test" });
    } else {
        return res.send({
            error: "You must be signed in to view the protected content on this page.",
        });
    }
};
