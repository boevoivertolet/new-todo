import {instance} from "./instance";
import {ResponseType} from "./task-api";
import {AxiosResponse} from "axios";

export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<AxiosResponse<ResponseType<{userId:number}>>>(
            `auth/login`,
            data,
        )
        return promise.then(res => res.data)
    },
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}
