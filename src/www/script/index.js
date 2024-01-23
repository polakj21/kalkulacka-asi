$(document).ready(() => {
	addCount('...');

	$('#c').click(() => C());
	$('#ce').click(() => CE());
	$('#backspace').click(() => backspace());
	$('#percent').click(() => percent());

	$('#sqr').click(() => sqr());
	$('#sqrt').click(() => sqrt());
	$('#reverse').click(() => reverse());

	$('#div').click(() => addOperation($('#div')));
	$('#mul').click(() => addOperation($('#mul')));
	$('#min').click(() => addOperation($('#min')));
	$('#plu').click(() => addOperation($('#plu')));

	$('#plumin').click(() => plusMinus());
	$('#dot').click(() => addDot());
	$('#equals').click(() => equals());

	$('#1').click(() => writeNum($('#1')));
	$('#2').click(() => writeNum($('#2')));
	$('#3').click(() => writeNum($('#3')));
	$('#4').click(() => writeNum($('#4')));
	$('#5').click(() => writeNum($('#5')));
	$('#6').click(() => writeNum($('#6')));
	$('#7').click(() => writeNum($('#7')));
	$('#8').click(() => writeNum($('#8')));
	$('#9').click(() => writeNum($('#9')));
	$('#0').click(() => writeNum($('#0')));
});
		
let operation = null;

function writeNum (tlacitko) {
	if ($('#outcome').html() == "0")
		$('#outcome').html('');
	$('#outcome').html($('#outcome').html() + tlacitko.html());
	addCount(tlacitko.html());
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
	if ($("#outcome").html().indexOf(".") == -1)
		$('#outcome').html($('#outcome').html() + ".");
}

function plusMinus () {
	if ($("#outcome").html() != "0") {
		if ($("#outcome").html()[0] == "-") {
			$('#outcome').html($("#outcome").html().substring(1));
		} else {
			$("#outcome").html("-" + $("#outcome").html());
		}
	}
}

function backspace () {
	$("#outcome").html($("#outcome").html().substring(0, $("#outcome").html().length-1));
	if ($("#outcome").html() == "" || $("#outcome").html() == "-")
		$("#outcome").html("0");
}

function addOperation (tlacitko) {
	setPrev();
	operation = tlacitko.html();
	$("#outcome").html("0");
}

function equals () {
	setPrev();
	$("#outcome").html($("#prev").html()); 
}


function setPrev() {
	switch (operation) {
		case null:
			$("#prev").html($("#outcome").html());
			break;
	
		case "+":
			$("#prev").html(String(Number($("#prev").html()) + Number($("#outcome").html())));
			break;

		case "-":
			$("#prev").html(String(Number($("#prev").html()) - Number($("#outcome").html())));
			break;

		case "*":
			$("#prev").html(String(Number($("#prev").html()) * Number($("#outcome").html())));
			break;

		case "/":
			$("#prev").html(String(Number($("#prev").html()) / Number($("#outcome").html())));
			break;
	}

	operation = null;
	console.log($("#prev").html());
}

function sqrt () {
	$('#outcome').html(Math.sqrt(Number($('#outcome').html())));
}

function sqr () {
	$('#outcome').html(Number($('#outcome').html()) * Number($('#outcome').html()));
}

function reverse () {
	if ($('#outcome').html() != "0")
		$('#outcome').html(1 / Number($('#outcome').html()));
}

function C () {
	$('#prev').html('0');
	operation = null;
	$('#outcome').html('0');
}

function CE () {
	$('#outcome').html('0');
}

function percent () {
	$('#outcome').html((Number($("#prev").html()) / 100) * Number($('#outcome').html()));
}

function copy () {
	navigator.clipboard.writeText($("#prev").html());
}

function makeTable(data) {
	 $('#count').html(`
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
	`);
}