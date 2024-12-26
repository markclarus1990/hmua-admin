import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
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

// Create the queryClient instance outside of the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Adjust based on your needs
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout />
    </QueryClientProvider>
  );
}

export default App;
