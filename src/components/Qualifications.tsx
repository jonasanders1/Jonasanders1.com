"use client";

import { useState, useEffect } from "react";
import { Plus, GraduationCap, Briefcase, Calendar, Loader2, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { getQualifications, deleteQualification } from "@/lib/qualifications";
import { useToast } from "@/hooks/use-toast";
import type { Qualification } from "@/lib/types";

interface QualificationItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  dateRange: string;
}

interface TimelineItemProps {
  item: QualificationItem;
  index: number;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

const TimelineItem = ({ item, index, isAdmin = false, onDelete, isDeleting = false }: TimelineItemProps) => {
  const router = useRouter();
  const isEven = index % 2 === 0;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item.id);
    }
  };

  return (
    <div className={`relative flex items-center gap-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Timeline dot */}
      <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-x-1/2 z-10" />
      
      {/* Mobile dot */}
      <div className="md:hidden absolute left-0 w-3 h-3 bg-primary rounded-full border-2 border-background transform -translate-x-1/2" />

      {/* Content */}
      <div className={`flex-1 ml-6 md:ml-0 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
        <div className="bg-card p-6 rounded-xl border border-border card-hover relative">
          {isAdmin && (
            <div className={`absolute top-2 ${isEven ? 'left-2' : 'right-2'} flex gap-1`}>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/qualification/${item.id}/edit`);
                }}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the qualification
                      &quot;{item.title}&quot;.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
          <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
          <p className="text-primary font-medium text-sm mb-2">{item.subtitle}</p>
          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
          <div className={`flex items-center gap-2 text-xs text-muted-foreground ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <Calendar className="w-3 h-3" />
            {item.dateRange}
          </div>
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
};

interface QualificationsProps {
  isAdmin?: boolean;
}

const Qualifications = ({ isAdmin = false }: QualificationsProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("education");
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchQualifications = async () => {
    try {
      setLoading(true);
      const fetchedQualifications = await getQualifications();
      setQualifications(fetchedQualifications);
      setError(null);
    } catch (err) {
      console.error("Error fetching qualifications:", err);
      setError("Failed to load qualifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteQualification(id);
      toast({
        title: "Success",
        description: "Qualification deleted successfully.",
      });
      // Refresh the list
      await fetchQualifications();
    } catch (error) {
      console.error("Error deleting qualification:", error);
      toast({
        title: "Error",
        description: "Failed to delete qualification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Transform qualifications to match the component's expected format
  const educationData: QualificationItem[] = qualifications
    .filter((q) => q.type === "education")
    .map((q) => ({
      id: q.id,
      title: q.title,
      subtitle: q.subtitle || "",
      description: q.description,
      dateRange: q.dateRange,
    }));

  const experienceData: QualificationItem[] = qualifications
    .filter((q) => q.type === "experience")
    .map((q) => ({
      id: q.id,
      title: q.title,
      subtitle: q.subtitle || "",
      description: q.description,
      dateRange: q.dateRange,
    }));

  return (
    <section id="qualifications" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <h2 className="section-title mb-0">
            Qualifications
          </h2>
          {isAdmin && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => router.push('/add-qualification')}
              aria-label="Add new qualification"
            >
              <Plus className="w-5 h-5" />
            </Button>
          )}
        </div>

        <p className="section-subtitle">
          My personal journey through education and professional experience.
        </p>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {/* Tabs */}
        {!loading && !error && (
          <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <Tabs.List className="flex justify-center gap-2 mb-12">
            <Tabs.Trigger
              value="education"
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "education"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Education
            </Tabs.Trigger>
            <Tabs.Trigger
              value="experience"
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "experience"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <Briefcase className="w-5 h-5" />
              Experience
            </Tabs.Trigger>
          </Tabs.List>

          {/* Timeline */}
          <Tabs.Content value="education" className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-1/2" />
            
            <div className="space-y-8">
              {educationData.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={index}
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                  isDeleting={deletingId === item.id}
                />
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="experience" className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-1/2" />
            
            <div className="space-y-8">
              {experienceData.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={index}
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                  isDeleting={deletingId === item.id}
                />
              ))}
            </div>
          </Tabs.Content>
        </Tabs.Root>
        )}

        {!loading && !error && educationData.length === 0 && experienceData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No qualifications yet. Add your first one!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Qualifications;
