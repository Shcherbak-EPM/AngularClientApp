# Angular Client App

This is an Angular application designed to demonstrate how HTTP GET and POST requests are sent from the client and processed on the server. Every event is logged, and the results are visualized on the client side. The application uses standalone components, CSS, and FlexBox for styling.

## Features

- Demonstrates HTTP GET and POST requests with user input
- Dynamic creation of header and footer components
- Centralized logging using a `LoggerService`
- Caching of HTTP responses using an interceptor
- Error handling with centralized interceptors
- Uses SCSS and FlexBox for responsive layout

## Technologies

- Angular 18
- TypeScript
- SCSS
- RxJS
- Angular CLI

## Project Structure

The project follows a modular structure with clear separation of components, services, interceptors, and configurations

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Shcherbak-EPM/angular-client-app.git
   cd angular-client-app

   ```

2. **Install dependencies: Make sure you have Node.js installed on your machine, then run:**:
   ```bash
    npm install
   ```

## Configuration

The application uses several configurations stored in the src/app/config folder:

HTTP Client Configuration (http-client.config.ts): Configures the default HTTP method for requests.

Cache Configuration (cache.config.ts): Sets up caching settings such as time-to-live (TTL) and maximum cache size.

Running the Application
To run the application locally, use:

```bash
   ng serve
```

The application will be available at http://localhost:4200

## Production Build

To build the application for production:

```bash
ng build --prod
```

The production build files will be output to the dist directory.

## Deployment

To deploy the application, build it for production:

- Deploy the contents of the dist folder to your server or cloud provider (e.g., Azure Storage).
