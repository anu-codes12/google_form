# 📡 API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, the API has no authentication. All endpoints are public.

## Response Format

All responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { /* actual data */ }
}
```

### Error Response
```json
{
  "message": "Error description",
  "error": "Additional error details"
}
```

---

## 🏥 Health Check

### GET /health
Check if the server is running.

**Request:**
```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "message": "Server is running"
}
```

---

## 📋 Form Endpoints

### POST /forms
Create a new form.

**Request:**
```bash
curl -X POST http://localhost:5000/api/forms \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Customer Feedback",
    "description": "We value your feedback",
    "questions": [
      {
        "id": "q1",
        "type": "short_answer",
        "title": "What is your name?",
        "required": true,
        "options": []
      }
    ],
    "createdBy": "user@example.com"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Customer Feedback",
    "description": "We value your feedback",
    "questions": [...],
    "createdBy": "user@example.com",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:45.000Z",
    "updatedAt": "2024-01-15T10:30:45.000Z"
  }
}
```

---

### GET /forms
Get all forms.

**Request:**
```bash
curl http://localhost:5000/api/forms
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Customer Feedback",
      ...
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Event Survey",
      ...
    }
  ]
}
```

---

### GET /forms/:id
Get a specific form by ID.

**Request:**
```bash
curl http://localhost:5000/api/forms/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Customer Feedback",
    "description": "We value your feedback",
    "questions": [
      {
        "id": "q1",
        "type": "short_answer",
        "title": "What is your name?",
        "required": true,
        "options": []
      },
      {
        "id": "q2",
        "type": "paragraph",
        "title": "Please provide your feedback",
        "required": true,
        "options": []
      },
      {
        "id": "q3",
        "type": "multiple_choice",
        "title": "How satisfied are you?",
        "required": true,
        "options": [
          { "id": "opt1", "text": "Very Satisfied" },
          { "id": "opt2", "text": "Satisfied" },
          { "id": "opt3", "text": "Neutral" }
        ]
      }
    ],
    "createdBy": "user@example.com",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:45.000Z",
    "updatedAt": "2024-01-15T10:30:45.000Z"
  }
}
```

---

### PUT /forms/:id
Update a form.

**Request:**
```bash
curl -X PUT http://localhost:5000/api/forms/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "description": "Updated description",
    "questions": [...],
    "isActive": true
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Title",
    ...
  }
}
```

---

### DELETE /forms/:id
Delete a form.

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/forms/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "message": "Form deleted successfully"
}
```

---

## 📝 Response Endpoints

### POST /responses
Submit a form response.

**Request:**
```bash
curl -X POST http://localhost:5000/api/responses \
  -H "Content-Type: application/json" \
  -d '{
    "formId": "507f1f77bcf86cd799439011",
    "answers": [
      {
        "questionId": "q1",
        "questionType": "short_answer",
        "value": "John Doe"
      },
      {
        "questionId": "q2",
        "questionType": "paragraph",
        "value": "Great service overall"
      },
      {
        "questionId": "q3",
        "questionType": "multiple_choice",
        "value": "Very Satisfied"
      }
    ],
    "respondentEmail": "john@example.com"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "607f1f77bcf86cd799439011",
    "formId": "507f1f77bcf86cd799439011",
    "answers": [...],
    "respondentEmail": "john@example.com",
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

---

### GET /responses/:formId
Get all responses for a specific form.

**Request:**
```bash
curl http://localhost:5000/api/responses/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "607f1f77bcf86cd799439011",
      "formId": "507f1f77bcf86cd799439011",
      "answers": [
        {
          "questionId": "q1",
          "questionType": "short_answer",
          "value": "John Doe"
        }
      ],
      "respondentEmail": "john@example.com",
      "createdAt": "2024-01-15T10:35:00.000Z"
    },
    {
      "_id": "607f1f77bcf86cd799439012",
      "formId": "507f1f77bcf86cd799439011",
      "answers": [
        {
          "questionId": "q1",
          "questionType": "short_answer",
          "value": "Jane Smith"
        }
      ],
      "respondentEmail": "jane@example.com",
      "createdAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

---

### GET /responses/:formId/count
Get the number of responses for a form.

**Request:**
```bash
curl http://localhost:5000/api/responses/507f1f77bcf86cd799439011/count
```

**Response:**
```json
{
  "success": true,
  "count": 42
}
```

---

## 🔍 Data Models

### Form Schema
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  questions: [
    {
      id: String (UUID),
      type: String ("short_answer" | "paragraph" | "multiple_choice" | "checkboxes" | "dropdown"),
      title: String (required),
      required: Boolean,
      options: [
        {
          id: String,
          text: String
        }
      ]
    }
  ],
  createdBy: String,
  isActive: Boolean,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Response Schema
```javascript
{
  _id: ObjectId,
  formId: ObjectId (ref: Form),
  answers: [
    {
      questionId: String,
      questionType: String,
      value: Mixed (String | Array)
    }
  ],
  respondentEmail: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

## 🚨 Error Codes

### 200 OK
Request successful.

### 201 Created
Resource created successfully.

### 400 Bad Request
Invalid request data.
```json
{
  "message": "Form title is required"
}
```

### 404 Not Found
Resource not found.
```json
{
  "message": "Form not found"
}
```

### 500 Internal Server Error
Server error occurred.
```json
{
  "message": "Error creating form",
  "error": "MongoDB connection failed"
}
```

---

## 💡 Usage Examples

### Using with JavaScript/Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Create a form
async function createForm() {
  try {
    const response = await api.post('/forms', {
      title: 'My Survey',
      description: 'A sample survey',
      questions: []
    });
    console.log(response.data.data);
  } catch (error) {
    console.error(error.response.data);
  }
}

// Get all forms
async function getForms() {
  try {
    const response = await api.get('/forms');
    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
}

// Submit a response
async function submitResponse(formId, answers) {
  try {
    const response = await api.post('/responses', {
      formId,
      answers
    });
    console.log('Response submitted:', response.data.data);
  } catch (error) {
    console.error(error.response.data);
  }
}
```

### Using with cURL

```bash
# Get all forms
curl http://localhost:5000/api/forms

# Create form
curl -X POST http://localhost:5000/api/forms \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test form","questions":[]}'

# Get specific form
curl http://localhost:5000/api/forms/507f1f77bcf86cd799439011

# Update form
curl -X PUT http://localhost:5000/api/forms/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated"}'

# Delete form
curl -X DELETE http://localhost:5000/api/forms/507f1f77bcf86cd799439011

# Get form responses
curl http://localhost:5000/api/responses/507f1f77bcf86cd799439011

# Get response count
curl http://localhost:5000/api/responses/507f1f77bcf86cd799439011/count

# Submit response
curl -X POST http://localhost:5000/api/responses \
  -H "Content-Type: application/json" \
  -d '{"formId":"507f1f77bcf86cd799439011","answers":[...]}'
```

---

## 🔒 Security Considerations

1. **No Authentication Required** - All endpoints are public
2. **CORS Enabled** - Requests from frontend are allowed
3. **Input Validation** - Both client and server validate data
4. **No Sensitive Data in URLs** - Use POST for sensitive data
5. **Environment Variables** - Keep MongoDB URI secret

---

## 📊 Rate Limiting
Currently not implemented. Coming in future versions.

---

## 🔄 API Versioning
Currently at v1 (default). Future versions may be available at `/api/v2/`

---

For frontend integration examples, see [services/api.js](./frontend/src/services/api.js)
