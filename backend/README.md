# Technician App Backend

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/technician-app
JWT_SECRET=your-secret-key-here
```

### 3. Start the Server

#### Option A: Quick Test (JavaScript Server)
```bash
npm start
```
This runs the JavaScript version with mock data for immediate testing.

#### Option B: TypeScript Development
```bash
npm run build
npm run dev
```

### 4. Test the API
The server will be running on `http://localhost:5000`

Test endpoints:
- `GET /` - Health check
- `POST /api/auth/login` - Login (accepts any credentials for testing)
- `GET /api/sessions/all-stats` - Get all technicians statistics
- `POST /api/sessions/start` - Start a session
- `POST /api/sessions/scan` - Scan a screen
- `POST /api/sessions/stop` - Stop a session

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login technician
- `POST /api/auth/register` - Register new technician

### Sessions
- `POST /api/sessions/start` - Start a new session
- `POST /api/sessions/scan` - Scan a screen
- `POST /api/sessions/stop` - Stop current session
- `GET /api/sessions/all-stats` - Get global statistics
- `GET /api/sessions/summary/:technicianId` - Get technician summary

### Operations
- `POST /api/operations` - Log an operation
- `GET /api/operations/:technicianId` - Get technician operations

## Development

### TypeScript Compilation
```bash
npm run build    # Compile TypeScript to JavaScript
npm run watch    # Watch for changes and recompile
```

### Database Setup
The app uses MongoDB. For local development, you can:
1. Install MongoDB locally
2. Use MongoDB Atlas (cloud)
3. Use the test server which works without MongoDB

## Troubleshooting

### Common Issues:
1. **Port already in use**: Change PORT in .env file
2. **MongoDB connection failed**: Server will start without MongoDB for testing
3. **CORS issues**: CORS is configured to allow all origins for development

### Testing the Frontend:
1. Start this backend server
2. Update frontend API URLs to point to `http://localhost:5000`
3. Test login with any email/password combination 