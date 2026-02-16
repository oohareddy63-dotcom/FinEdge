# Finedge - Professional Full-Stack Trading Platform

A full-stack trading platform with real-time features, built with React, Node.js, and MongoDB.

## Live Features

### Real-Time Trading Dashboard
- **Live Market Data**: NIFTY 50 and SENSEX updates
- **Dynamic Watchlist**: Live price updates every 3 seconds
- **Portfolio Management**: Real-time P&L calculations
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

### Environment
Create `backend/.env`:
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?appName=Finedge
PORT=3002
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
