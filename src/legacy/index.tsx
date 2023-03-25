import {useMemo, useState} from "react";
import ReactPhoneInput from "react-phone-input-2";

import {getDefaultISO2Code, masks, parsePhoneNumber} from "../utils";
import {PhoneInputProps, ReactPhoneOnChange, ReactPhoneOnMount} from "../types";

import "../style5.css";

type ISO2Code = keyof typeof masks;

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
