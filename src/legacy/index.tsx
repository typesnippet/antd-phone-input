import {useCallback, useEffect, useMemo, useState} from "react";
import Select from "antd/lib/select";
import Input from "antd/lib/input";

import {PhoneInputProps} from "../types";

import styleInject from "./style";
import timezones from "./timezones.json";
import countries from "./countries.json";

styleInject("style5.css");

const slots = new Set(".");

const displayFormat = (value: string) => {
	return value.replace(/[.\s\D]+$/, "").replace(/(\(\d+)$/, "$1)");
}

const getDefaultISO2Code = () => {
	/** Returns the default ISO2 code, based on the user's timezone */
	return (timezones[Intl.DateTimeFormat().resolvedOptions().timeZone as keyof typeof timezones] || "") || "us";
}

// const parsePhoneNumber = (value: string, data: CountryData, formattedNumber: string): PhoneNumber => {
// 	const isoCode = data?.countryCode;
// 	const countryCodePattern = /\+\d+/;
// 	const areaCodePattern = /\((\d+)\)/;
// 	const dialCodePattern = /^\+[\d\s]+\([\d\s]+\)/;
//
// 	/** Parses the matching partials of the phone number by predefined regex patterns */
// 	const countryCodeMatch = formattedNumber ? (formattedNumber.match(countryCodePattern) || []) : [];
// 	const areaCodeMatch = formattedNumber ? (formattedNumber.match(areaCodePattern) || []) : [];
// 	const dialCodeMatch = formattedNumber ? (formattedNumber.match(dialCodePattern) || []) : [];
//
// 	/** Converts the parsed values of the country and area codes to integers if values present */
// 	const countryCode = countryCodeMatch.length > 0 ? parseInt(countryCodeMatch[0]) : null;
// 	const areaCode = areaCodeMatch.length > 1 ? parseInt(areaCodeMatch[1]) : null;
//
// 	/** Obtaining the dial code for comparing to the existing one - if the country mask contains an area code */
// 	const dialCode = dialCodeMatch.length > 0 ? dialCodeMatch[0].replaceAll(/[+\s()]/g, "") : null;
// 	const dialChanged = dialCode !== data?.dialCode;
//
// 	/** Parses the phone number by removing the country and area codes from the formatted value */
// 	const phoneNumberPattern = new RegExp(`^${countryCode}${(areaCode || "")}(\\d+)`);
// 	const phoneNumberMatch = value ? (value.match(phoneNumberPattern) || []) : [];
// 	const phoneNumber = phoneNumberMatch.length > 1 ? phoneNumberMatch[1] : null;
//
// 	return {countryCode, areaCode, phoneNumber, isoCode, dialChanged};
// }

const PhoneInput = ({
						value: initialValue = "",
						// style,
						country = getDefaultISO2Code(),
						// className,
						// size = "middle",
						onPressEnter = () => null,
						// onMount: handleMount = () => null,
						// onChange: handleChange = () => null,
						// inputClass: inputClassProxy,
						// ...reactPhoneInputProps
					}: PhoneInputProps) => {
	const defaultValue = typeof initialValue === "string" ? initialValue.replaceAll(/\D/g, "") : [initialValue?.countryCode, initialValue?.areaCode, initialValue?.phoneNumber].filter(Boolean).join("");
	const defaultMetadata = countries.find(([_1, _2, _3, dial]) => defaultValue.startsWith(dial)) || countries.find(([iso]) => iso === country);
	// const defaultCountry = defaultMetadata?.[0];
	const defaultDialCode = defaultMetadata?.[3];
	const defaultPhoneMask = defaultMetadata?.[4];

	// console.log(defaultCountry, country)

	let back = false;
	const [initiated, setInitiated] = useState(false);
	const [value, setValue] = useState<string>(defaultValue as string);
	const [minWidth, setMinWidth] = useState(0);
	const [pattern, setPattern] = useState(defaultPhoneMask || "");

	const metadata = useMemo(() => {
		const rawValue = value.replaceAll(/\D/g, "");
		return countries.find(([_1, _2, _3, dial]) => rawValue.startsWith(dial));
	}, [value])

	const selectValue = useMemo(() => {
		return metadata ? metadata[0] + metadata[3] : defaultDialCode;
	}, [defaultDialCode, metadata])

	const prev = useMemo(() => (j => Array.from(pattern, (c, i) => slots.has(c) ? j = i + 1 : j))(0), [pattern])

	const first = useMemo(() => [...pattern].findIndex(c => slots.has(c)), [pattern])

	const clean = useCallback((input: any) => {
		input = input.match(/\d/g) || [];
		return Array.from(pattern, c => input[0] === c || slots.has(c) ? input.shift() || c : c);
	}, [pattern])

	const onBlur = useCallback(({target}: any) => target.value === pattern && setValue(""), [pattern])

	const onKeyDown = (e: any) => {
		if (e.key === "Enter") onPressEnter(e);
		else back = e.key === "Backspace";
	}

	const format = ({target}: any) => {
		const [i, j] = [target.selectionStart, target.selectionEnd].map((i: any) => {
			i = clean(target.value.slice(0, i)).findIndex(c => slots.has(c));
			return i < 0 ? prev[prev.length - 1] : back ? prev[i - 1] || first : i;
		});
		target.value = displayFormat(clean(target.value).join(""));
		setValue(target.value);
		target.setSelectionRange(i, j);
		back = false;
	}

	useEffect(() => {
		if (initiated) return;
		setValue(displayFormat(clean(value).join("")));
		setInitiated(true);
	}, [clean, initiated, value])

	// const countryCode = useMemo(() => {
	// 	return countries.find(([_, dial]) => dialCode === dial)?.[0];
	// }, [dialCode])
	//
	// console.log(countryCode);

	// const checkValidity = (metadata: PhoneNumber) => {
	// 	// TODO: Update masks - create a script for preparing the masks (like it is done for validations)
	// 	/** Checks if both the area code and phone number match the validation pattern */
	// 	const pattern = new RegExp((validations as any)[metadata.isoCode as ISO2Code]);
	// 	const isValid = reset.current || ((loaded.current || initialized.current) ? pattern.test([
	// 		metadata.areaCode, metadata.phoneNumber].filter(Boolean).join("")) : !initialized.current);
	// 	initialized.current = true;
	// 	loaded.current = false;
	// 	reset.current = false;
	// 	return isValid;
	// }

	// const onChange: ReactPhoneOnChange = useCallback((value, data, event, formattedNumber) => {
	// 	const {dialChanged, ...metadata} = parsePhoneNumber(value, data, formattedNumber);
	// 	const code = metadata.isoCode as ISO2Code;
	//
	// 	if (code !== currentCode) {
	// 		/** Clears phone number when the country is selected manually */
	// 		metadata.areaCode = dialChanged ? null : metadata.areaCode;
	// 		metadata.phoneNumber = null;
	// 		setCurrentCode(code);
	// 	}
	//
	// 	handleChange({...metadata, valid: () => checkValidity(metadata)}, event);
	// }, [currentCode, handleChange]);

	// const onMount: ReactPhoneOnMount = useCallback((rawValue, {countryCode, ...event}, formattedNumber) => {
	// 	const {dialChanged, ...metadata} = parsePhoneNumber(rawValue, {countryCode}, formattedNumber);
	// 	/** Initializes the existing value */
	// 	handleChange({...metadata, valid: () => checkValidity(metadata)}, event);
	// 	handleMount({...metadata, valid: () => checkValidity(metadata)});
	// 	/** Sets the current country code to the code of the initial value */
	// 	setCurrentCode(metadata.isoCode as ISO2Code);
	// 	if (loaded.current && !initialized.current) reset.current = true;
	// 	initialized.current = false;
	// }, [handleChange, handleMount]);

	const countriesSelect = useMemo(() => (
		<Select
			value={selectValue}
			suffixIcon={null}
			onSelect={(_, {key: mask}) => {
				setInitiated(false);
				setPattern(mask);
				setValue("");
			}}
			optionLabelProp="label"
			dropdownStyle={{minWidth}}
		>
			{countries.map(([iso, name, _, dial, mask]) => (
				<Select.Option
					key={mask}
					value={iso + dial}
					label={<div className={`flag ${iso}`}/>}
					children={<div className="ant-phone-input-select-item">
						<div className={`flag ${iso}`}/>
						{name}&nbsp;{displayFormat(mask)}
					</div>}
				/>
			))}
		</Select>
	), [selectValue, minWidth])

	return (
		<div ref={node => setMinWidth(node?.offsetWidth || 0)}>
			<Input
				/** Static properties for stable functionality */
				inputMode="tel"
				value={value}
				onBlur={onBlur}
				onInput={format}
				onFocus={format}
				onKeyDown={onKeyDown}
				addonBefore={countriesSelect}
				/** Static properties providing dynamic behavior */
				// onMount={onMount}
				// onChange={(e) => {
				// 	console.log(e.target.value);
				// 	setValue(e.target.value);
				// }}
				/** Dynamic properties for customization */
				// onEnterKeyPress={onPressEnter}
			/>
		</div>
	)
}

export default PhoneInput;
