# Care.xyz - Baby Sitting & Elderly Care Service Platform

A comprehensive web application providing reliable and trusted care services for children, elderly, and family members. Users can find, book, and manage caretakers for various purposes including babysitting, elderly care, and special home care services.

## 🔗 Live Demo

[https://care-first-ten.vercel.app/](https://care-first-ten.vercel.app/)

## 🔑 Admin Credentials

(For testing purposes)

| Role      | Email             | Password           |
| --------- | ----------------- | ------------------ |
| **Admin** | `admin@gmail.com` | `admin@gmail.comA` |

| Role     | Email                   | Password                 |
| -------- | ----------------------- | ------------------------ |
| **User** | `shamim.ct17@gmail.com` | `shamim.ct17@gmail.comA` |

## 🚀 Core Features

- **User Authentication**

  - Email/Password authentication
  - Google OAuth integration using Firebase

- **Service Catalog**

  - Three main caregiving services:
    - Baby Care
    - Elderly Care
    - Sick People Care

- **Dynamic Booking System**

  - Book services by hours or days
  - Live price calculation based on duration

- **Location Selection**

  - Bangladesh-specific cascading dropdowns:
    - Division → District → City → Area

- **Booking Management**

  - Track booking status:
    - Pending
    - Confirmed
    - Completed
    - Cancelled

- **Responsive Design**

  - Fully responsive across mobile, tablet, and desktop

- **Modern UI/UX**
  - Premium design with gradients, animations, and glassmorphism effects

### ✅ Completed Features

- [x] Email invoice sending (Nodemailer integration)
- [x] Admin dashboard
- [x] Service reviews and ratings

### Technical Features

- **Next.js 16.1.1+** with App Router
- **Firebase Authentication** for user management
- **MongoDB** for data persistence
- **Protected Routes** with authentication state persistence
- **SEO Optimized** with dynamic metadata
- **Modern CSS** with Tailwind CSS v4
- **Real-time Updates** with React hooks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended)
- Firebase project with Authentication enabled
- Git installed

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd care-first
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/care-first

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Configuration (for Invoices)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Add your domain to authorized domains
4. Copy configuration to `.env.local`

## 💾 MongoDB Setup

1. Create a database at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP address (or use 0.0.0.0/0 for development)
4. Copy connection string to `.env.local`

## 📁 Project Structure

```
care-first/
├── app/
│   ├── api/                    # API routes
│   │   ├── bookings/          # Booking endpoints
│   │   ├── services/          # Service endpoints
│   │   └── users/             # User endpoints
│   ├── booking/               # Booking pages
│   ├── components/            # Reusable components
│   │   ├── auth/             # Auth components
│   │   ├── booking/          # Booking components
│   │   ├── home/             # Homepage sections
│   │   ├── layout/           # Layout components
│   │   └── ui/               # UI primitives
│   ├── contexts/              # React contexts
│   ├── login/                 # Login page
│   ├── my-bookings/           # User bookings page
│   ├── register/              # Registration page
│   ├── services/              # Service pages
│   ├── error.jsx              # Error boundary
│   ├── layout.js              # Root layout
│   ├── not-found.jsx          # 404 page
│   └── page.js                # Homepage
├── lib/
│   ├── data/                  # Sample data
│   ├── firebase/              # Firebase config
│   └── mongodb/               # MongoDB config & models
└── public/                    # Static assets
```

## 🎨 Design System

The application features a premium design system with:

- **Color Palette**: Purple primary, Pink secondary, Cyan accent
- **Typography**: Inter for body, Poppins for headings
- **Animations**: Fade in, slide in, scale, float effects
- **Glassmorphism**: Modern translucent card effects
- **Gradients**: Vibrant multi-color gradients

## 📱 Pages & Routes

| Route                  | Description                     | Protected |
| ---------------------- | ------------------------------- | --------- |
| `/`                    | Homepage with services overview | No        |
| `/login`               | User login                      | No        |
| `/register`            | User registration               | No        |
| `/services/[slug]`     | Service detail page             | No        |
| `/booking/[serviceId]` | Create booking                  | Yes       |
| `/my-bookings`         | View user bookings              | Yes       |

## 🔧 Configuration

### Password Requirements

- Minimum 6 characters
- At least 1 uppercase letter
- At least 1 lowercase letter

### Booking Statuses

- **Pending**: Newly created bookings
- **Confirmed**: Admin confirmed
- **Completed**: Service completed
- **Cancelled**: User/admin cancelled

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

## 🧪 Testing

1. **Authentication Flow**

   - Register new user with NID
   - Login with email/password
   - Login with Google OAuth

2. **Booking Flow**
   - Browse services
   - Create booking
   - View in My Bookings
   - Cancel booking

## 📝 TODO / Future Enhancements

- [ ] Real-time notifications
- [ ] Chat between users and caregivers

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Contact

For questions or support, please contact:

- Email: support@care.xyz
- Website: [care.xyz](https://care.xyz)

---

Built with ❤️ using Next.js, Firebase, and MongoDB
