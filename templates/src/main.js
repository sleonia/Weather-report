function GetCityValue() {
	var city = prompt('В каком городе вы живете?', 'Москва');

	if (city == null) {
		CreateErrorTag('Такой город не найден :(');
		RemoveStartButton();
	} else {
		CreateRequest(city);
		RemoveStartButton();
	}
}
