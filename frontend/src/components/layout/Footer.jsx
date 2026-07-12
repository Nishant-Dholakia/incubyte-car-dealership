import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand */}
          <div className="md:col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary font-semibold">
                A
              </div>
              <span className="text-lg font-bold tracking-tight text-white uppercase">
                Auto<span className="text-accent font-extrabold">Elite</span>
              </span>
            </div>
            <p className="text-xs text-white/70 font-light leading-relaxed mb-4 text-left">
              Curating the world's most outstanding automobiles. Elevating the standard of performance and luxury for the discerning few.
            </p>
            <div className="flex gap-4">
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">Est. 2026</span>
            </div>
          </div>

          {/* Column 2: Inventory Links */}
          <div className="text-left">
            <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-4">Inventory</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70 font-light">
              <li><NavLink to="/inventory" className="hover:text-white transition-colors">Hypercars & Sports</NavLink></li>
              <li><NavLink to="/inventory" className="hover:text-white transition-colors">Luxury SUVs</NavLink></li>
              <li><NavLink to="/inventory" className="hover:text-white transition-colors">Electric Performance</NavLink></li>
              <li><NavLink to="/inventory" className="hover:text-white transition-colors">Limited Series</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="text-left">
            <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70 font-light">
              <li><NavLink to="/" className="hover:text-white transition-colors">Our History</NavLink></li>
              <li><NavLink to="/" className="hover:text-white transition-colors">The Inspection</NavLink></li>
              <li><NavLink to="/" className="hover:text-white transition-colors">Customer Stories</NavLink></li>
              <li><NavLink to="/" className="hover:text-white transition-colors">Contact Us</NavLink></li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div className="text-left">
            <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-4">Global Headquarters</h4>
            <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
              100 AutoElite Boulevard, Suite 500<br />
              Silicon Valley, CA 94025
            </p>
            <p className="text-xs text-white/70 font-light">
              concierge@autoelite.com
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-white/50 font-light">
            &copy; 2026 AutoElite. All rights reserved. Designed for excellence.
          </span>
          <div className="flex gap-6 text-[11px] text-white/50 font-light">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
