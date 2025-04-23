import { z } from "zod";

const OrderItemSchema = z.object({
  id: z.number(),
  product: z.number(),
  product_title: z.string(),
  product_image: z.string().url(),
  variant: z.number(),
  variant_title: z.string(),
  quantity: z.number(),
  price: z.string(),
  discount: z.string()
});

const OrderSchema = z.object({
  id: z.number(),
  user: z.number(),
  full_name: z.string(),
  total_price: z.string(),
  status: z.union([
    z.literal("pending"),
    z.literal("confirmed"),
    z.literal("cancelled"),
    z.string()
  ]),
  start_date_choice: z.union([
    z.literal("today"),
    z.literal("tomorrow"),
    z.null()
  ]),
  start_date: z.string().date().nullable(),
  extra_charge: z.string(),
  total_discount: z.string(),
  order_id: z.nullable(z.number()),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  items: z.array(OrderItemSchema),
  rating: z.number(),
  rating_description: z.string().nullable()
});

const OrdersResponseSchema = z.object({
  count: z.number(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(OrderSchema)
});

export type TOrder = z.infer<typeof OrderSchema>;
export type TOrdersResponse = z.infer<typeof OrdersResponseSchema>;
