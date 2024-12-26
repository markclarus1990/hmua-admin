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

function AppLayout() {
  const localizer = momentLocalizer(moment);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Bookings");

  const tabs = ["Bookings", "Team", "Pricing", "Events"];
  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

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
        <div className="w-screen h-screen bg-gradient-to-r from-gray-100 via-peach-400 to-peach-600 text-black flex flex-col md:flex-row">
          {/* Hamburger Menu (Mobile Only) */}
          <button
            className="absolute top-4 left-4 md:hidden z-50 p-2 bg-peach-600 text-white rounded-full shadow-lg"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>

          {/* Sidebar */}
          <aside
            className={`fixed z-40 top-0 left-0 h-screen w-64 bg-gradient-to-b from-peach-400 via-peach-500 to-peach-600 text-white p-6 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:translate-x-0`}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              Admin Dashboard
            </h2>
            <nav>
              <ul>
                {tabs.map((tab) => (
                  <li
                    key={tab}
                    className={`mb-4 px-4 py-2 rounded-lg cursor-pointer ${
                      activeTab === tab
                        ? "bg-white text-peach-600 font-semibold"
                        : "text-white hover:bg-peach-500 hover:text-black"
                    }`}
                    onClick={() => {
                      setActiveTab(tab);
                      setSidebarOpen(false); // Close sidebar on mobile after selection
                    }}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8">
              <button
                onClick={signOut}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1  bg-gradient-to-r from-peach-100 via-peach-300 to-peach-400 text-black p-8">
            <h1 className="text-3xl font-semibold mb-4">{activeTab}</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p>
                {`This is the ${activeTab} section. Add specific content for the ${activeTab} feature here.`}
              </p>
              {activeTab === "Events" && <CALENDAR />}
              {activeTab === "Pricing" && <PricingComponent />}
            </div>
          </main>
        </div>
      ) : (
        <Login googleSignIn={googleSignIn} logo={logo} />
      )}
    </div>
  );
}

export default AppLayout;
