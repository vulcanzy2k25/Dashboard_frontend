import Home from './pages/Home';
import Login from './pages/Login';
import SignupPage from './pages/Signup';
const routes = [
  {path: '/', element: <Login/>},
  {path: '/home', element: <Home/>},
  {path: '/signup', element: <SignupPage/>},
];

export default routes;
