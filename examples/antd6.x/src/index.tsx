import ReactDOM from "react-dom/client";

import Demo from "./Demo";

const elem = document.getElementById("root");
const root = ReactDOM.createRoot(elem as Element);
root.render(<Demo/>);
