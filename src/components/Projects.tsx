"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/projects";
import type { Project } from "@/lib/types";

interface ProjectsProps {
  isAdmin?: boolean;
}

const Projects = ({ isAdmin = false }: ProjectsProps) => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <h2 className="section-title mb-0">
            My Projects
          </h2>
          {isAdmin && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => router.push('/add-project')}
              aria-label="Add new project"
            >
              <Plus className="w-5 h-5" />
            </Button>
          )}
        </div>
        
        <p className="section-subtitle">
          A collection of projects that showcase my skills and passion for building 
          beautiful, functional web applications.
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

        {/* Projects Grid */}
        {!loading && !error && (
          <>
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects yet. Add your first project!</p>
              </div>
            ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {projects.map((project, index) => (
            <div
              key={project.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
