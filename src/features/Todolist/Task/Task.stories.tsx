import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task } from "./Task";

const meta: Meta<typeof Task> = {
	title: "TODOLISTS/Task",
	component: Task,

	tags: ["autodocs"],

	args: {
		changeTaskStatus: action("Status changed inside Task"),
		changeTaskTitle: action("Title changed inside Task"),
		removeTask: action("Remove Button clicked changed inside Task"),
		// title: 'JS',
		todolistId: "fgdosrg8rgjuh",
	},
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
	args: {
		// title: 'CSS'
	},
};
