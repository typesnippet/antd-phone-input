import {injectStyles, jsonToCss} from "react-phone-hooks/styles";
import commonStyles from "react-phone-hooks/stylesheet.json";

import customStyles from "./resources/stylesheet.json";

export const injectMergedStyles = () => injectStyles(jsonToCss(Object.assign(commonStyles, customStyles)));
