# 🏛️ Museum Explorer

> **Where History Meets Modern Design.**  
> A full-stack MERN blog platform tailored for museum enthusiasts, featuring a rich content editor, custom rating system, and dynamic filtering.

![Museum Explorer Banner](https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?q=80&w=2070&auto=format&fit=crop)

## ✨ Features

### 🎨 For Visitors
*   **Immersive Design:** "Museum Blue" themed UI with Tailwind CSS for a premium feel.
*   **Smart Filtering:** Sidebar filter to discover museums by **Country** and **City**.
*   **Rich Content:** View detailed articles with formatted text, images, and embedded videos.
*   **Custom Ratings:** See detailed ratings for specific criteria like *Parking*, *Price*, *Atmosphere*.

### 🛡️ For Admins
*   **Secure Dashboard:** JWT-based authentication for secure access.
*   **Rich Text Editor:** Integrated **React Quill** (New) for writing beautiful articles.
*   **Media Support:**
    *   **Image Upload:** Direct server-side image uploading.
    *   **Video Embedding:** Auto-embed YouTube/Vimeo links.
*   **Dynamic Rating System:** Add custom rating criteria on the fly (e.g., "Accessibility: 5/5").

## 🛠️ Tech Stack

*   **Frontend:** React (Vite 7), Tailwind CSS 4, React Router 7.
*   **Backend:** Node.js, Express 5.
*   **Database:** MongoDB (Mongoose).
*   **Tools:** React Quill New, Multer, JWT, BCrypt.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v20+)
*   MongoDB Instance (Local or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/museum-explorer.git
    cd museum-explorer
    ```

2.  **Install Dependencies** (Root script installs both client & server)
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `server` folder:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```

4.  **Run Locally**
    Since we have a root script, you can run the server directly (Client is served by Vite in dev, or static in prod):
    
    *   **Development (Run separately for HMR):**
        ```bash
        # Terminal 1
        cd server && npm run dev
        
        # Terminal 2
        cd client && npm run dev
        ```

## 🌍 Deployment

This project is configured for **Railway** (Single Service Deployment).

1.  Push to GitHub.
2.  Import project in Railway.
3.  Set `MONGO_URI` and `JWT_SECRET` variables.
4.  Railway will auto-detect the root `package.json` and deploy!

## 📸 Screenshots

| Home Page | Museum Detail | Admin Editor |
|-----------|---------------|--------------|
| ![Home](https://placehold.co/600x400/1e293b/FFF?text=Home+Page) | ![Detail](https://placehold.co/600x400/1e293b/FFF?text=Detail+Page) | ![Editor](https://placehold.co/600x400/1e293b/FFF?text=Admin+Editor) |

---

Made with ❤️ by Ege.
