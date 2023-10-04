import {mergeToken} from "antd/lib/theme/internal";
import * as inputHelper from "antd/lib/input/style";

const inputStyle = inputHelper as any;

export default (token: any) => ({
	".react-tel-input": {
		".country-list": {
			boxShadow: token.boxShadow,
			backgroundColor: token.colorBgElevated,
			".country-name": {color: token.colorText},
			".search": {backgroundColor: token.colorBgElevated},
			".search-box": inputHelper.genBasicInputStyle(
				mergeToken(
					("initInputToken" in inputStyle ? inputStyle.initInputToken : (() => ({})))(token),
					("initComponentToken" in inputStyle ? inputStyle.initComponentToken : (() => ({})))(token),
				)
			),
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