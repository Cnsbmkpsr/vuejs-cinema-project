# Cinema Project

This is the Cinema Project, a web application for browsing and searching movies and series using the **[The Movie DataBase API](https://www.themoviedb.org/documentation/api)**. The project is built with Vue.js 3, TypeScript, Vuex, Vue Router, inversify, RxJS, and Tailwind CSS.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/cinema-project.git
```

1. Change into the project directory:

```bash
cd cinema-project
```

1. Install the dependencies:

```bash
npm install
```

1. Run the development server:

```bash
npm run dev
```

The app should now be running on **`http://localhost:xxxx/`** (port choosen by Vite, showed in the terminal). Open it in your browser to start browsing movies and series.

## Scripts

The following scripts are available in the **`package.json`** file:

  - **`npm run dev`**: Runs the app in the development mode. Open **`http://localhost:xxxx/`** to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.
  - **`npm run build`**: Builds the app for production to the **`dist/`** folder. It correctly bundles Vue in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!
  - **`npm run preview`**: Serves the production build from the **`dist/`** folder. This script should be used to preview the app locally after running the **`npm run build`** script.
  - **`npm run test:unit`**: Runs unit tests using Jest.
  - **`npm run lint`**: Lints and fixes files.
  - **`npm run format`**: Formats files using Prettier.

## Folder structure

```
root/
├── public/
│   └── imgs/ => Icons, images, videos, ...
├── src/
│   ├── __tests__/ => Global app tests
│   ├── assets/
│   │   ├── css/
│   │   └── js/
│   ├── components/ => Global components, reusable throught the whole app
│   ├── features/
│   │   ├── search/ => Feature scoped elements/
│   │   │   ├── __tests__/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   ├── store.ts
│   │   │   └── types.ts
│   │   ├── movie/
│   │   └── [...]/
│   ├── services/ => Global services
│   ├── views/
│   ├── router.ts
│   ├── main.ts => Vue base instance and plugins attribution
│   └── container.config.ts => Services container config
└── .env
```

## Special specifications

### Dependency injection

This project uses a dependency injection container to provide services to the application. The container is configured in the **`container.config.ts`** file. It is based on the InversifyJS library. The container is then provided to the Vue application through the `App.vue` `inject` function in the **`App.vue`** file.

Any new service created should be added to the container config file, and decored with the `@injectable` decorator from InversifyJS, right above the class declaration.

### Node engine

This project was built using Node `v16.19.1` and NPM `8.19.3`. It is recommended to use this version of Node to avoid any compatibility issues.

### Dependencies

This project freeze the dependencies versions in the **`package.json`** file. This is to avoid any breaking changes that could be introduced by a new version of a dependency. It is recommended to use the same versions as the ones listed in the **`package.json`** file.

The **`package-lock.json`** file is also included in the repository to ensure that the same versions of the dependencies are installed on all machines. Don't forget o commit it if any contribution is made to the project.

## Contributing

We welcome contributions to the Cinema Project! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the **[MIT License](https://opensource.org/licenses/MIT)**.
