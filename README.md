<p align="center">
  <img src="public/logo.png" alt="Holy Spirit Academy of Bangued Logo" width="120" height="120">
</p>

<h1 align="center">Holy Spirit Academy of Bangued</h1>

<p align="center">
  <strong>School Information Portal & Community Platform</strong>
</p>

<p align="center">
  <em>"Truth in Love"</em>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#environment-variables">Environment Variables</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## 📖 About

The **Holy Spirit Academy of Bangued (HSAB)** School Information Portal is a modern, full-featured web application designed to serve as the primary digital platform for the school community. It provides comprehensive information about the school, facilitates communication between administrators and stakeholders, and offers interactive features for engagement.

## ✨ Features

### 🏫 Public Information
- **School Profile** - History, background, and institutional information
- **Vision & Mission** - Core values and educational philosophy
- **Administrators** - Faculty and administrative team profiles
- **Facilities** - Campus facilities and learning environment
- **Achievements** - Academic and extracurricular accomplishments
- **Organizations** - Student clubs and organizational activities
- **Tuition & Fees** - Transparent fee structure information
- **Admissions** - Enrollment process and requirements

### 📢 Communication Hub
- **Announcements** - Real-time school announcements with rich content
- **Upcoming Events** - Event calendar and details
- **Contact Form** - Direct communication channel with the school
- **Comment System** - Community engagement on announcements

### 🤖 AI Mascot Assistant
- Interactive 3D mascot with smooth animations
- Rule-based Q&A system for common inquiries
- Mobile-friendly chat interface
- Helpful guidance for visitors

### 👤 User Management
- **User Registration** - Email verification flow
- **Authentication** - Secure login with Firebase Auth
- **Profile Management** - Personal account settings
- **Password Recovery** - Self-service password reset

### 🛡️ Admin Dashboard
- **Content Management** - Create, edit, and delete announcements
- **Event Management** - Full CRUD operations for school events
- **User Administration** - Role management and user oversight
- **Feedback Review** - View and manage user feedback

### 🎨 User Experience
- **Dark Mode** - Eye-friendly dark theme support
- **Responsive Design** - Optimized for all device sizes
- **SEO Optimized** - Search engine friendly pages
- **Smooth Animations** - Polished micro-interactions
- **Loading Skeletons** - Pleasant loading states

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, React Router 7 |
| **Styling** | Tailwind CSS 4 |
| **3D Graphics** | Three.js, React Three Fiber, Drei |
| **Backend** | Firebase (Auth, Firestore, Storage) |
| **Build Tool** | Vite 7 |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast |
| **Sanitization** | DOMPurify |
| **Deployment** | Vercel |

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Firebase Project** with Firestore, Authentication, and Storage enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/holy-spirit-academy.git
   cd holy-spirit-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
│   ├── admin/       # Admin-specific components
│   ├── common/      # Shared components (Cards, Forms, etc.)
│   ├── home/        # Home page components
│   └── layout/      # Layout components (Navbar, Footer)
├── context/         # React Context providers
│   ├── AuthContext.jsx    # Authentication state
│   └── ThemeContext.jsx   # Dark mode state
├── data/            # Static data files
├── firebase/        # Firebase configuration
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # Firebase service functions
│   ├── commentService.js
│   ├── eventService.js
│   ├── feedbackService.js
│   ├── mascotBrain.js
│   ├── postService.js
│   └── userService.js
├── utils/           # Utility functions
├── App.jsx          # Main application component
├── index.css        # Global styles
└── main.jsx         # Application entry point
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🌐 Deployment

This project is configured for deployment on **Vercel**.

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel's project settings
4. Deploy!

The `vercel.json` configuration handles SPA routing automatically.

## 🔥 Firebase Setup

### Firestore Collections

| Collection | Description |
|------------|-------------|
| `users` | User profiles and roles |
| `posts` | Announcements/news articles |
| `comments` | User comments on posts |
| `events` | School events |
| `feedback` | User feedback submissions |

### Authentication

Enable the following sign-in methods in Firebase Console:
- Email/Password

### Security Rules

Ensure proper Firestore security rules are configured to protect your data.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Holy Spirit Academy of Bangued.

## 📞 Contact

**Holy Spirit Academy of Bangued**
- Website: [Your Website URL]
- Email: [School Email]
- Location: Bangued, Abra, Philippines

---

<p align="center">
  Made with ❤️ for the HSAB Community
</p>
