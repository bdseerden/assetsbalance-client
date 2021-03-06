import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import PortfolioPage from "./pages/PortfolioPage";
import AssetDetailsPage from "./pages/AssetDetailsPage";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="entireApp">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portfolio/:id" element={<PortfolioPage />} />
        <Route path="/details/:asset" element={<AssetDetailsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
