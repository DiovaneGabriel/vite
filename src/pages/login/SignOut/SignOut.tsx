import { useEffect } from "react";
import { useAuth } from "../../../contexts/Auth/Auth";

const SignOut = () => {

    const { logout } = useAuth();

    useEffect(() => {
        logout();
    }, []);

    return <></>;
}

export default SignOut