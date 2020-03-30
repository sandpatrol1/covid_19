// https://documenter.getpostman.com/view/2568274/SzS8rjbe?version=latest#intro
// https://covidapi.info/api/v1/country/DNK/latest

const dateH2 = document.querySelector("#date");
const casesH2 = document.querySelector("#cases");
const deathsH2 = document.querySelector("#deaths");
const recoveredH2 = document.querySelector("#recovered");

const getData = (url) => {
	return axios.get(url);
};

const insertData = ({data}) => {
	const {result} = data;
	console.log(result);
	const lastUpdated = Object.keys(result);
	dateH2.innerText = `Date: ${lastUpdated}`;
	casesH2.innerText = `Total Cases: ${result[lastUpdated].confirmed}`;
	deathsH2.innerText = `Total Deaths: ${result[lastUpdated].deaths}`;
	recoveredH2.innerText = `Total Recovered: ${result[lastUpdated].recovered}`;
};

// prettier-ignore
getData("https://covidapi.info/api/v1/country/DNK/latest")
	.then(insertData)
	.catch((err) => {
		console.log("ERROR", err);
	});
