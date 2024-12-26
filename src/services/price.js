import supabase from "./supabase";

export async function getPrice() {
  const { data, error } = await supabase
    .from("pricing")
    .select("*")
    .order("name", { ascending: true }); // Sort by 'name' in ascending order

  if (error) {
    console.error();
    throw new Error("Price could not be loaded");
  }

  return data;
}

export async function updatePrice({ id, obj }) {
  const { data, error } = await supabase
    .from("pricing")
    .update(obj) // obj is the object that contains the fields to update
    .eq("pricing_id", id) // Use pricing_id instead of id
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}
