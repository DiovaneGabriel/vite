import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

import http from "../../http-common";
import { AuthContextProps, Request, Token, User } from "./Auth.types";
import { Payload } from "../../types/Common.types";
import { apiRequest } from "../../services/ApiService";

const AuthContext = createContext<AuthContextProps>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const clearLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const getTokenFromLocalStorage = (): Token => {

        try {
            const tk = localStorage.getItem('token')
            if (tk) {
                const decodedToken = jwtDecode(tk);
                const isTokenValid = decodedToken.exp ? (decodedToken.exp > Date.now() / 1000) : false;
                if (!isTokenValid) {
                    clearLocalStorage();
                }
                return isTokenValid ? tk : null;
            }
        } catch (error) {
            clearLocalStorage();
            return null;
        }
        clearLocalStorage();
        return null;
    };

    const getUserFromLocalStorage = (): User => {
        try {
            let storage = localStorage.getItem('user');
            if (storage) {
                storage = atob(storage);
                return JSON.parse(storage);
            }
        } catch (error) {
            clearLocalStorage();
            return null;
        }
        clearLocalStorage();
        return null;
    };

    const [user, setUser] = useState<User>(getUserFromLocalStorage());
    const [token, setToken] = useState<Token>(getTokenFromLocalStorage());
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [AuthRequest, setAuthRequest] = useState<Request>();

    const setLocalStorage = (token: Token, user: User) => {
        if (!token || !user) {
            setToken(null);
            setUser(null);
            clearLocalStorage();
        } else {
            setToken(token);
            localStorage.setItem('token', token);

            setUser(user);
            localStorage.setItem('user', btoa(JSON.stringify(user)));
        }
    }

    const login = (email: string, password: string) => {
        setIsLoading(true);
        apiRequest.post('auth/local', {
            identifier: email,
            password: password
        }).then((response) => {
            setLocalStorage(
                response.data.jwt,
                response.data.user
            );
        }).catch(e => {
            console.error(e);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const logout = () => {
        // try {
        //     if (invalidateSession) {
        //         AuthRequest?.get("/logout");
        //     }
        // } finally {
        //     setIsLogged(false);
        //     setLocalStorage(null, null, null);
        //     navigate('/');
        // }
        setIsLogged(false);
        setLocalStorage(null, null);
        navigate('/');
    }

    useEffect(() => {
        setIsLogged(token ? true : false);
        setIsLoading(false);

        if (token) {
            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            setAuthRequest({
                get: (url: string) => {
                    return http.get(url, axiosConfig);
                },
                post: (url: string, data: Payload) => {
                    return http.post(url, data, axiosConfig);
                },
                delete: (url: string) => {
                    return http.delete(url, axiosConfig);
                }
            });
        }

    }, [token]);

    return (
        <AuthContext.Provider value={{ AuthRequest, isLoading, isLogged, token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}