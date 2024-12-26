import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ signOut }) {
  const tabs = ["Bookings", "Team", "Pricing", "Events"];
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Bookings");
  const navigate = useNavigate();
  return (
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
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Dashboard</h2>
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
          {activeTab === "Events" && navigate("/hmua-admin/Calendar")}
          {activeTab === "Pricing" && <PricingComponent />}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
