# Lead Capture Dashboard

A MERN stack application for capturing and managing leads with webhook integration.

## Features
- Create new leads with validation
- View all leads in a data table
- Detailed view of each lead
- Webhook integration (sends data to external URL on creation)
- Clean, modern, responsive UI

## Technologies
- **Frontend**: React, Vite, Plain CSS
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB

## Prerequisites
- Node.js installed
- MongoDB installed and running locally

## Installation

1. **Clone the repository** (if applicable)

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

4. **Configuration**
   - The backend uses a default MongoDB URI `mongodb://localhost:27017/lead-capture-db` defined in `server/.env`.
   - The frontend proxies API requests to `http://localhost:5000` via `vite.config.js`.

## Running the Application

1. **Start MongoDB**
   Ensure your local MongoDB instance is running.

2. **Start the Backend Server**
   ```bash
   cd server
   npm run server
   ```
   Server runs on `http://localhost:5000`.

3. **Start the Frontend Client**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:3000` (or similar).

4. **Open Browser**
   Visit the URL shown in the client terminal (usually `http://localhost:5173` or `3000`).

## API Endpoints

- `GET /leads` - Get all leads
- `GET /leads/:id` - Get single lead
- `POST /leads` - Create a new lead
  - Body: `{ name, email, phone, company, message, source }`

## Webhook Flow

When a lead is successfully created via `POST /leads`, the backend automatically sends a POST request with the lead data to the `WEBHOOK_URL` specified in `.env`.
