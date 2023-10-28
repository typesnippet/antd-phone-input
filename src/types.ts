import {ChangeEvent, KeyboardEvent} from "react";
import {InputProps} from "antd/lib/input";

export interface PhoneNumber {
	countryCode?: number | null;
	areaCode?: number | null;
	phoneNumber?: string | null;
	isoCode?: string;

	valid?(): boolean;
}

export interface ReactPhoneInputProps {
	disableDropdown?: boolean,
	onlyCountries?: string[],
	excludeCountries?: string[],
	preferredCountries?: string[],
}

export interface PhoneInputProps extends Omit<InputProps, "value" | "onChange"> {
	/**
	 * NOTE: Interfaces of events may differ from the original interfaces
	 * of dependencies, so be careful and follow the linked documentation.
	 */

	value?: PhoneNumber | string;

	country?: string;

	enableSearch?: boolean;

	searchNotFound?: string;

	searchPlaceholder?: string;

	onMount?(value: PhoneNumber): void;

	onFocus?(event: ChangeEvent<HTMLInputElement>): void;

	onInput?(event: ChangeEvent<HTMLInputElement>): void;

	onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;

	onChange?(value: PhoneNumber, event: ChangeEvent<HTMLInputElement>): void;
}
