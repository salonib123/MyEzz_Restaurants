//src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { RestaurantProvider, useRestaurant } from "./context/RestaurantContext";


import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import History from "./pages/History/History";

import Dashboard from "./pages/Dashboard/Dashboard";
import Menu from "./pages/Menu/Menu";
import Report from "./pages/Report/Report";
import Profile from "./pages/Profile/Profile";
import Landing from "./pages/Landing/Landing";
import RestaurantLogin from "./pages/RestaurantLogin/RestaurantLogin";

import "./App.css";

function RestaurantLayout() {
  const { restaurantId } = useParams();
  const numericId = Number(restaurantId);

  if (!numericId || numericId <= 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <RestaurantProvider restaurantId={numericId}>
      <div className="app">
        <Header />
        <Navbar />
        <main className="main-content">
          <Outlet />
          <Footer />
        </main>
      </div>

      <RestaurantProfile />
    </RestaurantProvider>
  );
}

function RestaurantProfile() {
  const { isProfileOpen } = useRestaurant();

  return (
    <AnimatePresence>
      {isProfileOpen && <Profile />}
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/restaurant/login" element={<RestaurantLogin />} />

        {}
        <Route path="/:restaurantId" element={<RestaurantLayout />}>
          <Route path="orders" element={<Dashboard />} />
          <Route path="history" element={<History />} />
          <Route path="menu" element={<Menu />} />
          <Route path="report" element={<Report />} />
          <Route path="history" element={<History />} />
          <Route index element={<Navigate to="menu" replace />} />
        </Route>

        {}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;