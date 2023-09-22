import {useContext, useMemo} from "react";
import genComponentStyleHook from "antd/lib/input/style";
import {ConfigContext} from "antd/lib/config-provider";
import {FormItemInputContext} from "antd/lib/form/context";
import {getStatusClassNames} from "antd/lib/_util/statusUtils";
import {useStyleRegister, useToken} from "antd/lib/theme/internal";

import InputLegacy from "./legacy";
import genPhoneInputStyle from "./style";
import {PhoneInputProps} from "./types";

const PhoneInput = (inputLegacyProps: PhoneInputProps) => {
	const {getPrefixCls} = useContext(ConfigContext);
	const {status}: any = useContext(FormItemInputContext);
	const inputPrefixCls = getPrefixCls("input");
	const dropdownPrefixCls = getPrefixCls("dropdown");
	const [_1, inputCls] = genComponentStyleHook(inputPrefixCls);
	const [_2, dropdownCls] = genComponentStyleHook(dropdownPrefixCls);
	const [theme, token, _3] = useToken();

	const inputClass = useMemo(() => {
		return `${inputCls} ` + getStatusClassNames(inputPrefixCls, status);
	}, [inputPrefixCls, inputCls, status]);

	const dropdownClass = useMemo(() => "ant-dropdown " + dropdownCls, [dropdownCls]);

	useStyleRegister({
		theme,
		token,
		hashId: "react-tel-input",
		path: ["antd-phone-input"],
	}, () => [genPhoneInputStyle(token)]);

	return (
		<InputLegacy
			{...inputLegacyProps}
			inputClass={inputClass}
			dropdownClass={dropdownClass}
		/>
	)
}

export default PhoneInput;
