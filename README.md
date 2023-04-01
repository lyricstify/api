<div align="center">
  <p><a href="https://github.com/lyricstify/api"><img src="https://raw.githubusercontent.com/lyricstify/api/main/assets/lyricstify.svg" alt="Lyricstify Logo" height="60"/></a></p>
  <h1>Lyricstify API</h1>
  <p>Discover time-synced Spotify lyrics.</p>
  <p>
    <img alt="GitHub Workflow Test Status" src="https://img.shields.io/github/actions/workflow/status/lyricstify/api/test.yml?label=test&logo=github&style=flat-square&color=1ed760">
    <img alt="Code Coverage" src="https://img.shields.io/codecov/c/github/lyricstify/api?color=white&logo=codecov&style=flat-square">
    <img alt="License" src="https://img.shields.io/github/license/lyricstify/api?color=1ed760&style=flat-square">
    <img alt="NestJs Version" src="https://img.shields.io/github/package-json/dependency-version/lyricstify/api/@nestjs/core?color=white&label=nestjs&logo=nestjs&logoColor=red&style=flat-square">
    <img alt="TypeScript Version" src="https://img.shields.io/github/package-json/dependency-version/lyricstify/api/dev/typescript?color=1ed760&logo=typescript&style=flat-square">
  </p>

  <p>
    <a href="#introduction">Introduction</a>
    ·
    <a href="#installation">Installation</a>
    ·
    <a href="#api-documentation">API Documentation</a>
    ·
    <a href="#roadmap">Roadmap</a>
    ·
    <a href="#contributing">Contributing</a>
    ·
    <a href="#license">License</a>
  </p>
</div>

## Introduction

This is the backend API for discovering time-synced Spotify song lyrics that are used by [Lyricstify](https://github.com/lyricstify/lyricstify).

## Installation

Since this project is built on top of Node.js so you need to [download](https://nodejs.org/en/download) and install it before start using this repository. Then, to install this repository you can follow these steps:

- [Clone this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- Open the project directory and run the following command to install the required dependencies:
  ```bash
  npm install
  ```
- Copy the `.env.example` file to the `.env`
- Inside the `.env` file, pay attention to `SPOTIFY_COOKIE` you need to fill it in based on your Spotify account cookie. Here is how you can get your cookie:
  - Open your browser and open _Developer Tools_ by clicking F12
  - Navigate to the _Network_ tab inside your _Developer Tools_
  - Then visit https://open.spotify.com/ and make sure that you already logged in
  - Inside the _Network_ tab, see the first request to `open.spotify.com`
  - Then see the _Request Headers_ tab, and copy the _cookie_ value inside it
- You can set `APP_ENV` (`development`, `testing`, or `production`), `APP_PORT`, and optionally you can configure Redis connection via variables that have `REDIS_` prefix
- Finally, start the server using the following command:
  ```
  npm run start
  ```

## API Documentation

Please visit the [following page](https://lyricstify.github.io/api) to see the API documentation.

## Roadmap

Please visit the following page to view the [Lyricstify API roadmap](https://github.com/lyricstify/api/projects). If the task hasn't been assigned to anyone yet and you'd like to try working on it, you're welcome to open a new PR or a draft. If you have other ideas that aren't on the roadmap, feel free to open a new issue.

## Contributing

Please see [this page](https://github.com/lyricstify/api/blob/main/CONTRIBUTING.md) for a detailed explanation of how you can contribute to this repository.

## License

This application is licensed under the [MIT license](https://github.com/lyricstify/api/blob/main/LICENSE).
