export type PhoneInterface = {
	countryCode?: any,
	areaCode?: any,
	phoneNumber?: any,
}

export type PhoneNumberInputProps = {
	value?: object,
	onChange?: (value: PhoneInterface) => void,
	setIsValid?: (value: boolean) => void,
}

export type PhoneNumberFormItemProps = {
	required?: boolean,
	name?: string,
}
