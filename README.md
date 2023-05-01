# Antd Phone Input

[![npm](https://img.shields.io/npm/v/antd-phone-input)](https://www.npmjs.com/package/antd-phone-input)
[![antd](https://img.shields.io/badge/antd-4.x%20%7C%205.x-blue)](https://github.com/ant-design/ant-design)
[![types](https://img.shields.io/npm/types/antd-phone-input)](https://www.npmjs.com/package/antd-phone-input)
[![License](https://img.shields.io/npm/l/antd-phone-input)](https://github.com/ArtyomVancyan/antd-phone-input/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
[![Tests](https://github.com/ArtyomVancyan/antd-phone-input/actions/workflows/tests.yml/badge.svg)](https://github.com/ArtyomVancyan/antd-phone-input/actions/workflows/tests.yml)

Advanced phone input component for [Ant Design](https://github.com/ant-design/ant-design) that provides support for all
countries and is compatible with [`antd`](https://github.com/ant-design/ant-design) 4 and 5 versions. It has built-in
support for area codes and provides validation to ensure that the entered numbers are valid. This open-source project
is designed to simplify the process of collecting phone numbers from users.

## Install

```shell
npm i antd-phone-input
```

```shell
yarn add antd-phone-input
```

## Usage

The latest version does not require any additional actions for loading the styles as it uses
the [`cssinjs`](https://github.com/ant-design/cssinjs) ecosystem.

### Antd 5.x

```javascript
import React from "react";
import FormItem from "antd/es/form/FormItem";
import PhoneInput from "antd-phone-input";

const Demo = () => {
  return (
    <FormItem name="phone">
      <PhoneInput enableSearch/>
    </FormItem>
  )
}
```

![latest](https://user-images.githubusercontent.com/44609997/227775101-72b03e76-52bc-421d-8e75-a03c9d0d6d08.png)

### Antd 4.x

For `4.x` versions, you should use the `legacy` endpoint.

```javascript
import PhoneInput from "antd-phone-input/legacy";
```

For including the styles, you should import them in the main `less` file after importing either
the `antd/dist/antd.less` or `antd/dist/antd.dark.less` styles.

```diff
@import "~antd/dist/antd";
+ @import "~antd-phone-input/legacy/style";
```

![legacy](https://user-images.githubusercontent.com/44609997/227775155-9e22bc63-2148-4714-ba8a-9bb4e44c0128.png)

## Value

The value of the component is an object containing the parts of a phone number. This format of value gives a wide range
of opportunities for handling the data in your custom way. For example, you can easily merge the parts of the phone
number into a single string.

```json
{
  "countryCode": 1,
  "areaCode": 702,
  "phoneNumber": "1234567",
  "isoCode": "us",
  "valid": true
}
```

## Validation

The `valid` property of the value object shows the real-time validity of the phone number depending on the country. So
this can be used in a `validator` like this:

```javascript
const validator = (_, {valid}) => {
  if (valid) {
    return Promise.resolve();
  }
  return Promise.reject("Invalid phone number");
}

return (
  <FormItem rules={[{validator}]}>
    <PhoneInput/>
  </FormItem>
)
```

## Props

| Property           | Description                                                                                                                     | Type                |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------|---------------------|
| size               | Either `large`, `middle` or `small`. Default value is `middle`. See at ant [docs][antInputProps] for more.                      | string              |
| value              | An object containing the parts of phone number. E.g. `value={{countryCode: 1, areaCode: 702, phoneNumber: "1234567"}}`.         | object              |
| style              | Applies CSS styles to the container element.                                                                                    | CSSProperties       |
| className          | The value will be assigned to the container element.                                                                            | string              |
| disabled           | Disables the whole input component.                                                                                             | boolean             |
| enableSearch       | Enables search in the country selection dropdown menu. Default value is `false`.                                                | boolean             |
| disableDropdown    | Disables the manual country selection through the dropdown menu.                                                                | boolean             |
| inputProps         | [HTML properties of input][htmlInputProps] to pass into the input.  E.g. `inputProps={{autoFocus: true}}`.                      | InputHTMLAttributes |
| searchPlaceholder  | The value is shown if `enableSearch` is `true`. Default value is `search`.                                                      | string              |
| searchNotFound     | The value is shown if `enableSearch` is `true` and the query does not match any country. Default value is `No entries to show`. | string              |
| placeholder        | Custom placeholder. Default placeholder is `1 (702) 123-4567`.                                                                  | string              |
| country            | Country code to be selected by default. By default, it will show the flag of the user's country.                                | string              |
| regions            | Show only the countries of the specified regions. See the list of [available regions][reactPhoneRegions].                       | string[]            |
| onlyCountries      | Country codes to be included in the list. E.g. `onlyCountries={['us', 'ca', 'uk']}`.                                            | string[]            |
| excludeCountries   | Country codes to be excluded from the list of countries. E.g. `excludeCountries={['us', 'ca', 'uk']}`.                          | string[]            |
| preferredCountries | Country codes to be at the top of the list. E.g. `preferredCountries={['us', 'ca', 'uk']}`.                                     | string[]            |
| onChange           | Callback when the user is inputting. See at ant [docs][antInputProps] for more.                                                 | function(value, e)  |
| onPressEnter       | The callback function that is triggered when <kbd>Enter</kbd> key is pressed.                                                   | function(e)         |
| onFocus            | The callback is triggered when the input element is focused.                                                                    | function(e, value)  |
| onClick            | The callback is triggered when the user clicks on the input element.                                                            | function(e, value)  |
| onBlur             | The callback is triggered when the input element gets blurred or unfocused.                                                     | function(e, value)  |
| onKeyDown          | The callback is triggered when any key is pressed down.                                                                         | function(e)         |
| onMount            | The callback is triggered once the component gets mounted.                                                                      | function(e)         |

## Contribute

Any contribution is welcome. If you have any ideas or suggestions, feel free to open an issue or a pull request. And
don't forget to add tests for your changes.

## License

Copyright (C) 2023 Artyom Vancyan. [MIT](LICENSE)

[antInputProps]:https://ant.design/components/input#input

[reactPhoneRegions]:https://github.com/bl00mber/react-phone-input-2#regions

[htmlInputProps]:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
