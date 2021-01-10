# purrtect
## Inspiration
Because of covid-19 and the holiday season, we are getting increasingly guilty over the carbon footprint caused by our online shopping. This is not a coincidence, Amazon along contributed over 55.17 million tonnes of CO2 in 2019 alone, the equivalent of 13 coal power plants.

We have seen many carbon footprint calculators that aim to measure individual carbon pollution. However, the pure mass of carbon footprint too abstract and has little meaning to average consumers.  After calculating footprints, we would feel guilty about our carbon consumption caused by our lifestyles, and maybe, maybe donate once to offset the guilt inside us. 

The problem is, climate change cannot be eliminated by a single contribution because it's a continuous process, so we thought to gamefy carbon footprint to cultivate engagement, encourage donations, and raise awareness over the long term. 


## What it does
We build a google chrome extension to track the user’s amazon purchases and determine the carbon footprint of the product using all available variables scraped from the page, including product type, weight, distance, and shipping options in real-time. We set up Google Firebase to store user’s account information and purchase history and created a gaming system to track user progressions, achievements, and pet status in the backend.  


## How we built it
We created the front end using React.js, developed our web scraper using javascript to extract amazon information, and Netlify for deploying the website. We developed the back end in Python using Flask, storing our data on Firestore, calculating shipping distance using Google's distance-matrix API, and hosting on Google Cloud Platform. For the user authentication system, we used Bcrypt to encode user info to ensure secure authentication.

## Challenges we ran into
This is our first time developing a web app application for most of us because we have our background in Mechatronics Engineering and Computer Engineering.

## Accomplishments that we're proud of
We are very proud that we are able to accomplish an app of this magnitude, as well as its potential impact on social good by reducing Carbon Footprint emission.

## What we learned
We learned about utilizing the google cloud platform, integrating the front end and back end to make a complete webapp.

## What's next for Purrtech
Our mission is to build tools to gamify our fight against climate change, cultivate user engagement, and make it fun to save the world. We see ourselves as a non-profit and we would welcome collaboration from third parties to offer additional perks and discounts to our users for reducing carbon emission by unlocking designated achievements with their pet similar. This would bring in additional incentives towards a carbon-neutral lifetime on top of emotional attachments to their pet.

## Domain.com Link
[https://purrtector.space](https://purrtector.space) Note: We weren't able to register this via domain.com due to the site errors but Sean said we could have this domain considered.

