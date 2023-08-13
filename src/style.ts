import {GlobalToken} from "antd/lib/theme/interface";
import {genBasicInputStyle, initInputToken, InputToken} from "antd/lib/input/style";

export default (token: GlobalToken) => ({
	".react-tel-input": {
		".country-list": {
			boxShadow: token.boxShadow,
			backgroundColor: token.colorBgElevated,
			".country-name": {color: token.colorText},
			".search": {backgroundColor: token.colorBgElevated},
			".search-box": genBasicInputStyle(initInputToken(token) as InputToken),
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