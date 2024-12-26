import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

// Initialize the supabase client
const supabase = createClient(
  "https://kcvranbgzvrodkibapem.supabase.co",
  "your-supabase-key"
);

createRoot(document.getElementById("root")).render(
  <SessionContextProvider supabaseClient={supabase}>
    <App />
  </SessionContextProvider>
);
