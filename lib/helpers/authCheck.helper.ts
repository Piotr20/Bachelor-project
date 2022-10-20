import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";

export async function authHelper(
    status: string,
    session: Session | null,
    router: NextRouter,
    setUserData: (data: any) => void
) {
    if (status === "unauthenticated") {
        signIn("azure-ad-b2c");
    } else if (status === "authenticated") {
        const response = await fetch(`./api/user/userVerify`, {
            method: "POST",
            body: JSON.stringify(session?.user),
        });
        const userVerification = await response.json();
        if (userVerification.userExists) {
            setUserData(userVerification?.user);
        } else if (userVerification.userExists === false) {
            router.push("/signUp");
        }
    }
}
