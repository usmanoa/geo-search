# geo-search

Geo-Search is a tool that allows people to search for places and extract information such as map and local weather conditions

* [View Demo](https://geo-search-places.netlify.app/)
* [Report Bug](https://github.com/usmanoa/geo-search/issues)
  
## Getting Started

### Prerequisites

1. Get an API key at [MapQuest](https://developer.mapquest.com/)

2. Get an API key at [OpenWeather](https://openweathermap.org/)

3. After registering with the above listed services, setup your env varibles. Use the env.sample file as a guide

### Installation

1. Clone the repo
```sh
git clone https://github.com/usmanoa/geo-search.git
```
2. Install NPM packages
```sh
npm install
```
3. Create a  '.env' file

Create a .env file in the root directory of the project. A .env file stores sensitive credentials needed to run this project. After creating a .env file, copy the content of the .env.sample file and add the corresponding values.


### Starting

```sh
gulp start
```
You will then be able to access it at localhost:8080

### Lint
To lint the code run:

```sh
gulp lint
```
If you don't get any output that means your linting passed.

### Build
To get a build of the project run:

```sh
gulp build
```

## Built With

* HTML, CSS, javaScript

<!-- CONTRIBUTING -->
## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/name/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Usman Olarinoye Abdulraheem - usmanakorede@gmail.com