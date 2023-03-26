import {useContext, useEffect, useMemo} from "react";
import theme from "antd/lib/theme";
import genComponentStyleHook from "antd/lib/input/style";
import {FormItemInputContext} from "antd/lib/form/context";
import {getStatusClassNames} from "antd/lib/_util/statusUtils";

import InputLegacy from "./legacy";
import {PhoneInputProps} from "./types";

const PhoneInput = (inputLegacyProps: PhoneInputProps) => {
	const {token} = theme.useToken();
	const {status}: any = useContext(FormItemInputContext);
	const [_1, inputCls] = genComponentStyleHook("ant-input");
	const [_2, dropdownCls] = genComponentStyleHook("ant-dropdown");

	const inputClass = useMemo(() => {
		return `${inputCls} ` + getStatusClassNames("ant-input", status);
	}, [inputCls, status]);

	const dropdownClass = useMemo(() => "ant-dropdown " + dropdownCls, [dropdownCls]);

	useEffect(() => {
		/** Load antd 5.x styles dynamically observing the theme change */
		for (let styleSheet of document.styleSheets) {
			let rule: any;
			for (rule of styleSheet.cssRules || styleSheet.rules) {
				if (rule.selectorText === ".react-tel-input .country-list") {
					rule.style.boxShadow = token.boxShadow;
					rule.style.backgroundColor = token.colorBgElevated;
				}
				if (rule.selectorText === ".react-tel-input .selected-flag") {
					rule.style.borderColor = token.colorBorder;
				}
				if (rule.selectorText === ".react-tel-input .country-list .search") {
					rule.style.backgroundColor = token.colorBgElevated;
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
                    rule.style.backgroundColor = token.colorBgElevated;
				}
				if (rule.selectorText === `:where(.${inputCls}).ant-input:hover`) {
					rule.selectorText += "\n,.react-tel-input .country-list .search-box:focus";
					rule.selectorText += "\n,.react-tel-input .country-list .search-box:hover";
				}
			}
		}
	}, [inputCls, token])

	return (
		<InputLegacy
			{...inputLegacyProps}
			inputClass={inputClass}
			dropdownClass={dropdownClass}
		/>
	)
}

export default PhoneInput;
