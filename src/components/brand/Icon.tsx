import {
  BadgeCheck,
  CalendarCheck,
  DraftingCompass,
  Gem,
  Handshake,
  LifeBuoy,
  MessagesSquare,
  PenTool,
  Ruler,
  Scissors,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react'

const icons = {
  ruler: Ruler,
  design: DraftingCompass,
  scissors: Scissors,
  wrench: Wrench,
  support: LifeBuoy,
  chat: MessagesSquare,
  gem: Gem,
  pen: PenTool,
  team: Users,
  calendar: CalendarCheck,
  badge: BadgeCheck,
  handshake: Handshake,
  spark: Sparkles,
}

export function BrandIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name as keyof typeof icons] ?? Sparkles
  return <Icon className={className} strokeWidth={1.25} aria-hidden />
}
