import { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { authHelper } from "~/lib/helpers/authCheck.helper";
import Spinner from "~/styles/spinner";
import { useRouter } from "next/router";
import { useUserStore } from "~/store/userStore";

type AuthProps = {
    children: ReactNode;
};

const HOCAuthCheck = ({ children }: AuthProps) => {
    const { setUserData, user } = useUserStore((state) => ({
        setUserData: state.setUserData,
        user: state.user,
    }));
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        authHelper(status, session, router, setUserData);
        console.log(user);
    }, [status]);

    return (
        <>
            <Spinner status={status} />
            {children}
        </>
    );
};

export default HOCAuthCheck;
