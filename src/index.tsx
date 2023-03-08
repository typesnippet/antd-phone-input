import {useMemo, useState} from "react";
import ReactPhoneInput from "react-phone-input-2";

import {ParsePhoneNumber, PhoneInputProps, ReactPhoneOnChange, ReactPhoneOnMount} from "./types";

import masks from "./phoneMasks.json";
import timezones from "./timezones.json";
import validations from "./validations.json";

import "react-phone-input-2/lib/style.css";

type ISO2Code = keyof typeof masks;
type Timezone = keyof typeof timezones;

const getDefaultISO2Code = () => {
	/** Returns the default ISO2 code based on the user's timezone */
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone;
	return (timezones[timezone] || "").toLowerCase() || "us";
}

const parsePhoneNumber: ParsePhoneNumber = (value, data, formattedNumber) => {
	const isoCode = data?.countryCode;
	const countryCodePattern = /\+\d+/;
	const areaCodePattern = /\((\d+)\)/;

	/** Parses the matching partials of the phone number by predefined regex patterns */
	const countryCodeMatch = formattedNumber ? (formattedNumber.match(countryCodePattern) || []) : [];
	const areaCodeMatch = formattedNumber ? (formattedNumber.match(areaCodePattern) || []) : [];

	/** Converts the parsed values of the country and area codes to integers if values present */
	const countryCode = countryCodeMatch.length > 0 ? parseInt(countryCodeMatch[0]) : null;
	const areaCode = areaCodeMatch.length > 1 ? parseInt(areaCodeMatch[1]) : null;

	/** Parses the phone number by removing the country and area codes from the formatted value */
	const phoneNumberPattern = new RegExp(`^${countryCode}${(areaCode || "")}(\\d+)`);
	const phoneNumberMatch = value ? (value.match(phoneNumberPattern) || []) : [];
	const phoneNumber = phoneNumberMatch.length > 1 ? phoneNumberMatch[1] : null;

	/** Checks if both the area code and phone number length satisfy the validation rules */
	const rules = validations[isoCode as ISO2Code] || {areaCode: [], phoneNumber: []};
	const valid = [
		rules.areaCode.includes((areaCode || "").toString().length),
		rules.phoneNumber.includes((phoneNumber || "").toString().length),
	].every(Boolean);

	return {countryCode, areaCode, phoneNumber, isoCode, valid};
}

const PhoneInput = ({
						value,
						style,
						country,
						className,
						size = "middle",
						onPressEnter = () => null,
						onMount: handleMount = () => null,
						onChange: handleChange = () => null,
						...reactPhoneInputProps
					}: PhoneInputProps) => {
	const [currentCode, setCurrentCode] = useState("");

	const countryCode = useMemo(() => country || getDefaultISO2Code(), [country]);

	const rawPhone = useMemo(() => {
		const {countryCode, areaCode, phoneNumber} = {...value};
		return [countryCode, areaCode, phoneNumber].map(v => v || "").join("");
	}, [value]);

	const inputClass = useMemo(() => {
		const suffix = {small: "sm", middle: "", large: "lg"}[size];
		return "ant-input" + (suffix ? " ant-input-" + suffix : "");
	}, [size]);

	const onChange: ReactPhoneOnChange = (value, data, event, formattedNumber) => {
		const metadata = parsePhoneNumber(value, data, formattedNumber);
		const code = metadata.isoCode as ISO2Code;

		if (code !== currentCode) {
			/** Clears phone number when the country is selected manually */
			handleChange({...metadata, areaCode: null, phoneNumber: null}, event);
			setCurrentCode(code);
			return;
		}

		handleChange(metadata, event);
	}

	const onMount: ReactPhoneOnMount = (rawValue, {countryCode, ...event}, formattedNumber) => {
		const metadata = parsePhoneNumber(rawValue, {countryCode}, formattedNumber);
		/** Initiates the current country code with the code of initial value */
		setCurrentCode(metadata.isoCode as ISO2Code);
		/** Initializes the existing value */
		handleChange(metadata, event);
		handleMount(metadata);
	}

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
			country={countryCode}
			inputClass={inputClass}
			/** Dynamic properties for customization */
			{...reactPhoneInputProps}
			containerStyle={style}
			containerClass={className}
			onEnterKeyPress={onPressEnter}
		/>
	)
}

export default PhoneInput;
