# Тестовое задание на стажера фронтэнд-разработчика в Авито
## Запуск проекта

1. Выполнить npm install
2. В корне создать файл .env и добавить переменную VITE_API_KEY с значением переменной X-RapidAPI-Key хеддера из [rapidapi](https://rapidapi.com/digiwalls/api/free-to-play-games-database)
3. Выполнить npm start


Проект запускается на 3001 порту

## Уточнение по некоторым задачам

1. Карточка игры сохраняется в sessionStorage (src/services/browser-storage-service.ts) 
2. Неудачные запросы обрабатываются в interceptors  в axios (src/api/api-client.ts) 
3. Прерывание запроса реализовано через кастомный хук (src/hooks/use-custom-navigate.ts) 

