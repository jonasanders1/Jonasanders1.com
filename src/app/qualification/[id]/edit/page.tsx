"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getQualification, updateQualification } from "@/lib/qualifications";

const qualificationSchema = z.object({
  type: z.enum(["education", "experience"], {
    required_error: "Please select a type",
  }),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  dateRange: z.string().min(1, "Date range is required"),
});

type QualificationFormValues = z.infer<typeof qualificationSchema>;

export default function EditQualificationPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QualificationFormValues>({
    resolver: zodResolver(qualificationSchema),
    defaultValues: {
      type: "education",
      title: "",
      subtitle: "",
      description: "",
      dateRange: "",
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Load qualification data
  useEffect(() => {
    const loadQualification = async () => {
      if (!params.id || typeof params.id !== "string") {
        router.push("/");
        return;
      }

      try {
        setLoading(true);
        const qualification = await getQualification(params.id);
        if (!qualification) {
          toast({
            title: "Error",
            description: "Qualification not found.",
            variant: "destructive",
          });
          router.push("/");
          return;
        }

        form.reset({
          type: qualification.type,
          title: qualification.title,
          subtitle: qualification.subtitle || "",
          description: qualification.description,
          dateRange: qualification.dateRange,
        });
      } catch (error) {
        console.error("Error loading qualification:", error);
        toast({
          title: "Error",
          description: "Failed to load qualification.",
          variant: "destructive",
        });
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadQualification();
    }
  }, [params.id, user, router, form, toast]);

  const onSubmit = async (data: QualificationFormValues) => {
    if (!user || !params.id || typeof params.id !== "string") {
      toast({
        title: "Error",
        description: "You must be logged in to edit a qualification.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await updateQualification(params.id, data);

      toast({
        title: "Success",
        description: "Qualification updated successfully!",
      });

      router.push("/");
    } catch (error) {
      console.error("Error updating qualification:", error);
      toast({
        title: "Error",
        description: "Failed to update qualification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">
              Edit Qualification
            </h1>
            <p className="text-muted-foreground">
              Update the qualification details below.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="education" id="education" />
                          <Label htmlFor="education">Education</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="experience" id="experience" />
                          <Label htmlFor="experience">Experience</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Select whether this is an education or experience entry
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          form.watch("type") === "education"
                            ? "Master of Computer Science"
                            : "Senior Frontend Developer"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {form.watch("type") === "education"
                        ? "Degree or certification name"
                        : "Job title or position"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          form.watch("type") === "education"
                            ? "Stanford University"
                            : "Tech Corp Inc."
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {form.watch("type") === "education"
                        ? "Institution or university name"
                        : "Company or organization name"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={
                          form.watch("type") === "education"
                            ? "Specialized in Machine Learning and Distributed Systems..."
                            : "Leading the frontend architecture for enterprise applications..."
                        }
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {form.watch("type") === "education"
                        ? "Specialization, achievements, and other details"
                        : "Responsibilities, achievements, and other details"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Range</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="2020 - 2022 or 2023 - Present"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the date range (e.g., "2020 - 2022" or "2023 - Present")
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating Qualification...
                    </>
                  ) : (
                    "Update Qualification"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

