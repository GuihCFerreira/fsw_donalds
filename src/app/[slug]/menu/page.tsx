import { notFound } from "next/navigation";

import { getRestaurantBySlugWithProducts } from "@/app/data/get-restaurant-by-slug";

import RestaurantsCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantsMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantsMenuPage = async ({
  params,
  searchParams,
}: RestaurantsMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await getRestaurantBySlugWithProducts(slug);

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantsCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantsMenuPage;
