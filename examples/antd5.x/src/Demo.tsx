import {useCallback, useMemo, useState} from "react";
import copy from "copy-to-clipboard";
import version from "antd/es/version";
import Form from "antd/es/form";
import theme from "antd/es/theme";
import Button from "antd/es/button";
import Select from "antd/es/select";
import Card from "antd/es/card/Card";
import Divider from "antd/es/divider";
import Alert from "antd/es/alert/Alert";
import Table from "antd/es/table/Table";
import {useForm} from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import Title from "antd/es/typography/Title";
import Checkbox from "antd/es/checkbox/Checkbox";
import PhoneInput, {locale} from "antd-phone-input";
import Paragraph from "antd/es/typography/Paragraph";
import ConfigProvider from "antd/es/config-provider";
import SunOutlined from "@ant-design/icons/SunOutlined";
import MoonOutlined from "@ant-design/icons/MoonOutlined";
import CopyOutlined from "@ant-design/icons/CopyOutlined";
import CheckOutlined from "@ant-design/icons/CheckOutlined";
import GithubOutlined from "@ant-design/icons/GithubOutlined";

import "antd/dist/reset.css";

const languages = [
    {label: "Arabic", value: "arEG"},
    {label: "Azerbaijani", value: "azAZ"},
    {label: "Bulgarian", value: "bgBG"},
    {label: "Bangla (Bangladesh)", value: "bnBD"},
    {label: "Belarusian", value: "byBY"},
    {label: "Catalan", value: "caES"},
    {label: "Czech", value: "csCZ"},
    {label: "Danish", value: "daDK"},
    {label: "German", value: "deDE"},
    {label: "Greek", value: "elGR"},
    {label: "English (United Kingdom)", value: "enGB"},
    {label: "English", value: "enUS"},
    {label: "Spanish", value: "esES"},
    {label: "Estonian", value: "etEE"},
    {label: "Persian", value: "faIR"},
    {label: "Finnish", value: "fiFI"},
    {label: "French (Belgium)", value: "frBE"},
    {label: "French (Canada)", value: "frCA"},
    {label: "French (France)", value: "frFR"},
    {label: "Irish (Ireland)", value: "gaIE"},
    {label: "Galician (Spain)", value: "glES"},
    {label: "Hebrew", value: "heIL"},
    {label: "Hindi", value: "hiIN"},
    {label: "Croatian", value: "hrHR"},
    {label: "Hungarian", value: "huHU"},
    {label: "Armenian", value: "hyAM"},
    {label: "Indonesian", value: "idID"},
    {label: "Italian", value: "itIT"},
    {label: "Icelandic", value: "isIS"},
    {label: "Japanese", value: "jaJP"},
    {label: "Georgian", value: "kaGE"},
    {label: "Kurdish (Kurmanji)", value: "kmrIQ"},
    {label: "Kannada", value: "knIN"},
    {label: "Kazakh", value: "kkKZ"},
    {label: "Khmer", value: "kmKH"},
    {label: "Korean", value: "koKR"},
    {label: "Lithuanian", value: "ltLT"},
    {label: "Latvian", value: "lvLV"},
    {label: "Macedonian", value: "mkMK"},
    {label: "Malayalam (India)", value: "mlIN"},
    {label: "Mongolian", value: "mnMN"},
    {label: "Malay (Malaysia)", value: "msMY"},
    {label: "Norwegian", value: "nbNO"},
    {label: "Nepal", value: "neNP"},
    {label: "Dutch (Belgium)", value: "nlBE"},
    {label: "Dutch", value: "nlNL"},
    {label: "Polish", value: "plPL"},
    {label: "Portuguese (Brazil)", value: "ptBR"},
    {label: "Portuguese", value: "ptPT"},
    {label: "Romanian", value: "roRO"},
    {label: "Russian", value: "ruRU"},
    {label: "Sinhalese / Sinhala", value: "siLK"},
    {label: "Slovak", value: "skSK"},
    {label: "Serbian", value: "srRS"},
    {label: "Slovenian", value: "slSI"},
    {label: "Swedish", value: "svSE"},
    {label: "Tamil", value: "taIN"},
    {label: "Thai", value: "thTH"},
    {label: "Turkish", value: "trTR"},
    {label: "Turkmen", value: "tkTK"},
    {label: "Urdu (Pakistan)", value: "urPK"},
    {label: "Ukrainian", value: "ukUA"},
    {label: "Uzbek", value: "uzUZ"},
    {label: "Vietnamese", value: "viVN"},
    {label: "Chinese (Simplified)", value: "zhCN"},
    {label: "Chinese (Traditional)", value: "zhHK"},
    {label: "Chinese (Traditional)", value: "zhTW"}
]

const [majorVersion, _1, _2] = version.split(".").map(Number);

const defaultMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "darkAlgorithm" : "defaultAlgorithm";

const Demo = () => {
    const [form] = useForm();
    const [lang, setLang] = useState<any>("enUS");
    const [size, setSize] = useState<any>("middle");
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
    const [algorithm, setAlgorithm] = useState(defaultMode);

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
        if (algorithm === "defaultAlgorithm") {
            setAlgorithm("darkAlgorithm");
        } else {
            setAlgorithm("defaultAlgorithm");
        }
    }

    const handleFinish = ({phone}: any) => setValue(phone);

    return (
        <ConfigProvider
            locale={lang !== "enUS" ? locale(lang) : undefined}
            theme={{
                components: {
                    Button: {defaultShadow: "none", primaryShadow: "none"},
                    Table: {headerBorderRadius: 0, rowHoverBg: "transparent"},
                },
                algorithm: algorithm === "defaultAlgorithm" ? theme.defaultAlgorithm : theme.darkAlgorithm,
            }}>
            <Card style={{height: "100%", borderRadius: 0, border: "none"}}
                  styles={{body: {
                      padding: 0,
                      display: "flex",
                      justifyContent: "center",
                  }}}>
                <div style={{
                    margin: 10,
                    maxWidth: 415,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Title level={2} style={{fontSize: "1.6rem", textAlign: "right"}}>
                        Ant Phone Input Playground
                    </Title>
                    <div style={{display: "flex", justifyContent: "flex-end", marginBottom: 15, gap: 10}}>
                        <Button
                            target="_blank"
                            type={majorVersion === 4 ? "primary" : "default"}
                            icon={<div style={{width: 22, height: 22}}>4.x</div>}
                            style={{pointerEvents: majorVersion === 4 ? "none" : "auto"}}
                            href="https://playground.typesnippet.org/antd-phone-input-4.x/"
                        />
                        <Button
                            target="_blank"
                            type={majorVersion === 5 ? "primary" : "default"}
                            icon={<div style={{width: 22, height: 22}}>5.x</div>}
                            style={{pointerEvents: majorVersion === 5 ? "none" : "auto"}}
                            href="https://playground.typesnippet.org/antd-phone-input-5.x/"
                        />
                        <Button
                            target="_blank"
                            type={majorVersion === 6 ? "primary" : "default"}
                            icon={<div style={{width: 22, height: 22}}>6.x</div>}
                            style={{pointerEvents: majorVersion === 6 ? "none" : "auto"}}
                            href="https://playground.typesnippet.org/antd-phone-input-6.x/"
                        />
                        <Button
                            target="_blank"
                            href="https://typesnippet.org"
                            icon={<img style={{width: 22, height: 22}} src="https://github.com/typesnippet.png"
                                       alt="Icon"/>}
                        />
                        <Button
                            target="_blank"
                            icon={<GithubOutlined/>}
                            href="//github.com/typesnippet/antd-phone-input"
                        />
                        <Button
                            onClick={changeTheme}
                            icon={algorithm === "defaultAlgorithm" ? <MoonOutlined/> : <SunOutlined/>}
                        />
                    </div>
                    <Paragraph style={{textAlign: "justify", marginBottom: 0}}>
                        This is a playground for the Ant Phone Input component. You can change the settings and see how
                        the component behaves. Also, see the code for the component and the value it returns.
                    </Paragraph>
                    <Divider orientation="left" plain>Settings</Divider>
                    <Table
                        size="small"
                        pagination={false}
                        showHeader={false}
                        columns={[
                            {title: "", dataIndex: "title"},
                            {title: "", dataIndex: "state", align: "right"},
                        ]}
                        dataSource={[
                            {
                                title: "Dropdown",
                                state: <Checkbox
                                    checked={dropdown}
                                    onChange={() => setDropdown(!dropdown)}
                                />,
                            },
                            {
                                title: "Parentheses",
                                state: <Checkbox
                                    checked={parentheses}
                                    onChange={() => setParentheses(!parentheses)}
                                />,
                            },
                            {
                                title: "Strict Validation",
                                state: <Checkbox
                                    checked={strict}
                                    onChange={() => setStrict(!strict)}
                                />,
                            },
                            {
                                title: "SVG Icons",
                                state: <Checkbox
                                    checked={useSvg}
                                    onChange={() => setUseSvg(!useSvg)}
                                />,
                            },
                            {
                                title: "Disabled",
                                state: <Checkbox
                                    checked={disabled}
                                    onChange={() => setDisabled(!disabled)}
                                />,
                            },
                            {
                                title: "Distinct",
                                state: <Checkbox
                                    checked={distinct}
                                    onChange={() => setDistinct(!distinct)}
                                />,
                            },
                            {
                                title: "Search",
                                state: <Checkbox
                                    checked={search}
                                    disabled={!dropdown}
                                    onChange={() => setSearch(!search)}
                                />,
                            },
                            {
                                title: "Arrow",
                                state: <Checkbox
                                    checked={arrow}
                                    onChange={() => setArrow(!arrow)}
                                />,
                            },
                            {
                                title: "Size",
                                state: <Select
                                    size="small"
                                    value={size}
                                    onChange={setSize}
                                    options={[
                                        {value: "small", label: "Small"},
                                        {value: "middle", label: "Middle"},
                                        {value: "large", label: "Large"},
                                    ]}
                                />,
                            },
                            {
                                title: "Localization",
                                state: <Select
                                    size="small"
                                    value={lang}
                                    onChange={setLang}
                                    options={languages}
                                    style={{maxWidth: 170}}
                                    popupMatchSelectWidth={false}
                                />,
                            },
                        ]}
                        style={{
                            border: `1px solid ${algorithm === "defaultAlgorithm" ? "#f0f0f0" : "#303030"}`,
                            background: algorithm === "defaultAlgorithm" ? "#efefef" : "#1f1f1f",
                            borderRadius: 4, borderBottom: "none", overflow: "hidden",
                        }}
                    />
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
                            background: algorithm === "defaultAlgorithm" ? "#efefef" : "#1f1f1f",
                            color: algorithm === "defaultAlgorithm" ? "#1f1f1f" : "#efefef",
                            padding: 10, marginBottom: 0, borderRadius: 4,
                        }}>
                            {code}
                        </pre>
                    </div>
                    <Divider orientation="left" plain>Component</Divider>
                    <Form form={form} onFinish={handleFinish}>
                        <FormItem name="phone" rules={[{validator}]}>
                            <PhoneInput
                                size={size}
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
                                background: algorithm === "defaultAlgorithm" ? "#efefef" : "#1f1f1f",
                                color: algorithm === "defaultAlgorithm" ? "#1f1f1f" : "#efefef",
                                padding: 10, marginBottom: 24, borderRadius: 4,
                            }}>
                                {JSON.stringify(value, null, 2)}
                            </pre>
                        )}
                        <div style={{display: "flex", gap: 24, justifyContent: "flex-start"}}>
                            <Button htmlType="submit" type="primary" style={{width: "50%"}}>Preview Value</Button>
                            <Button htmlType="reset" style={{width: "50%"}}>Reset Value</Button>
                        </div>
                    </Form>
                    <Alert
                        type="info"
                        style={{margin: "24px 0 14px 0"}}
                        message={<>
                            If your application uses a different version of <b>Ant Design</b>, you should check out
                            the&nbsp;<a target="_blank" rel="noreferrer"
                                         href="//github.com/typesnippet/antd-phone-input/tree/master/examples">examples</a>&nbsp;to
                            test the component.
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
                    </div>
                </div>
            </Card>
        </ConfigProvider>
    )
}

export default Demo;
