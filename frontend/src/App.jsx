// import HomePage from "../Landing-page/home/HomePage";
import SignUp from "../Landing-page/signup/SignUp";
import Login from "../Landing-page/Login/Login";
import Feature from "../Landing-page/features/Features";
import Support from "../Landing-page/support/Suppport";
import AboutPage from "../Landing-page/about/AboutPage";
import CookiePolicy from "../Landing-page/FooterComponenet/CookiePolicy";
import TermsConditions from "../Landing-page/FooterComponenet/TermsAndCondition";
import PrivacyPolicy from "../Landing-page/FooterComponenet/PrivacyPolicy";

import LoanForm from "../Landing-page/Loan/Loan";
import Dashboard from "../Dashboard/UserDashboard/DashboardHome/Dashboard";
import DashboardSupport from "../Dashboard/UserDashboard/support/Support";
import LoneDashboard from "../Dashboard/UserDashboard/loans/loanPage";
import AccountOpenForm from "../Dashboard/Account/OpenAccountForm";
import Profile from "../Dashboard/user/Profile";
import TransferMoney from "../Dashboard/Transaction/TransferMoney";

import ProtectedRoute from "../ProtectedRoute";

export const app = [
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/feature", element: <Feature /> },
  { path: "/contact&support", element: <Support /> },
  { path: "/aboutUs", element: <AboutPage /> },
  { path: "/cookiepolicy", element: <CookiePolicy /> },
  { path: "/terms&condition", element: <TermsConditions /> },
  { path: "/privacypolicy", element: <PrivacyPolicy /> },

  { path: "/loan", element: <ProtectedRoute><LoanForm /></ProtectedRoute> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboard/support", element: <DashboardSupport /> },
  { path: "/dashboard/loan", element: <LoneDashboard /> },
  { path: "/oppenaccount", element: <ProtectedRoute><AccountOpenForm /></ProtectedRoute> },
  { path: "/dashboard/profile", element: <Profile /> },
  { path: "/dashboard/transfer", element: <TransferMoney /> },
];

