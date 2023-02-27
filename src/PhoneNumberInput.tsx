import {useEffect, useMemo, useState} from "react";
import PhoneInput from "react-phone-input-2";

import masks from "./phoneMasks.json";
import timezones from "./timezones.json";
import validations from "./validations.json";
import {PhoneInterface, PhoneNumberInputProps} from "./types";

type Timezone = keyof typeof timezones;

const getCountryCode = () => {
	const timezone: Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone;
	return timezones[timezone].toLowerCase() || "us";
}

const PhoneNumberInput = ({value = {}, onChange, setIsValid}: PhoneNumberInputProps) => {
	const [currentCode, setCurrentCode] = useState("");
	const rawPhone = useMemo(() => Object.values(value).map(v => v || '').join(''), [value]);

	/** When phone Number is not valid and form reset, valid state will stay false,
	 * that's why need to listen value, which will be undefined on form reset */
	useEffect(() => {
		if (value === undefined && setIsValid) setIsValid(true);
	}, [value, setIsValid]);

	const handleChange = (number: string, phone: PhoneInterface, _: any, formattedNumber: string) => {
		const code: keyof typeof validations = phone?.countryCode;
		const countryCodePattern = /\+\d+/;
		const areaCodePattern = /\((\d+)\)/;

		const countryCodeMatch = formattedNumber ? (formattedNumber.match(countryCodePattern) || []) : [];
		const areaCodeMatch = formattedNumber ? (formattedNumber.match(areaCodePattern) || []) : [];

		const countryCode = countryCodeMatch.length > 0 ? parseInt(countryCodeMatch[0]) : null;
		const areaCode = areaCodeMatch.length > 1 ? parseInt(areaCodeMatch[1]) : null;

		const phoneNumberPattern = new RegExp(`^${countryCode}${(areaCode || '')}(\\d+)`);
		const phoneNumberMatch = number ? (number.match(phoneNumberPattern) || []) : [];
		const phoneNumber = phoneNumberMatch.length > 1 ? phoneNumberMatch[1] : '';

		if (currentCode !== undefined && code !== currentCode) {
			/** Clear phone number when country is changed */
			if (onChange) onChange({...value, countryCode, areaCode: null, phoneNumber: ""});
			setCurrentCode(code);
			return;
		}

		if (onChange) onChange({...value, countryCode, areaCode, phoneNumber});

		if (setIsValid) setIsValid(validations[code]?.phoneNumber.includes(phoneNumber.length) && validations[code]?.areaCode.includes(`${areaCode || ''}`.length));
	};

	return (
		<PhoneInput
			enableSearch
			masks={masks}
			enableAreaCodes
			disableSearchIcon
			value={rawPhone}
			inputClass="ant-input"
			onChange={handleChange}
			country={getCountryCode()}
		/>
	)
}

export default PhoneNumberInput
