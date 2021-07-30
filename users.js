const fs = require('fs');
const fetch = require('node-fetch');

// Import api keys
const keys = require('./keys.js');

// genderize.io api key - only needed if you are using it more than 1,000 times, every user needs 2. 1 for nationalize and then 1 for genderize. 
const API_key = keys.genderize_api_key;

// read csv file - remember to change Resource.csv to your file with users from mixpanel
let data = fs.readFileSync('Resource.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => e.trim())); // split each line to array

const array = data;

// The data we are exporting when we've checked nationality and then gender 
module.exports.getNewData = getNewData;

async function getNewData() {
	
	let newArray = [];
	
	// Iterate over the data from the csv file - now set to an array
	for(let i = 1; i < array.length-1; i++) {

		// check if name is not undefined 
		if(!(array[i][1].includes("undefined"))) {

			// remove whitespace and additional characters from the values we need 
			let distinct_id = array[i][0].slice(1,-1);
			let first_name = encodeURIComponent(array[i][1].slice(1,-1).replace(/-/g, '').replace(/\s/g, ""));
			console.log(first_name);

			// use values to await for returning values in findGender
			let whatToPush = await findGender(distinct_id, first_name);
			
			// make sure we actually have gender before pushing user into new array
			if(!(whatToPush[2]===null)) {
				newArray.push(whatToPush);
			}
		}
	}
	
	return newArray;
}

// get values and then push back the new array for the user 
async function findGender(distinct_id, first_name) {
	
	let nationalitize = await nationality(first_name);
	let gender = await genderizeIO(first_name, nationalitize);
	
	return [distinct_id,first_name,gender,nationalitize];
}

// check nationality 
async function nationality(first_name) {
  	
	const url = 'https://api.nationalize.io?name='+first_name+'&apikey='+API_key;
  	const res = await fetch(url);
  	const data = await res.json();//assuming data is json
	const country = await data.country;

	if(data.country.length === 0) {
		return "null";
	} else {
		return await country[0].country_id;
	}
	
}

// check gender based on nationality
async function genderizeIO(first_name, nationality) {
	
	let url = '';
	
	// need to check that we were actually able to find nationality if not don't use the nationality query 
	if(nationality === "null") {
		url = 'https://api.genderize.io?name=' + first_name +'&apikey=' + API_key;
	} else {
		url = 'https://api.genderize.io?name=' + first_name + '&country_id=' + nationality +'&apikey=' + API_key;;
	}
  	
	const res = await fetch(url);
  	const data = await res.json();
	
	return await data.gender;
}

