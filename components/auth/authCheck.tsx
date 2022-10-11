import { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { authHelper } from "~/lib/helpers/authCheck.helper";
import Spinner from "~/styles/spinner";
import { useRouter } from "next/router";
import { useAuthStore } from "~/store/store";

type AuthProps = {
    children: ReactNode;
};

const HOCAuthCheck = ({ children }: AuthProps) => {
    const { setUserData } = useAuthStore((state) => ({
        setUserData: state.setUserData,
    }));
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        authHelper(status, session, router, setUserData);
    }, [status]);

    return (
        <>
            <Spinner status={status} />
            {children}
        </>
    );
};

export default HOCAuthCheck;
