const userHand = document.querySelector("#hands");
const duelResult = document.querySelector("#duel-result");
const rules = document.querySelector("#rules");
const countScore = document.querySelector("#score");
const buttonPlay = document.querySelector("#play-btn");
const buttonRules = document.querySelector("#rules-btn");
const buttonClose = document.querySelector("#close-btn");
const optionHand = ["paper", "scissors", "rock"];
let score = 0;

//Creo el html dinamico que muestra el resultado
const createResult = (player, ia, resultText) => {
	duelResult.innerHTML = `
	<div class="player-hand">
	<div id="${player}" class="hands__${player} hands__selected">
		<div class="hands__img">
			<img src="./resources/images/icon-${player}.svg" alt="${player}" />
		</div>
	</div>
	<h2 class="duel__title">YOU PICKED</h2>
</div>

<div class="result">
	<h3 class="result__title">${resultText}</h3>
	<button id="play-btn" class="play-btn">PLAY AGAIN</button>
</div>

<div class="ia-hand">
	<div id="${ia}" class="hands__${ia} hands__selected">
		<div class="hands__img">
			<img src="./resources/images/icon-${ia}.svg" alt="${ia}" />
		</div>
	</div>
	<h2 class="duel__title">THE HOUSE PICKED</h2>
</div>
`;
};

//Genero variable con el resultado del duelo y en caso de ganar aumento el contador
const play = (player, ia) => {
	let resultText;
	if (player == "paper" && ia == "rock") {
		resultText = "YOU WIN";
		score++;
	} else if (player == "paper" && ia == "scissors") {
		resultText = "YOU LOSE";
	} else if (player == "rock" && ia == "scissors") {
		resultText = "YOU WIN";
		score++;
	} else if (player == "rock" && ia == "paper") {
		resultText = "YOU LOSE";
	} else if (player == "scissors" && ia == "paper") {
		resultText = "YOU WIN";
		score++;
	} else if (player == "scissors" && ia == "rock") {
		resultText = "YOU LOSE";
	} else resultText = "DRAW";
	return resultText;
};

//Me aseguro de obtener el id correcto
//Genero un numero random entre 0 y 2 para la mano de la ia
//Agrego clase winner al ganador
userHand.addEventListener("click", (e) => {
	let player;
	if (e.target.id !== "hands") {
		optionHand.indexOf(e.target.parentElement.parentElement.id) != -1
			? (player = e.target.parentElement.parentElement.id)
			: optionHand.indexOf(e.target.parentElement.id) != -1
			? (player = e.target.parentElement.id)
			: optionHand.indexOf(e.target.id) != -1
			? (player = e.target.id)
			: (player = "");
		userHand.classList.toggle("visible");
		duelResult.classList.toggle("visible");
		if (player != "") {
			let random = Math.round(Math.random() * 2);
			let ia = optionHand[random];
			let resultTextplay = play(player, ia);
			createResult(player, ia, resultTextplay);
			countScore.innerHTML = score;
			if (resultTextplay === "YOU WIN") {
				document
					.querySelector(`#${player}.hands__selected`)
					.classList.add("winner");
			} else if (resultTextplay === "YOU LOSE") {
				document
					.querySelector(`#${ia}.hands__selected`)
					.classList.add("winner");
			}
		}
	}
});

//Oculto la vista del resultado y permito jugar una vez mas
duelResult.addEventListener("click", (e) => {
	if (e.target.id == "play-btn") {
		userHand.classList.toggle("visible");
		duelResult.classList.toggle("visible");
	}
});

//Abrir y cerrar modal reglas
buttonRules.addEventListener("click", () => {
	rules.classList.toggle("visible");
	buttonRules.style.pointerEvents = "none";
});
buttonClose.addEventListener("click", () => {
	rules.classList.toggle("visible");
	buttonRules.style.pointerEvents = "auto";
});
