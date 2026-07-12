import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  ChevronRight, 
  Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

// Import local assets from src/assets/
import heroCar from "../assets/hero_luxury_car.png";
import featuredSuv from "../assets/featured_suv.png";
import featuredSports from "../assets/featured_sports.png";
import featuredElectric from "../assets/featured_electric.png";

export default function Landing() {
  const vehicles = [
    {
      id: 1,
      make: "Porsche",
      model: "911 Carrera S",
      category: "Sports Coupe",
      price: "$131,200",
      image: featuredSports,
      specs: { hp: "443 HP", time: "3.5s 0-60", speed: "191 mph" }
    },
    {
      id: 2,
      make: "Range Rover",
      model: "Autobiography",
      category: "Luxury SUV",
      price: "$168,400",
      image: featuredSuv,
      specs: { hp: "523 HP", time: "4.4s 0-60", speed: "155 mph" }
    },
    {
      id: 3,
      make: "Audi",
      model: "e-tron GT",
      category: "Electric Sedan",
      price: "$109,500",
      image: featuredElectric,
      specs: { hp: "522 HP", time: "3.9s 0-60", speed: "152 mph" }
    }
  ];

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-muted),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-5 flex flex-col items-start text-left max-w-xl lg:max-w-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs font-semibold text-primary tracking-wide mb-6 uppercase">
              <Sparkles className="size-3.5 text-accent animate-pulse" />
              <span>The Peak of Automotive Luxury</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-primary leading-[1.1] mb-6">
              Redefining the <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">
                art of driving.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground/90 font-light leading-relaxed mb-8">
              AutoElite connects you with the world's most exceptional automobiles. Experience bespoke craftsmanship, refined performance, and unparalleled service curated for the modern connoisseur.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link to="/inventory" className="w-full sm:w-auto">
                <Button 
                  variant="default" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white h-12 px-8 rounded-xl text-sm font-semibold tracking-wide shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  <span>Browse Inventory</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-border hover:bg-muted text-primary h-12 px-8 rounded-xl text-sm font-semibold tracking-wide bg-white/50 backdrop-blur-sm"
                >
                  Register
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/60 w-full">
              <div>
                <span className="block text-2xl font-semibold text-primary">100%</span>
                <span className="text-xs text-muted-foreground">Certified Cars</span>
              </div>
              <div>
                <span className="block text-2xl font-semibold text-primary">Nbr #1</span>
                <span className="text-xs text-muted-foreground">Luxury Dealer</span>
              </div>
              <div>
                <span className="block text-2xl font-semibold text-primary">24/7</span>
                <span className="text-xs text-muted-foreground">Bespoke Concierge</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-[2.5rem] blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-3 shadow-2xl">
                <img 
                  src={heroCar} 
                  alt="Porsche Taycan in front of luxury house" 
                  className="w-full h-auto rounded-[1.5rem] object-cover aspect-[4/3] transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-border/80 shadow-lg flex items-center justify-between text-left">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent block">Featured Model</span>
                    <span className="text-base font-bold text-primary">Taycan Turbo S</span>
                  </div>
                  <div className="flex gap-4 border-l border-border/85 pl-4">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Power</span>
                      <span className="text-xs font-semibold text-primary">750 HP</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block">0-60 mph</span>
                      <span className="text-xs font-semibold text-primary">2.6s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-20 md:py-28 bg-white border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="text-xs font-extrabold tracking-[0.25em] text-accent uppercase bg-accent/10 px-4 py-1.5 rounded-full inline-block mb-4">
              The Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-primary">
              Featured <span className="font-semibold">Vehicles</span>
            </h2>
            <p className="text-base text-muted-foreground mt-4 font-light">
              Explore our handpicked selection of exceptional luxury, sports, and electric vehicles curated for unmatched quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {vehicles.map((car) => (
              <Card 
                key={car.id} 
                className="group border border-border/70 hover:border-accent/40 shadow-sm hover:shadow-xl transition-all duration-300 bg-background/30 flex flex-col h-full rounded-[2rem] overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img 
                    src={car.image} 
                    alt={`${car.make} ${car.model}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border/70 text-[10px] font-bold text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                    {car.category}
                  </div>
                </div>

                <CardHeader className="pt-6 pb-2 px-6 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs text-muted-foreground tracking-wide font-medium">{car.make}</span>
                      <CardTitle className="text-xl font-semibold text-primary mt-0.5">{car.model}</CardTitle>
                    </div>
                    <span className="text-lg font-bold text-accent">{car.price}</span>
                  </div>
                </CardHeader>

                <CardContent className="px-6 py-4 border-t border-b border-border/40 bg-muted/20">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Power</span>
                      <span className="text-xs font-semibold text-primary mt-0.5">{car.specs.hp}</span>
                    </div>
                    <div className="flex flex-col border-l border-r border-border/40">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">0-60</span>
                      <span className="text-xs font-semibold text-primary mt-0.5">{car.specs.time}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Top Speed</span>
                      <span className="text-xs font-semibold text-primary mt-0.5">{car.specs.speed}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6">
                  <Button 
                    variant="outline" 
                    className="w-full h-11 border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <span>View Details</span>
                    <ChevronRight className="size-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/inventory">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 h-12 rounded-xl text-sm font-semibold transition-all duration-300"
              >
                Discover All Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Experience Section */}
      <section className="py-20 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-4 block">Crafting Perfection</span>
              <h2 className="text-3xl sm:text-4xl font-light text-primary tracking-tight leading-tight">
                Designed for those who <br />
                <span className="font-semibold">demand the absolute best.</span>
              </h2>
              <p className="text-base text-muted-foreground/90 mt-6 leading-relaxed font-light">
                Our legacy is built on curation and attention to detail. Every automobile in our catalog goes through an exhaustive 150-point inspection, detailed provenance verification, and professional tailoring before it meets your hands.
              </p>
              
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0 border border-primary/10">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary">Uncompromised Quality Guarantee</h4>
                    <p className="text-xs text-muted-foreground mt-1">Every car comes with complete detailing, historical documentation, and full warranty coverage.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0 border border-primary/10">
                    <Compass className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary">Bespoke Ordering & Delivery</h4>
                    <p className="text-xs text-muted-foreground mt-1">Customize specific trim levels or delivery details and let our concierge handle the transport.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative bg-white border border-border/80 p-8 rounded-[2rem] shadow-xl">
              <div className="absolute top-4 right-6 text-accent/15 font-serif text-[120px] font-extrabold select-none leading-none">
                AE
              </div>
              <h3 className="text-xl font-semibold text-primary mb-6">Concierge Consultation</h3>
              <p className="text-sm text-muted-foreground font-light mb-6">
                Connect with our automotive specialists to find, configure, or request a rare model from our network.
              </p>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-muted-foreground font-medium mb-1.5">First Name</span>
                    <div className="h-10 px-3 bg-muted/30 border border-border rounded-lg text-xs flex items-center text-muted-foreground">Discerning</div>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-muted-foreground font-medium mb-1.5">Last Name</span>
                    <div className="h-10 px-3 bg-muted/30 border border-border rounded-lg text-xs flex items-center text-muted-foreground">Driver</div>
                  </div>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-muted-foreground font-medium mb-1.5">Requested Model</span>
                  <div className="h-10 px-3 bg-muted/30 border border-border rounded-lg text-xs flex items-center text-muted-foreground">Porsche 911 GT3 RS</div>
                </div>
                <Button variant="default" className="w-full bg-primary text-white h-11 rounded-lg text-xs font-semibold mt-2 shadow-md">
                  Inquire Now (Demo Mode)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
