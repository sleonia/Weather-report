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