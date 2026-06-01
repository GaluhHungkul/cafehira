import Link from "next/link";
import {
  Camera,
  Users,
  AtSign,
  MapPin,
  Clock,
  Mail,
  Phone,
} from "lucide-react";
import { cafeInfo, footerLinks } from "@/lib/data";

const socialLinks = [
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Users, href: "#", label: "Facebook" },
  { icon: AtSign, href: "#", label: "Twitter" },
] as const;

export function Footer() {
  return (
    <footer className="bg-surface border-t border-[var(--color-border)]">
      <div className="container-cafe py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link
              href="#"
              className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-foreground"
            >
              Cafe<span className="text-primary">Hira</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              A premium coffee sanctuary where comfort meets craft. Brewed for
              you, every single day.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-muted transition-colors hover:text-primary hover:border-[var(--color-primary)]"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="label-caps mb-5">Explore</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-caps mb-5">Information</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-caps mb-5">Visit Us</h3>
            <ul className="flex flex-col gap-4 text-sm text-muted">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{cafeInfo.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{cafeInfo.hours}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <Link
                  href={`#`}
                  className="hover:text-primary transition-colors"
                >
                  {cafeInfo.phone}
                </Link>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <Link
                  href={`#`}
                  className="hover:text-primary transition-colors"
                >
                  {cafeInfo.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-4 text-muted text-xs">
          <p>&copy; {new Date().getFullYear()} CafeHira. All rights reserved.</p>
          <p className="label-caps !text-[0.65rem] !text-muted">
            Crafted with intention
          </p>
        </div>
      </div>
    </footer>
  );
}
