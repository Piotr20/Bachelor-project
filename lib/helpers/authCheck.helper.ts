import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import { userSchema } from "~/util/user";

export function authHelper(
    status: string,
    session: Session | null,
    router: NextRouter,
    setUserData: (data: userSchema) => void
) {
    const previousRoute = localStorage?.getItem("previousRoute");
    if (status === "unauthenticated") {
        localStorage.setItem("previousRoute", router.asPath);
        signIn("azure-ad");
    } else if (status === "authenticated") {
        setUserData(session?.user);
        if (previousRoute) {
            localStorage?.removeItem("previousRoute");
            router.push(previousRoute);
        }
    }
}
