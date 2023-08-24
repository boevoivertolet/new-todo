import React, { useEffect, useState } from "react";
import { todolistAPI } from "./todolist-api";

export default {
    title: "API",
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.getTodolists().then((res) => {
            setState(res.data[0]);
        });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const title = "New NEW TiTLE";
        todolistAPI.createTodolists(title).then((res) => {
            setState(res.data);
        });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "26ebbe1b-c68d-4415-bcb8-b32f6afb0e3b";
        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data);
        });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "26ebbe1b-c68d-4415-bcb8-b32f6afb0e3b";
        todolistAPI.updateTodolist(todolistId, "19234619826734918762349186273419823764").then((res) => {
            setState(res.data);
        });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
