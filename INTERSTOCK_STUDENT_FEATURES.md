# InterStock — Student Side: Complete Working Features Document

## 1. Project Overview

InterStock is a **stock market simulation and education platform** built as a Final Year Project (FYP). It provides students with a safe, simulated environment to learn stock trading, take quizzes, submit assignments, and compete on leaderboards.

**Tech Stack:**
- **Frontend:** React 18, React Router DOM v6, Vite, Tailwind CSS, Recharts, Lucide React Icons
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Authentication, bcryptjs
- **Local Persistence:** localStorage for quiz attempts, assignment submissions, notes, notification settings

---

## 2. Authentication System (Frontend + Backend)

### 2.1 Login (LoginPage.jsx)
- Email + password form with validation
- Calls POST /api/auth/signin via AuthContext.login()
- Stores JWT token + user data in localStorage
- Displays success/error messages
- Social login buttons (Google/Apple — UI only, not connected)
- Links to "Forgot Password" and "Register"

### 2.2 Registration (RegisterEmailPage.jsx)
- Full Name, Email, Confirm Email, Password, Confirm Password fields
- Client-side validation (email format, min 8 chars, match checks)
- Calls POST /api/auth/signup via AuthContext.registerUser()
- Backend creates user in MongoDB with hashed password (bcrypt)

### 2.3 Forgot Password (ForgotPasswordPage.jsx)
- Email input form
- Currently mock — shows alert and navigates to login (no backend endpoint)

### 2.4 Create Password (CreatePasswordPage.jsx)
- Password + Confirm Password form, navigates to login on match

### 2.5 Onboarding (OnboardingPage.jsx)
- 3-slide carousel: "Welcome to InterStock", "Practice Trading", "Compete & Learn"
- Skip button or navigate through slides, then redirects to login

### 2.6 Backend Auth API Endpoints (backend/routes/auth.js, backend/models/User.js)

| Endpoint | Method | Description |
|---|---|---|
| /api/auth/signup | POST | Register (name, email, password, phone) |
| /api/auth/signin | POST | Login, returns JWT token |
| /api/auth/me | GET | Get current user (Bearer token) |
| /api/auth/change-password | PUT | Change password (current + new, token required) |

### 2.7 Auth State Management (AuthContext.jsx)
- Provides: user, login, logout, registerUser, changePassword, updateProfile, deactivateAccount, activateAccount, loading, isAuthenticated
- On mount, verifies stored token with /api/auth/me
- updateProfile — local localStorage update only (no backend endpoint yet)
- deactivateAccount/activateAccount — local toggle only

### 2.8 App Context (AppContext.jsx)
- Checks localStorage for auth token, sets isAuthenticated flag
- Shows loading screen while verifying

---

## 3. Navigation & Layout

### 3.1 Bottom Navigation (NavigationTabs.jsx)
- 4 tabs: Home, Learn, Rank, Profile
- Shown on /home, /learn, /rank, /profile

### 3.2 Main Layout (MainLayout.jsx)
- Used by Home, Rank, Profile pages
- Sidebar (desktop) / Hamburger (mobile) with: Achievements, Assignments, Chat Rooms, Competitions, Conversations, Event Calendar, Hall of Fame, Notes, Study Materials
- Header: InterStock branding, Refresh, Notification bell (red dot), Profile dropdown (My Profile, Settings, Logout)

### 3.3 Desktop Layout (DesktopLayout.jsx)
- Used by trading pages (Listing, StockDetails, BuySellStock, Futures, Options)
- Same sidebar and header as MainLayout

### 3.4 Utility Menu (UtilityMenu.jsx)
- Mobile dropdown: Assignments, Quizzes, Achievements, Chat Rooms, Conversations, Hall of Fame, Notes, Study Materials, Teachers, Purchase History, Logout

---

## 4. Home / Dashboard (HomePage.jsx)

- Greeting with user's name from auth context
- Portfolio Overview: Line chart (Recharts) — $18,908 total, +4.78%
- Buy/Sell Buttons: Navigate to /buy-sell-stock?action=buy or sell
- Quiz History Widget: Up to 3 most recent quiz attempts from localStorage
- Trending Stocks: 3 stocks (AAPL, GOOGL, MSFT) as StockCard components
- On mobile: Notification bell + Utility Menu

---

## 5. Stock Trading System

### 5.1 Listing / Learn Page (ListingPage.jsx — 713 lines, largest component)

**Three segments via tabbed UI:**

**Stocks Tab:**
- Portfolio balance ($18,908.00, +4.78%)
- Buy/Sell action modal (Buy, Sell, Short, Buy to Cover)
- Trending Stocks horizontal row (AMD, ABNB, AMZN)
- Your Assets table (shares, year change, P/L)
- Purchase History transactions

**Futures Tab:**
- Long Position / Short Position buttons
- Active Contracts (E-mini S&P 500 futures — ES, NQ) with price, change, expiry, multiplier, volume, margin
- Your Positions (contracts, type, entry/current price, P&L, margin)

**Options Tab:**
- Options Chain table (Calls/Strike/Put with bid/ask)
- Selected Option card -> OptionsDetailsPage
- Place Bid button -> OptionsTradeModal

**Search Feature:** Finds stocks by symbol/name from 8 stocks bank -> StockDetailsPage

### 5.2 Stock Details (StockDetailsPage.jsx)
- Stock header (symbol, name, price, % change) with StockLogo
- Interactive line chart with time periods (24H, 7D, 1M, 3M, 1Y, ALL)
- Overview table: Previous Close, Open, Bid, Ask, Day's Range, Volume
- Buy/Sell dropdowns (action + order type: Market/Limit/Stop/Stop Limit)
- 5 stocks supported (AFRM, AAPL, AMD, ABNB, AMZN)

### 5.3 Buy/Sell Stock (BuySellStockPage.jsx)
- 4-tab control: Buy, Sell, Short, Buy to Cover
- Asset selector modal (8 stocks)
- Amount input ($267.90 available balance)
- Quantity input
- Order Preview Modal: stock logo, quantity, shares, fee (Free), total
- "Buy Now" -> OrderConfirmedPage

### 5.4 Futures Details (FuturesDetailsPage.jsx)
- Contract info + margin required
- Line chart with time period selector
- Quick Analysis: Trend, Volatility, Support, Resistance
- Buy/Sell -> FuturesOrderPage

### 5.5 Futures Order (FuturesOrderPage.jsx)
- Buy/Sell segmented control
- Contract count with increment/decrement
- Trade Summary: Direction, Entry Price, Contract Value, Margin Required
- "Confirm Trade" -> OrderConfirmedPage

### 5.6 Options Details (OptionsDetailsPage.jsx)
- Option info (name, company, margin, price, countdown timer)
- Stats: Total Shares, Starting Price, Active Bidders, Min Increment
- "Place Bid" -> PlaceBidModal

### 5.7 Options Trade Modal (OptionsTradeModal.jsx)
- Bar chart (monthly price trends)
- Premium price +/- control, Lots dropdown (1-10)
- Advanced mode: Spreads, Butterflies, Iron Condors, Verticals

### 5.8 Order Confirmed (OrderConfirmedPage.jsx)
- Success checkmark with sparkle animations
- Order summary (Quantity, Price, Fee, Total)

### 5.9 Purchase History (PurchaseHistoryPage.jsx)
- Past transactions: Buy/Sell, symbol, quantity, price, date, total

> **Note:** All trading data is hardcoded/mock — no real backend API for trading.

---

## 6. Educational Features

### 6.1 Quiz System

**Quiz Home (QuizHomePage.jsx)**
- 6 quizzes from quizzesData.js
- Question count + duration per quiz
- "Attempted" badge with score from localStorage

**Quiz Detail (QuizDetailPage.jsx)**
- Full quiz info: title, subject, description, due date, duration, question count
- Days until deadline (color-coded warnings)
- Previous attempt score display
- Account deactivation check

**MCQ Page (McqPage.jsx)**
- Timed quiz with countdown timer (orange <60s, red on timeout)
- Questions from quizQuestions.js (20+ stock market questions)
- Single-answer MCQ, progress indicator
- Auto-submit on timeout
- Navigate between questions

**View Result (ViewResultPage.jsx)**
- Score (X/Y, %), performance message
- Correct vs Incorrect count
- Saves to localStorage

**View Answers (ViewAnswerPage.jsx)**
- All questions with correct (green) / wrong (red) highlighting

**6 Quizzes Defined:**
1. Stock Market Basics (15 questions)
2. Risk Management Assessment (20 questions)
3. Options Trading Quiz (18 questions)
4. Quick Knowledge Check (1 question, 30s timer)
5. Technical Analysis Fundamentals (5 questions)
6. Portfolio Management Basics (5 questions)

### 6.2 Assignments

**Assignments List (AssignmentsPage.jsx)**
- 4 assignments from assignmentsData.js
- Due date status (color-coded), submitted checkmark
- Account deactivation check

**Assignment Detail (AssignmentDetailPage.jsx)**
- Full info + file upload (PDF, DOC, DOCX) with drag-drop
- Submit tracking via assignmentSubmissions.js (localStorage)

**4 Assignments:** Stock Market Analysis Report, Trading Strategy Essay, Portfolio Management Assignment, Analysis Report

### 6.3 Study Materials (StudyMaterialsPage.jsx)
- 3 materials: Stock Market Basics PDF, Trading Guide Book, Video Tutorial Series
- Download buttons (UI only)

### 6.4 Upcoming Tasks (UpcomingTasksPage.jsx)
- Unified view: Assignments + Quizzes tabs
- Pre-selectable tab via URL query param

---

## 7. Social Features

### 7.1 Chat Rooms (ChatRoomsPage.jsx)
- 2 rooms: "Trading Discussion" (25 members), "Stock Tips" (42 members)

### 7.2 Chat Room Details (ChatRoomDetailsPage.jsx)
- Handles group chats AND 1-on-1 conversations
- 10 hardcoded group messages (Jawad, Ayesha, Maha, Sheema)
- Message bubbles with sender name + time
- Text input (mock — not persisted)
- Disabled if account deactivated

### 7.3 Conversations (ConversationsPage.jsx)
- 4 contacts: Jawad, Ayesha, Maha, Sheema
- Last message + time, "+" for new chat

### 7.4 New Chat (NewChatPage.jsx)
- Search students, click to start conversation

### 7.5 AI Chatbot (ChatBotPage.jsx)
- Chat interface with bot avatar
- Simulated responses ("Thanks for your message!" after 1s delay)
- No actual AI integration

---

## 8. Profile Management

### 8.1 Profile Page (ProfilePage.jsx)
- Profile picture upload (base64)
- Name + email from auth context
- Menu: Notification, Edit Profile, Change Password, My Notes, Privacy Policy, Terms, Help, FAQs, Contact Us
- Deactivate/Activate Account toggle
- Logout

### 8.2 Edit Profile (EditProfilePage.jsx)
- Pre-filled form: Name, Email, Phone + image upload
- localStorage update only (no backend)

### 8.3 Change Password (ChangePasswordPage.jsx)
- Current + New + Confirm password form
- Fully functional with backend (PUT /api/auth/change-password)

---

## 9. Achievements / Gamification (AchievementsPage.jsx, AchievementDetailsPage.jsx)

5 badge-style achievements (hardcoded):
1. **First Profit** — First profitable trade (Completed)
2. **Risk Master** — Low risk portfolio 30 days (10/30)
3. **Diversification Pro** — Diverse portfolio (30/50)
4. **Social Trader** — Active in community (72%)
5. **Top Performer** — Top 10% of class (80%)

Tabs: All Badges / Completed. Details page: icon, description, earned date, requirements.

---

## 10. Rankings & Hall of Fame

### Rank Page (RankPage.jsx)
- Podium for top 3 (gold/silver/bronze)
- 5 participants: Jawad (#1, 95), Maha (#2, 92), You (#3, 88), Ayesha (#4, 85), Badar (#5, 82)

### Hall of Fame (HallOfFamePage.jsx)
- Trophy/medal/award icons for top 3

---

## 11. Notes System

### My Notes (MyNotesPage.jsx)
- 2 default notes ("Trading Basics", "Risk Management")
- Create/edit/delete notes (localStorage persistence)
- Deactivation notice for inactive accounts

### Note Details (NewNotesPage.jsx)
- View/Edit mode with title + content
- Delete with confirmation dialog

---

## 12. Notifications (NotificationPage.jsx)
- Enable/disable toggle (localStorage)
- 2 hardcoded notifications: "New Quiz Available", "Assignment Due"
- Clicking navigates to relevant page

---

## 13. Help & Support

| Page | Path | Content |
|---|---|---|
| Help Center (HelpCenterPage.jsx) | /help-center | 4 topics |
| Help Detail (HelpDetailPage.jsx) | /help-center-details | Static guide |
| FAQs (FaqsPage.jsx) | /faqs-page | 4 accordion Q&As |
| Contact Form (ContactFormPage.jsx) | /contact-form | Name/Email/Subject/Message (mock) |
| Privacy Policy (PrivacyPolicyPage.jsx) | /privacy-policy | Static legal text |
| Terms & Conditions (TermsAndConditionsPage.jsx) | /terms-and-conditions | Static legal text |

---

## 14. Teachers (TeacherPage.jsx, TeacherDetailsPage.jsx)
- 2 teachers: Dr. Khalid Iqbal (Finance, 4.9 stars), Prof. Ehsanullah Munir (Trading, 4.8 stars)
- Profiles with rating, subject, course list
- "Message Teacher" button (UI only)

---

## 15. Complete Route Map (41 Routes)

| Category | Route | Page |
|---|---|---|
| **Auth** | / | Redirect to /login |
| | /onboarding | OnboardingPage |
| | /login | LoginPage |
| | /register-email | RegisterEmailPage |
| | /create-password | CreatePasswordPage |
| | /forgot-password | ForgotPasswordPage |
| **Main** | /home | HomePage |
| | /learn, /listing | ListingPage |
| | /rank | RankPage |
| | /profile | ProfilePage |
| **Quiz** | /quiz-home | QuizHomePage |
| | /quiz/:id | QuizDetailPage |
| | /mcq-page | McqPage |
| | /view-result | ViewResultPage |
| | /view-answer | ViewAnswerPage |
| **Trading** | /stock-details | StockDetailsPage |
| | /buy-sell-stock | BuySellStockPage |
| | /order-confirmed-page | OrderConfirmedPage |
| | /purchase-history | PurchaseHistoryPage |
| | /futures-details | FuturesDetailsPage |
| | /futures-order | FuturesOrderPage |
| | /options-details | OptionsDetailsPage |
| **Social** | /chat-room | ChatRoomsPage |
| | /chat-room-details | ChatRoomDetailsPage |
| | /conversations | ConversationsPage |
| | /new-chat-page | NewChatPage |
| | /chat-bots | ChatBotPage |
| **Education** | /assignments | AssignmentsPage |
| | /assignment/:id | AssignmentDetailPage |
| | /study-materials | StudyMaterialsPage |
| | /upcoming-tasks | UpcomingTasksPage |
| **Profile** | /edit-profile | EditProfilePage |
| | /change-password | ChangePasswordPage |
| | /my-note | MyNotesPage |
| | /my-note-details | NewNotesPage |
| | /notifications | NotificationPage |
| **Other** | /achievements | AchievementsPage |
| | /achievement-details | AchievementDetailsPage |
| | /hall-of-fame | HallOfFamePage |
| | /teachers-page | TeacherPage |
| | /teacher-details | TeacherDetailsPage |
| | /help-center | HelpCenterPage |
| | /contact-form | ContactFormPage |
| | /faqs-page | FaqsPage |
| | /privacy-policy | PrivacyPolicyPage |
| | /terms-and-conditions | TermsAndConditionsPage |

---

## 16. Reusable Components

| Component | Purpose |
|---|---|
| Button.jsx | Styled button with primary/secondary/outline variants |
| TextField.jsx | Input field with label, error display, password toggle |
| StockCard.jsx | Stock card (symbol, name, price, change %) |
| StockLogo.jsx | SVG brand logos for 9 stocks |
| PortfolioChart.jsx | Recharts line chart for portfolio value |
| PortfolioOverview.jsx | Wrapper for PortfolioChart |
| QuizHistory.jsx | 3 most recent quiz attempts from localStorage |
| NotificationPanel.jsx | Bell icon navigating to notifications |
| ErrorBoundary.jsx | React error boundary with reload |
| PublicHeader.jsx | Header for unauthenticated pages |
| OptionsTradeModal.jsx | Options trading modal with advanced strategies |
| PlaceBidModal.jsx | Auction-style bid placement |

---

## 17. Key Architecture Notes

1. **No route protection** — all URLs accessible without login (no ProtectedRoute wrapper)
2. **All trading data is mock/hardcoded** — no stock market API. Portfolio values, prices, positions are static
3. **Backend is minimal** — only authentication endpoints. No backend for trading, quizzes, assignments, chat
4. **localStorage persistence** for: quiz attempts, assignment submissions, notes, notifications, auth token
5. **Account deactivation** — frontend-only toggle, disables certain UI elements
6. **Responsive design** — mobile, tablet, desktop via Tailwind breakpoints
7. **Converted from Flutter** — component structure mirrors Flutter widget patterns
