import {ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Select from "antd/lib/select";
import Input from "antd/lib/input";

import {PhoneInputProps, PhoneNumber} from "./types";

import styleInject from "./styles";
import timezones from "./metadata/timezones.json";
import countries from "./metadata/countries.json";
import validations from "./metadata/validations.json";

styleInject("styles.css");

const slots = new Set(".");

const getMetadata = (rawValue: string) => {
	return countries.find((country) => rawValue.startsWith(country[3]));
}

const getRawValue = (value: PhoneNumber | string) => {
	if (typeof value === "string") {
		return value.replaceAll(/\D/g, "");
	}
	return [value?.countryCode, value?.areaCode, value?.phoneNumber].filter(Boolean).join("");
}

const displayFormat = (value: string) => {
	return value.replace(/[.\s\D]+$/, "").replace(/(\(\d+)$/, "$1)");
}

const cleanInput = (input: any, pattern: string) => {
	input = input.match(/\d/g) || [];
	return Array.from(pattern, c => input[0] === c || slots.has(c) ? input.shift() || c : c);
}

const checkValidity = (metadata: PhoneNumber) => {
	/** Checks if both the area code and phone number match the validation pattern */
	const pattern = new RegExp((validations as any)[metadata.isoCode as keyof typeof validations]);
	return pattern.test([metadata.areaCode, metadata.phoneNumber].filter(Boolean).join(""));
}

const getDefaultISO2Code = () => {
	/** Returns the default ISO2 code, based on the user's timezone */
	return (timezones[Intl.DateTimeFormat().resolvedOptions().timeZone as keyof typeof timezones] || "") || "us";
}

const parsePhoneNumber = (formattedNumber: string): PhoneNumber => {
	const value = getRawValue(formattedNumber);
	const isoCode = getMetadata(value)?.[0];
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

	return {countryCode, areaCode, phoneNumber, isoCode};
}

const PhoneInput = ({
						value: initialValue = "",
						country = getDefaultISO2Code(),
						onMount: handleMount = () => null,
						onInput: handleInput = () => null,
						onFocus: handleFocus = () => null,
						onChange: handleChange = () => null,
						onKeyDown: handleKeyDown = () => null,
						...antInputProps
					}: PhoneInputProps) => {
	const defaultValue = getRawValue(initialValue);
	const defaultMetadata = getMetadata(defaultValue) || countries.find(([iso]) => iso === country);
	const defaultDialCode = defaultMetadata?.[3];
	const defaultPhoneMask = defaultMetadata?.[4];

	const backRef = useRef(false);
	const initiatedRef = useRef(false);
	const [value, setValue] = useState<string>(defaultValue as string);
	const [minWidth, setMinWidth] = useState(0);
	const [pattern, setPattern] = useState(defaultPhoneMask || "");

	const metadata = useMemo(() => {
		return getMetadata(getRawValue(value));
	}, [value])

	const first = useMemo(() => {
		return [...pattern].findIndex(c => slots.has(c));
	}, [pattern])

	const prev = useMemo(() => {
		return (j => Array.from(pattern, (c, i) => slots.has(c) ? j = i + 1 : j))(0);
	}, [pattern])

	const selectValue = useMemo(() => {
		return metadata ? metadata[0] + metadata[3] : defaultDialCode;
	}, [defaultDialCode, metadata])

	const clean = useCallback((input: any) => cleanInput(input, pattern), [pattern])

	const format = useCallback(({target}: ChangeEvent<HTMLInputElement>) => {
		const [i, j] = [target.selectionStart, target.selectionEnd].map((i: any) => {
			i = clean(target.value.slice(0, i)).findIndex(c => slots.has(c));
			return i < 0 ? prev[prev.length - 1] : backRef.current ? prev[i - 1] || first : i;
		});
		target.value = displayFormat(clean(target.value).join(""));
		target.setSelectionRange(i, j);
		backRef.current = false;
		setValue(target.value);
	}, [clean, first, prev])

	const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
		backRef.current = event.key === "Backspace";
		handleKeyDown(event);
	}, [handleKeyDown])

	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const phoneMetadata = parsePhoneNumber(displayFormat(clean(event.target.value).join("")));
		handleChange({...phoneMetadata, valid: () => checkValidity(phoneMetadata)}, event);
	}, [clean, handleChange])

	const onInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		handleInput(event);
		format(event);
	}, [format, handleInput])

	const onFocus = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		handleFocus(event);
		format(event);
	}, [format, handleFocus])

	useEffect(() => {
		if (initiatedRef.current) return;
		initiatedRef.current = true;
		const formattedNumber = displayFormat(clean(value).join(""));
		const phoneMetadata = parsePhoneNumber(formattedNumber);
		handleMount({...phoneMetadata, valid: () => checkValidity(phoneMetadata)});
		handleChange({
			...phoneMetadata,
			valid: () => checkValidity(phoneMetadata)
		}, {} as ChangeEvent<HTMLInputElement>);
		setValue(formattedNumber);
	}, [clean, handleChange, handleMount, value])

	const countriesSelect = useMemo(() => (
		<Select
			value={selectValue}
			suffixIcon={null}
			onSelect={(_, {key: mask}) => {
				setValue(displayFormat(cleanInput(mask, mask).join("")));
				setPattern(mask);
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
		<div className="ant-phone-input-wrapper"
			 ref={node => setMinWidth(node?.offsetWidth || 0)}>
			<Input
				inputMode="tel"
				value={value}
				onInput={onInput}
				onFocus={onFocus}
				onChange={onChange}
				onKeyDown={onKeyDown}
				addonBefore={countriesSelect}
				{...antInputProps}
			/>
		</div>
	)
}

export default PhoneInput;
