import { AxiosResponse } from "axios";
import { Payload } from "../../types/Common.types";

// export type Payload = { [key: string]: string | object | null | undefined };


// export type Company = {
//     id: number;
//     cnpj: string;
//     nome: string;
//     razao_social: string;
// } | null;

export type AuthContextProps = {
    AuthRequest: Request;
    // isOnboarding: boolean;
    isLoading: boolean;
    isLogged: boolean;
    token: Token;
    user: User;
    // company: Company;
    login: (email: string, password: string) => void;
    logout: () => void;
    // refresh: () => void;
} | undefined;

export type Request = {
    get: (url: string) => Promise<AxiosResponse>;
    post: (url: string, data: Payload) => Promise<AxiosResponse>;
    delete: (url: string) => Promise<AxiosResponse>;
} | undefined;

export type Token = string | null;

export type User = {
    id: number;
    name: string;
    email: string;
} | null;