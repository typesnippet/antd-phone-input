"use client";

import {
    ChangeEvent,
    forwardRef,
    KeyboardEvent,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import {ConfigContext} from "antd/es/config-provider";
import {FormContext} from "antd/es/form/context";
import {useWatch} from "antd/es/form/Form";
import version from "antd/es/version";
import Select from "antd/es/select";
import Space from "antd/es/space";
import Input from "antd/es/input";

import {
    checkValidity,
    cleanInput,
    displayFormat,
    getCountry,
    getDefaultISO2Code,
    getFormattedNumber,
    getMetadata,
    getRawValue,
    parsePhoneNumber,
    useMask,
    usePhone,
} from "react-phone-hooks";

import locale from "./locale";
import {injectMergedStyles} from "./styles";
import {PhoneInputProps, PhoneNumber} from "./types";

const [major, minor, _] = version.split(".").map(Number);
const isV5x = major === 5;
const isV6x = major === 6;
const isLatest = isV6x || (isV5x && minor >= 25);

const PhoneInput = forwardRef(({
                                   value: initialValue = "",
                                   country = getDefaultISO2Code(),
                                   useSVG = false,
                                   distinct = false,
                                   disabled = false,
                                   enableArrow = false,
                                   enableSearch = false,
                                   disableDropdown = false,
                                   disableParentheses = false,
                                   onlyCountries = [],
                                   excludeCountries = [],
                                   preferredCountries = [],
                                   searchNotFound: defaultSearchNotFound = "No country found",
                                   searchPlaceholder: defaultSearchPlaceholder = "Search country",
                                   dropdownRender = (node) => node,
                                   onMount: handleMount = () => null,
                                   onInput: handleInput = () => null,
                                   onChange: handleChange = () => null,
                                   onKeyDown: handleKeyDown = () => null,
                                   ...antInputProps
                               }: PhoneInputProps, forwardedRef: any) => {
    const formInstance = useFormInstance();
    const {locale = {}, getPrefixCls} = useContext(ConfigContext);
    const formContext = useContext(FormContext);
    const inputRef = useRef<any>(null);
    const searchRef = useRef<any>(null);
    const selectedRef = useRef<boolean>(false);
    const initiatedRef = useRef<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [minWidth, setMinWidth] = useState<number>(0);
    const [countryCode, setCountryCode] = useState<string>(country);

    const {
        locale: localeIdentifier,
        searchNotFound = defaultSearchNotFound,
        searchPlaceholder = defaultSearchPlaceholder,
        countries = new Proxy({}, ({get: (_: any, prop: any) => prop})),
    } = (locale as any).PhoneInput || {};

    const prefixCls = getPrefixCls();
    injectMergedStyles(prefixCls);

    const {
        value,
        pattern,
        metadata,
        setValue,
        countriesList,
    } = usePhone({
        query,
        country,
        distinct,
        countryCode,
        initialValue,
        onlyCountries,
        excludeCountries,
        preferredCountries,
        disableParentheses,
        locale: localeIdentifier,
    });

    const {
        onInput: onInputMaskHandler,
        onKeyDown: onKeyDownMaskHandler,
    } = useMask(pattern);

    const selectValue = useMemo(() => {
        let metadata = getMetadata(getRawValue(value), countriesList);
        metadata = metadata || getCountry(countryCode as any);
        return ({...metadata})?.[0] + ({...metadata})?.[2];
    }, [countriesList, countryCode, value])

    const namePath = useMemo(() => {
        let path = [];
        let formName = (formContext as any)?.name || "";
        let fieldName = (antInputProps as any)?.id || "";
        if (formName) {
            path.push(formName);
            fieldName = fieldName.slice(formName.length + 1);
        }
        return path.concat(fieldName.split("_"));
    }, [antInputProps, formContext])

    const phoneValue = useWatch(namePath, formInstance);

    const setFieldValue = useCallback((value: PhoneNumber) => {
        if (formInstance) formInstance.setFieldValue(namePath, value);
        setValue(getFormattedNumber(getRawValue(value), pattern));
    }, [formInstance, namePath, pattern, setValue])

    const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        onKeyDownMaskHandler(event);
        handleKeyDown(event);
    }, [handleKeyDown, onKeyDownMaskHandler])

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const formattedNumber = selectedRef.current ? event.target.value : getFormattedNumber(event.target.value, pattern);
        selectedRef.current = false;
        const phoneMetadata = parsePhoneNumber(formattedNumber, countriesList);
        setCountryCode(phoneMetadata.isoCode as any);
        setValue(formattedNumber);
        setQuery("");
        handleChange({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)}, event);
    }, [countriesList, handleChange, pattern, setValue])

    const onInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onInputMaskHandler(event);
        handleInput(event);
    }, [onInputMaskHandler, handleInput])

    const onMount = useCallback((value: PhoneNumber) => {
        setFieldValue(value);
        handleMount(value);
    }, [handleMount, setFieldValue])

    const onDropdownVisibleChange = useCallback((open: boolean) => {
        if (open && enableSearch) setTimeout(() => searchRef.current.focus(), 100);
    }, [enableSearch])

    const ref = useCallback((node: any) => {
        [forwardedRef, inputRef].forEach((ref) => {
            if (typeof ref === "function") ref(node);
            else if (ref != null) ref.current = node;
        })
    }, [forwardedRef])

    useEffect(() => {
        const rawValue = getRawValue(phoneValue);
        const metadata = getMetadata(rawValue);
        // Skip if value has not been updated by `setFieldValue`.
        if (!metadata?.[3] || rawValue === getRawValue(value)) return;
        let pattern = metadata?.[3] || "";
        if (disableParentheses) pattern = pattern.replace(/[()]/g, "");
        const formattedNumber = getFormattedNumber(rawValue, pattern);
        const phoneMetadata = parsePhoneNumber(formattedNumber);
        setFieldValue({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)});
        setCountryCode(metadata?.[0] as string);
        setValue(formattedNumber);
    }, [phoneValue, value, disableParentheses, setFieldValue, setValue])

    useEffect(() => {
        if (initiatedRef.current) return;
        initiatedRef.current = true;
        let initialValue = getRawValue(value);
        if (!initialValue.startsWith(metadata?.[2] as string)) {
            initialValue = metadata?.[2] as string;
        }
        const formattedNumber = getFormattedNumber(initialValue, pattern);
        const phoneMetadata = parsePhoneNumber(formattedNumber, countriesList);
        onMount({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)});
        setCountryCode(phoneMetadata.isoCode as any);
        setValue(formattedNumber);
    }, [countriesList, metadata, onMount, pattern, setValue, value])

    const suffixIcon = useMemo(() => {
        return enableArrow && (
            <span role="img" className="anticon" style={{paddingLeft: 8}}>
                <svg className="icon" viewBox="0 0 1024 1024"
                     focusable="false" fill="currentColor" width="16" height="18">
                    <path
                        d="M848 368a48 48 0 0 0-81.312-34.544l-0.016-0.016-254.784 254.784-251.488-251.488a48 48 0 1 0-71.04 64.464l-0.128 0.128 288 288 0.016-0.016a47.84 47.84 0 0 0 34.544 14.688h0.224a47.84 47.84 0 0 0 34.544-14.688l0.016 0.016 288-288-0.016-0.016c8.32-8.624 13.44-20.368 13.44-33.312z"/>
                </svg>
            </span>
        );
    }, [enableArrow])

    const countriesSelect = useMemo(() => (
        <Select
            suffixIcon={null}
            value={selectValue}
            disabled={disabled}
            open={disableDropdown ? false : undefined}
            onSelect={(selectedOption, {key}) => {
                const [_, mask] = key.split("_");
                const selectedCountryCode = selectedOption.slice(0, 2);
                const formattedNumber = displayFormat(cleanInput(mask, mask).join(""));
                const phoneMetadata = parsePhoneNumber(formattedNumber, countriesList, selectedCountryCode);
                setFieldValue({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)});
                setCountryCode(selectedCountryCode);
                setValue(formattedNumber);
                setQuery("");
                selectedRef.current = true;
                const nativeInputValueSetter = (Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value") as any).set;
                nativeInputValueSetter.call(inputRef.current.input, formattedNumber);
                inputRef.current.input.dispatchEvent(new Event("change", {bubbles: true}));
                inputRef.current.input.focus();
            }}
            optionLabelProp="label"
            style={{width: 42 + (enableArrow ? 24 : 0)}}
            {...((isV5x || isV6x) ? {onOpenChange: onDropdownVisibleChange} : {onDropdownVisibleChange})}
            {...(isLatest ? {styles: {popup: {root: {minWidth}}}} : {dropdownStyle: {minWidth}})}
            {...({[(isV5x || isV6x) ? "popupRender" : "dropdownRender"]: (menu: any) => (
                <div className={`${prefixCls}-phone-input-search-wrapper`}>
                    {enableSearch && (
                        <Input
                            value={query}
                            ref={searchRef}
                            placeholder={searchPlaceholder}
                            onInput={({target}: any) => setQuery(target.value)}
                        />
                    )}
                    {countriesList.length ? menu : (
                        <div className="ant-select-item-empty">{searchNotFound}</div>
                    )}
                </div>
            )})}
        >
            <Select.Option
                children={null}
                value={selectValue}
                style={{display: "none"}}
                key={`${countryCode}_default`}
                label={<div style={{display: "flex", alignItems: "center"}}>
                    <div className={`flag ${countryCode} ${useSVG ? "svg" : ""}`}/>
                    {suffixIcon}
                </div>}
            />
            {countriesList.map(([iso, name, dial, pattern]) => {
                const mask = disableParentheses ? pattern.replace(/[()]/g, "") : pattern;
                return (
                    <Select.Option
                        value={iso + dial}
                        key={`${iso}_${mask}`}
                        label={<div style={{display: "flex", alignItems: "center"}}>
                            <div className={`flag ${iso} ${useSVG ? "svg" : ""}`}/>
                            {suffixIcon}
                        </div>}
                        children={<div className={`${prefixCls}-phone-input-select-item`}>
                            <div className={`flag ${iso} ${useSVG ? "svg" : ""}`}/>
                            {countries[name]}&nbsp;{displayFormat(mask)}
                        </div>}
                    />
                )
            })}
        </Select>
    ), [selectValue, suffixIcon, countryCode, query, disabled, disableParentheses, disableDropdown, onDropdownVisibleChange, minWidth, searchNotFound, countries, countriesList, setFieldValue, setValue, prefixCls, enableSearch, enableArrow, searchPlaceholder, useSVG])

    return (
        <div className={`${prefixCls}-phone-input-wrapper`}
             ref={node => setMinWidth(node?.offsetWidth || 0)}>
            <Space.Compact size={antInputProps?.size || "middle"}>
                {dropdownRender(countriesSelect)}
                <Input
                    ref={ref}
                    inputMode="tel"
                    value={value}
                    onInput={onInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    disabled={disabled}
                    {...antInputProps}
                />
            </Space.Compact>
        </div>
    )
})

export default PhoneInput;
export {PhoneInputProps, PhoneNumber, locale};
