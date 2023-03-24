import {version} from "antd";

import PhoneInput4 from "./Input4";
import PhoneInput5 from "./Input5";

import "./style5.css";

export default version.startsWith("5") ? PhoneInput5 : PhoneInput4;
