import {ChangeEvent, useMemo, useState} from "react";
import ReactPhoneInput from "react-phone-input-2";

import masks from "./phoneMasks.json";
import timezones from "./timezones.json";
import validations from "./validations.json";

import "react-phone-input-2/lib/style.css";
import "./index.less";

type CountryData = {
	countryCode: ISO2Code,
}

type PhoneNumber = {
	countryCode?: number | null,
	areaCode?: number | null,
	phoneNumber?: string,
}

type PhoneInputProps = {
	size?: "small" | "middle" | "large",
	value?: PhoneNumber | object,
	onChange?: (value: PhoneNumber) => void,
}

type OnChangeFunction = {
	(number: string, data: CountryData, event: Event, formattedNumber: string): void,
}

type Timezone = keyof typeof timezones;
type ISO2Code = keyof typeof validations;
type Event = ChangeEvent<HTMLInputElement>;

const getDefaultISO2Code = () => {
	/** Returns the default ISO2 code based on the user's timezone */
	const timezone: Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone;
	return timezones[timezone].toLowerCase() || "us";
}

const PhoneInput = ({value = {}, size = "middle", onChange: handleChange}: PhoneInputProps) => {
	const [currentCode, setCurrentCode] = useState("");

	const rawPhone = useMemo(() => Object.values(value).map(v => v || "").join(""), [value]);

	const inputClass = useMemo(() => {
		const suffix = {small: "sm", middle: "", large: "lg"}[size];
		return "ant-input" + (suffix ? " ant-input-" + suffix : "");
	}, [size]);

	const onChange: OnChangeFunction = (value, data, _, formattedValue) => {
		const code: ISO2Code = data?.countryCode;
		const countryCodePattern = /\+\d+/;
		const areaCodePattern = /\((\d+)\)/;

		/** Parse the matching partials of the phone number by predefined regex patterns */
		const countryCodeMatch = formattedValue ? (formattedValue.match(countryCodePattern) || []) : [];
		const areaCodeMatch = formattedValue ? (formattedValue.match(areaCodePattern) || []) : [];

		/** Convert the parsed values of the country and area codes to integers if values present */
		const countryCode = countryCodeMatch.length > 0 ? parseInt(countryCodeMatch[0]) : null;
		const areaCode = areaCodeMatch.length > 1 ? parseInt(areaCodeMatch[1]) : null;

		/** Parse the phone number by removing the country and area codes from the formatted value */
		const phoneNumberPattern = new RegExp(`^${countryCode}${(areaCode || "")}(\\d+)`);
		const phoneNumberMatch = value ? (value.match(phoneNumberPattern) || []) : [];
		const phoneNumber = phoneNumberMatch.length > 1 ? phoneNumberMatch[1] : "";

		/** Clear phone number when the country is selected manually */
		if (currentCode !== undefined && code !== currentCode) {
			if (handleChange) handleChange({countryCode, areaCode: null, phoneNumber: ""});
			setCurrentCode(code);
			return;
		}

		if (handleChange) handleChange({countryCode, areaCode, phoneNumber});
	}

	return (
		<ReactPhoneInput
			enableSearch
			masks={masks}
			enableAreaCodes
			value={rawPhone}
			disableSearchIcon
			inputClass={inputClass}
			onChange={onChange}
			country={getDefaultISO2Code()}
		/>
	)
}

export default PhoneInput;
