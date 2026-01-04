"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Loader2,
  Trash2,
  Edit,
} from "lucide-react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavbarSpacer from "@/components/NavbarSpacer";
import { getProject, deleteProject } from "@/lib/projects";
import type { Project } from "@/lib/types";

// Import CSS statically
import "@uiw/react-md-editor/markdown-editor.css";

// Dynamically import markdown editor to avoid SSR issues
const MarkdownPreview = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  { ssr: false }
);

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!params.id || typeof params.id !== "string") {
        setError("Invalid project ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedProject = await getProject(params.id);
        if (!fetchedProject) {
          setError("Project not found");
        } else {
          setProject(fetchedProject);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  const handleDelete = async () => {
    if (!project || !params.id || typeof params.id !== "string") return;

    setIsDeleting(true);
    try {
      await deleteProject(params.id);
      toast({
        title: "Success",
        description: "Project deleted successfully.",
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
          <div className="text-center py-12">
            <p className="text-destructive text-lg">
              {error || "Project not found"}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 flex flex-col">
        <NavbarSpacer />
        <div className="flex-1 order-2">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>

          <div className="max-w-4xl mx-auto">
            {/* Admin Actions */}
            {user && (
              <div className="mb-6 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/project/${params.id}/edit`)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Project
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Project
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the project &quot;{project.title}&quot; and all
                        associated images.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeleting}>
                        Cancel
                      </AlertDialogCancel>
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

            {/* Image Carousel */}
            {project.imageUrls && project.imageUrls.length > 0 && (
              <div className="mb-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {project.imageUrls.map((imageUrl, index) => (
                      <CarouselItem key={index}>
                        <div className="relative bg-muted rounded-lg overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {project.imageUrls.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </>
                  )}
                </Carousel>
              </div>
            )}

            {/* Project Info */}
            <div className="mb-8">
              <h1 className="text-4xl font-display font-bold mb-4">
                {project.title}
              </h1>
              <p className="text-base text-muted-foreground mb-6">
                {project.description}
              </p>

              <div className="flex gap-4">
                {project.githubUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.demoUrl && (
                  <Button asChild>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Project Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div data-color-mode="dark" className="wmde-markdown-var mb-6">
                <MarkdownPreview source={project.content} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
