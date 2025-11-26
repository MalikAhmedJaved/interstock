import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import MainLayout from '../components/MainLayout'

// Auth Pages
import SplashPage from '../pages/SplashPage'
import OnboardingPage from '../pages/OnboardingPage'
import LoginPage from '../pages/LoginPage'
import RegisterEmailPage from '../pages/RegisterEmailPage'
import OtpVerifyPage from '../pages/OtpVerifyPage'
import CreatePasswordPage from '../pages/CreatePasswordPage'
import SelectSchoolPage from '../pages/SelectSchoolPage'
import SelectGoalPage from '../pages/SelectGoalPage'
import UploadPicturePage from '../pages/UploadPicturePage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'

// Main Pages
import HomePage from '../pages/HomePage'
import LearnPage from '../pages/LearnPage'
import RankPage from '../pages/RankPage'
import ProfilePage from '../pages/ProfilePage'

// Quiz Pages
import QuizHomePage from '../pages/QuizHomePage'
import QuizDetailsPage from '../pages/QuizDetailsPage'
import McqPage from '../pages/McqPage'
import ViewResultPage from '../pages/ViewResultPage'
import ViewAnswerPage from '../pages/ViewAnswerPage'

// Profile Pages
import EditProfilePage from '../pages/EditProfilePage'
import ChangePasswordPage from '../pages/ChangePasswordPage'
import ContactFormPage from '../pages/ContactFormPage'
import FaqsPage from '../pages/FaqsPage'
import HelpCenterPage from '../pages/HelpCenterPage'
import HelpDetailPage from '../pages/HelpDetailPage'
import MyNotesPage from '../pages/MyNotesPage'
import NewNotesPage from '../pages/NewNotesPage'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage'
import TermsAndConditionsPage from '../pages/TermsAndConditionsPage'

// Drawer Pages
import AchievementsPage from '../pages/AchievementsPage'
import AchievementDetailsPage from '../pages/AchievementDetailsPage'
import AssignmentsPage from '../pages/AssignmentsPage'
import SubmitAssignmentsPage from '../pages/SubmitAssignmentsPage'
import UpcomingTasksPage from '../pages/UpcomingTasksPage'
import ChatRoomsPage from '../pages/ChatRoomsPage'
import ChatRoomDetailsPage from '../pages/ChatRoomDetailsPage'
import CommunityPostsPage from '../pages/CommunityPostsPage'
import NewPostPage from '../pages/NewPostPage'
import CompetitionsPage from '../pages/CompetitionsPage'
import CompetitionDetailsPage from '../pages/CompetitionDetailsPage'
import ConversationsPage from '../pages/ConversationsPage'
import NewGroupPage from '../pages/NewGroupPage'
import EventCalendarPage from '../pages/EventCalendarPage'
import EventDetailsPage from '../pages/EventDetailsPage'
import HallOfFamePage from '../pages/HallOfFamePage'
import AcademicNotesPage from '../pages/AcademicNotesPage'
import AcademicNotesDetailsPage from '../pages/AcademicNotesDetailsPage'
import AddNewAcademicNotePage from '../pages/AddNewAcademicNotePage'
import SchoolPage from '../pages/SchoolPage'
import SchoolDetailsPage from '../pages/SchoolDetailsPage'
import StudyMaterialsPage from '../pages/StudyMaterialsPage'
import TeacherPage from '../pages/TeacherPage'
import TeacherDetailsPage from '../pages/TeacherDetailsPage'

// Home Pages
import NotificationPage from '../pages/NotificationPage'
import ChatBotPage from '../pages/ChatBotPage'

// Trading Pages
import StockDetailsPage from '../pages/StockDetailsPage'
import BuySellStockPage from '../pages/BuySellStockPage'
import OrderConfirmedPage from '../pages/OrderConfirmedPage'
import PurchaseHistoryPage from '../pages/PurchaseHistoryPage'
import PlaceBidPage from '../pages/PlaceBidPage'
import FuturesDetailsPage from '../pages/FuturesDetailsPage'
import BuyFuturePage from '../pages/BuyFuturePage'

const AppRouter = () => {
  const { isAuthenticated, loading } = useApp()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SplashPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-email" element={<RegisterEmailPage />} />
      <Route path="/otp-verify" element={<OtpVerifyPage />} />
      <Route path="/create-password" element={<CreatePasswordPage />} />
      <Route path="/select-school" element={<SelectSchoolPage />} />
      <Route path="/select-goal" element={<SelectGoalPage />} />
      <Route path="/upload-picture" element={<UploadPicturePage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected Routes with Main Layout */}
      <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/learn" element={<MainLayout><LearnPage /></MainLayout>} />
      <Route path="/rank" element={<MainLayout><RankPage /></MainLayout>} />
      <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />

      {/* Quiz Routes */}
      <Route path="/quiz-home" element={<QuizHomePage />} />
      <Route path="/quiz-details/:isCompleted" element={<QuizDetailsPage />} />
      <Route path="/mcq-page" element={<McqPage />} />
      <Route path="/view-result" element={<ViewResultPage />} />
      <Route path="/view-answer" element={<ViewAnswerPage />} />

      {/* Profile Routes */}
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/contact-form" element={<ContactFormPage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      <Route path="/faqs-page" element={<FaqsPage />} />
      <Route path="/help-center" element={<HelpCenterPage />} />
      <Route path="/help-center-details" element={<HelpDetailPage />} />
      <Route path="/my-note" element={<MyNotesPage />} />
      <Route path="/my-note-details" element={<NewNotesPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />

      {/* Drawer Routes */}
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/achievement-details" element={<AchievementDetailsPage />} />
      <Route path="/assignments" element={<AssignmentsPage />} />
      <Route path="/submit-assignments" element={<SubmitAssignmentsPage />} />
      <Route path="/upcoming-tasks" element={<UpcomingTasksPage />} />
      <Route path="/chat-room" element={<ChatRoomsPage />} />
      <Route path="/chat-room-details" element={<ChatRoomDetailsPage />} />
      <Route path="/community-posts" element={<CommunityPostsPage />} />
      <Route path="/new-post" element={<NewPostPage />} />
      <Route path="/competitions" element={<CompetitionsPage />} />
      <Route path="/competition-details" element={<CompetitionDetailsPage />} />
      <Route path="/conversations" element={<ConversationsPage />} />
      <Route path="/new-group-page" element={<NewGroupPage />} />
      <Route path="/event-calendar" element={<EventCalendarPage />} />
      <Route path="/event-details" element={<EventDetailsPage />} />
      <Route path="/hall-of-fame" element={<HallOfFamePage />} />
      <Route path="/academic-notes" element={<AcademicNotesPage />} />
      <Route path="/academic-note-details" element={<AcademicNotesDetailsPage />} />
      <Route path="/add-new-notes" element={<AddNewAcademicNotePage />} />
      <Route path="/school-page" element={<SchoolPage />} />
      <Route path="/school-details" element={<SchoolDetailsPage />} />
      <Route path="/study-materials" element={<StudyMaterialsPage />} />
      <Route path="/teachers-page" element={<TeacherPage />} />
      <Route path="/teacher-details" element={<TeacherDetailsPage />} />

      {/* Home Routes */}
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/chat-bots" element={<ChatBotPage />} />

      {/* Trading Routes */}
      <Route path="/stock-details" element={<StockDetailsPage />} />
      <Route path="/buy-sell-stock" element={<BuySellStockPage />} />
      <Route path="/order-confirmed-page" element={<OrderConfirmedPage />} />
      <Route path="/purchase-history" element={<PurchaseHistoryPage />} />
      <Route path="/place-bid" element={<PlaceBidPage />} />
      <Route path="/futures-details" element={<FuturesDetailsPage />} />
      <Route path="/buy-futures" element={<BuyFuturePage />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter




