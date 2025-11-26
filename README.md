# InterStock Web App

A React.js web application converted from the Flutter mobile app. This is a comprehensive stock market learning platform for students.

## Features

- **Authentication**: Login, Registration, OTP Verification, Password Management
- **Main Navigation**: Home, Learn, Rank, Profile with bottom navigation
- **Quiz System**: Take quizzes, view results, and review answers
- **Trading**: Stock trading, futures, options with real-time charts
- **Community**: Posts, chat rooms, competitions
- **Learning**: Study materials, academic notes, assignments
- **Profile Management**: Edit profile, change password, notes, help center

## Tech Stack

- **React 18** - UI library
- **React Router DOM** - Routing
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Charts
- **Lucide React** - Icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── common/      # Common UI components
│   ├── charts/      # Chart components
│   └── layout/      # Layout components
├── context/         # React Context providers
├── pages/           # Page components
│   ├── auth/        # Authentication pages
│   ├── main/        # Main navigation pages
│   ├── quiz/        # Quiz pages
│   ├── profile/     # Profile pages
│   ├── drawer/      # Drawer menu pages
│   ├── home/        # Home-related pages
│   └── trading/     # Trading pages
└── routes/          # Routing configuration
```

## Available Routes

### Authentication
- `/` - Splash
- `/onboarding` - Onboarding
- `/login` - Login
- `/register-email` - Register
- `/otp-verify` - OTP Verification
- `/create-password` - Create Password
- `/select-school` - Select School
- `/select-goal` - Select Goal
- `/upload-picture` - Upload Picture
- `/forgot-password` - Forgot Password

### Main Pages
- `/home` - Home
- `/learn` - Learn Trading
- `/rank` - Rankings
- `/profile` - Profile

### Quiz
- `/quiz-home` - Quiz Home
- `/quiz-details/:isCompleted` - Quiz Details
- `/mcq-page` - MCQ Quiz
- `/view-result` - View Results
- `/view-answer` - View Answers

### Trading
- `/stock-details` - Stock Details
- `/buy-sell-stock` - Buy/Sell Stock
- `/order-confirmed-page` - Order Confirmed
- `/purchase-history` - Purchase History
- `/place-bid` - Place Bid
- `/futures-details` - Futures Details
- `/buy-futures` - Buy Futures

And many more...

## Notes

- The app uses Context API for state management
- All styling is done with Tailwind CSS
- Charts are implemented using Recharts
- The app is fully responsive and works on desktop and mobile browsers

## License

ISC


