function GetDate(time) {
	var date = new Date(time * 1000);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();

	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

	console.log(formattedTime);
		var d = new Date();
		var days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
		console.log("Сейчас " + days[d.getUTCDay()] + ", " + d.getUTCHours() + ":" + d.getUTCMinutes()); //time doesnt work correctlly
	}
	
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

	function GetCityValue() {
		var city = prompt('В каком городе вы живете?', 'Москва');
		CreateRequest(city);
		RemoveStartButton();
	}

	function RemoveStartButton() {
		var button = document.getElementById("start");
		if (button != null) {
			button.remove();
		}
	}

	function RemoveErrorTag() {
		var tag = document.getElementById("error");
		if (tag != null) {
			tag.remove();
		}
	}

	function RemoveMainDiv() {
		var div = document.getElementById("main");
		if (div != null) {
			div.remove();
		}
	}

	function CreateStartButton() {
		if (document.getElementById("error") != null) {
			return ;
		}
		var button = document.createElement("button");
		button.id = "start";
		button.innerText = "Узнать погоду";
		document.body.append(button);
		button.addEventListener("click", GetCityValue);
	}

	function ParseDescription(description) {
		if (description.search('пасмурно') != -1) {
			;
		} else if (description.search('ясно') != -1) {
			;
		} else if (description.search('снег') != -1) {
			;
		} else if (description.search('дождь') != -1) {
			
		} else if (description.search('обл') != -1
			|| description.search('пасмурно')) {
		}
	}
	
	function CreateErrorTag(text) {
		if (document.getElementById("error") != null) {
			return ;
		}
		var img = CreateMenuImg();
		document.body.append(img);

		var p = document.createElement("p");
		p.id = "error";
		p.innerText = text;
		document.body.append(p);
	}
	
	function CreateMenuImg() {
		if (document.getElementById("menu") != null) {
			return ;
		}
		var img = document.createElement("img");
		img.src = "menu.svg";
		img.id = "menu";
		img.addEventListener("click", function Reload() {
			RemoveMainDiv();
			RemoveErrorTag();
			CreateStartButton();
		});
		return img;
	}

	function CreateMainDiv(json) {
		if (document.getElementById("div") != null) {
			return ;
		}
		var div = document.createElement("div");
		div.id = "main";

		// var div = document.getElementById("div");

		var img = CreateMenuImg();

		var p1 = document.createElement("p");
		p1.id = "time";
		p1.innerText = '11 31 12';

		var p2 = document.createElement("p");
		p2.id = "date";
		p2.innerText = 'Суббота, 1 апреля';

		var p3 = document.createElement("p");
		var temp = parseInt(json['main']['temp']) > 0
				? '+' + json['main']['temp']
				: json['main']['temp']; 
		p3.id = "weather";
		
		p3.innerText = temp + ' ' + json['weather']['0']['description'];

		var p4 = document.createElement("p");
		p4.id = "city";
		p4.innerText = json['name'];

		document.body.append(div);
		document.getElementById('main').appendChild(img); 
		document.getElementById('main').appendChild(p1); 
		document.getElementById('main').appendChild(p2); 
		document.getElementById('main').appendChild(p3); 
		document.getElementById('main').appendChild(p4); 
	}