import {GlobalToken} from "antd/lib/theme/interface";
import {genBasicInputStyle, initInputToken} from "antd/lib/input/style";

export const styleInject = (cssText: string) => {
	const style = document.createElement("style");
	style.setAttribute("type", "text/css");

	if ((style as any).styleSheet) {
		(style as any).styleSheet.cssText = cssText;
	} else {
		style.appendChild(document.createTextNode(cssText));
	}

	document.head.appendChild(style);
}

export default (token: GlobalToken) => ({
	".react-tel-input": {
		".country-list": {
			boxShadow: token.boxShadow,
			backgroundColor: token.colorBgElevated,
			".country-name": {color: token.colorText},
			".search": {backgroundColor: token.colorBgElevated},
			".search-box": genBasicInputStyle(initInputToken(token) as any),
			".country": {
				borderRadius: token.borderRadiusOuter,
				".dial-code": {color: token.colorTextDescription},
				"&:hover": {backgroundColor: token.colorBgTextHover},
				"&.highlight": {backgroundColor: token.colorPrimaryBg},
			},
		},
		".selected-flag": {borderColor: token.colorBorder},
	}
})