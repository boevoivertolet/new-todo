import React, { memo, useState } from 'react'
import { MyInput } from '../MyInput/MyInput'
import { MyButton } from '../MyButton/MyButton'
import s from './AddItemForm.module.scss'

export const AddItemForm: React.FC<AddItemFormProps> = React.memo((props) => {
	console.log('render AddItemForm')

	const {
		addItem,
		onEnterKey,
		placeholder,
		disabled,
		children,
		title,
		active,
		...restProps
	} = props

	const styleAddButton = {
		maxWidth: '40px',
		maxHeight: '40px',
		minWidth: '40px',
		minHeight: '40px'
	}

	const [value, setValue] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const onChangeTextHandler = (value: string) => {
		setValue(value)
		if (error !== null) {
			setError(null)
		}
	}
	const addItemHandler = () => {
		if (value === '') {
			setError('Field is required')
			return
		}
		addItem(value.trim())
		setValue('')
	}
	const enterPressHandler = (key: string) => {
		if (key === 'Enter') {
			addItem(value)
			setValue('')
		}
	}

	return (
		<div className={s.add__item__form}>
			<div className={s.input__button__block}>
				<MyInput
					callBack={onChangeTextHandler}
					value={value}
					onEnterKeyCallBack={enterPressHandler}
					error={error}
					placeholder={placeholder}
				/>
				<MyButton style={styleAddButton} callBack={addItemHandler}>
					{title}
				</MyButton>
			</div>
		</div>
	)
})
type AddItemFormProps = {
	onEnterKey: (key: string) => void
	placeholder?: string
	addItem: (value: string) => void
	disabled?: boolean
	children?: React.ReactNode
	title?: string
	active?: boolean
}
