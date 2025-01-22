import React, { Suspense } from 'react'
import { Routes,Route } from 'react-router-dom'
import routes from './routes';
export default function App() {
  return (
   <Suspense>
    <Routes>
    {routes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.element} />;
        })}
    </Routes>
   </Suspense>
  )
}
