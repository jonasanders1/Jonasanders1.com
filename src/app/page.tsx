"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Qualifications from "@/components/Qualifications";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const isAdmin = !!user;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Projects isAdmin={isAdmin} />
        <Qualifications isAdmin={isAdmin} />
      </main>
      <Footer />
    </div>
  );
}

