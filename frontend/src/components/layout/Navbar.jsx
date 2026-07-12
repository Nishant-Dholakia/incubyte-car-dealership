import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Inventory", to: "/inventory" },
  ];

  const authItems = [
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" },
  ];

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-primary py-2 ${
      isActive ? "text-primary border-b-2 border-primary" : "text-muted-foreground/80"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `text-base font-semibold transition-colors hover:text-accent ${
      isActive ? "text-accent" : "text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold shadow-md">
            A
          </div>
          <span className="text-xl font-bold tracking-tight text-primary uppercase">
            Auto<span className="text-accent font-extrabold">Elite</span>
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
          <NavLink to="/register">
            <Button variant="default" className="text-sm font-medium bg-primary hover:bg-primary/95 text-white px-5 rounded-xl shadow-lg shadow-primary/10">
              Register
            </Button>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary hover:bg-muted"
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border shadow-xl py-6 px-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 mb-6">
            {navItems.concat(authItems).map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
