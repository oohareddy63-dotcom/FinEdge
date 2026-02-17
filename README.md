# 🚀 FinEdge - Advanced Trading Platform

A modern, feature-rich trading platform built with cutting-edge technologies, featuring real-time trading, 3D visualizations, and a stunning Midnight Purple × Neon Teal theme.

## 🎯 Overview

FinEdge is a comprehensive trading platform that combines powerful backend functionality with an elegant, futuristic frontend. It offers seamless trading experiences with real-time data, advanced visualizations, and a premium user interface designed for modern traders and investors.

## ✨ Key Features

### 🎨 **Premium UI/UX**
- **Midnight Purple × Neon Teal** color scheme
- 3D glassmorphism effects and animations
- Responsive design for all devices
- Futuristic, modern aesthetic
- Smooth transitions and micro-interactions

### 💰 **Trading Features**
- Real-time order placement and management
- Buy/Sell orders with validation
- Portfolio tracking and analytics
- Holdings and positions management
- Brokerage charge calculations
- Order history and status tracking

### 🎮 **Interactive Components**
- 3D Dashboard with particle effects
- Voice trading capabilities
- Real-time data visualization
- Advanced chart components
- Interactive metric cards

### 🔧 **Technical Excellence**
- MongoDB integration for data persistence
- RESTful API architecture
- Real-time frontend-backend communication
- Error handling and validation
- Optimized build performance

---

## 🛠️ Tech Stack

### **Frontend Technologies**

#### **Core Framework**
- **React 18** - Modern component-based UI framework
- **React Router** - Client-side routing and navigation
- **JavaScript ES6+** - Modern JavaScript features

#### **Styling & Design**
- **CSS3** - Advanced styling with animations
- **CSS Variables** - Dynamic theming system
- **Glassmorphism** - Modern UI design pattern
- **3D Transforms** - Advanced visual effects
- **Flexbox & Grid** - Responsive layouts

#### **UI Components**
- **Bootstrap 5** - Responsive UI framework
- **Font Awesome** - Icon library
- **Google Fonts (Inter)** - Modern typography

#### **Build Tools**
- **Create React App** - Development and build setup
- **Webpack** - Module bundler
- **Babel** - JavaScript transpilation

---

### **Backend Technologies**

#### **Core Framework**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework

#### **Database & Storage**
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - Object Data Modeling (ODM) library

#### **API & Communication**
- **RESTful API** - Standard API architecture
- **JSON** - Data interchange format
- **CORS** - Cross-origin resource sharing

#### **Authentication & Security**
- **JWT (JSON Web Tokens)** - Authentication mechanism
- **bcrypt** - Password hashing
- **Environment Variables** - Secure configuration

---

### **Development Tools**

#### **Version Control**
- **Git** - Version control system
- **GitHub** - Code repository and collaboration

#### **Code Quality**
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **VS Code** - Primary development environment

#### **Package Management**
- **npm** - Node.js package manager
- **package.json** - Dependency management

---

## 📁 Project Structure

```
finedge/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── OrderModal.js
│   │   │   ├── VoiceTrading-3D.js
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard-3D.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── landing_page/   # Landing page components
│   │   │   ├── products/
│   │   │   ├── about/
│   │   │   ├── support/
│   │   │   └── ...
│   │   ├── App.js          # Main App component
│   │   ├── index.css       # Global styles
│   │   └── index.js        # Entry point
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/               # Node.js backend application
│   ├── schemas/           # MongoDB schemas
│   │   ├── OrdersSchema.js
│   │   ├── HoldingsSchema.js
│   │   └── PositionsSchema.js
│   ├── index.js           # Main server file
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
└── README.md             # This file
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finedge
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In backend/.env
  

5. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   node index.js

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

### **Access Points**
- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3002
- **Dashboard:** http://localhost:3001/dashboard

---

## 📡 API Endpoints

### **Trading Operations**
- `POST /api/orders/place` - Place new order
- `GET /api/orders` - Get all orders
- `DELETE /api/orders/:id` - Cancel order
- `GET /api/holdings` - Get user holdings
- `GET /api/positions` - Get user positions
- `GET /api/portfolio` - Get portfolio summary

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

---

## 🎨 Design System

### **Color Palette**
- **Primary (Neon Teal):** `#14978B` (RGB: 20, 151, 139)
- **Accent (Midnight Purple):** `#9D4EDD`
- **Background Gradient** `linear-gradient(135deg, #0A0A1A 0%, #1A0A2A 50%, #2D1B69 100%)`

### **Typography**
- **Font Family:** Inter (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800, 900

### **Design Patterns**
- **Glassmorphism:** Frosted glass effects with backdrop filters
- **3D Transforms:** Perspective and depth effects
- **Micro-interactions:** Hover states and transitions
- **Responsive Design:** Mobile-first approach

---

## 🔧 Configuration

### **Environment Variables**

**Backend (.env)**


**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:3002
REACT_APP_ENV=development
```

---

## 📊 Performance

### **Build Optimization**
- **Bundle Size:** ~92 kB (gzipped)
- **Build Time:** ~30 seconds
- **Load Performance:** Optimized with lazy loading
- **SEO Ready:** Meta tags and semantic HTML

### **Database Performance**
- **Indexing:** Optimized for trading data
- **Connection Pooling:** Efficient database connections
- **Caching:** Redis for frequent queries (optional)

---

## 🛡️ Security Features

- **JWT Authentication:** Secure token-based auth
- **Password Hashing:** bcrypt for password security
- **CORS Configuration:** Secure cross-origin requests
- **Input Validation:** Comprehensive data validation
- **Environment Variables:** Secure configuration management

---

## 🚀 Deployment

### **Frontend Deployment**
```bash
# Build for production
npm run build

# Deploy to static hosting
serve -s build
```

### **Backend Deployment**
```bash
# Start production server
NODE_ENV=production node index.js
```

### **Recommended Hosting**
- **Frontend:** Vercel, Netlify, or AWS S3
- **Backend:** Heroku, AWS EC2, or DigitalOcean
- **Database:** MongoDB Atlas (cloud) or self-hosted

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---



## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **MongoDB** - For the powerful database solution
- **Bootstrap** - For the responsive UI framework
- **Font Awesome** - For the beautiful icon library
- **Open Source Community** - For all the amazing libraries and tools

---



**Built with ❤️ and cutting-edge technology for modern traders and investors.**
- **Interactive Charts**: Dynamic portfolio visualization
- **Order Management**: Buy/sell functionality

### Professional Features
- **Holdings Management**: Real-time portfolio tracking with P&L
- **Position Tracking**: Live position monitoring
- **Order Execution**: Market and limit order placement
- **Fund Management**: Account balance and margin tracking
- **Responsive Design**: Mobile-first UI

## Tech Stack

### Frontend
- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Chart.js & React-Chartjs-2** - Charts
- **Bootstrap 5** - Responsive design
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - REST API
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin support

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation
```bash
git clone <repository-url>
cd finedge

npm run install-all
```



### Start All Services
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Landing Page
cd frontend && npm start

# Terminal 3 - Dashboard
cd dashboard && npm start
```

Or run **launch-finedge.bat** (Windows) to start all three.

## Application URLs

| Service          | URL                   |
|------------------|-----------------------|
| Landing Page     | http://localhost:3000 |
| Trading Dashboard| http://localhost:3001 |
| Backend API      | http://localhost:3002 |

## Sample Data

```bash
curl http://localhost:3002/addHoldings
curl http://localhost:3002/addPositions
```

## API

- `GET /allHoldings` - Fetch holdings
- `GET /addHoldings` - Seed sample holdings
- `GET /allPositions` - Fetch positions
- `GET /addPositions` - Seed sample positions
- `GET /allOrders` - Order history
- `POST /newOrder` - Place order (body: name, qty, price, mode, product, orderType)

## License

MIT. For educational use.

---

**Finedge** – full-stack trading platform project.
