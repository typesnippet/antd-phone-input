"use client";

import {ChangeEvent, KeyboardEvent, ReactNode} from "react";
import types from "react-phone-hooks/types";
import {InputProps} from "antd/es/input";

export type PhoneNumber = types.PhoneNumber;

export interface PhoneInputProps extends Omit<InputProps, "value" | "onChange"> {
    value?: PhoneNumber | string;

    country?: string;

    enableArrow?: boolean;

    enableSearch?: boolean;

    searchNotFound?: string;

    searchPlaceholder?: string;

    disableDropdown?: boolean;

    disableParentheses?: boolean;

    onlyCountries?: string[];

    excludeCountries?: string[];

    preferredCountries?: string[];

    dropdownRender?: (menu: ReactNode) => ReactNode;

    onMount?(value: PhoneNumber): void;

    onInput?(event: ChangeEvent<HTMLInputElement>): void;

    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;

    /** NOTE: This differs from the antd Input onChange interface */
    onChange?(value: PhoneNumber, event: ChangeEvent<HTMLInputElement>): void;
}
