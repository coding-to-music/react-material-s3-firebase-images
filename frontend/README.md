[![Repo License](https://img.shields.io/badge/license-GPL--3.0-orange?style=plastic)](./LICENSE)
[![Website](https://img.shields.io/website?style=plastic&url=https%3A%2F%2Flascoapp.com%2F)](https://lascoapp.com/)

# Lasco

![Landing Page](https://i.imgur.com/A0PUuXn.png)
Client-side repo for a portfolio project by Ayman Benjelloun-Touimi and Jakobi Haskell, both CS students at [Brown University](https://brown.edu).

## Overview

This repo holds the webpages for a prototype website of Lasco. Lasco is a social digital art platform, in every meaning of the phrase. We make it easy for talented artists to interact with fans, collaborate with fellow artists, and sell their digital art with NFTs. We are excited to see how creative artists explore new mediums and hope that through our platform, artists are empowered to reach a wider audience!

All profiles will have two sections: a general section, for posts, doodles, and updates that artists don't necessarily want to sell but still want to share with their fans. There will also be a marketplace section, where users can post art they are selling and show off art they have bought. In the future, we might experiment with group buying, such that a group of friends who are all interested in a certain piece of art can buy it, even if it is too expensive individually.

In order to maximally support our artists, we will also hold curated exhibitions, both online, and in person on digital frames, where people can walk in and buy art from their phone!

## Tech Stack

This project uses [React](https://reactjs.org) for the frontend, [Firebase](https://firebase.google.com/) for both authentication and the main database (storing profile/artwork data), [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) for image storage, and [Express](https://expressjs.com) for the server to relay communications between the client and S3. 

There is a separate [codebase](https://github.com/Project-Lascaux/S3-Server) for the server. It is hosted on [AWS Lightsail](https://aws.amazon.com/lightsail/) and uses [Nginx](https://nginx.org/en/) for configuration. 

## Getting Started

To set up the client for local development, follow these instructions:
1. `npm run dev`

## License and Contributing

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). In short, you are free to modify and distribute the repository, under the condition that you provide attribution and disclose your modified source under the same license. We ask that you attribute this project and link back to this original repository if you choose to reuse our code.

We invite you to contribute to the project! Fork this repository, commit your changes, then submit a pull request for your contributions to be reviewed. Alternatively, you may submit an issue to report a bug or suggestion.
