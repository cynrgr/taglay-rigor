import './App.css';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import CreateStoryPage from './pages/CreateStoryPage';
import Register from './pages/Register';
import MyArchivesPage from './pages/MyArchivesPage';
import EditStoryPage from './pages/EditStoryPage';

const routes = [{
  path: '/',
  element: <Layout />, 
  // Error element
  errorElement:  <NotFoundPage />,
  children: [{
    // Path declaration
    path: '/',
    element: <HomePage />
  },
  {
    path: '/about',
    element: <AboutPage  />
  },
  {
    path: '/articles',
    element: <ArticleListPage />
  },
  {
    path: '/articles/:name', 
    element: <ArticlePage />
  },
  {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/create', 
      element: <CreateStoryPage />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
  path: '/my-archives',
  element: <MyArchivesPage />
},
{
  path: '/edit/:id',
  element: <EditStoryPage />
}
  ]
}]

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
