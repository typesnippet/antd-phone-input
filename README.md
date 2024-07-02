# Antd Phone Input <img src="https://github.com/typesnippet.png" align="right" height="64" />

[![npm](https://img.shields.io/npm/v/antd-phone-input)](https://www.npmjs.com/package/antd-phone-input)
[![Playground](https://img.shields.io/badge/playground-blue.svg?logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzEzNTE0OTc5MTUzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MjciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc2OCA1MDYuMDI2NjY3djExLjk0NjY2NmEzMi40MjY2NjcgMzIuNDI2NjY3IDAgMCAxLTE1Ljc4NjY2NyAyNy43MzMzMzRMMzcwLjM0NjY2NyA3NjhjLTIzLjA0IDEzLjY1MzMzMy0zNC45ODY2NjcgMTMuNjUzMzMzLTQ1LjIyNjY2NyA3LjY4bC0xMC42NjY2NjctNS45NzMzMzNhMzIuNDI2NjY3IDMyLjQyNjY2NyAwIDAgMS0xNS43ODY2NjYtMjYuODhWMjgxLjE3MzMzM2EzMi40MjY2NjcgMzIuNDI2NjY3IDAgMCAxIDE1Ljc4NjY2Ni0yNy43MzMzMzNsMTAuNjY2NjY3LTUuOTczMzMzYzEwLjI0LTUuOTczMzMzIDIyLjE4NjY2Ny01Ljk3MzMzMyA1Mi4wNTMzMzMgMTEuNTJsMzc1LjA0IDIxOS4zMDY2NjZhMzIuNDI2NjY3IDMyLjQyNjY2NyAwIDAgMSAxNS43ODY2NjcgMjcuNzMzMzM0eiIgcC1pZD0iMTYyOCIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMS40NzE5M2E4MVdiYjYyWiIgY2xhc3M9IiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg==)](https://playground.typesnippet.org/antd-phone-input-5.x)
[![antd](https://img.shields.io/badge/antd-4.x%20%7C%205.x-blue)](https://github.com/ant-design/ant-design)
[![types](https://img.shields.io/npm/types/antd-phone-input)](https://www.npmjs.com/package/antd-phone-input)
[![License](https://img.shields.io/npm/l/antd-phone-input)](https://github.com/typesnippet/antd-phone-input/blob/master/LICENSE)
[![Tests](https://github.com/typesnippet/antd-phone-input/actions/workflows/tests.yml/badge.svg)](https://github.com/typesnippet/antd-phone-input/actions/workflows/tests.yml)

<p>Advanced phone input component for Material UI that leverages the <a href="https://github.com/typesnippet/react-phone-hooks">react-phone-hooks</a> supporting all countries. The package is compatible with <a href="https://github.com/ant-design/ant-design">antd</a> 4 and 5 versions. It provides built-in support for area codes and strict validation.</p>

<p align="center">
  <a href="https://playground.typesnippet.org/antd-phone-input-5.x">
    <img src="https://github.com/typesnippet/antd-phone-input/assets/44609997/37386477-3ab5-4afb-9c85-88be676e8afe" alt="Antd Phone Input"/>
  </a>
</p>

## Value

The value of the component is an object containing the parts of the phone number. This format of value gives a wide range of opportunities for handling the data in your desired way.

```javascript
{
  countryCode: 1,
  areaCode: "702",
  phoneNumber: "1234567",
  isoCode: "us",
  valid: function valid(strict)
}
```

## Validation

The validation is checked by the `valid` function of the value object that returns a boolean value. An example with the [react-hook-form](https://www.npmjs.com/package/react-hook-form) is shown below:

```javascript
import React from "react";
import PhoneInput from "antd-phone-input";
import FormItem from "antd/es/form/FormItem";

const validator = (_, {valid}) => {
  // if (valid(true)) return Promise.resolve(); // strict validation
  if (valid()) return Promise.resolve(); // non-strict validation
  return Promise.reject("Invalid phone number");
}

const Demo = () => {
  return (
    <FormItem name="phone" rules={[{validator}]}>
      <PhoneInput enableSearch/>
    </FormItem>
  )
}

export default Demo;
```

The `valid` function primarily checks if a phone number has a length appropriate for its specified country. In addition, a more comprehensive validation can be performed, including verifying the dial and area codes' accuracy for the selected country. To activate the strict validation, pass `true` as the first argument to the `valid` function.

## Localization

The package provides a built-in localization feature that allows you to change the language of the component. The `locale` function returns the language object that can be passed to the `ConfigProvider` component of Ant Design.

```javascript
import PhoneInput, {locale} from "antd-phone-input";

<ConfigProvider locale={locale("frFR")}>
  <PhoneInput/>
</ConfigProvider>
```

NOTE: If you use localization in the [documented](https://ant.design/docs/react/i18n) way, you should replace the object passed to the `locale` property with the `locale` function, specifying the desired language code.

## Props

Apart from the phone-specific properties described below, all [Input](https://ant.design/components/input#input) properties supported by the used Ant Design version can be applied to the phone input component.

| Property           | Description                                                                                                                                                                 | Type                            |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| value              | An object containing a parsed phone number or the raw number. This also applies to the `initialValue` property of [Form.Item](https://ant.design/components/form#formitem). | [object](#value) / string       |
| country            | Country code to be selected by default. By default, it will show the flag of the user's country.                                                                            | string                          |
| enableArrow        | Shows an arrow next to the country flag. Default value is `false`.                                                                                                          | boolean                         |
| enableSearch       | Enables search in the country selection dropdown menu. Default value is `false`.                                                                                            | boolean                         |
| searchNotFound     | The value is shown if `enableSearch` is `true` and the query does not match any country. Default value is `No country found`.                                               | string                          |
| searchPlaceholder  | The value is shown if `enableSearch` is `true`. Default value is `Search country`.                                                                                          | string                          |
| disableDropdown    | Disables the manual country selection through the dropdown menu.                                                                                                            | boolean                         |
| disableParentheses | Disables parentheses from the input masks. Default enabled.                                                                                                                 | boolean                         |
| onlyCountries      | Country codes to be included in the list. E.g. `onlyCountries={['us', 'ca', 'uk']}`.                                                                                        | string[]                        |
| excludeCountries   | Country codes to be excluded from the list of countries. E.g. `excludeCountries={['us', 'ca', 'uk']}`.                                                                      | string[]                        |
| preferredCountries | Country codes to be at the top of the list. E.g. `preferredCountries={['us', 'ca', 'uk']}`.                                                                                 | string[]                        |
| dropdownRender     | Customize the dropdown menu content.                                                                                                                                        | (menu: ReactNode) => ReactNode  |
| onChange           | The only difference from the original `onChange` is that value comes first.                                                                                                 | function(value, event)          |
| onMount            | The callback is triggered once the component gets mounted.                                                                                                                  | function(value)                 |

## Contribute

Any contribution is welcome. Don't hesitate to open an issue or discussion if you have questions about your project's usage and integration. For ideas or suggestions, please open a pull request. Your name will shine on our contributors' list. Be proud of what you build!

## License

Copyright (C) 2023 Artyom Vancyan. [MIT](LICENSE)
