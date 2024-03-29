"use client";

import {signIn} from "next-auth/react";

const LoginButton = () => {
    return (
        <button
            className="btn btn-error btn-outline text-base"
            onClick={() => signIn("id-server", {callbackUrl: "/"}, {prompt: 'login'})}
        >
            Login
        </button>
    );
};

export default LoginButton;
