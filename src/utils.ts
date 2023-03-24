import {ParsePhoneNumber} from "./types";

import masks from "./phoneMasks.json";
import timezones from "./timezones.json";
import validations from "./validations.json";

type ISO2Code = keyof typeof masks;
type Timezone = keyof typeof timezones;

const getDefaultISO2Code = () => {
	/** Returns the default ISO2 code based on the user's timezone */
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone;
	return (timezones[timezone] || "").toLowerCase() || "us";
}

const parsePhoneNumber: ParsePhoneNumber = (value, data, formattedNumber) => {
	const isoCode = data?.countryCode;
	const countryCodePattern = /\+\d+/;
	const areaCodePattern = /\((\d+)\)/;

	/** Parses the matching partials of the phone number by predefined regex patterns */
	const countryCodeMatch = formattedNumber ? (formattedNumber.match(countryCodePattern) || []) : [];
	const areaCodeMatch = formattedNumber ? (formattedNumber.match(areaCodePattern) || []) : [];

	/** Converts the parsed values of the country and area codes to integers if values present */
	const countryCode = countryCodeMatch.length > 0 ? parseInt(countryCodeMatch[0]) : null;
	const areaCode = areaCodeMatch.length > 1 ? parseInt(areaCodeMatch[1]) : null;

	/** Parses the phone number by removing the country and area codes from the formatted value */
	const phoneNumberPattern = new RegExp(`^${countryCode}${(areaCode || "")}(\\d+)`);
	const phoneNumberMatch = value ? (value.match(phoneNumberPattern) || []) : [];
	const phoneNumber = phoneNumberMatch.length > 1 ? phoneNumberMatch[1] : null;

	/** Checks if both the area code and phone number length satisfy the validation rules */
	const rules = validations[isoCode as ISO2Code] || {areaCode: [], phoneNumber: []};
	const valid = [
		rules.areaCode.includes((areaCode || "").toString().length),
		rules.phoneNumber.includes((phoneNumber || "").toString().length),
	].every(Boolean);

	return {countryCode, areaCode, phoneNumber, isoCode, valid};
}

export {getDefaultISO2Code, masks, parsePhoneNumber};
