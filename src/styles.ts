"use client";

import {injectStyles, jsonToCss} from "react-phone-hooks/styles";
import commonStyles from "react-phone-hooks/stylesheet.json";
import {defaultPrefixCls} from "antd/es/config-provider";

import customStyles from "./resources/stylesheet.json";

let prefix: any = null;

export const injectMergedStyles = (prefixCls: any = null) => {
    const stylesheet = customStyles as { [key: string]: any };
    if (prefixCls && prefixCls !== defaultPrefixCls) {
        if (prefix === prefixCls) return;
        Object.entries(stylesheet).forEach(([k, value]) => {
            const key = k.replace(/ant(?=-)/g, prefixCls);
            stylesheet[key] = value;
            delete stylesheet[k];
        })
        prefix = prefixCls;
    }
    return injectStyles(jsonToCss(Object.assign(commonStyles, stylesheet)));
}
