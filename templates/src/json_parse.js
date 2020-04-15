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
		img.src = "img/sun.svg";
	} else if (description.search('снег') != -1) {
		img.src = "img/snowy.svg";
	} else if (description.search('дождь') != -1) {
		img.src = "img/rainy.svg";			
	} else if (description.search('обл') != -1
		|| description.search('пасмурно'))
	{
		img.src = "img/cloud.svg";			
	}

	return img;
}