# GreenCart Logistics - Backend API

## Project Overview & Purpose

GreenCart Logistics is a fictional eco-friendly delivery company management system that simulates delivery operations and calculates KPIs based on custom company rules. This backend API provides comprehensive delivery simulation, driver management, route optimization, and performance analytics.

### Key Features
- **Delivery Simulation Engine**: Calculates delivery times, fuel costs, penalties, and bonuses
- **Driver Management**: Complete CRUD operations for driver data with fatigue tracking
- **Route Optimization**: Handles route assignments and traffic-based calculations
- **Performance Analytics**: Real-time KPI calculations and efficiency scoring
- **CSV Data Integration**: Automated data loading from external sources

## Tech Stack Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Data Processing**: CSV parsing and JSON caching
- **Authentication**: JWT-based (configurable)
- **Validation**: Mongoose schema validation
- **HTTP Client**: node-fetch for external data retrieval

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. **Clone and Navigate**
   \`\`\`bash
   git clone <repository-url>
   cd server
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Configuration**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

4. **Database Setup**
   \`\`\`bash
   # Ensure MongoDB is running
   # Load initial data
   node scripts/load-csv-data.js
   \`\`\`

5. **Start Development Server**
   \`\`\`bash
   npm run dev
   # or
   node server.js
   \`\`\`

6. **Verify Installation**
   \`\`\`bash
   curl http://localhost:5000/api/drivers
   \`\`\`

## Environment Variables

Create a `.env` file in the server root with the following variables:

\`\`\`env
# Database Configuration
MONGODB_URI=your_mongodb_connection_string
DB_NAME=greencart_logistics

# Server Configuration
PORT=5000
NODE_ENV=development

# External Data Sources
ORDERS_CSV_URL=your_orders_csv_url
ROUTES_CSV_URL=your_routes_csv_url
DRIVERS_CSV_URL=your_drivers_csv_url

# Security (Optional)
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
\`\`\`

## Deployment Instructions

### Production Deployment

1. **Environment Setup**
   \`\`\`bash
   NODE_ENV=production
   npm install --production
   \`\`\`

2. **Database Migration**
   \`\`\`bash
   node scripts/load-csv-data.js
   \`\`\`

3. **Process Management**
   \`\`\`bash
   # Using PM2
   npm install -g pm2
   pm2 start server.js --name "greencart-api"
   
   # Using Docker
   docker build -t greencart-api .
   docker run -p 5000:5000 greencart-api
   \`\`\`

4. **Health Check**
   \`\`\`bash
   curl https://your-domain.com/api/health
   \`\`\`

### Cloud Deployment Options
- **Heroku**: Use provided Procfile
- **AWS EC2**: Standard Node.js deployment
- **Vercel**: Serverless functions (requires restructuring)
- **Railway**: Direct Git deployment

## API Documentation

### Base URL
\`\`\`
Development: http://localhost:5000/api
Production: https://your-domain.com/api
\`\`\`

### Authentication
Most endpoints require JWT authentication. Include token in header:
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

---

## Driver Management API

### Get All Drivers
```http
GET /api/drivers
