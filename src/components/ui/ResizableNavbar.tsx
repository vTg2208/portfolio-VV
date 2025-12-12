import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <motion.nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${className} ${
        isScrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg rounded-full mx-4 mt-4" 
          : "bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-full mx-4 mt-4"
      }`}
      animate={{
        paddingTop: isScrolled ? "0.5rem" : "0.75rem",
        paddingBottom: isScrolled ? "0.5rem" : "0.75rem",
        paddingLeft: isScrolled ? "1.5rem" : "2rem",
        paddingRight: isScrolled ? "1.5rem" : "2rem",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.nav>
  );
};

export const NavBody = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      {children}
    </div>
  );
};

export const NavbarLogo = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => {
    return (
        <div className={`flex-shrink-0 flex items-center ${className}`}>
            {children || <span className="text-lg font-bold text-slate-900 dark:text-white">Logo</span>}
        </div>
    )
}

export const NavItems = ({ 
    items, 
    activeItem, 
    onItemClick 
}: { 
    items: { name: string; link: string }[], 
    activeItem?: string, 
    onItemClick?: (e: React.MouseEvent<HTMLAnchorElement>, link: string) => void 
}) => {
  return (
    <div className="hidden md:flex items-center space-x-1 mx-auto">
      {items.map((item) => {
        const isActive = activeItem === item.name.toLowerCase();
        return (
            <a
            key={item.name}
            href={item.link}
            onClick={(e) => onItemClick && onItemClick(e, item.name.toLowerCase())}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            }`}
            aria-current={isActive ? 'page' : undefined}
            >
            {item.name}
            </a>
        );
      })}
    </div>
  );
};

export const MobileNav = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return <div className={`md:hidden flex items-center ${className}`}>{children}</div>
}

export const MobileNavHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return <div className={`flex items-center justify-between w-full ${className}`}>{children}</div>
}

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-2"
            aria-label="Toggle menu"
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
    )
}

export const MobileNavMenu = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="absolute top-full left-0 w-full overflow-hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl md:hidden"
                >
                    <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export const NavbarButton = ({ 
    children, 
    onClick, 
    variant = "primary", 
    className = "" 
}: { 
    children: React.ReactNode; 
    onClick?: () => void; 
    variant?: "primary" | "secondary"; 
    className?: string 
}) => {
    const baseStyles = "px-4 py-1.5 rounded-full text-sm font-medium transition-colors";
    const variants = {
        primary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100",
        secondary: "bg-transparent text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
    };

    return (
        <button 
            onClick={onClick} 
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
