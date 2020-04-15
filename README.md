## Проект для отбора в "Школу будущих СТО"


## Умный сервис прогноза погоды.  
##### Средний уровень сложности

---
### Описание сервиса

##### Cервис представляет собой веб-приложение, реализованное на на стеке frontend(*html*+*css*+*js*) backend(*python flask*)

##### Пользователь нажимает кнопку, вводит названия своего города и в ответ получает страницу с данными о времени, дате, погоде и городе. ![Output_for_user](https://github.com/sleonia/Weather-report/blob/master/assets/Output_for_user.png)

---

### Демонстрация работы сервиса

### Как это работает?
####  -> Данные приходят от пользователя по нажатию кнопки через интерфейс сервиса
####  -> Формируется запрос к api
####  -> Полученный ответ парсится из json для формирования html страницы
####  -> Ответ отправляется и пользователь видит прогноз погоды
---
### Как запустить?
#### *Linux, Mac OS X*
```
sudo apt-get install python3-dev python3-pip
pip3 install --upgrade pip setuptools
git clone https://github.com/sleonia/Weather-report SmartWeather
cd SmartWeather
python my_server
Go to browser
```
[**Link**](http://localhost:5000/)
