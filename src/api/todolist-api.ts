import { instance } from "./instance";

export const todolistAPI = {
	updateTodolist(todolistId: string, title: string) {
		const promise = instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, { title: title });
		return promise;
	},
	getTodolists() {
		const promise = instance.get<Array<TodolistType>>("todo-lists");
		return promise;
	},
	createTodolists(title: string) {
		const promise = instance.post<
			ResponseType<{
				item: TodolistType;
			}>
		>("todo-lists", {
			title,
		});
		return promise;
	},
	deleteTodolist(todolistId: string) {
		const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`);
		return promise;
	},
};
export type TodolistType = {
	id: string;
	addedDate: string;
	order: number;
	title: string;
};

export type ResponseType<D = {}> = {
	resultCode: number;
	messages: Array<string>;
	fieldsErrors: Array<string>;
	data: D;
};
