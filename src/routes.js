import Home from './pages/Home';
import Login from './pages/Login';
import SignupPage from './pages/Signup';
import AddEvent from './pages/AddEvent';
import UpdateEvent from './pages/UpdateEvent';
import RegUsers from './pages/RegUsers';
const routes = [
  {path: '/', element: <Login/>},
  {path: '/home', element: <Home/>},
  {path: '/addEvent', element: <AddEvent/>},
  {path: '/updateEvent/:id', element: <UpdateEvent/>},
  {path: '/signup', element: <SignupPage/>},
  {path: '/regUsers/:eventId', element: <RegUsers/>},
];

export default routes;
