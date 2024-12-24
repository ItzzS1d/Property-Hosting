# Property Hosting

**Property Hosting** is a web-based platform that simplifies the process of listing, discovering, and booking properties. Designed with the **MVC (Model-View-Controller)** architecture, this project ensures clean separation of concerns for better scalability and maintainability.

## 🚀 Features

- **User Authentication**: Secure login and registration using **JSON Web Tokens (JWT)**.
- **Property Listing**: Hosts can upload property details and images effortlessly.
- **Property Search & Filtering**: Users can search properties with filters like location, price, and availability.
- **Image Management**: Upload and serve images via **Cloudinary**.
- **Responsive UI**: A sleek, mobile-friendly interface powered by **Tailwind CSS**.
- **Real-time Data Handling**: Fast and dynamic data interaction using **MongoDB** and **RESTful APIs**.

## 🛠️ Tech Stack

### Frontend:
- **React JS**: For creating a dynamic and interactive user interface.
- **Tailwind CSS**: For responsive and modern styling.
- **TypeScript**: Provides type safety and improved development experience.

### Backend:
- **Express.js**: Handles server-side logic efficiently.
- **MongoDB**: NoSQL database for scalable and flexible data storage.
- **RESTful API**: Facilitates communication between frontend and backend.
- **JSON Web Tokens (JWT)**: Provides secure authentication and authorization.

### Cloud Services:
- **Cloudinary**: Manages image uploads and optimization.

---

## ⚙️ MVC Architecture

The project follows the **MVC (Model-View-Controller)** pattern for structured organization:

### **1. Models**
   - Define data structures for properties, users, and bookings using **Mongoose**.
   - Located in: `server/models/`

### **2. Views**
   - The user interface (UI) is handled entirely on the frontend using **React JS**.
   - Located in: `client/src/components/`

### **3. Controllers**
   - Contain the business logic and interact with models to handle user actions.
   - Example: Create, update, and delete property listings or manage user sessions.
   - Located in: `server/controllers/`

---

## 📂 Project Structure

