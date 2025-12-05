import {lazy} from "react";
import ReactDOM from "react-dom/client";

const Light = lazy(() => import("./themes/Light"));
const Dark = lazy(() => import("./themes/Dark"));

const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const isSelectedDark = window.location.pathname.endsWith("/dark");
const isSelectedLight = window.location.pathname.endsWith("/light");

const App = () => {
    if (isSystemDark && !isSelectedDark && !isSelectedLight) window.location.replace("/dark");
    else if (!isSystemDark &&  !isSelectedDark && !isSelectedLight) window.location.replace("/light");

    return isSelectedDark ? <Dark/> : <Light/>;
}

const elem = document.getElementById("root");
const root = ReactDOM.createRoot(elem as Element);
root.render(<App/>);
