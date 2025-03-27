# Product Grid Editor

This project is a technical implementation of a product grid editor inspired by the layout experience at ZARA.com. It allows users to arrange products into rows using drag & drop, assign layout templates, and zoom in/out for a better visual overview.

## Features

- Fetch product data via URL identifiers using [TanStack Query](https://tanstack.com/query/latest).
- Display product image, name, and price.
- Create multiple rows with 1 to 3 products each.
- Drag & drop products across rows or reorder within a row.
- Move entire rows up and down.
- Assign a layout template to each row (Left, Center, Right).
- Visual alignment preview per template.
- Zoom in/out the editor area (without affecting the full page).
- Save the grid layout only if all rows have:
  - At least one product
  - A selected template

## Architecture

This project follows the **Hexagonal Architecture (Ports & Adapters)** pattern:

## Tech Stack

- **React + TypeScript**
- **@tanstack/react-query** – for data fetching
- **@dnd-kit/core** – for drag & drop functionality
- **Hexagonal architecture** – for scalable and testable codebase
- **Mirage JS** – for mocking backend services

## 📦 Getting Started

### Install dependencies

```
yarn install
```

### Run development server

```
yarn dev
```

### Build for production

```
yarn build
```
