function CreateRequest(city) {
	var requestURL = 'http://api.openweathermap.org/data/2.5/weather?q='
		+ city + '&appid=86c0cb2383f69fc2f22f63961ba83dc8&units=metric&lang=ru';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();

	
	request.onload = function() {
		var json = request.response;
		console.log(json);
		
		if (json.cod == 404) {
			CreateErrorTag('Такой город не найден :(');
		} else {
			CreateMainDiv(json);			
		}
	}
}