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
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-freedoc-blue to-blue-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-freedoc-dark to-slate-700 bg-clip-text text-transparent leading-none">
                freedoc.
              </span>
              <p className="text-xs text-freedoc-secondary leading-none -mt-0.5">(formerly freedoctor.)</p>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-freedoc-dark hover:text-freedoc-blue transition-all duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-freedoc-blue transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-slate-200 hover:bg-slate-50 bg-transparent">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[300px] bg-white/95 backdrop-blur-sm">
                <div className="flex flex-col space-y-4 p-4">
                  <Link href="/" className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-freedoc-blue to-blue-600 shadow-lg">
                      <Stethoscope className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <span className="text-3xl font-bold bg-gradient-to-r from-freedoc-dark to-slate-700 bg-clip-text text-transparent leading-none">
                        freedoc.
                      </span>
                      <p className="text-xs text-freedoc-secondary leading-none -mt-0.5">(formerly freedoctor.)</p>
                    </div>
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-freedoc-dark hover:text-freedoc-blue transition-colors py-3 px-2 rounded-lg hover:bg-slate-50"
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
