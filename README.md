# Antd Phone Input

[![npm](https://img.shields.io/npm/v/antd-phone-input)](https://www.npmjs.com/package/antd-phone-input)
[![antd](https://img.shields.io/badge/antd-4.x%20%7C%205.x-blue)](https://github.com/ant-design/ant-design)
[![types](https://img.shields.io/npm/types/antd-phone-input)](https://www.npmjs.com/package/antd-phone-input)
[![License](https://img.shields.io/npm/l/antd-phone-input)](https://github.com/ArtyomVancyan/antd-phone-input/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
[![Tests](https://github.com/ArtyomVancyan/antd-phone-input/actions/workflows/tests.yml/badge.svg)](https://github.com/ArtyomVancyan/antd-phone-input/actions/workflows/tests.yml)

Advanced phone input component for [Ant Design](https://github.com/ant-design/ant-design) that provides support for all
countries and is compatible with [`antd`](https://github.com/ant-design/ant-design) 4 and 5 versions. It has built-in
support for area codes and provides [strict validation](#validation) to ensure the entered numbers are valid. This
open-source project is designed to simplify the process of collecting phone numbers from users.

## Installation

```shell
npm i antd-phone-input
```

```shell
yarn add antd-phone-input
```

## Usage

The library is designed to work with the `4.x` and `5.x` series of versions in the same way. It can be used as a regular
Ant [Input](https://ant.design/components/input) (see the sample below). More usage examples can be found in
the [examples](examples) directory.

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

## Value

The value of the component is an object containing the parts of the phone number. This format of value gives a wide
range of opportunities for handling the data in your desired way.

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

The `valid` function of the value object returns the current validity of the entered phone number based on the selected
country. So this can be used in a `validator` like this:

```javascript
const validator = (_, {valid}) => {
  // if (valid(true)) return Promise.resolve(); // strict validation
  if (valid()) return Promise.resolve(); // non-strict validation
  return Promise.reject("Invalid phone number");
}

return (
  <FormItem rules={[{validator}]}>
    <PhoneInput/>
  </FormItem>
)
```

By default, the `valid` function validates the phone number based on the possible supported lengths of the selected
country. But it also supports a strict validation that apart from the length also checks if the area code is valid for
the selected country. To enable strict validation, pass `true` as the first argument of the `valid` function.

## Props

Apart from the below-described phone-specific properties, all [Input](https://ant.design/components/input#input)
properties that are supported by the used `antd` version, can be applied to the phone input component.

| Property           | Description                                                                                                                                                                 | Type                      |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| value              | An object containing a parsed phone number or the raw number. This also applies to the `initialValue` property of [Form.Item](https://ant.design/components/form#formitem). | [object](#value) / string |
| country            | Country code to be selected by default. By default, it will show the flag of the user's country.                                                                            | string                    |
| enableSearch       | Enables search in the country selection dropdown menu. Default value is `false`.                                                                                            | boolean                   |
| searchNotFound     | The value is shown if `enableSearch` is `true` and the query does not match any country. Default value is `No country found`.                                               | string                    |
| searchPlaceholder  | The value is shown if `enableSearch` is `true`. Default value is `Search country`.                                                                                          | string                    |
| disableDropdown    | Disables the manual country selection through the dropdown menu.                                                                                                            | boolean                   |
| onlyCountries      | Country codes to be included in the list. E.g. `onlyCountries={['us', 'ca', 'uk']}`.                                                                                        | string[]                  |
| excludeCountries   | Country codes to be excluded from the list of countries. E.g. `excludeCountries={['us', 'ca', 'uk']}`.                                                                      | string[]                  |
| preferredCountries | Country codes to be at the top of the list. E.g. `preferredCountries={['us', 'ca', 'uk']}`.                                                                                 | string[]                  |
| onChange           | The only difference from the original `onChange` is that value comes first.                                                                                                 | function(value, event)    |
| onMount            | The callback is triggered once the component gets mounted.                                                                                                                  | function(value)           |

## Contribute

Any contribution is welcome. If you have any ideas or suggestions, feel free to open an issue or a pull request. And
don't forget to add tests for your changes.

## License

Copyright (C) 2023 Artyom Vancyan. [MIT](LICENSE)
