import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import GoogleCalendar from "../components/GoogleCalendar";

function AdminDashboard({ signOut }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Bookings");
  const { logout } = useAuth(); // Use the logout function from AuthProvider

  const tabs = ["Bookings", "Team", "Pricing"];

  return (
   
  );
}

export default AdminDashboard;
