"use server";

import { ConsumptionMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { removeCpfPunctuation } from "@/helpers/cpf";
import { db } from "@/lib/prisma";

interface CreateOrderInput {
  costumerName: string;
  costumerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await db.restaurant.findFirst({
    where: {
      slug: input.slug,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  if (productsWithPrices.length !== input.products.length) {
    throw new Error("Product not found");
  }

  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));

  await db.order.create({
    data: {
      consumptionMethod: input.consumptionMethod,
      customerName: input.costumerName,
      customerCpf: removeCpfPunctuation(input.costumerCpf),
      status: "PENDING",
      restaurantId: restaurant.id,
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
    },
  });

  revalidatePath(`/${input.slug}/orders`);
  redirect(`/${input.slug}/orders?cpf=${removeCpfPunctuation(input.costumerCpf)}`);
};
