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
import {FormContext} from "antd/es/form/context";
import Select from "antd/es/select";
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

import {injectMergedStyles} from "./styles";
import {PhoneInputProps, PhoneNumber} from "./types";

injectMergedStyles();

const PhoneInput = forwardRef(({
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
                               }: PhoneInputProps, forwardedRef: any) => {
    const formInstance = useFormInstance();
    const formContext = useContext(FormContext);
    const inputRef = useRef<any>(null);
    const selectedRef = useRef<boolean>(false);
    const initiatedRef = useRef<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [minWidth, setMinWidth] = useState<number>(0);
    const [countryCode, setCountryCode] = useState<string>(country);

    const {
        value,
        pattern,
        metadata,
        setValue,
        countriesList,
    } = usePhone({
        query,
        country,
        countryCode,
        initialValue,
        onlyCountries,
        excludeCountries,
        preferredCountries,
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

    const setFieldValue = useCallback((value: PhoneNumber) => {
        if (formInstance) formInstance.setFieldValue(namePath, value);
    }, [formInstance])

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

    const ref = useCallback((node: any) => {
        [forwardedRef, inputRef].forEach((ref) => {
            if (typeof ref === "function") ref(node);
            else if (ref != null) ref.current = node;
        })
    }, [forwardedRef])

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

    const countriesSelect = useMemo(() => (
        <Select
            suffixIcon={null}
            value={selectValue}
            open={disableDropdown ? false : undefined}
            onSelect={(selectedOption, {key}) => {
                const [_, mask] = key.split("_");
                if (selectValue === selectedOption) return;
                const selectedCountryCode = selectedOption.slice(0, 2);
                const formattedNumber = displayFormat(cleanInput(mask, mask).join(""));
                const phoneMetadata = parsePhoneNumber(formattedNumber, countriesList, selectedCountryCode);
                setFieldValue({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)});
                setCountryCode(selectedCountryCode);
                setValue(formattedNumber);
                selectedRef.current = true;
                const nativeInputValueSetter = (Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value") as any).set;
                nativeInputValueSetter.call(inputRef.current.input, formattedNumber);
                inputRef.current.input.dispatchEvent(new Event("change", {bubbles: true}));
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
                    value={iso + dial}
                    key={`${iso}_${mask}`}
                    label={<div className={`flag ${iso}`}/>}
                    children={<div className="ant-phone-input-select-item">
                        <div className={`flag ${iso}`}/>
                        {name}&nbsp;{displayFormat(mask)}
                    </div>}
                />
            ))}
        </Select>
    ), [selectValue, disableDropdown, minWidth, searchNotFound, countriesList, setFieldValue, setValue, enableSearch, searchPlaceholder])

    return (
        <div className="ant-phone-input-wrapper"
             ref={node => setMinWidth(node?.offsetWidth || 0)}>
            <Input
                ref={ref}
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
})

export default PhoneInput;
