import { signIn, signOut } from "next-auth/react";

const useAuth = () => {
    function authSignIn() {
        signIn("azure-ad");
    }
    function authSignOut() {
        signOut();
    }

    return {
        authSignIn,
        authSignOut,
    };
};

export default useAuth;
