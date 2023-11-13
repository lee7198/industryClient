import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Detect from './pages/Detect';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Detect />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
