import assert from "assert";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import FormItem from "antd/lib/form/FormItem";
import ConfigProvider from "antd/lib/config-provider";
import userEvent from "@testing-library/user-event";
import {act, render, screen} from "@testing-library/react";

import PhoneInput, {locale} from "../src";

Object.defineProperty(console, "error", {
    value: jest.fn(),
})

Object.defineProperty(window, "matchMedia", {
    value: jest.fn().mockImplementation((): any => ({
        addListener: jest.fn(),
        removeListener: jest.fn(),
    })),
})

Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    })),
})

Object.defineProperty(global, "MessageChannel", {
    writable: true,
    value: class MessageChannel {
        port1 = {
            onmessage: null as any,
            postMessage: (data: any) => {
                if (this.port2.onmessage) {
                    setTimeout(() => this.port2.onmessage({data}), 0);
                }
            },
        };
        port2 = {
            onmessage: null as any,
            postMessage: (data: any) => {
                if (this.port1.onmessage) {
                    setTimeout(() => this.port1.onmessage({data}), 0);
                }
            },
        };
    },
})

function inputHasError(parent: any = document) {
    return parent.querySelector(".ant-input").className.includes("ant-input-status-error")
        && parent.querySelector(".ant-select").className.includes("ant-select-status-error");
}

const antdVersion: string = require("antd/package.json").version;

describe("Checking locale loading", () => {
    it("Localization support check", async () => {
        const {default: frFR} = await import("antd/es/locale/fr_FR");
        const {container, getByText} = render(<ConfigProvider locale={frFR}>
            <PhoneInput onlyCountries={["am"]}/>
        </ConfigProvider>);
        await act(async () => {
            await userEvent.click(container.querySelector(".flag") as any);
        });
        assert(!!getByText(/Arménie[\S\s]+\+374/));
    })

    it("Deprecated `locale` function shouldn't affect", async () => {
        const {container, getByText} = render(<ConfigProvider locale={locale("frFR")}>
            <PhoneInput onlyCountries={["am"]}/>
        </ConfigProvider>);
        await act(async () => {
            await userEvent.click(container.querySelector(".flag") as any);
        });
        assert(!!getByText(/Armenia[\S\s]+\+374/));
    })

    it("esUS requires antd >= 6.3.2, throws on older versions", async () => {
        const [major, minor, patch] = antdVersion.split(".").map(Number);
        if (major === 6 && minor === 3 && patch >= 2) {
            const {default: esUS} = await import("antd/es/locale/es_US" as any);
            const {container, getByText} = render(<ConfigProvider locale={esUS}>
                <PhoneInput onlyCountries={["am"]}/>
            </ConfigProvider>);
            await act(async () => {
                await userEvent.click(container.querySelector(".flag") as any);
            });
            assert(!!getByText(/Armenia[\S\s]+\+374/));
        }
    })
})

describe("Checking the basic rendering and functionality", () => {
    it("Rendering without crashing", () => {
        render(<PhoneInput/>);
    })

    it("Rendering with strict raw value", () => {
        render(<PhoneInput value="17021234567"/>);
        assert(screen.getByDisplayValue("+1 (702) 123 4567"));
    })

    it("Rendering with an initial value", () => {
        render(<PhoneInput
            onMount={(value: any) => {
                assert(value.countryCode === 1);
                assert(value.areaCode === "702");
                assert(value.phoneNumber === "1234567");
                assert(value.isoCode === "us");
                assert(value.valid());
            }}
            value={{countryCode: 1, areaCode: "702", phoneNumber: "1234567"}}
        />);
        assert(screen.getByDisplayValue("+1 (702) 123 4567"));
    })

    it("Rendering with a raw initial value", () => {
        render(<Form initialValues={{phone: "17021234567"}}>
            <FormItem name="phone">
                <PhoneInput/>
            </FormItem>
        </Form>);
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
        await userEvent.type(input, "907123456789");
        assert(input.getAttribute("value") === "+1 (907) 123 4567");
    })

    it("Using the input with FormItem", async () => {
        render(<Form onFinish={({phone}: any) => {
            assert(phone.countryCode === 1);
            assert(phone.areaCode === "907");
            assert(phone.phoneNumber === "1234567");
            assert(phone.isoCode === "us");
        }}>
            <FormItem name="phone">
                <PhoneInput country="us"/>
            </FormItem>
            <Button data-testid="button" htmlType="submit">Submit</Button>
        </Form>);
        const input = screen.getByDisplayValue("+1");
        await userEvent.type(input, "907123456789");
        assert(input.getAttribute("value") === "+1 (907) 123 4567");
        screen.getByTestId("button").click();
    })

    it("Checking input validation with FormItem", async () => {
        render(<Form initialValues={{phone: {countryCode: 1, areaCode: "702", phoneNumber: "1234567"}}}>
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
        render(<Form initialValues={{phone: {countryCode: 1, areaCode: "702"}}}>
            <FormItem name="phone">
                <PhoneInput/>
            </FormItem>
        </Form>);
        const input = screen.getByDisplayValue("+1 (702)");
        await userEvent.type(input, "1234567");
        assert(input.getAttribute("value") === "+1 (702) 123 4567");
    })

    it("Using `prefixCls` with ConfigProvider", () => {
        render(<ConfigProvider prefixCls="custom-prefix">
            <PhoneInput data-testid="input"/>
        </ConfigProvider>);
        const input = screen.getByTestId("input");
        assert(!input.outerHTML.includes("ant-input"));
        assert(input.outerHTML.includes("custom-prefix-input"));
    })

    it("Checking field value setters", async () => {
        const FormWrapper = () => {
            const [form] = Form.useForm();

            const setFieldObjectValue = () => {
                form.setFieldValue("phone", {
                    countryCode: 48,
                    areaCode: "111",
                    phoneNumber: "111111",
                    isoCode: "pl"
                });
            }

            const setFieldRawValue = () => {
                form.setFieldValue("phone", "+1 (234) 234 2342");
            }

            return (
                <Form data-testid="form" form={form} initialValues={{phone: {countryCode: 1, areaCode: "702"}}}>
                    <FormItem name="phone">
                        <PhoneInput/>
                    </FormItem>
                    <Button data-testid="submit" htmlType="submit">Submit</Button>
                    <Button data-testid="set-string" onClick={setFieldRawValue}>Set String Value</Button>
                    <Button data-testid="set-object" onClick={setFieldObjectValue}>Set Object Value</Button>
                </Form>
            )
        }

        render(<FormWrapper/>);
        const form = screen.getByTestId("form");
        const submit = screen.getByTestId("submit");
        const input = screen.getByDisplayValue("+1 (702)");
        const setString = screen.getByTestId("set-string");
        const setObject = screen.getByTestId("set-object");

        await userEvent.click(setString);
        await userEvent.click(submit);
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        })
        assert(!inputHasError(form)); // valid
        assert(input.getAttribute("value") === "+1 (234) 234 2342");

        await userEvent.click(setObject);
        await userEvent.click(submit);
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        })
        assert(!inputHasError(form)); // valid
        assert(input.getAttribute("value") === "+48 (111) 111 111");
    })

    it("Checking country selection", async () => {
        const {container} = render(<PhoneInput country="am"/>);
        const input = screen.getByDisplayValue("+374");

        await act(async () => {
            await userEvent.click(container.querySelector(".flag") as any);
        });
        await act(async () => {
            await userEvent.click(screen.getByText(/Antigua[\S\s]+\+1[\S\s]*268/));
        });
        assert(input.getAttribute("value") === "+1 (268)");
    })

    it("Checking backspace and input with country change", async () => {
        let currentCountry: string = "";
        render(<PhoneInput
            value="+374"
            onChange={(value: any) => {
                currentCountry = value.isoCode;
            }}
        />);
        const input = screen.getByDisplayValue("+374");

        input.focus();
        await userEvent.keyboard("{Backspace}");
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        });
        assert(input.getAttribute("value") === "+37");

        input.focus();
        await userEvent.keyboard("{Backspace}");
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        });
        assert(input.getAttribute("value") === "+3");

        await userEvent.type(input, "8");
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        });
        assert(input.getAttribute("value") === "+38");

        await userEvent.type(input, "0");
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        });
        assert(input.getAttribute("value") === "+380");
        assert(currentCountry === "ua");
    })

    it("Checking validation with casual form actions", async () => {
        render(<Form data-testid="form" initialValues={{phone: {countryCode: 1, areaCode: "702", phoneNumber: ""}}}>
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
        const reset = screen.getByTestId("reset");
        const submit = screen.getByTestId("submit");

        assert(!inputHasError(form)); // valid
        await userEvent.click(reset);
        assert(!inputHasError(form)); // valid
        await userEvent.click(submit);
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        })
        assert(inputHasError(form)); // invalid
        await userEvent.click(reset);
        assert(!inputHasError(form)); // valid
        await userEvent.click(reset);
        assert(!inputHasError(form)); // valid
        await userEvent.click(submit);
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        })
        assert(inputHasError(form)); // invalid
        await userEvent.click(submit);
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        })
        assert(inputHasError(form)); // invalid
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
        const reset = screen.getByTestId("reset");
        const submit = screen.getByTestId("submit");
        const input = screen.getByDisplayValue("+1");

        await userEvent.type(input, "90712345");
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        })
        assert(inputHasError(form)); // invalid
        await userEvent.type(input, "6");
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        })
        assert(inputHasError(form)); // invalid
        await userEvent.type(input, "7");
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        })
        assert(!inputHasError(form)); // valid
        await userEvent.click(reset);
        assert(!inputHasError(form)); // valid
        await userEvent.click(submit);
        await act(async () => {
            await new Promise(r => setTimeout(r, 100));
        })
        assert(inputHasError(form)); // invalid
        await userEvent.click(reset);
        assert(!inputHasError(form)); // valid
    })
})

describe("Checking the `disableDefaultCountry` property", () => {
    const placeholderOf = (container: any) => container.querySelector(".ant-phone-input-placeholder");

    const submitForm = async () => {
        await act(async () => {
            screen.getByTestId("button").click();
            await new Promise(r => setTimeout(r, 100));
        });
    }

    it("Prefills the default country code without the property", async () => {
        let submitted: any = null;
        const {container} = render(<Form onFinish={(values: any) => submitted = values}>
            <FormItem name="phone">
                <PhoneInput country="fr" onlyCountries={["fr", "br"]}/>
            </FormItem>
            <Button data-testid="button" htmlType="submit">Submit</Button>
        </Form>);
        assert(screen.getByDisplayValue("+33"));
        assert(container.querySelector(".flag.fr"));
        assert(!placeholderOf(container));
        await submitForm();
        assert(submitted.phone.countryCode === 33);
        assert(submitted.phone.isoCode === "fr");
    })

    it("Keeps the input and the form field empty", async () => {
        let submitted: any = null;
        const onMount = jest.fn();
        const {container} = render(<Form onFinish={(values: any) => submitted = values}>
            <FormItem name="phone">
                <PhoneInput country="fr" onlyCountries={["fr", "br"]} onMount={onMount} disableDefaultCountry/>
            </FormItem>
            <Button data-testid="button" htmlType="submit">Submit</Button>
        </Form>);
        const input = container.querySelector(".ant-input") as HTMLInputElement;
        assert(input.value === "");
        assert(!container.querySelector(".flag"));
        assert(placeholderOf(container));
        assert(onMount.mock.calls.length === 1);
        const [mounted] = onMount.mock.calls[0];
        assert(mounted.countryCode === null && mounted.areaCode === null && mounted.phoneNumber === null);
        assert(mounted.valid() === false);
        await submitForm();
        assert(submitted.phone === undefined);
    })

    it("Detects the country from the typed number", async () => {
        let submitted: any = null;
        const {container} = render(<Form onFinish={(values: any) => submitted = values}>
            <FormItem name="phone">
                <PhoneInput country="fr" onlyCountries={["fr", "br"]} disableDefaultCountry/>
            </FormItem>
            <Button data-testid="button" htmlType="submit">Submit</Button>
        </Form>);
        const input = container.querySelector(".ant-input") as HTMLInputElement;
        await userEvent.type(input, "5511912345678");
        assert(input.value === "+55 (11) 91234 5678");
        assert(container.querySelector(".flag.br"));
        assert(!placeholderOf(container));
        await submitForm();
        assert(submitted.phone.countryCode === 55);
        assert(submitted.phone.areaCode === "11");
        assert(submitted.phone.phoneNumber === "912345678");
        assert(submitted.phone.isoCode === "br");
        assert(submitted.phone.valid());
    })

    it("Prefills the selected country code", async () => {
        const {container} = render(<PhoneInput country="fr" onlyCountries={["fr", "br"]} disableDefaultCountry/>);
        const input = container.querySelector(".ant-input") as HTMLInputElement;
        // The placeholder has `pointer-events: none`, so clicks reach the select behind it.
        let target = placeholderOf(container);
        for (let node = target; node && node !== container; node = node.parentElement) {
            if (getComputedStyle(node).pointerEvents === "none") target = node.parentElement;
        }
        await act(async () => {
            await userEvent.click(target);
        });
        await act(async () => {
            await userEvent.click(screen.getByText(/Brazil/));
        });
        assert(input.value === "+55");
        assert(container.querySelector(".flag.br"));
        assert(!placeholderOf(container));
    })

    it("Keeps a given initial value as is", () => {
        const {container} = render(<Form initialValues={{phone: {countryCode: 1, areaCode: "702", phoneNumber: "1234567"}}}>
            <FormItem name="phone">
                <PhoneInput disableDefaultCountry/>
            </FormItem>
        </Form>);
        assert(screen.getByDisplayValue("+1 (702) 123 4567"));
        assert(container.querySelector(".flag.us"));
        assert(!placeholderOf(container));
    })

    it("Shows a value that is set after mounting", async () => {
        const FormWrapper = () => {
            const [form] = Form.useForm();
            return <Form form={form}>
                <FormItem name="phone">
                    <PhoneInput disableDefaultCountry/>
                </FormItem>
                <Button data-testid="button" onClick={() => {
                    form.setFieldValue("phone", {countryCode: 33, areaCode: "6", phoneNumber: "12345678"});
                }}/>
            </Form>
        }
        const {container} = render(<FormWrapper/>);
        assert(placeholderOf(container));
        await act(async () => {
            await userEvent.click(screen.getByTestId("button"));
            await new Promise(r => setTimeout(r, 100));
        });
        assert(screen.getByDisplayValue("+33 (6) 12 34 56 78"));
        assert(container.querySelector(".flag.fr"));
        assert(!placeholderOf(container));
    })

    it("Shows the placeholder again after clearing the input", async () => {
        const {container} = render(<PhoneInput country="fr" onlyCountries={["fr", "br"]} disableDefaultCountry/>);
        const input = container.querySelector(".ant-input") as HTMLInputElement;
        const inputValue = () => input.value;
        await userEvent.type(input, "55");
        assert(inputValue() === "+55");
        assert(!placeholderOf(container));
        await userEvent.clear(input);
        assert(inputValue() === "");
        assert(placeholderOf(container));
    })
})
