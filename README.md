# Google Forms Clone with QR Surveys and Bulk Email

A MERN stack application that replicates Google Forms functionality, allowing users to create surveys, generate QR codes for easy access, and send surveys in bulk via email.

## Features

- **Survey Creation**: Create custom surveys with various question types
- **QR Code Generation**: Generate QR codes for quick survey access
- **Bulk Email Sending**: Send surveys to multiple recipients via email
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Responses**: Collect and view survey responses in real-time

## Tech Stack

### Frontend
- React 19
- Vite
- ESLint

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- Dotenv

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "google forms"
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file and add your MongoDB connection string and other environment variables
   # Example: MONGODB_URI=mongodb://localhost:27017/googleforms
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

1. **Start the Backend**:
   ```bash
   cd backend
   node server.js
   # Or use nodemon for development: npx nodemon server.js
   ```
   The backend will run on `http://localhost:5000` (or your configured port).

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

## Usage

1. Open your browser and navigate to the frontend URL.
2. Create a new survey by adding questions.
3. Generate a QR code for the survey.
4. Send the survey via email to multiple recipients.
5. View responses in real-time.

## API Endpoints

The backend provides the following main endpoints:
- `GET /api/surveys` - Get all surveys
- `POST /api/surveys` - Create a new survey
- `GET /api/surveys/:id` - Get a specific survey
- `POST /api/surveys/:id/responses` - Submit a survey response
- `POST /api/send-email` - Send bulk emails

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Inspired by Google Forms
- Built with MERN stack</content>
<parameter name="filePath">c:\Users\Anusha\Desktop\google forms\README.md