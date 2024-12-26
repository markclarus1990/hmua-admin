import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPrice, updatePrice } from "../services/price"; // Assuming you have updatePrice API

export default function PricingComponent() {
  const {
    isLoading,
    data: initialPricing = [], // Default to an empty array
    error,
  } = useQuery({
    queryKey: ["pricing"],
    queryFn: getPrice,
  });

  const [pricing, setPricing] = useState(initialPricing); // State to store pricing data

  // Temporary price state for editing
  const [tempPrice, setTempPrice] = useState({});

  // Use mutation to handle price updates (assuming updatePrice API)
  const updatePriceMutation = useMutation({
    mutationFn: updatePrice,
    onSuccess: (updatedPrice) => {
      // Update local state after successful update
      setPricing((prev) =>
        prev.map((item) =>
          item.pricing_id === updatedPrice.pricing_id
            ? { ...item, price: updatedPrice.price }
            : item
        )
      );
    },
  });

  useEffect(() => {
    setPricing(initialPricing); // Sync the state with initial fetched data
  }, [initialPricing]);

  const handlePriceChange = (id, newPrice) => {
    const parsedPrice = parseFloat(newPrice); // Parse the value to a float (this can handle valid numeric input)

    if (isNaN(parsedPrice) && newPrice !== "") return; // Prevent invalid entries and allow empty input

    // Update the temporary price for immediate feedback
    setTempPrice((prev) => ({
      ...prev,
      [id]: newPrice === "" ? "" : parsedPrice, // Allow erasing the number
    }));
  };

  const handleUpdatePrice = (id) => {
    const updatedPrice = pricing.find((item) => item.pricing_id === id);
    if (updatedPrice) {
      // Get the price value from tempPrice or fallback to the original price
      const newPrice = tempPrice[id] || updatedPrice.price;

      // Pass the correct id and updated object to the mutation
      updatePriceMutation.mutate({
        id: updatedPrice.pricing_id, // Make sure you're passing the correct ID field
        obj: { price: newPrice }, // The object to update (price)
      });
    }
  };

  // Function to format a number as Philippine currency
  const formatToPHP = (value) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-gray-300 border-t-peach-600 rounded-full"></div>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center text-lg">
        Error: {error.message}
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-peach-800 mb-8">
        Pricing Information
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricing.map((el) => (
          <div
            key={el.pricing_id}
            className="bg-gradient-to-b from-peach-100 via-peach-200 to-peach-300 rounded-lg shadow-md p-6 text-center"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              {el.name}
            </h3>

            {/* Display current price label */}
            <div className="text-sm text-gray-600 mb-2">
              Current Price: {formatToPHP(el.price)}
            </div>

            {/* Input for temporary price change */}
            <input
              type="number" // Use "number" type to ensure proper numeric input
              value={tempPrice[el.pricing_id] || el.price} // Use temp price if available, else current price
              onChange={(e) => handlePriceChange(el.pricing_id, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-peach-600 mb-4 text-center"
            />

            {/* Button to update the price */}
            <button
              onClick={() => handleUpdatePrice(el.pricing_id)}
              className="w-full px-4 py-2 bg-peach-500 text-white font-semibold rounded-lg hover:bg-peach-600 transition duration-200"
            >
              Update Price
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
