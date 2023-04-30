import React, {lazy} from "react";
import ReactDOM from "react-dom/client";

const Light = lazy(() => import("./themes/Light"));
const Dark = lazy(() => import("./themes/Dark"));

const App = () => {
    return window.location.pathname === "/dark" ? <Dark/> : <Light/>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
