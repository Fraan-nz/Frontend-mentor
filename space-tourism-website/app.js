const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
	const visiblity = nav.getAttribute("is-visible");
	if (visiblity === "false") {
		nav.setAttribute("is-visible", true);
		navToggle.setAttribute("aria-expanded", true);
	} else {
		nav.setAttribute("is-visible", false);
		navToggle.setAttribute("aria-expanded", false);
	}
});
