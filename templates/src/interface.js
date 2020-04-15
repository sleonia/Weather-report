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
		// return ;
		return document.createElement("img");
	}
	var img = document.createElement("img");
	img.src = "img/menu.svg";
	img.id = "menu";

	img.addEventListener("click", function Reload() {
		RemoveMainDiv();
		RemoveErrorTag();
		CreateStartButton();
	});
	return img;
}

function CreateWeatherDiv(main_div, temp, description) {

	var sub_div = document.createElement("div");
	sub_div.id = "current_weather";

	// var img = document.createElement("img");
	// img.src = ParseDescription(description);
	// img.id = "weather_icon";
	var img = ParseDescription(description);

	var p = document.createElement("p");
	var temp = parseInt(temp) > 0 ? '+' + temp : temp; 
	p.id = "weather";
	
	p.innerText = temp;
	// p.innerText = temp + ', ' + description;
	
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

	var img = CreateMenuImg();

	var p1 = document.createElement("p");
	p1.id = "time";
	p1.innerText = '11 31 12';

	var p2 = document.createElement("p");
	p2.id = "date";
	p2.innerText = 'Суббота, 1 апреля';

	var sub_div = CreateWeatherDiv(div, json['main']['temp'],
									json['weather']['0']['description']);
	// var img2 = ParseDescription(json['weather']['0']['description']);

	var p4 = document.createElement("p");
	p4.id = "city";
	p4.innerText = json['name'];

	document.body.append(div);

	document.getElementById('main').appendChild(img); 
	document.getElementById('main').appendChild(p1); 
	document.getElementById('main').appendChild(p2); 
	document.getElementById('main').appendChild(sub_div); 
	document.getElementById('main').appendChild(p4); 
}