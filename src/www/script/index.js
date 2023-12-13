const outcome = document.getElementById('outcome');
const prev = document.getElementById('prev');
const count = document.getElementById('count');
		
let operation = null;

function writeNum (tlacitko) {
	if (outcome.innerHTML == "0")
		outcome.innerHTML = "";
	outcome.innerHTML += tlacitko.innerHTML;
	addCount(tlacitko.innerHTML);
}

function addCount(num) {
	fetch("/addNum", {
				method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ number: num })
	})
	.then(odpoved => odpoved.json())
	.then(data => {
		makeTable(data);
	});
}

function addDot () {
	if (outcome.innerHTML.indexOf(".") == -1)
		outcome.innerHTML += ".";
}

function plusMinus () {
	if (outcome.innerHTML != "0") {
		if (outcome.innerHTML[0] == "-") {
			outcome.innerHTML = outcome.innerHTML.substring(1);
		} else {
			outcome.innerHTML = "-" + outcome.innerHTML;
		}
	}
}

function backspace () {
	outcome.innerHTML = outcome.innerHTML.substring(0, outcome.innerHTML.length-1);
	if (outcome.innerHTML == "" || outcome.innerHTML == "-")
		outcome.innerHTML = "0";
}

function addOperation (tlacitko) {
	setPrev();
	operation = tlacitko.innerHTML;
	outcome.innerHTML = 0;
}

function equals () {
	setPrev();
	outcome.innerHTML = prev.innerHTML; 
}

function setPrev() {
	switch (operation) {
		case null:
			prev.innerHTML = outcome.innerHTML;
			break;
	
		case "+":
			prev.innerHTML = String(Number(prev.innerHTML) + Number(outcome.innerHTML));
			break;

		case "-":
			prev.innerHTML = String(Number(prev.innerHTML) - Number(outcome.innerHTML));
			break;

		case "*":
			prev.innerHTML = String(Number(prev.innerHTML) * Number(outcome.innerHTML));
			break;

		case "/":
			prev.innerHTML = String(Number(prev.innerHTML) / Number(outcome.innerHTML));
			break;
	}

	operation = null;
	console.log(prev.innerHTML);
}

function sqrt () {
	outcome.innerHTML = Math.sqrt(Number(outcome.innerHTML));
}

function sqr () {
	outcome.innerHTML = Number(outcome.innerHTML) * Number(outcome.innerHTML);
}

function reverse () {
	if (outcome.innerHTML != "0")
		outcome.innerHTML = 1 / Number(outcome.innerHTML);
}

function C () {
	prev.innerHTML = 0;
	operation = null;
	outcome.innerHTML = "0";
}

function CE () {
	outcome.innerHTML = "0";
}

function percent () {
	outcome.innerHTML = (Number(prev.innerHTML) / 100) * Number(outcome.innerHTML)
}

function copy () {
	navigator.clipboard.writeText(prev.innerHTML);
}

function makeTable(data) {
	count.innerHTML = `
	<table>
		<tr>
			<td>0<td>
			<td>${data[0].count}</td>
		</tr>
		<tr>
			<td>1<td>
			<td>${data[1].count}</td>
		</tr>
		<tr>
			<td>2<td>
			<td>${data[2].count}</td>
		</tr>
		<tr>
			<td>3<td>
			<td>${data[3].count}</td>
		</tr>
		<tr>
			<td>4<td>
			<td>${data[4].count}</td>
		</tr>
		<tr>
			<td>5<td>
			<td>${data[5].count}</td>
		</tr>
		<tr>
			<td>6<td>
			<td>${data[6].count}</td>
		</tr>
		<tr>
			<td>7<td>
			<td>${data[7].count}</td>
		</tr>
		<tr>
			<td>8<td>
			<td>${data[8].count}</td>
		</tr>
		<tr>
			<td>9<td>
			<td>${data[9].count}</td>
		</tr>
	</table>
	`;
}