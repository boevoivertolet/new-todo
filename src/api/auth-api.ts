import {instance} from "./instance";
import {ResponseType} from "./task-api";
import {AxiosResponse} from "axios";

export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<ResponseType<{userId:number}>>(
            `auth/login`,
            data,
        )
        return promise
    },
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}
