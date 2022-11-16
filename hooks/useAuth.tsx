import { signIn, signOut } from "next-auth/react";

const useAuth = () => {
    function authSignIn() {
        signIn("azure-ad-b2c");
    }
    function authSignOut() {
        const SIGNOUT_URL = `https://${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN_NAME}`;
        signOut({ redirect: false });
        window.location.href = SIGNOUT_URL;
    }

    return {
        authSignIn,
        authSignOut,
    };
};

export default useAuth;
