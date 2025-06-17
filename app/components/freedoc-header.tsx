import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Stethoscope } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { name: "Prescriptions", href: "/prescription" },
  { name: "Medical Certificates", href: "/medical-certificate" },
  { name: "Mental Health", href: "/mental-health" },
  { name: "Telehealth", href: "/telehealth" },
  { name: "Pathology", href: "/pathology" },
  { name: "How it Works", href: "/how-it-works" },
]

export function FreedocHeader() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <Stethoscope className="h-8 w-8 text-freedoc-blue flex-shrink-0" />
            <div>
              <span className="text-3xl font-bold text-freedoc-dark leading-none">freedoc.</span>
              <p className="text-xs text-freedoc-secondary leading-none -mt-1">(formerly freedoctor.)</p>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base text-freedoc-dark hover:text-freedoc-blue transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[300px]">
                <div className="flex flex-col space-y-4 p-4">
                  <Link href="/" className="flex items-center gap-2 mb-4">
                    <Stethoscope className="h-8 w-8 text-freedoc-blue" />
                    <div>
                      <span className="text-3xl font-bold text-freedoc-dark leading-none">freedoc.</span>
                      <p className="text-xs text-freedoc-secondary leading-none -mt-1">(formerly freedoctor.)</p>
                    </div>
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg text-freedoc-dark hover:text-freedoc-blue transition-colors py-2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
