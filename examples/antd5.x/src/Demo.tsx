import {useState} from "react";
import Form from "antd/es/form";
import theme from "antd/es/theme";
import Button from "antd/es/button";
import Card from "antd/es/card/Card";
import FormItem from "antd/es/form/FormItem";
import ConfigProvider from "antd/es/config-provider";
import PhoneInput from "antd-phone-input";

import "antd/dist/reset.css";

const Demo = () => {
	const [value, setValue] = useState(null);
	const [algorithm, setAlgorithm] = useState("defaultAlgorithm");

	const validator = (_: any, {valid}: any) => {
		if (valid()) {
			return Promise.resolve();
		}
		return Promise.reject("Invalid phone number");
	}

	const changeTheme = () => {
		if (algorithm === "defaultAlgorithm") {
			setAlgorithm("darkAlgorithm");
		} else {
			setAlgorithm("defaultAlgorithm");
		}
	}

	const handleFinish = ({phone}: any) => setValue(phone);

	return (
		<ConfigProvider
			theme={{algorithm: algorithm === "defaultAlgorithm" ? theme.defaultAlgorithm : theme.darkAlgorithm}}>
			<Card style={{height: "100%", borderRadius: 0, border: "none"}} bodyStyle={{padding: 0}}>
				<div className="m-5" style={{margin: 20, maxWidth: 400}}>
					{value && (
						<pre style={{
							background: algorithm === "defaultAlgorithm" ? "#efefef" : "#1f1f1f",
							color: algorithm === "defaultAlgorithm" ? "#1f1f1f" : "#efefef",
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
			</Card>
		</ConfigProvider>
	)
}

export default Demo;
