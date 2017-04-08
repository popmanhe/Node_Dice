cd client && call npm run prod
cd ..
cd server && call npm run prod
cd ..
call docker-compose build
call docker-compose up -d