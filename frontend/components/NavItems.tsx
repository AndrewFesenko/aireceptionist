'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
    { label: "Features", href: "#features" },
    { label: "Integration", href: "#integration" },
    { label: "Demo", href: "#demo" },
    { label: "Contact", href: "#cta" },
];

const NavItems = ({ mobile = false }: { mobile?: boolean }) => {
    const pathname = usePathname();

    return (
        <nav className={cn(mobile ? "flex flex-col gap-4 pt-4" : "flex items-center gap-6")}>
            {navItems.map(({ label, href }) => (
                <Link
                    key={label}
                    href={href}
                    className={cn(
                        "relative text-base text-primary transition-all duration-300 group",
                        pathname === href ? "font-extrabold" : "font-medium"
                    )}
                >
                    {label}
                    <span className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
            ))}
        </nav>
    );
};

export default NavItems;
