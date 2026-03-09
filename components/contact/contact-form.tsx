"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validators/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const budgetOptions = ["", "< $500", "$500 - $1,500", "$1,500 - $3,000", "$3,000+"];
const timelineOptions = ["", "ASAP", "2-4 weeks", "1-2 months", "Flexible"];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      budget: "",
      timeline: "",
      honeypot: "",
    },
  });

  const onSubmit = async (values: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { message?: string };
        throw new Error(payload.message ?? "Failed to send message.");
      }

      toast.success("Message sent successfully.");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your full name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name ? <p className="mt-1 text-xs text-rose-300">{errors.name.message}</p> : null}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email ? <p className="mt-1 text-xs text-rose-300">{errors.email.message}</p> : null}
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="Project inquiry" {...register("subject")} aria-invalid={!!errors.subject} />
        {errors.subject ? <p className="mt-1 text-xs text-rose-300">{errors.subject.message}</p> : null}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Tell me about your project goals..." {...register("message")} aria-invalid={!!errors.message} />
        {errors.message ? <p className="mt-1 text-xs text-rose-300">{errors.message.message}</p> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="budget">Budget Range (Optional)</Label>
          <select
            id="budget"
            {...register("budget")}
            className="h-11 w-full rounded-xl border border-[color:var(--surface-border)] bg-[color:var(--surface-muted)] px-4 text-sm text-[rgb(var(--fg))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          >
            {budgetOptions.map((option) => (
              <option key={option || "none"} value={option}>
                {option || "Select budget"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="timeline">Timeline (Optional)</Label>
          <select
            id="timeline"
            {...register("timeline")}
            className="h-11 w-full rounded-xl border border-[color:var(--surface-border)] bg-[color:var(--surface-muted)] px-4 text-sm text-[rgb(var(--fg))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          >
            {timelineOptions.map((option) => (
              <option key={option || "none"} value={option}>
                {option || "Select timeline"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("honeypot")}
      />

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={16} /> Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}

