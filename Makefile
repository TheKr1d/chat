install:
	npm install & npm ci

start-frontend:
	npm start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend