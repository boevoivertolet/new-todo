import type { Meta, StoryObj } from "@storybook/react";
import App from "./App";
import { StoreProviderDecorator } from "../stories/decorators/storeProviderDecorator";

const meta: Meta<typeof App> = {
	title: "TODOLISTS/App",
	component: App,
	tags: ["autodocs"],
	decorators: [StoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppStory: Story = {};
