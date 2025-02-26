# Shop.com Product Explorer

This is a **React Native/Expo** application built as a technical challenge. The app integrates with the **SHOP.com API** to allow users to search for products, view product details, and manage a shopping cart. It also includes **biometric authentication** (Face ID / Touch ID) for confirming purchases.

## 📱 Features

- 🔍 **Product Search** – Users can search for products using the **SHOP.com API**.
- 🛍️ **Product Details** – Displays product descriptions, images, and pricing.
- 🛒 **Shopping Cart** – Users can add and remove items from the cart.
- ✅ **Biometric Authentication** – Uses Face ID / Touch ID to confirm purchases.

---

## Getting Started

### 1️⃣ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- An **Expo account**
- A **SHOP.com Developer Account** ([Register here](https://developers.shop.com/))

### 2️⃣ Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/grantespo/MarketAmericaChallenge
cd MarketAmericaChallenge
npm i
```

### 3️⃣ Setup Environment Variables

After you obtain a SHOP.com API Key, Create a `.env` file in the root directory and paste the following lines below:

```
EXPO_PUBLIC_SHOP_BASE_URL=https://api2.shop.com/AffiliatePublisherNetwork/v2
EXPO_PUBLIC_SHOP_API_KEY=YOUR_API_KEY
```

### 4️⃣ Running the Project

```
npx expo start
```

Note: using the **Biometric Authentication** feature requires a ([development build](https://docs.expo.dev/develop/development-builds/create-a-build/)), alternatively you can use the .IPA or .APK files localted in this project's root directory. 

#### Running on iOS

Either scan the QR code on the terminal or press `i`

#### Running on Android

Either scan the QR code on the terminal or press `a`

### 5️⃣ Test Coverage

To generate a test coverage report:

```
npm run test
```

then open the html file located in /coverage/lcov-report/index.html

Currently the project has >90% test coverage


## Conclusion


### What I did

I built a mobile app where users can see products from the SHOP.com API. Each row shows the product image, name description and price range. The user can scroll the list infinitely and search by term. Then, the user can tap a row to view more details about the product. The details screen shows a large image, description, name, reviews, and a list of SKUs for the product. Each SKU shows an image, name, price, stock status (e.g "In Stock"), and a button to add to cart. After the user adds one or many items to their cart, they can tap the cart iconbutton on the rop-right of the screen to view the SKUs they added. On the cart screen, the user has the option to adjust to decrement/or increment the Qty. Then, they click click the "Buy" button at the bottom which will authenticate using the device's native **Biometric Authentication** capabilities. However, a real purchase does not happen. If the authentication is success, then a success alert shows and the cart gets cleared.

### How I did it

#### Tech Stack

- React Native (Expo) for seamless integration with native features like biometric authentication
- Typescript to leverage types for a better developer experience
- React Context API (CartProvider) to manage cart state across screens.
- Axios for networking
- expo-Image for image caching
- Jest for unit tests

#### Project directory:

 ┣ 📂 components          # UI components
 ┣ 📂 contexts            # Context providers (e.g., CartProvider)
 ┣ 📂 navigation          # Navigation stack & route definitions
 ┣ 📂 screens             # Screen components
 ┃ ┣ 📂 products         # Product list & details screens
 ┃ ┣ 📂 cart             # Cart screen
 ┣ 📂 services           # API calls
 ┣ 📂 types              # model definitions (e.g Product, Sku, Image)
 ┣ 📂 utils              # Utility functions
 ┣ 📂 __tests__          # Tests


### Limitations 

- No checkout system. Purchases are simulated with an alert.
- No object caching. Products and Shopping Cart data are not persisted upon restarting the app
- RootNavigationStack component is missing tests
- Light mode only
- I initially wanted to implement a barcode scanning feature using the device's camera, however the API doesn't seem to support this

### Srengths

- >90% test coveragea
- Implemented pagination on the ProductsLst
- Debounced Search - Prevents excessive API calls by delaying execution while the user is typing and provides a better user experience without the need for a search button
