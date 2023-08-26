import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Login from './routes/login';
import { isItem_LS } from './utils/localStorage';
import ThemeContext from './context/themeContext';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

function PrivatRoute({ children }) {
  const { isLogin } = useContext(ThemeContext);

  return isLogin ? children : <Navigate to="/login" />;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: (<PrivatRoute>
      <Root />
    </PrivatRoute>),
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <Login />
  }

])

function App() {
  const [isLogin, setIsLogin] = useState(isItem_LS());

  const logIn = () => setIsLogin(true);
  const logOut = () => setIsLogin(false);

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={{ isLogin, logIn, logOut }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </React.StrictMode>
  )
}






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);