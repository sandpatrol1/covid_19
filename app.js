// API used for fetching COVID-19 data https://documenter.getpostman.com/view/2568274/SzS8rjbe?version=latest#intro
const container = document.querySelector("#container1");
const dateH2 = document.querySelector("#date");
const casesH2 = document.querySelector("#cases");
const deathsH2 = document.querySelector("#deaths");
const recoveredH2 = document.querySelector("#recovered");
const countrySelector = document.querySelector("#countries");

// Update countries select with all countries name and value as country code
for (let country of countryListAllIsoData) {
	const {name, code3} = country;
	const countryName = name;
	const countryCode = code3;
	const option = document.createElement("option");
	option.value = code3;
	option.innerText = name;
	countrySelector.append(option);
}

const getData = (url) => {
	return axios.get(url);
};

// Insert COVID-19 recent data H2s
const insertData = ({data}) => {
	const {result} = data;
	container.style.display = "block"; // Show the container and the children H2 + p
	const lastUpdated = Object.keys(result); // Date of latest data
	dateH2.innerText = `Date: ${lastUpdated}`;
	casesH2.innerText = `Cases: ${result[lastUpdated].confirmed}`;
	deathsH2.innerText = `Deaths: ${result[lastUpdated].deaths}`;
	recoveredH2.innerText = `Recovered: ${result[lastUpdated].recovered}`;
};

//  data for charts prepping
const chartData = ({data}) => {
	const dataObj = {};
	const confirmedArr = [];
	const {result} = data;
	console.log(result);
	const lastUpdated = Object.keys(result); // Date of latest data
	for (let i = 0; i < lastUpdated.length; i++) {
		confirmedArr.push(result[lastUpdated[i]].confirmed);
	}
	dataObj.time = lastUpdated;
	dataObj.confirmed = confirmedArr;
	console.log(dataObj);
	return dataObj;
};

// Trigger fetch of country specific COVID-19 data on select change
// Insert data
// Log errors and display no data if error
countrySelector.addEventListener("change", (event) => {
	const country3Letters = event.target.value;
	// prettier-ignore
	getData(`https://covidapi.info/api/v1/country/${country3Letters}/latest`)
	.then(insertData)
	.catch((err) => {
		console.log("ERROR", err);
		container.style.display = "block";
		dateH2.innerText = `Date: No data`;
		casesH2.innerText = `Cases: No data`;
		deathsH2.innerText = `Deaths: No data`;
		recoveredH2.innerText = `Recovered: No Data`;
	});
	// prettier-ignore
	getData(`https://covidapi.info/api/v1/country/${country3Letters}`)
		.then(chartData)
		.then(chartMaker)
		.then(() => {
			console.log('success')
		})
		.catch((err) => {
			console.log("ERROR", err);
		})
});

// line chart
const chartMaker = (dataObj) => {
	new Chart(document.getElementById("line-chart"), {
		type: "line",
		data: {
			labels: dataObj.time,
			datasets: [
				{
					data: dataObj.confirmed,
					label: "Confirmed Cases",
					borderColor: "#3e95cd",
					fill: false
				}
			]
		},
		options: {
			title: {
				display: true,
				text: "Confirmed Cases"
			}
		}
	});
};
