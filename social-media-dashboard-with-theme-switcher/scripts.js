const darkToggle = document.querySelector("#darkMode");

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
	darkToggle.setAttribute("checked", true);
}

darkToggle.addEventListener("change", function (e) {
	console.log(this.checked);
	if (this.checked) {
		document.body.classList.remove("is-light-mode");
		document.body.classList.add("is-dark-mode");
	} else {
		document.body.classList.remove("is-dark-mode");
		document.body.classList.add("is-light-mode");
	}
});
