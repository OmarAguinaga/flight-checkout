# FLight Checkout

This project was created using the create react app

## Run Project

To run this project download or clone the repository to your machine

`git clone https://github.com/OmarAguinaga/flight-checkout.git`

got to the folder and do

`npm run setup`

inside that same folder run

`npm run start:dev`

## Tests

I only have one test, to test if the API returns a random available seat.

`npm run test`

## The Application

This application has the following functionality

* The check-in application lists seats in the plane that passengers can choose
* Different seats should have different fees (free, window, aisle
  more leg-room, etc.)
* A passenger can skip choosing a seat and check-in for free. Then they get a random seat.
* A passenger can pick a seat and check-in for a fixed price
* A passenger can only check-in to one seat

This application lacks of the following functionality

* The seat is reserved for 3 minutes for the passenger until they pay

Because of the time given it was difficult to implement proper tests for this application, as a following steep I would normaly finish the requirements (Reserve the seat for 3 minutes) and the add tests

## Styling

All the styling was done using CSS and trying to implement BEM structure, another steep of this application if I had more time would be to replace CSS with styled components

## The API

GET "/seat" - Get all the seats, available and unavailable
GET "/seat/random" - Get a random seat from the available seats
PUT "/seat/:id" - Modify an existing seat (used to reserve a seat on the client)
POST "/seat" - Create a new seat (not used on the client)
DELETE "/seat/:id" - Delete a seat (not used on the client)

For this part of the challenge, as for the one before I was not able to implement the feature to reserve the seat from 3 minutes until they pay.

I used MongoDB with mongoose and deployed the DB on mLab. The database currently has some data and is ready to use.

## The Sack

MongoDB · Node.js · Express · React
