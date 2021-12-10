const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

//tabs
let tabFocus = 0;

const changeTabFocus = (e) => {
	const keydownLeft = 37;
	const keydownRight = 39;

	if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
		tabs[tabFocus].setAttribute("tabindex", -1);
	}

	if (e.keyCode === keydownRight) {
		tabFocus++;
		if (tabFocus >= tabs.length) {
			tabFocus = 0;
		}
	}

	if (e.keyCode === keydownLeft) {
		tabFocus--;
		if (tabFocus < 0) {
			tabFocus = tabs.length - 1;
		}
	}

	tabs[tabFocus].setAttribute("tabindex", 0);
	tabs[tabFocus].focus();
};

const changeTabPanel = (e) => {
	const targetTab = e.target;
	const targetPanel = targetTab.getAttribute("aria-controls");
	const targetImage = targetTab.getAttribute("data-image");
	const tabContainer = targetTab.parentNode;
	const mainContainer = targetTab.parentNode.parentNode;

	tabContainer
		.querySelector('[aria-selected="true"]')
		.setAttribute("aria-selected", false);
	targetTab.setAttribute("aria-selected", true);

	mainContainer
		.querySelectorAll('[role="tabpanel"]')
		.forEach((panel) => panel.setAttribute("aria-hidden", true));
	mainContainer
		.querySelector([`#${targetPanel}`])
		.setAttribute("aria-hidden", false);

	mainContainer
		.querySelectorAll("picture")
		.forEach((picture) => picture.setAttribute("aria-hidden", true));
	mainContainer
		.querySelector([`#${targetImage}`])
		.setAttribute("aria-hidden", false);
};

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
	tab.addEventListener("click", changeTabPanel);
});
