# Coffee R Us ☕

Coffee R Us is a cafe shop web application built with React. Users can browse and search for coffee and various cafe drink products, while administrators can manage the product catalog through an admin portal.

The application also includes an AI-powered coffee assistant using Ollama.

## Features

- **Home Page:** Introduces Coffee R Us and includes an AI coffee assistant.
- **Shop Page:** Displays coffee products and allows users to search by name.
- **Admin Portal:** Allows administrators to add, view, edit, and delete products.
- **AI Coffee Assistant:** Responds to coffee-related questions using a locally running Ollama model.
- **Custom React Hook:** Uses `useProducts` to fetch and manage product data.
- **Responsive Styling:** Uses custom CSS to create a consistent coffee-themed interface.

## Technologies Used

- React
- Vite
- React Router
- JavaScript
- CSS
- JSON Server
- Ollama (llama3.2:3b)
- React Markdown
- Vitest
- React Testing Library

## Installation

Clone the repository:

```bash
git clone git@github.com:a-gbatie/Coffee-R-Us.git
```

Navigate into the project folder:

```bash
cd coffee-r-us
```

Install dependencies:

```bash
npm install
```

## Running the Application

The application uses three local services: JSON Server, Ollama, and Vite.

### 1. Start JSON Server

Open a terminal and run:

```bash
npm run server
```

JSON Server provides the product API at:

```text
http://localhost:6001/products
```

### 2. Start Ollama

Make sure Ollama is installed and running.

Download the model if you haven't already:

```bash
ollama pull llama3.2:3b
```

Start Ollama if it isn't already running:

```bash
ollama serve
```

Ollama provides the local AI service used by the Coffee Assistant.

### 3. Start React

Open another terminal and run:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Application Routes

| Route | Description |
|---|---|
| `/` | Home page and AI Coffee Assistant |
| `/shop` | Browse and search products |
| `/admin` | Manage products through the Admin Portal |

## Product API

JSON Server stores product information in `db.json`.

The Admin Portal uses the following endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/products` | Retrieve products |
| POST | `/products` | Add a product |
| PUT | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

## Testing

The project uses Vitest and React Testing Library for automated tests.

Run tests in watch mode:

```bash
npm run test
```

Run all tests once:

```bash
npm run test -- --run
```

Tests cover product rendering, shop search functionality, form submission, and Admin Portal CRUD operations.

## Additional Commands

Check the code for linting issues:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Future Improvements

- Add shopping cart functionality.
- Add product categories and filters.
- Improve AI assistant responses with product-specific recommendations.
- Add administrator authentication.
