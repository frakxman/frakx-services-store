# Frakx Services Store

## About This Project

This application started as **FruverStore**, a technical test built for a job
application — a virtual store for fruits and vegetables. It has since been
transformed into **Frakx Services Store**, a personal storefront for
freelance services, covering four categories:

- **Gastronomy** — Chef, Waiter, Bartender, Barista, Sommelier
- **Software Development** — Frontend, Backend, Fullstack, Cloud Certifications, Data Analysis
- **Multimedia Production** — Photography, Video, Audio, Branding, Social Media
- **Drone Services** — Aerial Photography/Video, Photogrammetry, Commercial Flights

The original Angular 17 codebase, authentication flow, and admin panel were
kept and repurposed, while the product catalog, category structure, and
branding were rebuilt from scratch for this new purpose.

## User Guide

### Welcome to Frakx Services Store! Here's a step-by-step guide to booking a service:

### 1. Add Services to Cart
- Browse the store and select the services you're interested in.
- Click the "Add to Cart" button for each service you want to book.
- Review the items in your cart by clicking the cart icon in the top-right corner of the screen.

### 2. Registration and Checkout
- When you're ready to complete your order, start the registration process.
- You'll be redirected to the login page. If you already have an account, enter your email and password. If not, click "Register" and complete the sign-up form.
- Once registered and logged in, you'll be able to complete your order.

## Admin Guide

### Hello, admin! Here are the instructions for managing the store:

### 1. Log In as Administrator
- Go to the login page.
- Enter your administrator credentials and click "Log In".
- Once authenticated, you'll have access to all administrative features.

### 2. Administrative Features
- **List Services**: In the admin panel, you can view all services currently available in the store.
- **Create Services**: Add new services to the store by filling out the form with the relevant details.
- **Edit Services**: Update the information of existing services.
- **Delete Services**: To remove a service, select the one you want to delete and confirm the action.

## Tech Stack

- **Frontend**: Angular 17
- **Backend**: [json-server](https://github.com/typicode/json-server), watching `data/db.json`
- **Styling**: Tailwind CSS

## Getting Started

```bash
# Install dependencies
npm install

# Run the mock backend (json-server)
npm run backend

# Run the app
npm start
```
