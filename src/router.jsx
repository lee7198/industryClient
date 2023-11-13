import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import Detect from './pages/Detect';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [{ path: 'detection', element: <Detect /> }],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
