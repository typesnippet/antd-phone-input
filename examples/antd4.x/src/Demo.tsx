import {useCallback, useMemo, useState} from "react";
import copy from "copy-to-clipboard";
import Form from "antd/es/form";
import Alert from "antd/es/alert";
import Button from "antd/es/button";
import Switch from "antd/es/switch";
import Card from "antd/es/card/Card";
import Divider from "antd/es/divider";
import {useForm} from "antd/es/form/Form";
import PhoneInput from "antd-phone-input";
import FormItem from "antd/es/form/FormItem";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import SunOutlined from "@ant-design/icons/SunOutlined";
import MoonOutlined from "@ant-design/icons/MoonOutlined";
import CopyOutlined from "@ant-design/icons/CopyOutlined";
import CheckOutlined from "@ant-design/icons/CheckOutlined";

const Demo = () => {
    const [form] = useForm();
    const [value, setValue] = useState(null);
    const [arrow, setArrow] = useState(false);
    const [useSvg, setUseSvg] = useState(false);
    const [strict, setStrict] = useState(false);
    const [search, setSearch] = useState(false);
    const [copied, setCopied] = useState(false);
    const [dropdown, setDropdown] = useState(true);
    const [distinct, setDistinct] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [parentheses, setParentheses] = useState(true);

    const validator = useCallback((_: any, {valid}: any) => {
        if (valid(strict)) return Promise.resolve();
        return Promise.reject("Invalid phone number");
    }, [strict])

    const code = useMemo(() => {
        let code = "<PhoneInput\n";
        if (useSvg) code += "    useSVG\n";
        if (disabled) code += "    disabled\n";
        if (distinct) code += "    distinct\n";
        if (arrow) code += "    enableArrow\n";
        if (search && dropdown) code += "    enableSearch\n";
        if (!dropdown) code += "    disableDropdown\n";
        if (!parentheses) code += "    disableParentheses\n";
        if (code === "<PhoneInput\n") code = "<PhoneInput />";
        else code += "/>";
        return code;
    }, [distinct, disabled, useSvg, arrow, search, dropdown, parentheses])

    const changeTheme = () => {
        const pathname = window.location.pathname.replace(/\/$/, '');
        if (pathname.endsWith("/dark")) {
            window.location.replace(pathname.replace('/dark', ''));
        } else {
            window.location.replace(pathname + "/dark");
        }
    }

    const handleFinish = ({phone}: any) => setValue(phone);

    return (
        <Card style={{height: "100%", borderRadius: 0, border: "none"}}
              bodyStyle={{
                  padding: 0,
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
              }}>
            <div style={{
                minWidth: 415,
                maxWidth: 415,
                display: "flex",
                margin: "10px 20px",
                flexDirection: "column",
            }}>
                <Title level={2}>
                    Ant Phone Input Playground
                </Title>
                <Paragraph>
                    This is a playground for the Ant Phone Input component. You can change the settings and see how
                    the component behaves. Also, see the code for the component and the value it returns.
                </Paragraph>
                <Divider orientation="left" plain>Settings</Divider>
                <div style={{gap: 24, display: "flex", alignItems: "center"}}>
                    <Form.Item label="Dropdown">
                        <Switch
                            defaultChecked
                            checkedChildren="enabled"
                            unCheckedChildren="disabled"
                            onChange={() => setDropdown(!dropdown)}
                        />
                    </Form.Item>
                    <Form.Item label="Parentheses">
                        <Switch
                            defaultChecked
                            checkedChildren="enabled"
                            unCheckedChildren="disabled"
                            onChange={() => setParentheses(!parentheses)}
                        />
                    </Form.Item>
                </div>
                <div style={{gap: 24, display: "flex", alignItems: "center"}}>
                    <Form.Item label="Search">
                        <Switch
                            disabled={!dropdown}
                            checkedChildren="enabled"
                            unCheckedChildren="disabled"
                            onChange={() => setSearch(!search)}
                        />
                    </Form.Item>
                    <Form.Item label="Arrow">
                        <Switch
                            checkedChildren="enabled"
                            unCheckedChildren="disabled"
                            onChange={() => setArrow(!arrow)}
                        />
                    </Form.Item>
                </div>
                <div style={{gap: 24, display: "flex", alignItems: "center"}}>
                    <Form.Item label="Theme">
                        <Switch
                            onChange={changeTheme}
                            checkedChildren={<MoonOutlined/>}
                            unCheckedChildren={<SunOutlined/>}
                            defaultChecked={window.location.pathname.endsWith("/dark")}
                        />
                    </Form.Item>
                    <Form.Item label="Validation">
                        <Switch
                            checkedChildren="strict"
                            unCheckedChildren="default"
                            onChange={() => setStrict(!strict)}
                        />
                    </Form.Item>
                </div>
                <div style={{gap: 24, display: "flex", alignItems: "center"}}>
                    <Form.Item label="Disabled" style={{margin: 0}}>
                        <Switch onChange={() => setDisabled(!disabled)}/>
                    </Form.Item>
                    <Form.Item label="Distinct" style={{margin: 0}}>
                        <Switch onChange={() => setDistinct(!distinct)}/>
                    </Form.Item>
                    <Form.Item label="SVG" style={{margin: 0}}>
                        <Switch onChange={() => setUseSvg(!useSvg)}/>
                    </Form.Item>
                </div>
                <Divider orientation="left" plain>Code</Divider>
                <div style={{position: "relative"}}>
                    <Button
                        type="text"
                        size="small"
                        onClick={() => {
                            copy(code);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        }}
                        style={{position: "absolute", top: 10, right: 10}}
                        icon={copied ? <CheckOutlined style={{color: "green"}}/> : <CopyOutlined/>}
                    />
                    <pre style={{
                        background: window.location.pathname.endsWith("/dark") ? "#1f1f1f" : "#efefef",
                        color: window.location.pathname.endsWith("/dark") ? "#efefef" : "#1f1f1f",
                        padding: 10,
                    }}>
                        {code}
                    </pre>
                </div>
                <Divider orientation="left" plain>Component</Divider>
                <Form form={form} onFinish={handleFinish}>
                    <FormItem name="phone" rules={[{validator}]}>
                        <PhoneInput
                            useSVG={useSvg}
                            distinct={distinct}
                            disabled={disabled}
                            enableArrow={arrow}
                            enableSearch={search}
                            disableDropdown={!dropdown}
                            disableParentheses={!parentheses}
                        />
                    </FormItem>
                    {value && (
                        <pre style={{
                            background: window.location.pathname.endsWith("/dark") ? "#1f1f1f" : "#efefef",
                            color: window.location.pathname.endsWith("/dark") ? "#efefef" : "#1f1f1f",
                            padding: 10, marginBottom: 24,
                        }}>
                            {JSON.stringify(value, null, 2)}
                        </pre>
                    )}
                    <div style={{display: "flex", gap: 24, justifyContent: "flex-start"}}>
                        <Button htmlType="submit" type="primary">Preview Value</Button>
                        <Button htmlType="reset">Reset Value</Button>
                    </div>
                </Form>
                <Alert
                    type="info"
                    style={{marginTop: 24}}
                    message={<>
                        If your application uses <b>5.x</b> version of <b>Ant Design</b>, you should use this&nbsp;
                        <a target="_blank" rel="noreferrer"
                           href="//playground.typesnippet.org/antd-phone-input-5.x">playground</a>&nbsp;
                        server to test the component.
                    </>}
                />
                <div style={{marginTop: "auto"}}>
                    <Divider style={{margin: "10px 0"}}/>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <div>
                            &copy; Made with ❤️ by&nbsp;
                            <a href="//github.com/typesnippet" target="_blank" rel="noreferrer author">
                                TypeSnippet
                            </a>
                        </div>
                        <div style={{display: "flex", gap: 10}}>
                            <a target="_blank" rel="noreferrer"
                               href="//github.com/typesnippet/antd-phone-input/blob/master/LICENSE">
                                <img src="//img.shields.io/npm/l/antd-phone-input" alt="MIT License"/>
                            </a>
                            <a href="//www.npmjs.com/package/antd-phone-input" target="_blank" rel="noreferrer">
                                <img src="//img.shields.io/npm/v/antd-phone-input" alt="NPM Package"/>
                            </a>
                        </div>
                    </div>
                    <Paragraph style={{margin: "5px 0 0 0"}}>
                        Find the&nbsp;
                        <a href="//github.com/typesnippet/antd-phone-input/tree/master/examples/antd4.x"
                           target="_blank" rel="noreferrer">
                            source code
                        </a>
                        &nbsp;of this playground server on our GitHub repo.
                    </Paragraph>
                </div>
            </div>
        </Card>
    )
}

export default Demo;
