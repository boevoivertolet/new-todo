import { instance } from "./instance";
import { ResponseType } from "./task-api";

export const authAPI = {
	me() {
		const promise = instance.get<ResponseType<{ userId: number; login: string }>>(`auth/me`);
		return promise.then((res) => res.data);
	},
	login(data: LoginParamsType) {
		const promise = instance.post<ResponseType<{ userId: number }>>(`auth/login`, data);
		return promise;
	},
	logout() {
		const promise = instance.delete<ResponseType>(`auth/login`);
		return promise;
	},
};
export type LoginParamsType = {
	email: string;
	password: string;
	rememberMe: boolean;
	captcha: boolean;
};
