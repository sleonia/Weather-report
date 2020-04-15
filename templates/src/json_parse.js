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