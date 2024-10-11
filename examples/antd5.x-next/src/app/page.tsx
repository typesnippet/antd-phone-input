import dynamic from "next/dynamic";

const PhoneInput = dynamic(() => import("antd-phone-input"), {ssr: false});

export default function Home() {
    return <PhoneInput/>;
}
