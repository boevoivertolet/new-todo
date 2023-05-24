import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { EditableInput } from './EditableInput'

const meta: Meta<typeof EditableInput> = {
	title: 'TODOLISTS/EditableInput',
	component: EditableInput,

	tags: ['autodocs'],

	argTypes: {
		value: {
			description: 'Start value empty. Add value push button set string.'
		},
		changeTodolistTitle: {
			description: 'Value EditableInput changed'
		}
	}
}

export default meta
type Story = StoryObj<typeof EditableInput>

export const EditableInputStory: Story = {
	args: {
		changeTodolistTitle: action('Value EditableInput changed')
	}
}
