import { IncomingHttpHeaders } from "http2";
import { NextApiRequest } from "next";
var jwt = require("jsonwebtoken");

export function decodeJWT(authorization?: string) {
    const token = authorization?.split("Bearer ")[1];
    const decoded = jwt.decode(token, { complete: true });
    const payload = decoded?.payload;
    const timeNowInSeconds = Math.floor(Date.now() / 1000);
    const userInitials = payload?.unique_name.split("@")[0];
    return {
        payload,
        timeNowInSeconds,
        userInitials,
    };
}
