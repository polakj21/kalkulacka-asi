const express = require('express');
const jsondb = require('simple-json-db');

const app = express();
const db = new jsondb('./data/cisla.json');

// middle-ware pro prijem dat v JSONu
app.use(express.json());

app.use(express.static('./www'));

// koncovy bod pro dotaz z klienta
app.post('/prihlasit', (req, res) => {
	const adresa = req.body.adresa;
	
	if(db.has(adresa)) {
		res.json({uspech: false});
	} else {
		db.set(adresa, {subscribed: true});
		
		res.json({uspech: true});
	}
});

app.post('/odhlasit', (req, res) => {
	const adresa = req.body.adresa;
	
	if(!db.has(adresa)) {
		res.json({uspech: false});
	} else {
		db.set(adresa, {subscribed: false});
		
		res.json({uspech: true});
	}
});


//////////////////////// kalkulacka ///////////////////////////////
app.post("/addNum", (req, res) => {
	const number = req.body.number;

	if (!db.has(number)) {
		db.set(0, {count: 0});
		db.set(1, {count: 0});
		db.set(2, {count: 0});
		db.set(3, {count: 0});
		db.set(4, {count: 0});
		db.set(5, {count: 0});
		db.set(6, {count: 0});
		db.set(7, {count: 0});
		db.set(8, {count: 0});
		db.set(9, {count: 0});
		db.set("...", {count: 0});
	}

	db.set(number, {count: Number(db.get(number).count) + 1})
	console.log(number);
	res.json(db.JSON());
})

module.exports = app;
