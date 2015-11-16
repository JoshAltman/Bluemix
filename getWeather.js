function getWeather(input, unit){
	//assuming all queries refer to locations within the US

	if(typeof input === 'undefined' || input == ""){
		//handle empty input
		return "";
	}

	//url for api starts query
	var query = "http://api.openweathermap.org/data/2.5/weather?";

	if(isNaN(input)){//if input is a city name
		query += "q="+input;
	}
	else{//if input is a number
		query += "zip="+input;
	}

	//optional unit parameter
	if(typeof unit !== 'undefined'){
		query += "&units="+unit;
	}

	//api key
	query += "&appid=2de143494c0b295cca9337e1e96b00e0";

	var response = JSON.parse(httpGet(query));

	var output = {};
	output["coord"] = response.coord;
	output["conditions"] = response.weather[0].description;
	output["temp"] = {};
	output["temp"]["main"] = response.main.temp;
	output["temp"]["high"] = response.main.temp_max;
	output["temp"]["low"] = response.main.temp_min;

	return JSON.stringify(output);

}

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);

    return xmlHttp.response;
}

