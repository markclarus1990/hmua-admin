import {
  useSession,
  useSupabaseClient,
  SessionContextProvider,
} from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "react-big-calendar/lib/css/react-big-calendar.css";
import logo from "/logo.png";
import Login from "./components/Login.jsx";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";

import CALENDAR from "./components/Calendar";

import AppLayout from "./components/AppLayout.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PricingComponent from "./components/PricingComponent.jsx";

// Initialize Supabase client
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://markclarus1990.github.io/hmua-admin/"; // Replace with your Supabase URL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdnJhbmJnenZyb2RraWJhcGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MjAwODksImV4cCI6MjA1MDQ5NjA4OX0.mSekUwD18zeKesfxSpFv4SmtfMR3szHNsPGKRUQjK2k"; // Replace with your Supabase Anon Key
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Create the queryClient instance outside of the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Adjust based on your needs
    },
  },
});

function App() {
  const session = useSession();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const accessToken = params.get("access_token");
    if (accessToken) {
      supabaseClient.auth.setSession({
        access_token: accessToken,
        refresh_token: params.get("refresh_token"),
      });
      // Clean up the URL
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {session ? <AppLayout /> : <Login />}
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default App;
