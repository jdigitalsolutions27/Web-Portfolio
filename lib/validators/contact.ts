import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(20, "Message should be at least 20 characters."),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  honeypot: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

