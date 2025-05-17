"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[var(--primary-dark)] border-t border-[var(--accent-blue)] border-opacity-20 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-foreground/80">
            &copy; {currentYear} ArthaNet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
