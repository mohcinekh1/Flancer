## Description
Flancer is a modern full-stack web application for freelance services, similar to platforms like Fiverr or Upwork. It connects freelancers with clients looking for services across various categories. The platform enables users to create profiles, post gigs, place orders, communicate through messages, leave reviews, and securely process payments through Stripe.
## Project Structure
The project follows a client-server architecture:
``` 
Flancer/
├── api/            # Backend server
│   ├── controllers/  # Business logic
│   ├── middleware/   # Request handlers
│   ├── models/       # Database schemas
│   ├── public/       # Static files (uploads)
│   ├── routes/       # API endpoints
│   ├── utils/        # Helper functions
│   └── server.js     # Main server file
└── client/         # Frontend application
    ├── public/       # Static assets
    └── src/          # React components and logic
```
## Technologies Used
### Backend
- **Node.js** & **Express.js**: Server framework
- **MongoDB** & **Mongoose**: Database and ODM
- **JWT**: Authentication
- **Multer**: File uploads
- **Stripe**: Payment processing
- **Cookie-parser**: Cookie handling
- **CORS**: Cross-origin resource sharing
- **Bcrypt**: Password hashing
- **UUID**: Unique identifier generation

### Frontend
- **React 18.2.0**: UI library
- **Vite**: Build tool
- **React Router DOM**: Routing
- **Axios**: HTTP client
- **Tanstack React Query**: Data fetching
- **Stripe Elements (React)**: Payment UI
- **SASS**: Styling
- **Infinite React Carousel**: UI component

## Features
- **User Authentication**: Register, login, and user management
- **Gigs Management**: Create, read, update, delete service listings
- **Order Processing**: Place and manage orders
- **Messaging System**: Real-time conversations between users
- **Reviews**: Leave and view service reviews
- **File Uploads**: Image uploads for profiles and gigs
- **Payment Integration**: Secure payments with Stripe

## Installation
### Prerequisites
- Node.js (v14+)
- npm
- MongoDB

### Backend Setup
``` bash
# Navigate to api directory
cd Flancer/api

# Install dependencies
npm install

# Create .env file with the following variables
# MONGO=your_mongodb_connection_string
# JWT_KEY=your_jwt_secret_key
# STRIPE_KEY=your_stripe_secret_key

# Start server
npm start
```
### Frontend Setup
``` bash
# Navigate to client directory
cd Flancer/client

# Install dependencies
npm install

# Start development server
npm run dev
```
## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users` - Get users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Gigs
- `POST /api/gigs` - Create a gig
- `GET /api/gigs` - Get all gigs
- `GET /api/gigs/:id` - Get gig by ID
- `DELETE /api/gigs/:id` - Delete a gig

### Orders
- `POST /api/orders` - Create an order
- `GET /api/orders` - Get user orders

### Conversations
- `POST /api/conversations` - Create a conversation
- `GET /api/conversations` - Get user conversations
- `GET /api/conversations/:id` - Get specific conversation

### Messages
- `POST /api/messages` - Send a message
- `GET /api/messages/:id` - Get messages for a conversation

### Reviews
- `POST /api/reviews` - Create a review
- `GET /api/reviews/:id` - Get reviews for a gig

### File Upload
- `POST /api/upload` - Upload an image file

## Configuration
The application uses environment variables for configuration:
- `MONGO`: MongoDB connection string
- `JWT_KEY`: Secret key for JWT authentication
- `STRIPE_KEY`: Stripe API key for payment processing

## Development
For development, the server uses Nodemon for automatic restarting, and the client uses Vite's hot module replacement.
``` bash
# Backend development
cd Flancer/api
npm run dev

# Frontend development
cd Flancer/client
npm run dev
```
## Production Deployment
For production deployment:
``` bash
# Build frontend
cd Flancer/client
npm run build

# Start backend in production mode
cd Flancer/api
npm start
```
## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
Mohcine KHAFIF https://github.com/mohcinekh1

Happy freelancing with Flancer!
