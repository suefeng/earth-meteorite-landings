import Link from "next/link";

export default function Nav({
  links,
}: {
  links: { name: string; href: string }[];
}) {
  return (
    <nav className="flex gap-4 md:py-4">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.name}
          className="text-blue-500 hover:bg-blue-100 py-1 px-2 border border-blue-500 rounded-lg active:ring-2 active:ring-blue-100"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
