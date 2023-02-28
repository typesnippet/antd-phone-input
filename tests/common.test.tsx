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
});

describe("PhoneNumberInput render", () => {
	it("renders without crashing", () => {
		render(<PhoneInput/>)
	})
})
