"use client";

import { ExternalLink, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/project/${project.id}`);
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden card-hover bg-card border-border"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          {project.logoUrl && (
            <img
              src={project.logoUrl}
              alt={`${project.title} logo`}
              className="w-12 h-12 object-contain flex-shrink-0"
            />
          )}
          <h3 className="text-xl font-display font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-muted-foreground text-sm line-clamp-4 mb-4">
          {project.description}
        </p>
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        {project.githubUrl && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.githubUrl, '_blank');
            }}
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        )}
        {project.demoUrl && (
          <Button
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.demoUrl, '_blank');
            }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
