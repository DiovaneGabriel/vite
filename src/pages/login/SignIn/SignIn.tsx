import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contexts/Auth/Auth";

const SignIn = () => {
    const { login } = useAuth();
    const { t: i } = useTranslation('inputs');

    const [inputEmail, setInputEmail] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(inputEmail, inputPassword);
    }

    return (
        <form onSubmit={submitHandler}>
            <input placeholder={i("email")} value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
            <input placeholder={i("password")} type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
            <input type="submit" />
        </form>
    );
};

export default SignIn;