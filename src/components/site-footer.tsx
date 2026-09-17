import { Link } from "@tanstack/react-router";
import { company } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="bg-spruce-deep text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <img src="/brand/logo-white.png" alt={company.legal} className="mb-4 h-8 w-auto" />
          <p className="max-w-xs text-sm leading-relaxed text-mist/80">
            KNV reagents for PCR and sample prep — specified for real benches, shipped from Pennsylvania.
          </p>
          <p className="mt-4 font-mono text-xs leading-relaxed text-mist/70">
            Ship-from · {company.shipStreet}
            <br />
            {company.shipCity}, {company.country}
            <br />
            {company.hours}
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Catalog</h2>
          <ul className="space-y-2 text-sm text-mist/80">
            <li>
              <Link to="/shop" className="hover:text-paper">
                All reagents
              </Link>
            </li>
            <li>
              <Link to="/products/$id" params={{ id: "knv-dna-express" }} className="hover:text-paper">
                KNV DNA Express
              </Link>
            </li>
            <li>
              <Link to="/selector" className="hover:text-paper">
                Product selector
              </Link>
            </li>
            <li>
              <Link to="/support/cloning" className="hover:text-paper">
                Cloning workflow
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Company</h2>
          <ul className="space-y-2 text-sm text-mist/80">
            <li>
              <Link to="/about" className="hover:text-paper">
                About
              </Link>
            </li>
            <li>
              <Link to="/about/leadership" className="hover:text-paper">
                Leadership
              </Link>
            </li>
            <li>
              <Link to="/journal" className="hover:text-paper">
                Journal
              </Link>
            </li>
            <li>
              <Link to="/vendors" className="hover:text-paper">
                Vendors
              </Link>
            </li>
            <li>
              <Link to="/quality" className="hover:text-paper">
                Quality
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Support</h2>
          <ul className="space-y-2 text-sm text-mist/80">
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-paper">
                {company.email}
              </a>
            </li>
            <li>
              <a href={company.phoneHref} className="hover:text-paper">
                {company.phone}
              </a>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-paper">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/ordering" className="hover:text-paper">
                Ordering
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-paper">
                Returns
              </Link>
            </li>
            <li>
              <a href={company.linkedin} className="hover:text-paper" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-mist/60">
          <p>
            © 2026 {company.legal}. {company.ruo}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms" className="hover:text-paper">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-paper">
              Privacy
            </Link>
            <Link to="/returns" className="hover:text-paper">
              Returns
            </Link>
            <span className="font-mono tracking-widest text-leaf uppercase">{company.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
