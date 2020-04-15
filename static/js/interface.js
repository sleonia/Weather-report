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
		return document.createElement("img");
	}
	var img = document.createElement("img");
	img.src = "/static/img/menu.svg";
	img.id = "menu";

	img.addEventListener("click", function Reload() {
		RemoveMainDiv();
		RemoveErrorTag();
		CreateStartButton();
	});
	return img;
}

function CreateWeatherDiv(temp, description) {

	var sub_div = document.createElement("div");
	sub_div.id = "current_weather";

	var img = ParseDescription(description);

	var p = document.createElement("p");
	var temp = parseInt(temp) > 0 ? '+' + Math.round(temp) : Math.round(temp);
	p.id = "weather";
	p.innerText = temp;
	
	sub_div.append(img);
	sub_div.append(p);
	return sub_div;
}

function CreateMainDiv(json) {
	if (document.getElementById("div") != null) {
		return ;
	}
	var div = document.createElement("div");
	div.id = "main";

	var menu_img = CreateMenuImg();

	var time = document.createElement("p");
	time.id = "time";
	time.innerText = GetTime(json['dt']);

	var weather = document.createElement("p");
	weather.id = "date";
	weather.innerText = GetDate(json['dt']);

	var sub_div = CreateWeatherDiv(json['main']['temp'],
									json['weather']['0']['description']);

	var city = document.createElement("p");
	city.id = "city";
	city.innerText = json['name'];

	document.body.append(div);

	document.getElementById('main').appendChild(menu_img); 
	document.getElementById('main').appendChild(time); 
	document.getElementById('main').appendChild(weather); 
	document.getElementById('main').appendChild(sub_div); 
	document.getElementById('main').appendChild(city); 
}