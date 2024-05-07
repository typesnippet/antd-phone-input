import {lazy} from "react";
import ReactDOM from "react-dom/client";

const Light = lazy(() => import("./themes/Light"));
const Dark = lazy(() => import("./themes/Dark"));

const App = () => {
    return window.location.pathname.endsWith("/dark") ? <Dark/> : <Light/>;
}

const elem = document.getElementById("root");
const root = ReactDOM.createRoot(elem as Element);
root.render(<App/>);
