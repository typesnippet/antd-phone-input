import assert from "assert";
import {render} from "@testing-library/react";

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

describe("<PhoneInput {...props}/>", () => {
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
			}}
			value={{countryCode: 1, areaCode: 702, phoneNumber: "1234567"}}
		/>);
	})
})
