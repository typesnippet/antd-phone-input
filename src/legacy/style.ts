export default (cssText: string) => {
	const style = document.createElement("style");
	style.setAttribute("type", "text/css");

	if ((style as any).styleSheet) {
		(style as any).styleSheet.cssText = cssText;
	} else {
		style.appendChild(document.createTextNode(cssText));
	}

	document.head.appendChild(style);
}