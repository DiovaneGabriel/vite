import { Routes, Route } from "react-router-dom";

import App from "./App";

import SignIn from "./pages/login/SignIn";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<App />}>
                <Route path="/" element={<SignIn />} />
            </Route>
            {/* <Route path="*" element={<HTTPError httpErrorCode={404} />} /> */}
        </Routes>
    );
};

export default AppRoutes;