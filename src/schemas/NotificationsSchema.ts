import { z } from "zod";

const NotificationSchema = z.object({
  id: z.number(),
  user: z.number(),
  user_name: z.string(),
  user_phone: z.string(),
  types: z.string(),
  title: z.string(),
  body: z.string(),
  image: z.null(),
  additional_data: z.object({
    message: z.string(),
    user_id: z.string(),
  }),
  read: z.boolean(),
  new: z.boolean(),
  created_at: z.string().datetime()
});

export type TNotification = z.infer<typeof NotificationSchema>;

const ResponseSchema = z.object({
  count: z.number(),
  next: z.string(),
  previous: z.string(),
  results: z.array(NotificationSchema),
  count_new: z.number()
});

export type TNotificationResponse = z.infer<typeof ResponseSchema>;