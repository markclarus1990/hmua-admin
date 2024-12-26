// import { createClient } from "@supabase/supabase-js";
// export const supabaseUrl = "https://tsscimyradylpucpozgf.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzc2NpbXlyYWR5bHB1Y3BvemdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNzY1MzcsImV4cCI6MjA0MDk1MjUzN30.HJ2xLV3ZZ12stolIFqs_y9tRQW8LYIxBjYJ1WPxid0s";
// const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kcvranbgzvrodkibapem.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdnJhbmJnenZyb2RraWJhcGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MjAwODksImV4cCI6MjA1MDQ5NjA4OX0.mSekUwD18zeKesfxSpFv4SmtfMR3szHNsPGKRUQjK2k";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
