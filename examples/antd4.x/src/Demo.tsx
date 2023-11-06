import {useState} from "react";
import Form from "antd/es/form";
import Button from "antd/es/button";
import FormItem from "antd/es/form/FormItem";
import PhoneInput from "antd-phone-input";

const Demo = () => {
	const [value, setValue] = useState(null);

	const validator = (_: any, {valid}: any) => {
		if (valid()) {
			return Promise.resolve();
		}
		return Promise.reject("Invalid phone number");
	}

	const changeTheme = () => {
		if (window.location.pathname === "/dark") {
			window.location.replace("/");
		} else {
			window.location.replace("/dark");
		}
	}

	const handleFinish = ({phone}: any) => setValue(phone);

	return (
		<div style={{margin: 20, maxWidth: 400}}>
			{value && (
				<pre style={{
					background: window.location.pathname === "/dark" ? "#1f1f1f" : "#efefef",
					color: window.location.pathname === "/dark" ? "#efefef" : "#1f1f1f",
					padding: 10, marginBottom: 24,
				}}>
                    {JSON.stringify(value, null, 2)}
                </pre>
			)}
			<Form onFinish={handleFinish}>
				<FormItem name="phone" rules={[{validator}]}>
					<PhoneInput enableSearch/>
				</FormItem>
				<div style={{display: "flex", gap: 24}}>
					<Button htmlType="submit">Preview Value</Button>
					<Button htmlType="reset">Reset Value</Button>
					<Button onClick={changeTheme}>Change Theme</Button>
				</div>
			</Form>
		</div>
	)
}

export default Demo;
