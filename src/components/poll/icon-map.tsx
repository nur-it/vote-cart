import {
  Shirt,
  Apple,
  Laptop,
  Sofa,
  Sparkles,
  Gamepad2,
  Dumbbell,
  BookOpen,
  Car,
  PawPrint,
  ShoppingBag,
} from "lucide-react";

interface SectionIconProps {
  name: string;
  className?: string;
}

// A stable component that resolves a section icon by name.
// Uses an explicit switch (no component variable created during render)
// to satisfy the react-hooks/static-components lint rule.
export function SectionIcon({ name, className }: SectionIconProps) {
  switch (name) {
    case "Shirt":
      return <Shirt className={className} />;
    case "Apple":
      return <Apple className={className} />;
    case "Laptop":
      return <Laptop className={className} />;
    case "Sofa":
      return <Sofa className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Gamepad2":
      return <Gamepad2 className={className} />;
    case "Dumbbell":
      return <Dumbbell className={className} />;
    case "BookOpen":
      return <BookOpen className={className} />;
    case "Car":
      return <Car className={className} />;
    case "PawPrint":
      return <PawPrint className={className} />;
    default:
      return <ShoppingBag className={className} />;
  }
}
