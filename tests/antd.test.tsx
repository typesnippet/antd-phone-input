import assert from "assert";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import FormItem from "antd/lib/form/FormItem";
import ConfigProvider from "antd/lib/config-provider";
import userEvent from "@testing-library/user-event";
import {render, screen, waitFor} from "@testing-library/react";

import PhoneInput, {locale} from "../src";

Object.defineProperty(console, "warn", {
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

describe("Checking the basic rendering and functionality", () => {
    it("Rendering without crashing", () => {
        render(<PhoneInput/>);
    })

    it("Rendering with strict raw value", () => {
        render(<PhoneInput value="17021234567"/>);
        assert(screen.getByDisplayValue("+1 (702) 123 4567"));
    })

    it("Localization support check", async () => {
        const user = userEvent.setup();
        const {container, getByText} = render(<ConfigProvider locale={locale("frFR")}>
            <PhoneInput onlyCountries={["am"]}/>
        </ConfigProvider>);
        await user.click(container.querySelector(".flag") as any);
        assert(!!getByText(/Arménie[\S\s]+\+374/));
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
        const user = userEvent.setup();
        render(<PhoneInput
            onChange={(value: any) => {
                assert(value.isoCode === "us");
            }}
            country="us"
        />);
        const input = screen.getByDisplayValue("+1");
        await user.type(input, "907123456789");
        await waitFor(() => {
            assert(input.getAttribute("value") === "+1 (907) 123 4567");
        });
    })

    it("Using the input with FormItem", async () => {
        const user = userEvent.setup();
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
        await user.type(input, "907123456789");
        await waitFor(() => {
            assert(input.getAttribute("value") === "+1 (907) 123 4567");
        });
        await user.click(screen.getByTestId("button"));
    })

    it("Checking input validation with FormItem", async () => {
        const user = userEvent.setup();
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
        await user.click(screen.getByTestId("button"));
    })

    it("Checking form with initial value", async () => {
        const user = userEvent.setup();
        render(<Form initialValues={{phone: {countryCode: 1, areaCode: "702"}}}>
            <FormItem name="phone">
                <PhoneInput/>
            </FormItem>
        </Form>);
        const input = screen.getByDisplayValue("+1 (702)");
        await user.type(input, "1234567");
        await waitFor(() => {
            assert(input.getAttribute("value") === "+1 (702) 123 4567");
        });
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
        const user = userEvent.setup();
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

        await user.click(setString);
        await user.click(submit);
        await waitFor(() => {
            assert(!inputHasError(form));
            assert(input.getAttribute("value") === "+1 (234) 234 2342");
        });

        await user.click(setObject);
        await user.click(submit);
        await waitFor(() => {
            assert(!inputHasError(form));
            assert(input.getAttribute("value") === "+48 (111) 111 111");
        });
    })

    it("Checking validation with casual form actions", async () => {
        const user = userEvent.setup();
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

        assert(!inputHasError(form));
        await user.click(reset);
        assert(!inputHasError(form));
        await user.click(submit);
        await waitFor(() => {
            assert(inputHasError(form));
        });
        await user.click(reset);
        assert(!inputHasError(form));
        await user.click(reset);
        assert(!inputHasError(form));
        await user.click(submit);
        await waitFor(() => {
            assert(inputHasError(form));
        });
        await user.click(submit);
        await waitFor(() => {
            assert(inputHasError(form));
        });
    })

    it("Checking validation with casual inputs and actions", async () => {
        const user = userEvent.setup();
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

        await user.type(input, "90712345");
        await waitFor(() => {
            assert(inputHasError(form));
        });
        await user.type(input, "6");
        await waitFor(() => {
            assert(inputHasError(form));
        });
        await user.type(input, "7");
        await waitFor(() => {
            assert(!inputHasError(form));
        });
        await user.click(reset);
        assert(!inputHasError(form));
        await user.click(submit);
        await waitFor(() => {
            assert(inputHasError(form));
        });
        await user.click(reset);
        assert(!inputHasError(form));
    })
})
