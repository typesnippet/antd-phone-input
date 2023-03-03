# antd-phone-input

Advanced Phone Number Input for [Ant Design](https://github.com/ant-design/ant-design).

[![npm](https://img.shields.io/npm/v/antd-phone-input)](https://www.npmjs.com/package/antd-phone-input)
[![types](https://img.shields.io/npm/types/antd-phone-input)](https://www.npmjs.com/package/antd-phone-input)
[![License](https://img.shields.io/npm/l/antd-phone-input)](https://github.com/ArtyomVancyan/antd-phone-input/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
[![Tests](https://github.com/ArtyomVancyan/antd-phone-input/actions/workflows/tests.yml/badge.svg)](https://github.com/ArtyomVancyan/antd-phone-input/actions/workflows/tests.yml)

## Install

```shell
npm i antd-phone-input
```

```shell
yarn add antd-phone-input
```

## Usage

### Antd 4.x

```javascript
import React from "react";
import PhoneInput from "antd-phone-input";
import FormItem from "antd/es/form/FormItem";

const Demo = () => {
  return (
    <FormItem name="phone">
      <PhoneInput enableSearch/>
    </FormItem>
  )
}
```

### Antd 5.x

```ascii
v5.x does not have support yet
this issue is covered in GH-20
```

## Value

The value of the component is an object containing the parts of a phone number. This format of value gives a wide range
of opportunities for handling the data in your custom way. For example, you can easily merge the parts of the phone
number into a single string.

```json
{
  "countryCode": 1,
  "areaCode": 702,
  "phoneNumber": "1234567",
  "isoCode": "us"
}
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
