import './App.css';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import NotFoundPage from './pages/NotFoundPage';

import AuthLayout from './components/AuthLayout';
import DashLayout from './components/DashLayout';
import DashboardPage from './DashboardPages/DashboardPage';
import UsersPage from './DashboardPages/UsersPage';
import ReportsPage from './DashboardPages/ReportsPage';
import DashArticlePage from './DashboardPages/DashArticleListPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
    ],
  },
  {
    path: '/register',
    element: <AuthLayout />,
    children: [
      { index: true, element: <RegistrationPage /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'dashArticles', element: <DashArticlePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
