# IceStore

IceStore is a fashion e-commerce application with a React frontend and a Spring Boot/MongoDB backend. The old standalone HTML pages have been removed; the storefront is now React-only.

## Repository structure

```text
frontend/
  index.html
  src/main.jsx
  styles/style.css
  package.json
backend/
  pom.xml
  src/main/java/com/icestore/
  src/main/resources/application.yml
  src/main/resources/openapi.yaml
```

## Frontend

Requirements: Node.js 20+ and npm.

```powershell
cd frontend
npm install
npm run dev
```

The development server runs at `http://localhost:5173`.

To use a backend hosted at a different URL, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

Build a production bundle with:

```powershell
cd frontend
npm run build
```

## Backend

Requirements: Java 17+, Maven 3.9+, and MongoDB 7+.

```powershell
cd backend
mvn spring-boot:run
```

Configure production secrets with environment variables:

```powershell
$env:MONGODB_URI="mongodb://localhost:27017/icestore"
$env:JWT_SECRET="replace-with-a-random-secret-at-least-32-characters"
$env:FRONTEND_URL="https://your-store.example"
```

The API listens on port `8080` and seeds products into an empty database.

The complete API contract is available in [backend/src/main/resources/openapi.yaml](backend/src/main/resources/openapi.yaml).

## Implemented API areas

- JWT registration and login with BCrypt password hashing
- Product listing, search, details, and admin CRUD
- Authenticated cart persistence
- Wishlist data on the user document
- Order placement, history, and admin status updates
- Product reviews and ratings
- Coupon validation and admin creation
- Role-based `USER` and `ADMIN` access

## Payment integration

Razorpay credentials must remain server-side. Add payment-order creation and signature-verification endpoints before enabling live Razorpay checkout.

Cash on delivery is represented in the order model.

## API documentation

The OpenAPI 3 specification is stored at:

`backend/src/main/resources/openapi.yaml`

You can open it with Swagger Editor or any OpenAPI-compatible documentation tool.

## Validation

The frontend production build has been verified with:

```powershell
cd frontend
npm run build
```

Backend compilation requires Java, Maven, and MongoDB to be installed on the machine running the API.
