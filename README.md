# Advanced MERN E-Commerce System with AI-Based Analytics

## Description

This is a full-stack e-commerce platform built using the **MERN stack (MongoDB, Express.js, React, Node.js)** with advanced backend architecture, role-based access control, and AI-inspired analytics integration.

The system is designed as a **multi-role e-commerce ecosystem**, supporting:

- Buyers who browse and purchase products
- Merchants who manage their own store and products
- Admins who manage platform-wide operations
- Super Admins with full system control and governance

Unlike a basic e-commerce application, this project focuses on **database design, analytics, scalability, and system-level architecture**.

---

## Key Features

### Frontend (React)

- Modern responsive UI for all devices
- Role-based dashboards
- Cart, wishlist, and order tracking system
- Merchant and Admin dashboards

### Backend (Node.js + Express)

- RESTful API architecture
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Modular MVC structure
- Secure password hashing (bcrypt)

### Database (MongoDB)

- Mongoose schema-based modeling
- Indexed collections for performance
- Aggregation pipelines for analytics
- Structured relationships between users, products, and orders

---

## Role-Based System

### Buyer

- Browse products
- Add to cart and place orders
- View order history

### Merchant

- Manage own products
- View store-specific analytics
- Track sales and performance

### Admin

- Manage users, products, and categories
- View platform-wide analytics
- Moderate system activity

### Super Admin

- Full system control
- Manage admin accounts
- Access audit logs and security data
- View global analytics and system insights

---

## AI-Based Analytics System

This project includes a Python-based analytics layer connected to MongoDB.

### Analytics Features

- Sales analysis (revenue, trends, top products)
- User behavior tracking (views, clicks, conversion rate)
- Product recommendations (category-based + trending)
- Anomaly detection (suspicious orders or activity)

### Tech Used

- Python
- pandas
- pymongo

---

## Analytics Integration (Node + Python)

Node.js backend executes Python scripts using `child_process`.

### Flow

1. Node.js API is called
2. Python script runs and connects directly to MongoDB
3. Python processes data and returns JSON
4. Node.js sends response to frontend

---

## Analytics API Endpoints

| Method | Endpoint |
|--------|----------|
| GET | `/api/analytics/sales` |
| GET | `/api/analytics/users` |
| GET | `/api/analytics/recommendations` |
| GET | `/api/analytics/anomalies` |
| GET | `/api/analytics/health` |

---

## Project Structure Highlights

### Python Analytics

```
analytics/
├── sales_analysis.py
├── user_behavior.py
├── recommendation.py
└── anomaly_detection.py
```

### Node.js Integration

```
├── services/analyticsService.js
├── controllers/analyticsController.js
└── routes/api/analytics.js
```

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-repo/mern-ecommerce.git
cd mern-ecommerce
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create `.env` files for both client and server.

**Server `.env`**

```env
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
BASE_API_URL=api/v1
```

**Client `.env`**

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Run Project (Development Mode)

```bash
npm run dev
```

This starts:

- React frontend
- Express backend

---

## Python Analytics Setup

### Install Dependencies

```bash
cd analytics
pip install -r requirements.txt
```

### Run Analytics Manually

```bash
python sales_analysis.py
python user_behavior.py
python recommendation.py
python anomaly_detection.py
```

---

## Database Features

- Indexed fields for performance optimization
- Aggregation pipelines for analytics
- Audit logging for admin actions
- Clean normalized schema design

---

## Technologies Used

| Layer | Technology |
|-------|------------|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Analytics | Python, pandas, pymongo |
| Auth | JWT, bcrypt |

---

> **Note:** This project is not deployed and is intended for local development and academic evaluation. It focuses on system design, database architecture, role-based access control, and analytics integration.
