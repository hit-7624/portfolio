"use client";

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const navItems = [
  { id: "home", label: "Home" },
  { id: "education", label: "Education" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "profiles", label: "Profiles" },
];

export const Navbar = ({ activeSection, scrollToSection }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-6 pointer-events-none px-4">
      <div className="flex items-center gap-1 p-1 bg-[#050505]/90 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto overflow-x-auto scrollbar-hide max-w-full">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-3 md:px-5 py-2 text-[10px] md:text-xs font-mono tracking-wider md:tracking-widest uppercase transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              activeSection === item.id ? "bg-white text-black" : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

