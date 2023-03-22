import {version} from "antd";
import PhoneInput4 from "./index4";
import PhoneInput5 from "./index5";

export default version.startsWith("5") ? PhoneInput5 : PhoneInput4;
