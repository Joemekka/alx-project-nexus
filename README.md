## Program Overview

Prodev Front End enginnering program is an online course that focuses on learning advance front end development with modern technologies to help you get equiped and project ready front end developer

## Major learnings:

This course is idealy for someone with basic html, css, javascript and react, So the major learning is mainly focus on using frameworks like nextjs, react, typescript and react native for mobile developemnt

## Key technologies covered.

Mobile development with react native, leveraging PWA for scalable web app that works fast and offline access, And also building a seamless experience web apps with seo

## Important frontend development concepts

NextJs, Tailwindcss, Project Architeture, Typescript, SCSS/SASS, State management redux and context api

## Challenges faced and solutions implemented.

My challenges in this course were the period where i could not code myself without seeing the code provided, but with the help of chatgpt i could coppy and paste the code to ai to read it line by line

## Best practices and personal takeaways.

Do resaerch and read documentations, dont get too lazy staying off documentation, they will help you navigate through what you are building

E-Commerce Store

This is a modern e-commerce store built with React, Next.js, TypeScript, and Tailwind CSS. The project demonstrates the process of building a full-featured online shopping experience with state management, responsive design, and interactive UI components, fetching product data from MockAPI.

Table of Contents

Features

Tech Stack

Project Structure

Implementation Process

Getting Started

Future Improvements

Features

Add to Cart: Users can add products to the cart.

Proceed to Cart: Users can view and manage their cart items before checkout.

Toast Notifications: Confirmation notification appears when an item is added to the cart.

Persistent Cart: Cart items are saved in local storage to persist between sessions.

Responsive Design: Fully responsive for mobile, tablet, and desktop.

Search: Users can search for products by name.

Sort & Categorize: Products can be sorted and filtered by categories.

Data Fetching: Product data fetched from MockAPI, simulating a real backend API.

Tech Stack

Frontend Framework: React with Next.js

Language: TypeScript

Styling: Tailwind CSS

State Management: Context API

Persistence: Local Storage

Notifications: React Toast (or custom implementation)

API Mocking: MockAPI for fetching product data

Project Structure
/components # Reusable UI components
/pages # Next.js pages (Home, Product, Cart, etc.)
/context # Context API for global state management
/services # API service for fetching data from MockAPI
/public # Images and assets
/styles # Tailwind CSS styles and global styles
/utils # Helper functions (search, sort, etc.)

Implementation Process

Project Setup:

Initialized a Next.js project with TypeScript.

Configured Tailwind CSS for styling.

Data Fetching:

Used MockAPI to create fake product data.

Built an API service (/services/api.ts) to fetch products.

Displayed fetched products dynamically in the store.

State Management:

Implemented Context API to manage global state for cart items.

Added actions for adding, removing, and updating items in the cart.

Persistent Cart:

Used local storage to save cart items and maintain state between sessions.

UI & Interactivity:

Built responsive components with Tailwind CSS.

Added toast notifications to confirm when an item is added to the cart.

Search, Sort & Categorize:

Implemented search functionality to filter products by name.

Added sorting options (price, popularity, etc.) and category filters for better browsing.

Testing & Responsiveness:

Ensured components are responsive on different devices.

Tested cart functionality, notifications, and local storage persistence.

Getting Started

Clone the repository:

git clone <repository-url>

Install dependencies:

npm install

Run the development server:

npm run dev

Open http://localhost:3000
to view the app.

Future Improvements

Implement user authentication and checkout process.

Integrate a real backend or headless CMS instead of MockAPI.

Integrate a payment gateway.

Add product reviews and ratings.

Improve UI/UX with animations and advanced filters.
