# Cultural Events Booking System 

A full-stack application designed to manage and book cultural events like Dance, Music, and Drama. Built with a modern tech stack focusing on performance, scalability, and ease of use.

##  Overview

The **Cultural Events Booking System** allows students and administrators to interact with cultural events. Students can browse events, view details, and book their spots, while administrators have a dedicated dashboard to manage events, users, and bookings.

##  Key Features

-   **User Authentication**: Secure Login and Registration with role-based access control (Student/Admin).
-   **Event Management**: 
    -   Browse events by category (Dance, Music, Drama).
    -   View event details, including descriptions, rules, and seat availability.
    -   Admin-only CRUD operations for events.
-   **Booking System**:
    -   Real-time seat availability tracking.
    -   Student booking management (View and Cancel bookings).
-   **Admin Dashboard**:
    -   Overview of all users, events, and bookings.
    -   User management and role assignments.
-   **Responsive Design**: A sleek, modern UI built with Tailwind CSS that works on all devices.

##  Tech Stack

### Frontend
-   **Framework**: [React 19](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **State & Forms**: [React Hook Form](https://react-hook-form.com/)
-   **Routing**: [React Router v7](https://reactrouter.com/)
-   **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

### Backend
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **ORM**: [Sequelize](https://sequelize.org/)
-   **Database**: [MySQL](https://www.mysql.com/)
-   **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)

##  Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/download/) (v16+ recommended)
-   [MySQL Server](https://dev.mysql.com/downloads/installer/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd cultural-events-app
    ```

2.  **Install all dependencies**:
    This command will install dependencies for the root, backend, and frontend.
    ```bash
    npm run install:all
    ```

### Database Setup

1.  Create the database and tables using the provided SQL schema:
    ```bash
    mysql -u your_username -p < backend/schema.sql
    ```
    *Note: Alternatively, you can run `node backend/create-db.js` if configured.*

2.  **Configure Environment Variables**:
    Create a `.env` file in the `backend` directory with the following content:
    ```env
    MYSQL_HOST=localhost
    MYSQL_USER=your_mysql_username
    MYSQL_PASSWORD=your_mysql_password
    MYSQL_DB=cultural_events_db
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

### Running the Application

To run both the frontend and backend concurrently:

```bash
npm run start
```

-   **Frontend**: [http://localhost:3000](http://localhost:3000)
-   **Backend**: [http://localhost:5000](http://localhost:5000)

##  Default Admin Credentials

For testing purposes, a system administrator account is seeded automatically:
-   **Email**: `admin@admin.com`
-   **Password**: `admin123`

## 📄 License

This project is licensed under the MIT License.
