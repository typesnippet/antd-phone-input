import {ChangeEvent, useMemo, useState} from "react";
import PhoneInput from "react-phone-input-2";

import masks from "./phoneMasks.json";
import timezones from "./timezones.json";
import validations from "./validations.json";

import "react-phone-input-2/lib/style.css";
import "./index.less";

type PhoneNumber = {
	countryCode?: number | null,
	areaCode?: number | null,
	phoneNumber?: string,
}

type PhoneNumberInputProps = {
	value?: PhoneNumber | object,
	onChange?: (value: PhoneNumber) => void,
}

type OnChangeArgs = {
	(number: string, phone: PhoneNumber, event: Event, formattedNumber: string): void,
}

type Timezone = keyof typeof timezones;
type ISO2Code = keyof typeof validations;
type Event = ChangeEvent<HTMLInputElement>;

const getDefaultISO2Code = () => {
	const timezone: Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone;
	return timezones[timezone].toLowerCase() || "us";
}

const PhoneNumberInput = ({value = {}, onChange}: PhoneNumberInputProps) => {
	const [currentCode, setCurrentCode] = useState("");
	const rawPhone = useMemo(() => Object.values(value).map(v => v || "").join(""), [value]);

	const handleChange: OnChangeArgs = (number, phone, _, formattedNumber) => {
		const code: ISO2Code = phone?.countryCode?.toString() as ISO2Code;
		const countryCodePattern = /\+\d+/;
		const areaCodePattern = /\((\d+)\)/;

		const countryCodeMatch = formattedNumber ? (formattedNumber.match(countryCodePattern) || []) : [];
		const areaCodeMatch = formattedNumber ? (formattedNumber.match(areaCodePattern) || []) : [];

		const countryCode = countryCodeMatch.length > 0 ? parseInt(countryCodeMatch[0]) : null;
		const areaCode = areaCodeMatch.length > 1 ? parseInt(areaCodeMatch[1]) : null;

		const phoneNumberPattern = new RegExp(`^${countryCode}${(areaCode || "")}(\\d+)`);
		const phoneNumberMatch = number ? (number.match(phoneNumberPattern) || []) : [];
		const phoneNumber = phoneNumberMatch.length > 1 ? phoneNumberMatch[1] : "";

		if (currentCode !== undefined && code !== currentCode) {
			/** Clear phone number when country is changed */
			if (onChange) onChange({countryCode, areaCode: null, phoneNumber: ""});
			setCurrentCode(code);
			return;
		}

		if (onChange) onChange({countryCode, areaCode, phoneNumber});
	};

	return (
		<PhoneInput
			enableSearch
			masks={masks}
			enableAreaCodes
			value={rawPhone}
			disableSearchIcon
			inputClass="ant-input"
			onChange={handleChange}
			country={getDefaultISO2Code()}
		/>
	)
}

export default PhoneNumberInput;
