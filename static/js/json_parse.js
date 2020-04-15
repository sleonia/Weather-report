function GetDate(time) {
	var date = new Date(time * 1000);
	var days = ["Воскресенье","Понедельник","Вторник","Среда",
				"Четверг","Пятница","Суббота"];

	var month = ["января","февраля","марта","апреля",
				"мая","июня","июля", "августа",
				"сентября", "октября", "ноября", "декабря"];

	return days[date.getUTCDay()] + ", "
				+ date.getUTCDate() + " "
				+ month[date.getUTCMonth()];
}

function GetTime(time) {
	var date = new Date(time * 1000);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	return hours + "  " + minutes + "  " + seconds;
}
	
function ParseDescription(description) {
	var img = document.createElement("img");
	img.id = "weather_icon";

	if (description.search('ясно') != -1) {
		img.src = "/static/img/sun.svg";
	} else if (description.search('снег') != -1) {
		img.src = "/static/img/snowy.svg";
	} else if (description.search('дождь') != -1) {
		img.src = "/static/img/rainy.svg";			
	} else {
		img.src = "/static/img/cloud.svg";			
	}

	return img;
}
