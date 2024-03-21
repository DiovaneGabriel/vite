import { Routes, Route } from "react-router-dom";

import App from "./App";

import SignIn from "./pages/login/SignIn";
import { useAuth } from "./contexts/Auth/Auth";
import Home from "./pages/Home";
import SignOut from "./pages/login/SignOut";

const AppRoutes = () => {
    const { isLoading: isLoadingUser, isLogged } = useAuth();

    return (
        <Routes>
            <Route element={<App />}>
                {!isLoadingUser && (
                    !isLogged ?
                        <Route path="/" element={<SignIn />} />
                        :
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/logout" element={<SignOut />} />
                        </>
                )}
            </Route>
            {/* <Route path="*" element={<HTTPError httpErrorCode={404} />} /> */}
        </Routes>
    );
};

export default AppRoutes;