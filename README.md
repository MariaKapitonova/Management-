*To run the app, follow the steps below:*

1. Make sure you have docker installed
2. Go to the terminal and input the command: docker compose build
3. After building, input the command: docker compose up
4. By default, the database is running at localhost: 3002, and the React app is at localhost: 3000
5. To setup the database, go to server in your docker container and input the command: npm run db:setup