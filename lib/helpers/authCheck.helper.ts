import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";

export async function authHelper(
    status: string,
    session: Session | null,
    router: NextRouter,
    setUserData: (data: any) => void
) {
    const previousRoute = localStorage?.getItem("previousRoute");
    if (status === "unauthenticated") {
        localStorage.setItem("previousRoute", router.asPath);
        signIn("azure-ad-b2c");
    } else if (status === "authenticated") {
        const response = await fetch(`./api/user/userVerify`, {
            method: "POST",
            body: JSON.stringify(session?.user),
        });
        const userVerification = await response.json();
        console.log(userVerification);
        if (userVerification.userExists && previousRoute) {
            setUserData(userVerification?.user);
            localStorage?.removeItem("previousRoute");
            router.push(previousRoute);
        } else if (userVerification.userExists === false) {
            router.push("/signUp");
        }
    }
}
