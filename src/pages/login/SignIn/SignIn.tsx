import { useTranslation } from "react-i18next";

const SignIn = () => {
    const { t: i } = useTranslation('inputs');
    return (
        <form action="">
            <input placeholder={i("email")} />
            <input placeholder={i("password")} type="password"/>
            <input type="submit" />
        </form>
    );
};

export default SignIn;