# Checkout System

This is a front-end implementation of a checkout system.
It's built using React.js.

## Problem statement

For the purpose of this exercise, you need to create a checkout system for an online store. 
Our goal, to offer different amount of discount for different level of recipients. We want to offer different amount of discount for different level of target audience:

Level:

- Associate, get 5% discount on all non-promotional items
- Diamond, get 20% discount on all non-promotional items

Product Price List

- Kone, RM 3488.99
- Ironhide Cartridge, RM 529.99

We established a number of special pricing rules for different level of Business Owner on certain products. For item that does not meet the special pricing rules will still be considered as non-promotional items.

Diamond

1. Get a discount on Kone where 3 or more purchased. The price dropped to RM 2588.99 per unit.
2. Get a 3 for 2 deal on Ironhide Cartridge

These deals are regularly renegotiated, so we want the pricing rules to be as flexible as possible as they can change in the future with little notice.

Example scenarios:

- RECIPIENT: Associates
  Cart Items: Kone, Ironhide Cartridge
  Total Expected: RM 3818.03

- RECIPIENT: Diamond
  Cart Items: Kone, Kone, Kone, Kone, Ironhide Cartridge
  Total Expected: RM 10779.95

## Available Scripts

Clone down this repository. You will need node and npm installed globally on your machine.

Installation:

`npm install`

To Run Test Suite:

`npm test`

To Start Server:

`npm start`

To Visit App:

`localhost:3000`

## Structure

_Checkout_ is the core business logic for problem, containing the logic required for the special pricing rules for different level of Business Owner on certain products as well as totalling a set of cart items, either for the Associate or Diamond level recipient.

_data_ contains all the online store data, eg. product list and pricing rules.
