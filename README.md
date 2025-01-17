# Online supplement Application

Dark Knight Supplements is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to provide a seamless online shopping experience for fitness enthusiasts. This project includes secure Stripe payment integration, allowing users to shop and pay with ease

## Features

- #### User Authentication:
  Secure registration, login, and session management.
- #### Product Management:
  Browse a curated collection of supplements.
- #### Shopping Cart:
  Add, remove, and update products in the cart.
- #### Checkout and Payment:
  Seamless payment processing with Stripe integration.
- #### Order History:
  Track previous purchases
- #### Admin Panel:
  Manage products, orders, and users (for administrators).

## Tech Stack

**Client:** React, Redux, TailwindCSS ,Context API ,Antd

**Server:** Node, Express

**Database:** Mongo DB

**Payment Integration:** Stripe Payment gateway

## Test Data's

#### User Test credentials

EMail: vigneshvickybsc1999@gmail.com

Pass : vicky1234

#### Admin Test Credentials

EMail: balaAdmin@gmail.com

Pass : bala1234

#### Test Card Number

Num : 4242424242424242

any future date for expiry

any 3 num for CVV

## Run Locally

Clone the project

```bash
  git clone https://github.com/BalavigneshRajasekar/Online-supplement-Application.git
```

### Frontend

Go to the project directory

```bash
  cd Frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

### Backend

Go to the project directory

```bash
  cd Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`TOKENKEY`= JWT Key

`PASS`= Gmail_App_password

`JWTSECRET`= For Reset code expiry

`MONGODB`= your_mongodb_connection_string

`CLOUDNAME`= Cloudinary_Name

`APIKEY`= CLOUDINARY_API_KEY

`APISECRET`= CLOUDINARY_SECRET_KEY

`STRIPE_API`= STRIPE_API_KEY

`STRIPE_SECRET`= STRIPE_SECRET_KEY

## Documentation

[API DOCUMENTATION](https://linktodocumentation)

## Demo

Backend : https://supplement-application.onrender.com

Frontend : https://dksupplements.vercel.app/
