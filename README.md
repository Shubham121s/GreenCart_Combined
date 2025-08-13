# GreenCart Logistics - Frontend

## 🚀 Project Overview & Purpose

GreenCart Logistics Frontend is a modern React-based dashboard application for managing delivery operations and simulating logistics performance. The application provides an intuitive interface for managing drivers, routes, orders, and running delivery simulations with real-time KPI tracking.

### Key Features
- **Driver Management**: Complete CRUD operations for driver profiles
- **Delivery Simulation**: Interactive simulation with performance metrics
- **Real-time Dashboard**: KPI cards, charts, and analytics
- **Responsive Design**: Mobile-first approach with modern UI components
- **Data Visualization**: Interactive charts for delivery and fuel cost analysis

---

## 🛠️ Tech Stack Used

### Core Technologies
- **Framework**: Next.js 14.2.25 (App Router)
- **Runtime**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React + Heroicons
- **HTTP Client**: Axios for API communication

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript with strict mode
- **Build Tool**: Next.js built-in bundler
- **CSS Processing**: PostCSS with Tailwind CSS

---

## 📋 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Backend server running (see backend README)

### Installation Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd greencart-logistics
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open application**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_API_TIMEOUT=10000

# Application Settings
NEXT_PUBLIC_APP_NAME=GreenCart Logistics
NEXT_PUBLIC_APP_VERSION=1.0.0

# Development Settings
NEXT_PUBLIC_DEV_MODE=true
NEXT_PUBLIC_DEBUG_MODE=false

# Chart Configuration
NEXT_PUBLIC_CHART_ANIMATION=true
NEXT_PUBLIC_CHART_THEME=light

# Simulation Settings
NEXT_PUBLIC_DEFAULT_DRIVERS=5
NEXT_PUBLIC_DEFAULT_MAX_HOURS=8
NEXT_PUBLIC_DEFAULT_START_TIME=09:00
\`\`\`

---

## 🚀 Deployment Instructions

### Vercel Deployment (Recommended)
1. **Connect to Vercel**
   \`\`\`bash
   npm install -g vercel
   vercel login
   vercel
   \`\`\`

2. **Configure environment variables in Vercel dashboard**
   - Add all environment variables from `.env.local`
   - Set `NEXT_PUBLIC_API_URL` to your production backend URL

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Docker Deployment
1. **Build Docker image**
   \`\`\`bash
   docker build -t greencart-frontend .
   \`\`\`

2. **Run container**
   \`\`\`bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_API_URL=http://your-backend-url/api \
     greencart-frontend
   \`\`\`

### Manual Deployment
1. **Build application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Copy build files to server**
   \`\`\`bash
   scp -r .next/ out/ package.json your-server:/path/to/app/
   \`\`\`

3. **Install dependencies and start**
   \`\`\`bash
   npm install --production
   npm start
   \`\`\`

---
# Folder Structure:- 

client/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── DeliveryChart.js
│   │   │   ├── FuelCostChart.js
│   │   ├── ConfirmDialog.js
│   │   ├── KPICard.js
│   │   ├── Modal.js
│   │   ├── Navbar.js
│   │   ├── ProtectedRoute.js
│   ├── context/
│   │   ├── AuthContext.js
│   ├── pages/
│   ├── services/
│   │   ├── api.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── setupTests.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js


---

## 🎨 Component Library

### UI Components (shadcn/ui)
- **Layout**: Card, Sheet, Dialog, Drawer
- **Forms**: Button, Input, Select, Checkbox, Switch
- **Data Display**: Table, Badge, Avatar, Progress
- **Feedback**: Alert, Toast, Loading Spinner
- **Navigation**: Tabs, Breadcrumb, Pagination

### Business Components
- **Dashboard**: Main dashboard with KPIs and charts
- **DriverManager**: CRUD operations for drivers
- **SimulationPanel**: Interactive simulation controls
- **Charts**: Delivery performance and fuel cost visualization
- **KPICards**: Real-time metrics display

---

## 🔌 API Integration

### API Service Structure
\`\`\`javascript
// services/api.js
export const driversAPI = {
  getAll: () => axios.get('/drivers'),
  create: (data) => axios.post('/drivers', data),
  update: (id, data) => axios.put(`/drivers/${id}`, data),
  delete: (id) => axios.delete(`/drivers/${id}`)
};

export const simulationAPI = {
  run: (params) => axios.post('/simulation/run', params)
};
\`\`\`

### Error Handling
\`\`\`javascript
// Global error interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || 'An error occurred');
    return Promise.reject(error);
  }
);
\`\`\`

---

## 📊 Features Overview

### Dashboard
- **KPI Cards**: Total profit, efficiency score, delivery metrics
- **Charts**: Interactive delivery performance and fuel cost analysis
- **Real-time Updates**: Live data refresh after simulations

### Driver Management
- **Driver List**: Sortable table with search and filters
- **Add/Edit Driver**: Modal forms with validation
- **Driver Details**: Performance metrics and work history
- **Bulk Operations**: Multi-select actions

### Simulation
- **Parameter Controls**: Driver count, start time, max hours
- **Results Display**: Detailed breakdown of simulation results
- **Performance Metrics**: Efficiency scores and delivery analytics
- **Cost Analysis**: Fuel costs, penalties, and bonuses

### Data Visualization
- **Delivery Charts**: On-time vs late delivery performance
- **Fuel Cost Charts**: Breakdown of fuel expenses
- **Performance Trends**: Historical data visualization
- **Interactive Elements**: Hover effects and drill-down capabilities

---

## 🧪 Development

### Available Scripts
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
\`\`\`

### Code Quality
- **ESLint**: Configured with Next.js and React best practices
- **TypeScript**: Strict mode enabled with path aliases
- **Prettier**: Code formatting (configure as needed)
- **Husky**: Git hooks for pre-commit checks (optional)

### Testing (Setup Required)
\`\`\`bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test
\`\`\`

---

## 🎯 Performance Optimization

### Built-in Optimizations
- **Next.js Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Bundle Analysis**: Built-in bundle analyzer

### Custom Optimizations
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Virtual Scrolling**: For large data tables
- **Debounced Search**: Optimized search functionality

---

## 🔧 Customization

### Theming
\`\`\`css
/* globals.css - CSS Variables */
:root {
  --primary: 222.2 84% 4.9%;
  --secondary: 210 40% 96%;
  --accent: 210 40% 94%;
  --muted: 210 40% 96%;
}
\`\`\`

### Component Styling
\`\`\`javascript
// Using Tailwind classes with shadcn/ui
<Button className="bg-gradient-to-r from-blue-500 to-purple-600">
  Custom Button
</Button>
\`\`\`

---

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   \`\`\`bash
   # Check backend server is running
   curl http://localhost:5000/api/health
   
   # Verify NEXT_PUBLIC_API_URL in .env.local
   \`\`\`

2. **Build Errors**
   \`\`\`bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   \`\`\`

3. **TypeScript Errors**
   \`\`\`bash
   # Run type checking
   npm run type-check
   \`\`\`

4. **Styling Issues**
   \`\`\`bash
   # Rebuild Tailwind
   npm run dev
   \`\`\`

---

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Recharts Documentation](https://recharts.org)

### Design System
- **Colors**: Custom gradient palette with accessibility compliance
- **Typography**: Inter font family with responsive sizing
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable component library with variants

---

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes and test thoroughly
4. Commit with conventional commits (`git commit -m 'feat: add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open Pull Request

### Code Standards
- Follow ESLint configuration
- Use TypeScript for type safety
- Write meaningful component names
- Add JSDoc comments for complex functions
- Maintain responsive design principles

---




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
