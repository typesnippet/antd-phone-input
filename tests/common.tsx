import assert from "assert";
import userEvent from "@testing-library/user-event";
import {act, render, screen} from "@testing-library/react";

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

export default function commonTests(PhoneInput: any, Form: any, FormItem: any, Button: any) {
	console.warn = jest.fn();

	describe("Checking the basic rendering and functionality", () => {
		it("Rendering without crashing", () => {
			render(<PhoneInput/>);
		})

		it("Rendering with an initial value", () => {
			render(<PhoneInput
				onMount={(value: any) => {
					assert(value.countryCode === 1);
					assert(value.areaCode === 702);
					assert(value.phoneNumber === "1234567");
					assert(value.isoCode === "us");
					assert(value.valid());
				}}
				value={{countryCode: 1, areaCode: 702, phoneNumber: "1234567"}}
			/>);
			assert(screen.getByDisplayValue("+1 (702) 123 4567"));
		})

		it("Checking the component on user input", async () => {
			render(<PhoneInput
				onChange={(value: any) => {
					assert(value.isoCode === "us");
				}}
				country="us"
			/>);
			const input = screen.getByDisplayValue("+1");
			await userEvent.type(input, "702123456789");
			assert(input.getAttribute("value") === "+1 (702) 123 4567");
		})

		it("Using the input with FormItem", async () => {
			render(<Form onFinish={({phone}: any) => {
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

		it("Checking input validation with FormItem", async () => {
			render(<Form initialValues={{phone: {countryCode: 1, areaCode: 702, phoneNumber: "1234567"}}}>
				<FormItem name="phone" rules={[{
					validator: (_: any, {valid}: any) => {
						assert(valid());
						return Promise.resolve();
					}
				}]}>
					<PhoneInput/>
				</FormItem>
				<Button data-testid="button" htmlType="submit">Submit</Button>
			</Form>);
			await userEvent.click(screen.getByTestId("button"));
		})

		it("Checking form with initial value", async () => {
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

		it("Checking validation with casual form actions", async () => {
			render(<Form data-testid="form" initialValues={{phone: {countryCode: 1, areaCode: 702, phoneNumber: ""}}}>
				<FormItem name="phone" rules={[{
					validator: (_: any, {valid}: any) => {
						if (valid()) return Promise.resolve();
						return Promise.reject("Invalid phone number");
					}
				}]}>
					<PhoneInput/>
				</FormItem>
				<Button data-testid="submit" htmlType="submit">Submit</Button>
				<Button data-testid="reset" htmlType="reset">Reset</Button>
			</Form>);

			const form = screen.getByTestId("form");
			const input = screen.getByDisplayValue("+1 (702)");
			const submit = screen.getByTestId("submit");
			const reset = screen.getByTestId("reset");

			await userEvent.click(reset);
			assert(form.querySelector(".ant-form-item-has-success") !== null); // valid
			await userEvent.type(input, "a");
			await userEvent.click(submit);
			await act(async () => {
				await new Promise(r => setTimeout(r, 100));
			})
			assert(form.querySelector(".ant-form-item-has-error") !== null); // invalid
			await userEvent.click(reset);
			assert(form.querySelector(".ant-form-item-has-success") !== null); // valid
			await userEvent.click(reset);
			assert(form.querySelector(".ant-form-item-has-success") !== null); // valid
			await userEvent.type(input, "a");
			await userEvent.click(submit);
			await act(async () => {
				await new Promise(r => setTimeout(r, 100));
			})
			assert(form.querySelector(".ant-form-item-has-error") !== null); // invalid
			await userEvent.click(submit);
			await act(async () => {
				await new Promise(r => setTimeout(r, 100));
			})
			assert(form.querySelector(".ant-form-item-has-error") !== null); // invalid
		})

		it("Checking validation with casual inputs and actions", async () => {
			render(<Form data-testid="form">
				<FormItem name="phone" rules={[{
					validator: (_: any, {valid}: any) => {
						if (valid()) return Promise.resolve();
						return Promise.reject("Invalid phone number");
					}
				}]}>
					<PhoneInput country="us"/>
				</FormItem>
				<Button data-testid="submit" htmlType="submit">Submit</Button>
				<Button data-testid="reset" htmlType="reset">Reset</Button>
			</Form>);

			const form = screen.getByTestId("form");
			const input = screen.getByDisplayValue("+1");
			const submit = screen.getByTestId("submit");
			const reset = screen.getByTestId("reset");

			await userEvent.type(input, "70212345");
			await act(async () => {
				await new Promise(r => setTimeout(r, 100));
			})
			assert(form.querySelector(".ant-form-item-has-error") !== null); // invalid
			await userEvent.type(input, "6");
			await act(async () => {
				await new Promise(r => setTimeout(r, 100));
			})
			assert(form.querySelector(".ant-form-item-has-error") !== null); // invalid
			await userEvent.type(input, "7");
			await act(async () => {
				await new Promise(r => setTimeout(r, 100));
			})
			assert(form.querySelector(".ant-form-item-has-success") !== null); // valid
			await userEvent.click(reset);
			assert(form.querySelector(".ant-form-item-has-success") !== null); // valid
			await userEvent.type(input, "a");
			await userEvent.click(submit);
			await act(async () => {
				await new Promise(r => setTimeout(r, 100));
			})
			assert(form.querySelector(".ant-form-item-has-error") !== null); // invalid
			await userEvent.click(reset);
			assert(form.querySelector(".ant-form-item-has-success") !== null); // valid
		})
	})
}