# API Documentation

This document describes the API endpoints available in the cross-platform template.

## Base URL

- Development: `http://localhost:5000`
- Production: Configure via environment variables

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Endpoints

### Health Check

#### GET /health

Returns the health status of the API.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Examples

#### GET /api/examples

Get all examples with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Example 1",
      "description": "This is the first example",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

#### POST /api/examples

Create a new example.

**Request Body:**
```json
{
  "name": "New Example",
  "description": "This is a new example"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "New Example",
    "description": "This is a new example",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /api/examples/:id

Get a specific example by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Example 1",
    "description": "This is the first example",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /api/examples/:id

Update an example.

**Request Body:**
```json
{
  "name": "Updated Example",
  "description": "This is an updated example"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated Example",
    "description": "This is an updated example",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### DELETE /api/examples/:id

Delete an example.

**Response:**
```json
{
  "success": true,
  "message": "Example deleted successfully"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "message": "User-friendly error message"
}
```

Common HTTP status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error 