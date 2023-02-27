import {useCallback, useState} from "react";
import FormItem from "antd/lib/form/FormItem";

import PhoneNumberInput from "./PhoneNumberInput";
import {PhoneNumberFormItemProps} from "./types";

const PhoneNumberFormItem = ({required = false, name}: PhoneNumberFormItemProps) => {
	const [isValid, setIsValid] = useState(true);

	const validatePhone = useCallback((_: any, value: { countryCode: any }) => {
		const {countryCode} = {...value};
		if (!countryCode) {
			if (required)
				return Promise.reject("This field is required");
			return Promise.resolve();
		}
		if (!isValid)
			return Promise.reject("Invalid phone number");
		return Promise.resolve();
	}, [isValid]);

	return (
		<FormItem
			name={name}
			className='phone-number-form-item'
			rules={[{required, validator: validatePhone}]}>
			<PhoneNumberInput setIsValid={setIsValid}/>
		</FormItem>
	)
}

export default PhoneNumberFormItem
