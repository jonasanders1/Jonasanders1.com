import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-[92vh] md:min-h-screen grid grid-rows-[1fr_auto] relative overflow-hidden md:pt-16"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float animation-delay-400" />
      </div>

      <div className="container relative z-10 flex items-center">
        <div className="max-w-xl mx-auto text-center w-full">
          {/* Greeting */}
          <p className="text-primary font-medium mb-4 opacity-0 animate-fade-in-up">
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 opacity-0 animate-fade-in-up animation-delay-200">
            Jonas Andersen
          </h1>

          {/* Role */}
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="flex-1 h-[2px] bg-border opacity-0 animate-fade-in-up animation-delay-400" />
            <p className="text-xl md:text-2xl text-muted-foreground opacity-0 animate-fade-in-up animation-delay-400">
              Software Engineer
            </p>
            <div className="flex-1 h-[2px] bg-border opacity-0 animate-fade-in-up animation-delay-400" />
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 opacity-0 animate-fade-in-up animation-delay-600">
            Developer. Designer.{" "}
            <span className="text-primary">Problem solver.</span>
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <Button size="lg" className="group" onClick={scrollToProjects}>
              View My Work
              <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>

          {/* Social Links */}
          <div
            className="flex justify-center gap-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            <a
              href="https://github.com/jonasanders1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/jonas-andersen-65a335262/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-8">
        <div
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
