import {ChangeEvent, KeyboardEvent, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import useFormInstance from "antd/lib/form/hooks/useFormInstance";
import {FormContext} from "antd/lib/form/context";
import Select from "antd/lib/select";
import Input from "antd/lib/input";

import {PhoneInputProps, PhoneNumber} from "./types";

import styleInject from "./styles";
import timezones from "./metadata/timezones.json";
import countries from "./metadata/countries.json";
import validations from "./metadata/validations.json";

styleInject("styles.css");

const slots = new Set(".");

const getMetadata = (rawValue: string, countriesList: typeof countries = countries, country: any = null) => {
	country = country == null && rawValue.startsWith("44") ? "gb" : country;
	if (country != null) {
		countriesList = countriesList.filter((c) => c[0] === country);
		countriesList = countriesList.sort((a, b) => b[2].length - a[2].length);
	}
	return countriesList.find((c) => rawValue.startsWith(c[2]));
}

const getRawValue = (value: PhoneNumber | string) => {
	if (typeof value === "string") return value.replaceAll(/\D/g, "");
	return [value?.countryCode, value?.areaCode, value?.phoneNumber].filter(Boolean).join("");
}

const displayFormat = (value: string) => {
	return value.replace(/[.\s\D]+$/, "").replace(/(\(\d+)$/, "$1)");
}

const cleanInput = (input: any, pattern: string) => {
	input = input.match(/\d/g) || [];
	return Array.from(pattern, c => input[0] === c || slots.has(c) ? input.shift() || c : c);
}

const checkValidity = (metadata: PhoneNumber, strict: boolean = false) => {
	/** Checks if both the area code and phone number match the validation pattern */
	const pattern = (validations as any)[metadata.isoCode as keyof typeof validations][Number(strict)];
	return new RegExp(pattern).test([metadata.areaCode, metadata.phoneNumber].filter(Boolean).join(""));
}

const getDefaultISO2Code = () => {
	/** Returns the default ISO2 code, based on the user's timezone */
	return (timezones[Intl.DateTimeFormat().resolvedOptions().timeZone as keyof typeof timezones] || "") || "us";
}

const parsePhoneNumber = (formattedNumber: string, countriesList: typeof countries = countries, country: any = null): PhoneNumber => {
	const value = getRawValue(formattedNumber);
	const isoCode = getMetadata(value, countriesList, country)?.[0] || getDefaultISO2Code();
	const countryCodePattern = /\+\d+/;
	const areaCodePattern = /\((\d+)\)/;

	/** Parses the matching partials of the phone number by predefined regex patterns */
	const countryCodeMatch = formattedNumber ? (formattedNumber.match(countryCodePattern) || []) : [];
	const areaCodeMatch = formattedNumber ? (formattedNumber.match(areaCodePattern) || []) : [];

	/** Converts the parsed values of the country and area codes to integers if values present */
	const countryCode = countryCodeMatch.length > 0 ? parseInt(countryCodeMatch[0]) : null;
	const areaCode = areaCodeMatch.length > 1 ? areaCodeMatch[1] : null;

	/** Parses the phone number by removing the country and area codes from the formatted value */
	const phoneNumberPattern = new RegExp(`^${countryCode}${(areaCode || "")}(\\d+)`);
	const phoneNumberMatch = value ? (value.match(phoneNumberPattern) || []) : [];
	const phoneNumber = phoneNumberMatch.length > 1 ? phoneNumberMatch[1] : null;

	return {countryCode, areaCode, phoneNumber, isoCode};
}

const PhoneInput = ({
						value: initialValue = "",
						country = getDefaultISO2Code(),
						enableSearch = false,
						disableDropdown = false,
						onlyCountries = [],
						excludeCountries = [],
						preferredCountries = [],
						searchNotFound = "No country found",
						searchPlaceholder = "Search country",
						onMount: handleMount = () => null,
						onInput: handleInput = () => null,
						onChange: handleChange = () => null,
						onKeyDown: handleKeyDown = () => null,
						...antInputProps
					}: PhoneInputProps) => {
	const defaultValue = getRawValue(initialValue);
	const defaultMetadata = getMetadata(defaultValue) || countries.find(([iso]) => iso === country);
	const defaultValueState = defaultValue || countries.find(([iso]) => iso === defaultMetadata?.[0])?.[2] as string;

	const formInstance = useFormInstance();
	const formContext = useContext(FormContext);
	const backRef = useRef<boolean>(false);
	const initiatedRef = useRef<boolean>(false);
	const [query, setQuery] = useState<string>("");
	const [value, setValue] = useState<string>(defaultValueState);
	const [minWidth, setMinWidth] = useState<number>(0);
	const [countryCode, setCountryCode] = useState<string>(country);

	const countriesOnly = useMemo(() => {
		const allowList = onlyCountries.length > 0 ? onlyCountries : countries.map(([iso]) => iso);
		return countries.map(([iso]) => iso).filter((iso) => {
			return allowList.includes(iso) && !excludeCountries.includes(iso);
		});
	}, [onlyCountries, excludeCountries])

	const countriesList = useMemo(() => {
		const filteredCountries = countries.filter(([iso, name, _1, dial]) => {
			return countriesOnly.includes(iso) && (
				name.toLowerCase().startsWith(query.toLowerCase()) || dial.includes(query)
			);
		});
		return [
			...filteredCountries.filter(([iso]) => preferredCountries.includes(iso)),
			...filteredCountries.filter(([iso]) => !preferredCountries.includes(iso)),
		];
	}, [countriesOnly, preferredCountries, query])

	const metadata = useMemo(() => {
		const calculatedMetadata = getMetadata(getRawValue(value), countriesList, countryCode);
		if (countriesList.find(([iso]) => iso === calculatedMetadata?.[0] || iso === defaultMetadata?.[0])) {
			return calculatedMetadata || defaultMetadata;
		}
		return countriesList[0];
	}, [countriesList, countryCode, defaultMetadata, value])

	const pattern = useMemo(() => {
		return metadata?.[3] || defaultMetadata?.[3] || "";
	}, [defaultMetadata, metadata])

	const clean = useCallback((input: any) => {
		return cleanInput(input, pattern.replaceAll(/\d/g, "."));
	}, [pattern])

	const first = useMemo(() => {
		return [...pattern].findIndex(c => slots.has(c));
	}, [pattern])

	const prev = useMemo((j = 0) => {
		return Array.from(pattern.replaceAll(/\d/g, "."), (c, i) => {
			return slots.has(c) ? j = i + 1 : j;
		});
	}, [pattern])

	const selectValue = useMemo(() => {
		let metadata = getMetadata(getRawValue(value), countriesList);
		metadata = metadata || countries.find(([iso]) => iso === countryCode);
		return ({...metadata})?.[0] + ({...metadata})?.[2];
	}, [countriesList, countryCode, value])

	const setFieldValue = useCallback((value: PhoneNumber) => {
		if (formInstance) {
			let namePath = [];
			let formName = (formContext as any)?.name || "";
			let fieldName = (antInputProps as any)?.id || "";
			if (formName) {
				namePath.push(formName);
				fieldName = fieldName.slice(formName.length + 1);
			}
			formInstance.setFieldValue(namePath.concat(fieldName.split("_")), value);
		}
	}, [antInputProps, formContext, formInstance])

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
		const formattedNumber = displayFormat(clean(event.target.value).join(""));
		const phoneMetadata = parsePhoneNumber(formattedNumber, countriesList);
		handleChange({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)}, event);
	}, [clean, countriesList, handleChange])

	const onInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		handleInput(event);
		format(event);
	}, [format, handleInput])

	const onMount = useCallback((value: PhoneNumber) => {
		setFieldValue(value);
		handleMount(value);
	}, [handleMount, setFieldValue])

	useEffect(() => {
		if (initiatedRef.current) return;
		initiatedRef.current = true;
		let initialValue = getRawValue(value);
		if (!initialValue.startsWith(metadata?.[2] as string)) {
			initialValue = metadata?.[2] as string;
		}
		const formattedNumber = displayFormat(clean(initialValue).join(""));
		const phoneMetadata = parsePhoneNumber(formattedNumber, countriesList);
		onMount({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)});
		setCountryCode(phoneMetadata.isoCode as keyof typeof validations);
		setValue(formattedNumber);
	}, [clean, countriesList, metadata, onMount, setFieldValue, value])

	const countriesSelect = useMemo(() => (
		<Select
			suffixIcon={null}
			value={selectValue}
			open={disableDropdown ? false : undefined}
			onSelect={(selectedOption, {key: mask}) => {
				if (selectValue === selectedOption) return;
				const selectedCountryCode = selectedOption.slice(0, 2);
				const formattedNumber = displayFormat(cleanInput(mask, mask).join(""));
				const phoneMetadata = parsePhoneNumber(formattedNumber, countriesList, selectedCountryCode);
				setFieldValue({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)});
				setCountryCode(selectedCountryCode);
				setValue(formattedNumber);
			}}
			optionLabelProp="label"
			dropdownStyle={{minWidth}}
			notFoundContent={searchNotFound}
			dropdownRender={(menu) => (
				<div className="ant-phone-input-search-wrapper">
					{enableSearch && (
						<Input
							placeholder={searchPlaceholder}
							onInput={({target}: any) => setQuery(target.value)}
						/>
					)}
					{menu}
				</div>
			)}
		>
			{countriesList.map(([iso, name, dial, mask]) => (
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
	), [selectValue, disableDropdown, minWidth, searchNotFound, countriesList, setFieldValue, enableSearch, searchPlaceholder])

	return (
		<div className="ant-phone-input-wrapper"
			 ref={node => setMinWidth(node?.offsetWidth || 0)}>
			<Input
				inputMode="tel"
				value={value}
				onInput={onInput}
				onChange={onChange}
				onKeyDown={onKeyDown}
				addonBefore={countriesSelect}
				{...antInputProps}
			/>
		</div>
	)
}

export default PhoneInput;
