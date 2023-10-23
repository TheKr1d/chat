import React, { useContext, useState } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Login from './routes/login';
import { isItem_LS } from './utils/localStorage';
import ThemeContext from './context/themeContext';
import store from './store/index';
import "../src/css/index.css";
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
    element:
      (<Provider store={store}>
        <PrivatRoute>
          <Root />
        </PrivatRoute>
      </Provider>),
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
      <ThemeContext.Provider value={{ isLogin, logIn, logOut }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
  )
}






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);