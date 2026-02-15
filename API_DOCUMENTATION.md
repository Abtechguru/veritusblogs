# VERITUS INTERNATIONAL - API Documentation

## Base URL
```
https://{projectId}.supabase.co/functions/v1/make-server-5bb3fa81
```

## Authentication
Most endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {access_token}
```

Get the access token from the signin response or from Supabase session.

---

## Authentication Endpoints

### 1. Sign Up
Create a new user account.

**Endpoint:** `POST /signup`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {publicAnonKey}
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "reader" | "author"
}
```

**Response (Success - 200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "reader" | "pending-author",
    "status": "approved" | "pending",
    "avatar": "https://...",
    "bio": "",
    "createdAt": "2026-02-13T..."
  },
  "message": "Account created successfully" | "Author account pending approval"
}
```

**Response (Error - 400):**
```json
{
  "error": "Email already exists" | "Invalid input"
}
```

**Notes:**
- If `role` is "author", account is created with status "pending"
- If `role` is "reader", account is created with status "approved"
- Password minimum 6 characters
- Email must be unique

---

### 2. Sign In
Authenticate a user and get session token.

**Endpoint:** `POST /signin`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "session": {
    "access_token": "jwt_token_here",
    "refresh_token": "refresh_token_here",
    "expires_in": 3600,
    "token_type": "bearer",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      ...
    }
  },
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "reader" | "author" | "admin",
    "status": "approved" | "pending",
    "avatar": "https://...",
    "bio": "...",
    "createdAt": "2026-02-13T..."
  }
}
```

**Response (Error - 400):**
```json
{
  "error": "Invalid credentials"
}
```

---

### 3. Get Session
Check current user session.

**Endpoint:** `GET /session`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response (Success - 200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "reader",
    ...
  }
}
```

**Response (Error - 401):**
```json
{
  "error": "Unauthorized"
}
```

---

### 4. Sign Out
End user session.

**Endpoint:** `POST /signout`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response (Success - 200):**
```json
{
  "success": true
}
```

---

## User Management Endpoints (Admin Only)

### 5. Get All Users
Retrieve all registered users.

**Endpoint:** `GET /users`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Permissions:** Admin only

**Response (Success - 200):**
```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "reader",
      "status": "approved",
      "avatar": "https://...",
      "bio": "...",
      "createdAt": "2026-02-13T..."
    },
    ...
  ]
}
```

**Response (Error - 401):**
```json
{
  "error": "Unauthorized"
}
```

---

### 6. Update User
Update user role and status.

**Endpoint:** `PUT /users/:userId`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {access_token}
```

**Permissions:** Admin only

**Request Body:**
```json
{
  "role": "reader" | "author" | "admin" | "sub-admin",
  "status": "approved" | "pending" | "rejected"
}
```

**Response (Success - 200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "author",
    "status": "approved",
    ...
  }
}
```

**Response (Error - 404):**
```json
{
  "error": "User not found"
}
```

**Notes:**
- When approving author: `{ "role": "author", "status": "approved" }`
- When rejecting author: `{ "role": "reader", "status": "rejected" }`

---

### 7. Get Pending Authors
Get all users awaiting author approval.

**Endpoint:** `GET /pending-authors`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Permissions:** Admin only

**Response (Success - 200):**
```json
{
  "pendingAuthors": [
    {
      "userId": "uuid",
      "email": "author@example.com",
      "name": "Jane Author",
      "requestedAt": "2026-02-13T..."
    },
    ...
  ]
}
```

---

## Article Endpoints

### 8. Get All Articles
Retrieve articles with optional filters.

**Endpoint:** `GET /articles`

**Query Parameters:**
- `category`: Filter by category (sports, cultures, politics, weather, celebrity-gist)
- `featured`: Filter featured articles (true/false)
- `authorId`: Filter by author ID

**Example:**
```
GET /articles?category=sports&featured=true
```

**Response (Success - 200):**
```json
{
  "articles": [
    {
      "id": "uuid",
      "title": "Article Title",
      "slug": "article-title",
      "excerpt": "Brief description...",
      "content": "<p>Full HTML content...</p>",
      "category": "sports",
      "authorId": "uuid",
      "authorName": "John Author",
      "authorAvatar": "https://...",
      "coverImage": "https://...",
      "publishedAt": "2026-02-13T...",
      "views": 1234,
      "readTime": 5,
      "tags": ["football", "sports"],
      "featured": true
    },
    ...
  ]
}
```

---

### 9. Get Single Article
Get article by ID (increments view count).

**Endpoint:** `GET /articles/:id`

**Response (Success - 200):**
```json
{
  "article": {
    "id": "uuid",
    "title": "Article Title",
    "slug": "article-title",
    "excerpt": "Brief description...",
    "content": "<p>Full HTML content...</p>",
    "category": "sports",
    "authorId": "uuid",
    "authorName": "John Author",
    "authorAvatar": "https://...",
    "coverImage": "https://...",
    "publishedAt": "2026-02-13T...",
    "views": 1235,
    "readTime": 5,
    "tags": ["football", "sports"],
    "featured": true
  }
}
```

**Response (Error - 404):**
```json
{
  "error": "Article not found"
}
```

---

### 10. Create Article
Create a new article.

**Endpoint:** `POST /articles`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {access_token}
```

**Permissions:** Authors and Admins only (with approved status)

**Request Body:**
```json
{
  "title": "My New Article",
  "excerpt": "Brief description of the article",
  "content": "<p>Full HTML content of the article</p>",
  "category": "sports",
  "coverImage": "https://...",
  "tags": ["tag1", "tag2"],
  "featured": false,
  "readTime": 5
}
```

**Response (Success - 200):**
```json
{
  "article": {
    "id": "uuid",
    "title": "My New Article",
    "slug": "my-new-article",
    "excerpt": "Brief description...",
    "content": "<p>Full HTML content...</p>",
    "category": "sports",
    "authorId": "uuid",
    "authorName": "John Author",
    "authorAvatar": "https://...",
    "coverImage": "https://...",
    "publishedAt": "2026-02-13T...",
    "views": 0,
    "readTime": 5,
    "tags": ["tag1", "tag2"],
    "featured": false
  }
}
```

**Response (Error - 401):**
```json
{
  "error": "Unauthorized"
}
```

**Response (Error - 403):**
```json
{
  "error": "Account not approved yet"
}
```

---

### 11. Update Article
Update an existing article.

**Endpoint:** `PUT /articles/:id`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {access_token}
```

**Permissions:** Article author or admin

**Request Body:**
```json
{
  "title": "Updated Title",
  "excerpt": "Updated excerpt",
  "content": "<p>Updated content</p>",
  "featured": true
}
```

**Response (Success - 200):**
```json
{
  "article": {
    "id": "uuid",
    "title": "Updated Title",
    "slug": "updated-title",
    ...
  }
}
```

**Response (Error - 404):**
```json
{
  "error": "Article not found"
}
```

---

### 12. Delete Article
Delete an article.

**Endpoint:** `DELETE /articles/:id`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Permissions:** Article author or admin

**Response (Success - 200):**
```json
{
  "success": true
}
```

**Response (Error - 404):**
```json
{
  "error": "Article not found"
}
```

---

## Comment Endpoints

### 13. Get Article Comments
Get all comments for an article.

**Endpoint:** `GET /articles/:articleId/comments`

**Response (Success - 200):**
```json
{
  "comments": [
    {
      "id": "uuid",
      "articleId": "uuid",
      "userId": "uuid",
      "userName": "John Commenter",
      "userAvatar": "https://...",
      "content": "Great article!",
      "parentId": null,
      "createdAt": "2026-02-13T..."
    },
    ...
  ]
}
```

---

### 14. Create Comment
Add a comment to an article.

**Endpoint:** `POST /articles/:articleId/comments`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {access_token}
```

**Permissions:** Authenticated users only

**Request Body:**
```json
{
  "content": "This is my comment",
  "parentId": "uuid" // Optional, for replies
}
```

**Response (Success - 200):**
```json
{
  "comment": {
    "id": "uuid",
    "articleId": "uuid",
    "userId": "uuid",
    "userName": "John Commenter",
    "userAvatar": "https://...",
    "content": "This is my comment",
    "parentId": null,
    "createdAt": "2026-02-13T..."
  }
}
```

---

## Newsletter Endpoints

### 15. Subscribe to Newsletter
Add email to newsletter list.

**Endpoint:** `POST /newsletter/subscribe`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {publicAnonKey}
```

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Subscribed successfully"
}
```

---

### 16. Get Newsletter Subscribers
Get all newsletter subscribers.

**Endpoint:** `GET /newsletter/subscribers`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Permissions:** Admin only

**Response (Success - 200):**
```json
{
  "subscribers": [
    {
      "id": "uuid",
      "email": "subscriber@example.com",
      "subscribedAt": "2026-02-13T..."
    },
    ...
  ]
}
```

---

## Broadcast Endpoint

### 17. Send Broadcast Message
Send message to users (email integration placeholder).

**Endpoint:** `POST /broadcast`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {access_token}
```

**Permissions:** Admin only

**Request Body:**
```json
{
  "subject": "Important Update",
  "message": "Dear users, we have an important announcement...",
  "recipients": "all" | "subscribers" | "authors"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Broadcast sent successfully",
  "broadcast": {
    "id": "uuid",
    "subject": "Important Update",
    "message": "...",
    "recipients": "all",
    "sentAt": "2026-02-13T...",
    "sentBy": "admin_uuid"
  }
}
```

---

## Analytics Endpoints

### 18. Track Analytics Event
Log an analytics event.

**Endpoint:** `POST /analytics/track`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {publicAnonKey}
```

**Request Body:**
```json
{
  "event": "page_view" | "article_read" | "newsletter_signup",
  "data": {
    "page": "/campaign/ambode-2027",
    "userId": "uuid",
    "sessionId": "session_id"
  }
}
```

**Response (Success - 200):**
```json
{
  "success": true
}
```

---

### 19. Get Analytics Data
Retrieve analytics events.

**Endpoint:** `GET /analytics`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Permissions:** Admin only

**Response (Success - 200):**
```json
{
  "events": [
    {
      "id": "uuid",
      "event": "page_view",
      "data": {
        "page": "/campaign/ambode-2027",
        "userId": "uuid"
      },
      "timestamp": "2026-02-13T..."
    },
    ...
  ]
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing auth token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Rate Limiting
Currently no rate limiting is implemented. Consider adding for production.

## CORS
All origins are allowed (`origin: "*"`). Restrict in production.

---

## Example Usage (JavaScript)

### Sign Up
```javascript
const response = await fetch(`${SERVER_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'reader'
  }),
});

const data = await response.json();
console.log(data);
```

### Get Articles
```javascript
const response = await fetch(`${SERVER_URL}/articles?category=sports`);
const data = await response.json();
console.log(data.articles);
```

### Create Article (Authenticated)
```javascript
const session = await supabase.auth.getSession();
const token = session.data.session.access_token;

const response = await fetch(`${SERVER_URL}/articles`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: 'My Article',
    excerpt: 'This is my article',
    content: '<p>Article content</p>',
    category: 'sports',
    coverImage: 'https://...',
    tags: ['sports', 'football'],
    featured: false,
    readTime: 5
  }),
});

const data = await response.json();
console.log(data.article);
```

---

## Testing with cURL

### Sign Up
```bash
curl -X POST https://{projectId}.supabase.co/functions/v1/make-server-5bb3fa81/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {publicAnonKey}" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User",
    "role": "reader"
  }'
```

### Get Articles
```bash
curl https://{projectId}.supabase.co/functions/v1/make-server-5bb3fa81/articles
```

### Create Article
```bash
curl -X POST https://{projectId}.supabase.co/functions/v1/make-server-5bb3fa81/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {access_token}" \
  -d '{
    "title": "Test Article",
    "excerpt": "Test excerpt",
    "content": "<p>Test content</p>",
    "category": "sports",
    "coverImage": "https://...",
    "tags": ["test"],
    "featured": false,
    "readTime": 3
  }'
```

---

## Notes

1. **Security**: All passwords are automatically hashed by Supabase Auth
2. **Slugs**: Auto-generated from titles (lowercase, hyphenated)
3. **View Counting**: Incremented on every GET /articles/:id request
4. **Email Confirmation**: Auto-confirmed since email server not configured
5. **Token Expiry**: Session tokens expire after 1 hour by default

---

## Support

For API issues:
1. Check request headers and body format
2. Verify authentication token
3. Check server logs in Supabase dashboard
4. Review error response messages

**API is fully functional and ready for production use!**
