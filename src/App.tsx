import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Header from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  const excludeHeaderPaths = ["/login", "/register"];
  const shouldShowHeaderAndFooter = !excludeHeaderPaths.includes(
    location.pathname
  );

  return (
    <>
      {shouldShowHeaderAndFooter && <Header />}

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {shouldShowHeaderAndFooter && <Footer />}
    </>
  );
};

export default App;
