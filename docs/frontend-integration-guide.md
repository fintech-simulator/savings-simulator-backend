# Frontend Integration Guide – Digital Savings Simulator

This guide describes how to integrate the frontend with the Savings Simulator API.

## 🚀 API Base URL

All requests should be sent to:  
`http://localhost:3000/api` (Development)

## 📑 Interactive Documentation (Swagger)

You can view and test the API endpoints directly at:  
👉 [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## 🛠 Services & Endpoints

### 1. Products Service (`GET /products`)

**Purpose**: Fetch all available savings products.

- **Filters**:
  - `name`: String (e.g., "Ahorro").
  - `type`: String (e.g., "Inversión").
- **Response**: Array of:
  ```json
  [
    {
      "id": "uuid",
      "name": "Cuenta de Ahorros",
      "type": "Ahorro",
      "description": "...",
      "interestRate": 0.05,
      "minAmount": 50000,
      "imageUrl": "..."
    }
  ]
  ```

### 2. Simulator Service (`POST /simulator`)

**Purpose**: Calculate the future value of savings.

- **Body**:
  ```json
  {
    "initialAmount": 1000000,
    "monthlyContribution": 100000,
    "months": 12,
    "annualInterestRate": 0.12
  }
  ```
- **Response**:
  ```json
  {
    "estimatedProfit": 85000.5,
    "totalBalance": 2285000.5
  }
  ```

### 3. Onboarding Service (`POST /onboarding`)

**Purpose**: Register a lead interest.

- **Body**:
  ```json
  {
    "name": "Juan Perez",
    "document": "123456789",
    "email": "juan.perez@example.com",
    "recaptchaToken": "OK"
  }
  ```
- **Response**:
  ```json
  {
    "id": "uuid-request-id",
    "message": "Onboarding started successfully"
  }
  ```

### 4. Auth Service (`POST /auth/login`)

**Purpose**: Authenticate and get a JWT token.

- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "access_token": "eyJhbG..."
  }
  ```

---

## 🔐 Auth Usage

To access protected endpoints, include the token in the `Authorization` header:
`Authorization: Bearer YOUR_ACCESS_TOKEN`

## 💡 Integration Tips

1. **Debounce**: Use a debounce of 300-500ms when filtering products by name.
2. **Currency**: All amounts are handled as numbers. Format them as currency (COP) on the frontend.
3. **Rates**: Interest rates are decimals (0.12 = 12%). Multiply by 100 to show as percentage.
