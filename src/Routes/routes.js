import Login from '../pages/Login';
import MyEvents from '../pages/MyEvents';
import Perticipate from '../pages/Perticipate';
import AddEvent from '../pages/Perticipate';
import Register from '../pages/Register';
import PrivateRoutes from './PrivateRoutes';

const { createBrowserRouter } = require('react-router-dom');
const { default: Main } = require('../layout/Main');
const { default: Home } = require('../pages/shared/Home');

export const router = createBrowserRouter([
   {
      path: '/',
      element: <Main></Main>,
      children: [
         {
            path: '/',
            element: <Home></Home>,
            loader: () => fetch('http://localhost:5000/events'),
         },
         {
            path: 'perticipate/:id',
            element: (
               <PrivateRoutes>
                  <Perticipate></Perticipate>
               </PrivateRoutes>
            ),
            loader: ({ params }) => fetch(`http://localhost:5000/events/${params.id}`),
         },
         {
            path: 'login',
            element: <Login></Login>,
         },
         {
            path: '/register',
            element: <Register></Register>,
         },
         {
            path: 'myevents',
            element: (
               <PrivateRoutes>
                  <MyEvents></MyEvents>
               </PrivateRoutes>
            ),
         },
      ],
   },
]);
