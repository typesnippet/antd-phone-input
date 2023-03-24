import {useContext, useEffect, useMemo, useState} from "react";
import ReactPhoneInput from "react-phone-input-2";

import {getDefaultISO2Code, masks, parsePhoneNumber} from "./utils";
import {PhoneInputProps, ReactPhoneOnChange, ReactPhoneOnMount} from "./types";

type ISO2Code = keyof typeof masks;

let theme: any, genComponentStyleHook: any, FormItemInputContext: any, getStatusClassNames: any;
const libraryRoot = "antd/es";
theme = import(libraryRoot + "/theme").then(m => theme = m.default);
genComponentStyleHook = import(libraryRoot + "/input/style").then(m => genComponentStyleHook = m.default);
FormItemInputContext = import(libraryRoot + "/form/context").then(m => FormItemInputContext = m.FormItemInputContext);
getStatusClassNames = import(libraryRoot + "/_util/statusUtils").then(m => getStatusClassNames = m.getStatusClassNames);

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
	const inputPrefix = "ant-input";
	const dropdownPrefix = "ant-dropdown";
	const {token} = theme.useToken();
	const {status}: any = useContext(FormItemInputContext);
	const [_1, inputCls] = genComponentStyleHook(inputPrefix);
	const [_2, dropdownCls] = genComponentStyleHook(dropdownPrefix);
	const [currentCode, setCurrentCode] = useState("");

	const countryCode = useMemo(() => country || getDefaultISO2Code(), [country]);

	const rawPhone = useMemo(() => {
		const {countryCode, areaCode, phoneNumber} = {...value};
		return [countryCode, areaCode, phoneNumber].map(v => v || "").join("");
	}, [value]);

	const inputClass = useMemo(() => {
		const suffix = {small: "sm", middle: "", large: "lg"}[size];
		const className = inputPrefix + (suffix ? ` ${inputPrefix}-` + suffix : "");
		return `${className} ${inputCls} ` + getStatusClassNames(inputPrefix, status);
	}, [inputCls, size, status]);

	const dropdownClass = useMemo(() => dropdownPrefix + " " + dropdownCls, [dropdownCls]);

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

	useEffect(() => {
		for (let styleSheet of document.styleSheets) {
			let rule: any;
			for (rule of styleSheet.cssRules || styleSheet.rules) {
				if (rule.selectorText === ".react-tel-input .country-list") {
					rule.style.boxShadow = token.boxShadow;
				}
				if (rule.selectorText === ".react-tel-input .selected-flag") {
					rule.style.borderColor = token.colorBorder;
				}
				if (rule.selectorText === ".react-tel-input .country-list .search") {
					rule.style.backgroundColor = token.colorBgContainer;
				}
				if (rule.selectorText === ".react-tel-input .country-list .country") {
					rule.style.borderRadius = token.borderRadiusOuter + "px";
				}
				if (rule.selectorText === ".react-tel-input .country-list .country-name") {
					rule.style.color = token.colorText;
				}
				if (rule.selectorText === ".react-tel-input .country-list .country .dial-code") {
					rule.style.color = token.colorTextDescription;
				}
				if (rule.selectorText === ".react-tel-input .country-list .country:hover") {
					rule.style.backgroundColor = token.colorBgTextHover;
				}
				if (rule.selectorText === ".react-tel-input .country-list .country.highlight") {
					rule.style.backgroundColor = token.colorPrimaryBg;
				}
				if (rule.selectorText === `:where(.${inputCls}).ant-input`) {
					rule.selectorText += "\n,.react-tel-input .country-list .search-box";
				}
				if (rule.selectorText === `:where(.${inputCls}).ant-input:hover`) {
					rule.selectorText += "\n,.react-tel-input .country-list .search-box:focus";
					rule.selectorText += "\n,.react-tel-input .country-list .search-box:hover";
				}
			}
		}
	}, [inputCls, token])

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
			dropdownClass={dropdownClass}
			/** Dynamic properties for customization */
			{...reactPhoneInputProps}
			containerStyle={style}
			containerClass={className}
			onEnterKeyPress={onPressEnter}
		/>
	)
}

export default PhoneInput;
