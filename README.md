# Auftrag

Order management platform

## Features

- View orders via the Client
- Update an order via the API and Client
- Create an order via the API
- Get an Order via the API

## Client URL

`Hosted Frontend URL` - <https://keen-darwin-8b0a4a.netlify.app>

## Server URL

`Hosted API URL` - <https://auftrag-app.herokuapp.com/>

## API Documentation

API documenntation: <https://documenter.getpostman.com/view/4204388/TzRVeRJu>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/4204388-e3302c72-293a-44b3-97fe-e507edc54905?action=collection%2Ffork&collection-url=entityId%3D4204388-e3302c72-293a-44b3-97fe-e507edc54905%26entityType%3Dcollection%26workspaceId%3Dcd61f0c8-2dd8-4086-9ae8-89ec328f86ce)

## Getting started

### Prerequisites

In order to install and run this project locally, you would need to have the following installed on you local machine.

- [**Node JS**](https://nodejs.org/en/)

### Installation

- Clone this repository

```sh
git clone https://github.com/tomiadebanjo/auftrag.git
```

- Navigate to the project directory

```sh
cd path/to/auftrag
```

### Client Setup

- Navigate to the client directory

```sh
cd client
```

- Run `npm install` or `yarn` to instal the projects dependencies
- create a `.env` file and copy the contents of the `.env.sample` file into it and supply the values for each variable

```sh
cp .evn.sample .env
```

- Run `npm run start` for local development

### Server Setup

- Navigate to the server directory

```sh
cd path/to/auftrag/server
```

- Run `npm install` or `yarn` to instal the projects dependencies
- create a `.env` file and copy the contents of the `.env.sample` file into it and supply the values for each variable

```sh
cp .evn.sample .env
```

- Run `npm run start:dev` for local development or Run `npm run build && npm start` for production

## Authors

- [Tomi Adebanjo](https://github.com/tomiadebanjo)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
