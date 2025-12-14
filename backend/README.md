# 🧠 Sweet Shop Backend – Spring Boot API

The RESTful backend API for the Sweet Shop Management System, built using Spring Boot and SQLite. This API handles user authentication, inventory management, and CRUD operations for sweets.

## ⚙️ Tech Stack
- **Language:** Java 17
- **Framework:** Spring Boot 3
- **Database:** SQLite (Persistent, automatically created)
- **Security:** Spring Security + JWT (Token-based authentication)
- **Build Tool:** Maven

## 🔑 Key API Endpoints (Refer to Assessment)

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate and receive a JWT Bearer token |

### Sweet Management (Protected Endpoints)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/sweets` | Add a new sweet (Admin only) |
| GET | `/api/sweets` | View a list of all available sweets |
| GET | `/api/sweets/search` | Search by name, category, or price range |
| PUT | `/api/sweets/:id` | Update a sweet's details |
| DELETE | `/api/sweets/:id` | Delete a sweet (Admin only) |

### Inventory Operations (Protected Endpoints)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/sweets/:id/purchase` | Purchase a sweet, decreasing stock count (Validation: fails if quantity is 0) |
| POST | `/api/sweets/:id/restock` | Restock a sweet, increasing stock count (Admin only) |

## 🗄️ Database Setup
This project utilizes **SQLite**. The database file is automatically created in the root of the backend directory when the application runs for the first time.

## ▶️ How to Run Locally

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Run the application using Maven:**
    ```bash
    mvn spring-boot:run
    ```
    The server will start on `http://localhost:8080`.

## 🧪 Testing Strategy
The project follows **TDD** (Test-Driven Development). To run the full suite of unit and integration tests:
```bash
mvn test
