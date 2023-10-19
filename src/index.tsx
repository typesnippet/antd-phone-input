import InputLegacy from "./legacy";
import {PhoneInputProps} from "./types";

const PhoneInput = (inputLegacyProps: PhoneInputProps) => {
	return (
		<InputLegacy {...inputLegacyProps}/>
	)
}

export default PhoneInput;
