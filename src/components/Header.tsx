"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { signOutFromGoogle } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import {
  Home,
  FolderKanban,
  GraduationCap,
  User,
  LayoutGrid,
  X,
  LogOut,
} from "lucide-react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useAuth();
  const { toast } = useToast();

  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>("#home");

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (window.scrollY >= 80) {
        header?.classList.add("scroll-header");
      } else {
        header?.classList.remove("scroll-header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active nav based on scroll position
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScrollSpy = () => {
      const sections = ["home", "projects", "qualifications"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveNav(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  const handleNavClick = (hash: string) => {
    setIsShowing(false);
    setActiveNav(hash);

    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.querySelector(hash);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    try {
      await signOutFromGoogle();
      setIsShowing(false);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="header">
      <nav className="nav container">
        {/* Logo */}
        <a
          href="#home"
          className="nav__logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
        >
          <Image
            src="/logo.png"
            alt="Jonas Andersen Logo"
            width={35}
            height={35}
            className="object-contain"
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="nav__list--desktop">
          <li className="nav__item">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className={
                activeNav === "#home" ? "nav__link active-link" : "nav__link"
              }
            >
              Home
            </a>
          </li>
          <li className="nav__item">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#projects");
              }}
              className={
                activeNav === "#projects"
                  ? "nav__link active-link"
                  : "nav__link"
              }
            >
              Projects
            </a>
          </li>
          <li className="nav__item">
            <a
              href="#qualifications"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#qualifications");
              }}
              className={
                activeNav === "#qualifications"
                  ? "nav__link active-link"
                  : "nav__link"
              }
            >
              Qualifications
            </a>
          </li>
          <li className="nav__item">
            {user ? (
              <a
                href="#"
                className="nav__link"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Logout
              </a>
            ) : (
              <a
                href="#"
                className="nav__link"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/login");
                }}
              >
                Admin
              </a>
            )}
          </li>
        </ul>

        {/* Mobile Navigation Menu */}
        <div className={isShowing ? "nav__menu show-menu" : "nav__menu"}>
          <ul className="nav__list grid">
            <li className="nav__item" onClick={() => setIsShowing(false)}>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#home");
                }}
                className={
                  activeNav === "#home" ? "nav__link active-link" : "nav__link"
                }
              >
                <Home className="nav__icon" />
                Home
              </a>
            </li>

            <li className="nav__item" onClick={() => setIsShowing(false)}>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#projects");
                }}
                className={
                  activeNav === "#projects"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                <FolderKanban className="nav__icon" />
                Projects
              </a>
            </li>

            <li className="nav__item" onClick={() => setIsShowing(false)}>
              <a
                href="#qualifications"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#qualifications");
                }}
                className={
                  activeNav === "#qualifications"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                <GraduationCap className="nav__icon" />
                Qualifications
              </a>
            </li>

            <li className="nav__item" onClick={() => setIsShowing(false)}>
              {user ? (
                <a
                  href="#"
                  className="nav__link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  <LogOut className="nav__icon" />
                  Logout
                </a>
              ) : (
                <a
                  href="#"
                  className="nav__link"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/login");
                  }}
                >
                  <User className="nav__icon" />
                  Admin
                </a>
              )}
            </li>
          </ul>
          <button
            className="nav__close"
            onClick={() => setIsShowing(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <button
          className="nav__toggle"
          onClick={() => setIsShowing(true)}
          aria-label="Open menu"
          aria-expanded={isShowing}
        >
          <LayoutGrid className="nav__toggle-icon" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
