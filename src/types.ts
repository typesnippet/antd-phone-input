import {ChangeEvent, CSSProperties, FocusEvent, InputHTMLAttributes, KeyboardEvent, MouseEvent} from "react";

export interface CountryData {
	countryCode: string,
	dialCode?: string,
}

export interface PhoneNumber {
	countryCode?: number | null,
	areaCode?: number | null,
	phoneNumber?: string | null,
	isoCode?: string,
	dialChanged?: boolean,

	valid?(): boolean,
}

export interface AntInputProps {
	size?: "small" | "middle" | "large",
	value?: PhoneNumber | string,
	style?: CSSProperties,
	className?: string,
	disabled?: boolean,

	onChange?(value: PhoneNumber, event: ChangeEvent<HTMLInputElement>): void;

	onPressEnter?(event: KeyboardEvent<HTMLInputElement>): void;
}

export interface ReactPhoneInputProps {
	inputProps?: InputHTMLAttributes<HTMLInputElement>,
	searchPlaceholder?: string,
	searchNotFound?: string,
	dropdownClass?: string,
	inputClass?: string,
	placeholder?: string,
	enableSearch?: boolean,
	disableDropdown?: boolean,
	country?: string,
	regions?: string[],
	onlyCountries?: string[],
	excludeCountries?: string[],
	preferredCountries?: string[],

	onFocus?(event: FocusEvent<HTMLInputElement>, value: PhoneNumber): void;

	onClick?(event: MouseEvent<HTMLInputElement>, value: PhoneNumber): void;

	onBlur?(event: FocusEvent<HTMLInputElement>, value: PhoneNumber): void;

	onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;

	onMount?(value: PhoneNumber): void;
}

export interface ReactPhoneOnChange {
	(value: string, data: CountryData, event: ChangeEvent<HTMLInputElement>, formattedNumber: string): void;
}

export interface ReactPhoneOnMount {
	(value: string, event: ChangeEvent<HTMLInputElement> & CountryData, formattedNumber: string): void;
}

export interface PhoneInputProps extends AntInputProps, ReactPhoneInputProps {
	/**
	 * NOTE: Interfaces of events may differ from the original interfaces
	 * of dependencies, so be careful and follow the linked documentation.
	 */
}
