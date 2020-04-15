function GetDate(time) {
	var date = new Date(time * 1000);
	// var hours = date.getHours();
	// var minutes = "0" + date.getMinutes();
	// var seconds = "0" + date.getSeconds();

		var d = new Date();
		var days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
		var month = ["января","февраля","марта","апреля",
					"мая","июня","июля", "августа",
					"сентября", "октября", "ноября", "декабря"];
		return days[d.getUTCDay()] + ", " + d.getUTCDate() + " " + month[d.getUTCMonth()];
}

function GetTime(time) {
	var date = new Date(time * 1000);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

		// return hours + ':' + minutes + ':' + seconds;
		return hours + "  " + minutes + "  " + seconds;
		// return hours + '  ' + minutes + '  ' + seconds;
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
			|| description.search('пасмурно')) {
			img.src = "img/cloud.svg";			
		}
		return img;
}