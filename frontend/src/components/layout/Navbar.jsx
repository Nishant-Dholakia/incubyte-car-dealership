import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logout successful");
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

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
          {token && role === "ADMIN" && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#285943] text-white tracking-wider uppercase shadow-sm">
              ADMIN
            </span>
          )}
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          {token && (
            <NavLink to="/inventory" className={linkClass}>
              Inventory
            </NavLink>
          )}
          {token && role === "ADMIN" && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <>
              {token && role === "ADMIN" && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#285943] text-white tracking-widest uppercase shadow-sm">
                  ADMIN
                </span>
              )}
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-sm font-medium text-muted-foreground/80 hover:text-primary"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register">
                <Button variant="default" className="text-sm font-medium bg-primary hover:bg-primary/95 text-white px-5 rounded-xl shadow-lg shadow-primary/10">
                  Register
                </Button>
              </NavLink>
            </>
          )}
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
          <nav className="flex flex-col gap-4">
            <NavLink 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileLinkClass}
            >
              Home
            </NavLink>
            
            {token && (
              <NavLink 
                to="/inventory" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                Inventory
              </NavLink>
            )}

            {token && role === "ADMIN" && (
              <NavLink 
                to="/admin" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                Admin
              </NavLink>
            )}

            {token ? (
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                {role === "ADMIN" && (
                  <div className="flex justify-start">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#285943] text-white tracking-widest uppercase shadow-sm">
                      ADMIN
                    </span>
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="w-full text-left justify-start px-0 text-base font-semibold text-primary hover:text-accent"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileLinkClass}
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileLinkClass}
                >
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
