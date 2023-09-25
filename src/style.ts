import {mergeToken} from "antd/lib/theme/internal";
import * as inputHelper from "antd/lib/input/style";

export default (token: any) => ({
	".react-tel-input": {
		".country-list": {
			boxShadow: token.boxShadow,
			backgroundColor: token.colorBgElevated,
			".country-name": {color: token.colorText},
			".search": {backgroundColor: token.colorBgElevated},
			".search-box": inputHelper.genBasicInputStyle(
				mergeToken(
					((inputHelper as any).initInputToken || (() => ({})))(token),
					((inputHelper as any).initComponentToken || (() => ({})))(token),
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