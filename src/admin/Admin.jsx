import logo from "/logo.png";
import { useFormContext } from "../contexts/FormContext";
import { Outlet, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";

const App = () => {
  const { homeScreen } = useFormContext();
  const localizer = momentLocalizer(moment);

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();
  const navigate = useNavigate();

  // Redirect to /admin if session exists

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
    } else {
      navigate("/admin");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/"); // Redirect to homepage after sign-out
  }

  return (
    <>
      {homeScreen === true ? (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 via-peach-400 to-peach-600 text-black p-8 flex justify-center items-center">
          {session ? (
            <>
              <AdminDashboard signOut={signOut} />
            </>
          ) : (
            <>
              <div className="text-center">
                <img src={logo} alt="Logo" className="mb-20" />
                <article className="login">
                  <section className="login-page">
                    <div className="bg-peach-400"></div>
                  </section>
                </article>
                <button onClick={() => googleSignIn()}>
                  Sign in With Google
                </button>
              </div>
            </>
          )}
          <Outlet />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
