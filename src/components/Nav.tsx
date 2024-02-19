"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({
  links,
}: {
  links: { name: string; href: string }[];
}) {
  const pathname = usePathname();

  const activeClasses = (href: string) =>
    href === pathname && "border-blue-500 text-white bg-blue-500";
  const mainClasses =
    "text-blue-500 hover:bg-blue-100 py-1 px-2 border border-blue-500 rounded-lg active:ring-2 active:ring-blue-100";

  return (
    <nav className="flex gap-4 md:py-4">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.name}
          className={[activeClasses(link.href), mainClasses].join(" ")}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
