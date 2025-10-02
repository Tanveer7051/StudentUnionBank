import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from './context/AuthContext.jsx'; // 

// Pages
import HomePage from "./Landing-page/home/HomePage";
import SignUp from './Landing-page/signup/SignUp.jsx';
import Login from './Landing-page/Login/Login.jsx';
import Feature from './Landing-page/features/Features.jsx';
import Support from './Landing-page/support/Suppport.jsx';
import AboutPage from './Landing-page/about/AboutPage.jsx';
import Dashboard from './Dashboard/UserDashboard/DashboardHome/Dashboard.jsx';
import DashboardSupport from './Dashboard/UserDashboard/support/Support.jsx';
import LoneDashboard from './Dashboard/UserDashboard/loans/loanPage.jsx';
import LoanForm from './Landing-page/Loan/Loan.jsx';
import AccountOpenForm from './Dashboard/Account/OpenAccountForm.jsx';
import Profile from './Dashboard/user/Profile.jsx';
import TransferMoney from './Dashboard/TransferMoney/TransferMoney.jsx';
import CookiePolicy from './Landing-page/FooterComponenet/CookiePolicy.jsx';
import TermsConditions from './Landing-page/FooterComponenet/TermsAndCondition.jsx';
import PrivacyPolicy from './Landing-page/FooterComponenet/PrivacyPolicy.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';
import Layout from './Landing-page/layOut/Layout.jsx'; // 
import TransactionHistory from "./Dashboard/UserDashboard/transaction/TransactionsHistory.jsx";
import Blog from './Landing-page/Blog/Blog.jsx';
import SinglePost from './Landing-page/Blog/SinglePost.jsx';
import AccountDeletion from './Dashboard/UserDashboard/AccountDeletion/AccountDeletion.jsx';
import EditProfile from './Dashboard/user/EditProfile.jsx';
import UserLayout from './Dashboard/UserDashboard/UserLayout/UserLayout.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Public Routes wrapped with Layout */}
        <Route path='/' element={<Layout><HomePage /></Layout>} />
        <Route path='/signup' element={<Layout><SignUp /></Layout>} />
        <Route path='/login' element={<Layout><Login /></Layout>} />
        <Route path='/feature' element={<Layout><Feature /></Layout>} />
        <Route path='/contact&support' element={<Layout><Support /></Layout>} />
        <Route path='/aboutUs' element={<Layout><AboutPage /></Layout>} />
        <Route path='/cookiepolicy' element={<Layout><CookiePolicy /></Layout>} />
        <Route path='/terms&condition' element={<Layout><TermsConditions /></Layout>} />
        <Route path='/privacypolicy' element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path='/loan' element={<Layout><ProtectedRoute><LoanForm /></ProtectedRoute></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/blog/:id" element={<Layout><SinglePost /> </Layout>} />

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/support' element={<UserLayout><DashboardSupport /></UserLayout>} />
        <Route path='/dashboard/loan' element={<UserLayout><LoneDashboard /></UserLayout>} />
        <Route path='/oppenaccount' element={<ProtectedRoute><AccountOpenForm /></ProtectedRoute>} />
        <Route path='/dashboard/profile' element={<UserLayout><Profile /></UserLayout>} />
        <Route path='/dashboard/transfer' element={<UserLayout><TransferMoney /></UserLayout>} />
        <Route path='/dashboard/history' element={<UserLayout><TransactionHistory /></UserLayout>} />
        <Route path='/accountdeletion' element={<UserLayout><AccountDeletion /></UserLayout>} />
        <Route path='/dashboard/profile/edit' element={<UserLayout><EditProfile /></UserLayout>} />

      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
