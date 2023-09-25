export default (cssText: string) => {
	/** Resolve the overlap issue of the CSS rules when using Bootstrap */
	for (const styleSheet of Array.from(document.styleSheets)) {
		try {
			for (const rule of Array.from(styleSheet.cssRules || styleSheet.rules)) {
				if (rule instanceof CSSStyleRule) {
					rule.selectorText = rule.selectorText.replace(
						/^\.form-control(?=:|$)/,
						".form-control:not(.ant-input)",
					)
				}
			}
		} catch (e) {
		}
	}

	/** Inject the given `cssText` in the document head */
	const style = document.createElement("style");
	style.setAttribute("type", "text/css");

	if ((style as any).styleSheet) {
		(style as any).styleSheet.cssText = cssText;
	} else {
		style.appendChild(document.createTextNode(cssText));
	}

	document.head.appendChild(style);
}
