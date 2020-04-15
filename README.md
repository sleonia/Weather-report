## Проект для отбора в "Школу будущих СТО"


## Умный сервис прогноза погоды.  
##### Средний уровень сложности

---
### Проектирование

##### Язык
    frontend(*html*+*css*+*js*) backend(*python flask*)

##### Интерфейс
    web приложение

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
https://flask-russian-docs.readthedocs.io/ru/latest/installation.html
git clone https://github.com/sleonia/Weather-report SmartWeather
cd SmartWeather
python server.py
Go to browser
Check http://localhost:5000
```
#### *Windows 10*
```
pip install Flask
git clone https://github.com/sleonia/Weather-report SmartWeather
cd SmartWeather
python server.py
Go to browser
Check http://localhost:5000
```
