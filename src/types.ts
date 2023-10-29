import {ChangeEvent, KeyboardEvent} from "react";
import {InputProps} from "antd/lib/input";

export interface PhoneNumber {
	countryCode?: number | null;
	areaCode?: number | null;
	phoneNumber?: string | null;
	isoCode?: string;

	valid?(): boolean;
}

export interface PhoneInputProps extends Omit<InputProps, "value" | "onChange"> {
	value?: PhoneNumber | string;

	country?: string;

	enableSearch?: boolean;

	searchNotFound?: string;

	searchPlaceholder?: string;

	disableDropdown?: boolean;

	onlyCountries?: string[];

	excludeCountries?: string[];

	preferredCountries?: string[];

	onMount?(value: PhoneNumber): void;

	onInput?(event: ChangeEvent<HTMLInputElement>): void;

	onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;

	/** NOTE: This differs from the antd Input onChange interface */
	onChange?(value: PhoneNumber, event: ChangeEvent<HTMLInputElement>): void;
}
