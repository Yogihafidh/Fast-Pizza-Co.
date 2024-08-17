# About Website
Fast Pizzan Co. is website Apps to order pizza and track your orders using React, React router, Tailwind and Redux.

# Project requirements from the business
- Very simple application, where users can order one or more pizzas from a menu
-  Requires no user accounts and no login: users just input their names before using the app
- The pizza menu can change, so it should be loaded from an API
- Users can add multiple pizzas to a cart before ordering
- Ordering requires just the user’s name, phone number, and address
- If possible, GPS location should also be provided, to make delivery easier
- User’s can mark their order as “priority” for an additional 20% of the cart price
- Orders are made by sending a POST request with the order data (user data + selected pizzas) to the API
- Payments are made on delivery, so no payment processing is necessary in the app
- Each order will get a unique ID that should be displayed, so the user can later look up their order based on the ID
- Users should be able to mark their order as “priority” order even after it has been placed

# Features
- Add pizza to cart, choose quantity of each
- Track what you already have in cart
- Make order by complete form with phone, address (possible to use geolocation)
- Add order to priority queue by paying extra money
- No payment processing

Tech Features:
- Application uses backend servise to fetch and post data (remote state)
- That remote state manage by react router data loading feature ("rendre as you fetch") and router action to post data to remote api
- Global UI state manage be redux-toolkit, split global state on slices
- Styling: Tailwindcss, responsive design (mobile first)

# Technologies used
Routing: React Router
Styling: TailwindCSS
Persist Remote State Management: React Router
UI State Management: Redux Toolkit

# Getting Started
To start the project, it is necessary to download the files from the github repository and after that run this commands:
'npm i'
'npm run dev'

# Demo Website
![screencapture-localhost-5173-cart-2024-08-17-15_55_34](https://github.com/user-attachments/assets/d88e1355-7d15-4e4c-9c3b-5fd9633319e8)
![screencapture-localhost-5173-menu-2024-08-17-15_55_56](https://github.com/user-attachments/assets/63636079-173b-46bb-b271-1cdecc2eaa12)
![screencapture-localhost-5173-cart-2024-08-17-15_57_00](https://github.com/user-attachments/assets/aba59a97-0d09-4f8f-b70a-d8569f720b91)
![screencapture-localhost-5173-order-IIDSAT-2024-08-17-15_57_27](https://github.com/user-attachments/assets/2bfd25a9-1b5f-485a-93db-a9ef5704c1a0)
![screencapture-localhost-5173-2024-08-17-15_55_08](https://github.com/user-attachments/assets/a1c77363-b051-4e9f-b660-958274425efe)
