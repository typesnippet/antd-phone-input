import {useMemo, useState} from "react";
import ReactPhoneInput from "react-phone-input-2";

import {PhoneInputProps, ReactPhoneOnChange, ReactPhoneOnMount} from "./types";

import masks from "./phoneMasks.json";
import timezones from "./timezones.json";

import "react-phone-input-2/lib/style.css";
import "./index.less";

type ISO2Code = keyof typeof masks;
type Timezone = keyof typeof timezones;

const getDefaultISO2Code = () => {
	/** Returns the default ISO2 code based on the user's timezone */
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone;
	return timezones[timezone].toLowerCase() || "us";
}

const PhoneInput = ({
						style,
						country,
						className,
						value = {},
						size = "middle",
						onMount: handleMount = () => null,
						onChange: handleChange = () => null,
						...reactPhoneInputProps
					}: PhoneInputProps) => {
	const [currentCode, setCurrentCode] = useState("");

	const defaultCountry = useMemo(() => country || getDefaultISO2Code(), [country]);

	const rawPhone = useMemo(() => Object.values(value).map(v => v || "").join(""), [value]);

	const inputClass = useMemo(() => {
		const suffix = {small: "sm", middle: "", large: "lg"}[size];
		return "ant-input" + (suffix ? " ant-input-" + suffix : "");
	}, [size]);

	const onChange: ReactPhoneOnChange = (value, data, event, formattedValue) => {
		const code = data?.countryCode as ISO2Code;
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
			handleChange({countryCode, areaCode: null, phoneNumber: ""}, event);
			setCurrentCode(code);
			return;
		}

		handleChange({countryCode, areaCode, phoneNumber}, event);
	}

	const onMount: ReactPhoneOnMount = (_1, _2, _3) => handleMount(value);

	return (
		<ReactPhoneInput
			/** Static properties for stable functionality */
			masks={masks}
			value={rawPhone}
			enableAreaCodes
			disableSearchIcon
			/** Static properties providing dynamic behavior */
			onMount={onMount}
			onChange={onChange}
			inputClass={inputClass}
			country={defaultCountry}
			/** Dynamic properties for customization */
			{...reactPhoneInputProps}
			containerStyle={style}
			containerClass={className}
		/>
	)
}

export default PhoneInput;
