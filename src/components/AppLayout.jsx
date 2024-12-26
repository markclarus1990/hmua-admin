import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import logo from "/logo.png";
import Login from "./Login.jsx";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import PricingComponent from "./PricingComponent";
import CALENDAR from "./Calendar";
import { useQuery } from "@tanstack/react-query";
import { getPrice } from "../services/price.js";
import { useNavigate } from "react-router-dom";
function AppLayout() {
  const localizer = momentLocalizer(moment);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Bookings");

  const tabs = ["Bookings", "Team", "Pricing", "Events"];
  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();
  const navigate = useNavigate();
  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes:
          "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks",
      },
    });

    if (error) {
      alert("Error logging in");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }
  return (
    <div className="App">
      {isLoading ? (
        <p>Loading...</p>
      ) : session ? (
        navigate("/hmua-admin/dashboard")
      ) : (
        <Login googleSignIn={googleSignIn} logo={logo} />
      )}
    </div>
  );
}

export default AppLayout;
