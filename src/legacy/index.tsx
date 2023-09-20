import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ReactPhoneInput from "react-phone-input-2";

import {CountryData, PhoneInputProps, PhoneNumber, ReactPhoneOnChange, ReactPhoneOnMount} from "../types";

import {styleInject} from "../style";
import masks from "./phoneMasks.json";
import timezones from "./timezones.json";
import validations from "./validations.json";

styleInject("style5.css");

let browserLoaded = true;

type ISO2Code = keyof typeof masks;
type Timezone = keyof typeof timezones;

const getDefaultISO2Code = () => {
	/** Returns the default ISO2 code based on the user's timezone */
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone;
	return (timezones[timezone] || "").toLowerCase() || "us";
}

const parsePhoneNumber = (value: string, data: CountryData, formattedNumber: string): PhoneNumber => {
	const isoCode = data?.countryCode;
	const countryCodePattern = /\+\d+/;
	const areaCodePattern = /\((\d+)\)/;
	const dialCodePattern = /^\+[\d\s]+\([\d\s]+\)/;

	/** Parses the matching partials of the phone number by predefined regex patterns */
	const countryCodeMatch = formattedNumber ? (formattedNumber.match(countryCodePattern) || []) : [];
	const areaCodeMatch = formattedNumber ? (formattedNumber.match(areaCodePattern) || []) : [];
	const dialCodeMatch = formattedNumber ? (formattedNumber.match(dialCodePattern) || []) : [];

	/** Converts the parsed values of the country and area codes to integers if values present */
	const countryCode = countryCodeMatch.length > 0 ? parseInt(countryCodeMatch[0]) : null;
	const areaCode = areaCodeMatch.length > 1 ? parseInt(areaCodeMatch[1]) : null;

	/** Obtaining the dial code for comparing to the existing one - if the country mask contains an area code */
	const dialCode = dialCodeMatch.length > 0 ? dialCodeMatch[0].replaceAll(/[+\s()]/g, "") : null;
	const dialChanged = dialCode !== data?.dialCode;

	/** Parses the phone number by removing the country and area codes from the formatted value */
	const phoneNumberPattern = new RegExp(`^${countryCode}${(areaCode || "")}(\\d+)`);
	const phoneNumberMatch = value ? (value.match(phoneNumberPattern) || []) : [];
	const phoneNumber = phoneNumberMatch.length > 1 ? phoneNumberMatch[1] : null;

	return {countryCode, areaCode, phoneNumber, isoCode, dialChanged};
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
						inputClass: inputClassProxy,
						...reactPhoneInputProps
					}: PhoneInputProps) => {
	const loaded = useRef(browserLoaded);
	const reset = useRef(false);
	const initialized = useRef(false);
	const [currentCode, setCurrentCode] = useState("");

	const countryCode = useMemo(() => country || getDefaultISO2Code(), [country]);

	const rawPhone = useMemo(() => {
		const {countryCode, areaCode, phoneNumber} = {...value};
		return [countryCode, areaCode, phoneNumber].map(v => v || "").join("");
	}, [value]);

	const inputClass = useMemo(() => {
		const suffix = {small: "sm", middle: "", large: "lg"}[size];
		const className = "ant-input" + (suffix ? " ant-input-" + suffix : "");
		return inputClassProxy ? `${className} ${inputClassProxy}` : className;
	}, [inputClassProxy, size]);

	const checkValidity = (metadata: PhoneNumber) => {
		/** Checks if both the area code and phone number length satisfy the validation rules */
		const rules = validations[metadata.isoCode as ISO2Code] || {areaCode: [], phoneNumber: []};
		const isValid = reset.current || ((loaded.current || initialized.current) ? [
			rules.areaCode.includes((metadata.areaCode || "").toString().length),
			rules.phoneNumber.includes((metadata.phoneNumber || "").toString().length),
		].every(Boolean) : !initialized.current);
		initialized.current = true;
		loaded.current = false;
		reset.current = false;
		return isValid;
	}

	const onChange: ReactPhoneOnChange = useCallback((value, data, event, formattedNumber) => {
		const {dialChanged, ...metadata} = parsePhoneNumber(value, data, formattedNumber);
		const code = metadata.isoCode as ISO2Code;

		if (code !== currentCode) {
			/** Clears phone number when the country is selected manually */
			metadata.areaCode = dialChanged ? null : metadata.areaCode;
			metadata.phoneNumber = null;
			setCurrentCode(code);
		}

		handleChange({...metadata, valid: () => checkValidity(metadata)}, event);
	}, [currentCode, handleChange]);

	const onMount: ReactPhoneOnMount = useCallback((rawValue, {countryCode, ...event}, formattedNumber) => {
		const {dialChanged, ...metadata} = parsePhoneNumber(rawValue, {countryCode}, formattedNumber);
		/** Initializes the existing value */
		handleChange({...metadata, valid: () => checkValidity(metadata)}, event);
		handleMount({...metadata, valid: () => checkValidity(metadata)});
		/** Sets the current country code to the code of the initial value */
		setCurrentCode(metadata.isoCode as ISO2Code);
		if (loaded.current && !initialized.current) reset.current = true;
		initialized.current = false;
	}, [handleChange, handleMount]);

	useEffect(() => {
		reset.current = !browserLoaded;
		return () => {
			browserLoaded = false;
		}
	}, []);

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
