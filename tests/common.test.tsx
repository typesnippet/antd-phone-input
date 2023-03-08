import assert from "assert";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import FormItem from "antd/lib/form/FormItem";
import userEvent from "@testing-library/user-event";
import {render, screen} from "@testing-library/react";

import PhoneInput from "../src";

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
})

describe("Checks the basic rendering and functionality", () => {
	it("Renders without crashing", () => {
		render(<PhoneInput/>);
	})

	it("Renders with an initial value", () => {
		render(<PhoneInput
			onMount={value => {
				assert(value.countryCode === 1);
				assert(value.areaCode === 702);
				assert(value.phoneNumber === "1234567");
				assert(value.isoCode === "us");
				assert(value.valid === true);
			}}
			value={{countryCode: 1, areaCode: 702, phoneNumber: "1234567"}}
		/>);
		assert(screen.getByDisplayValue("+1 (702) 123 4567"));
	})

	it("Checks the component on user input", async () => {
		render(<PhoneInput
			onChange={value => {
				assert(value.isoCode === "us");
			}}
			country="us"
		/>);
		const input = screen.getByDisplayValue("+1");
		await userEvent.type(input, "702123456789");
		assert(input.getAttribute("value") === "+1 (702) 123 4567");
	})

	it("Uses the input with FormItem", async () => {
		render(<Form onFinish={({phone}) => {
			assert(phone.countryCode === 1);
			assert(phone.areaCode === 702);
			assert(phone.phoneNumber === "1234567");
			assert(phone.isoCode === "us");
		}}>
			<FormItem name="phone">
				<PhoneInput country="us"/>
			</FormItem>
			<Button data-testid="button" htmlType="submit">Submit</Button>
		</Form>);
		const input = screen.getByDisplayValue("+1");
		await userEvent.type(input, "702123456789");
		assert(input.getAttribute("value") === "+1 (702) 123 4567");
		screen.getByTestId("button").click();
	})

	it("Checks input validation with FormItem", async () => {
		render(<Form initialValues={{phone: {countryCode: 1, areaCode: 702, phoneNumber: "1234567"}}}>
			<FormItem name="phone" rules={[{
				validator: (_, {valid}) => {
					assert(valid === true);
					return Promise.resolve();
				}
			}]}>
				<PhoneInput/>
			</FormItem>
			<Button data-testid="button" htmlType="submit">Submit</Button>
		</Form>);
		await userEvent.click(screen.getByTestId("button"));
	})

	it("Checks form with initial value", async () => {
		render(<Form initialValues={{phone: {countryCode: 1, areaCode: 702}}}>
			<FormItem name="phone">
				<PhoneInput/>
			</FormItem>
			<Button data-testid="button" htmlType="submit">Submit</Button>
		</Form>);
		const input = screen.getByDisplayValue("+1 (702)");
		await userEvent.type(input, "1234567");
		assert(input.getAttribute("value") === "+1 (702) 123 4567");
	})
})
