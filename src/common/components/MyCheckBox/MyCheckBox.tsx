import React, { ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
import { TaskStatuses } from "../../../api/task-api";

const MyCheckBox: React.FC<MyCheckBoxProps> = (props) => {
	const { callBack, checked, style, ...restProps } = props;

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		callBack(checked);
	};

	return (
		// <input style={style} type={'checkbox'} checked = {checked} onChange = {onChangeHandler} />
		<Checkbox style={style} checked={checked === TaskStatuses.Completed} onChange={onChangeHandler} />
	);
};

type MyCheckBoxProps = {
	checked: TaskStatuses;
	callBack: (checked: TaskStatuses) => void;
	style?: {};
};
