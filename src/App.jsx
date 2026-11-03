import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Dashboard from "./pages/Dashboard";
import EventsPage from "./pages/EventsPage";
import AddEventPage from "./pages/AddEventPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import "./App.css";

export default function App() {
  return (
    <AppProvider>
      <Navbar />
      <Toast />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/add" element={<AddEventPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </AppProvider>
  );
}