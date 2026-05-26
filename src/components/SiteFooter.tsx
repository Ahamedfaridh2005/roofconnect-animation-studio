import logo from "@/assets/roofconnect-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="RoofConnect" width={40} height={40} className="rounded-md" />
          <span className="font-display font-bold">roof<span className="text-accent">connect</span></span>
        </div>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} RoofConnect. Every roof. One connection.</p>
      </div>
    </footer>
  );
}
