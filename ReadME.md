# HomeMaker Bakery Platform

A MERN stack marketplace connecting home bakers with customers, enabling homemakers to monetize their baking skills by selling homemade bakery items.

## Features

### For Bakers
- Bakery registration and profile management
- Product catalog management
- Order tracking and status updates
- Dashboard with sales analytics
- Real-time order notifications

### For Customers
- Browse diverse bakery products
- Place and track orders
- Digital invoice generation
- Order history
- Product search and filtering

### For Admin
- User management
- Platform monitoring
- Content moderation
- Analytics dashboard
- Dispute resolution

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Redux for state management
- Axios for API integration
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose ODM

## Installation

```bash
# Clone repository
git clone https://github.com/yourusername/homemaker-bakery.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Run backend (from backend directory)
npm run dev

# Run frontend (from frontend directory)
npm start
```

## Environment Variables

Create `.env` files in both frontend and backend directories:

```env
# Backend .env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

# Frontend .env
REACT_APP_API_URL=http://localhost:5000/api
```

## API Documentation

### Baker Routes
```
POST /api/baker/register - Register new baker
POST /api/baker/login - Baker login
GET /api/baker/products - Get baker's products
POST /api/baker/products - Add new product
PUT /api/baker/orders/:id - Update order status
```

### Customer Routes
```
POST /api/user/register - Register new user
POST /api/user/login - User login
GET /api/products - Get all products
POST /api/orders - Place new order
GET /api/orders/:id - Get order details
```

## Project Structure

```
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Team

- Backend Development:
  - Naitik Desai
  - Rishee Gandhi

- Frontend Development:
  - Saloni Gadhiya
  - Roshni Dholariya

- Documentation:
  - Saloni Gadhiya
  - Roshni Dholariya

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
