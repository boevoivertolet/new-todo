import {instance} from "./instance";
import {ResponseType} from "./task-api";

export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<ResponseType<{userId:number}>>(
            `/auth/login`,
            {data}
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
