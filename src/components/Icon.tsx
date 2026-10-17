import {
  ArrowRight, BookOpen, Briefcase, Calendar, ChartColumn, Check, CircleCheck, CirclePlus, CircleX, ClipboardCheck,
  Compass, Globe, Heart, IdCard, Info, Landmark, LayoutDashboard, Lock, Mail, Megaphone, Mic, Moon, Palette,
  Receipt, Search, Sheet, ShieldCheck, SlidersVertical, Smartphone, Sparkles, SquarePlus, Tag, Timer, QrCode,
  UserCheck, Users, Play, Monitor, ChevronLeft, ChevronRight, Wallet, WifiOff, History, type LucideIcon,
} from 'lucide-react';

// Noms de la maquette -> Lucide (cf. design/README.md).
const ICONS = {
  wallet: Wallet, clipboard: ClipboardCheck, timer: Timer, users: Users, dashboard: LayoutDashboard, swiss: SquarePlus,
  book: BookOpen, heart: Heart, wifiOff: WifiOff, mic: Mic, shield: ShieldCheck, smartphone: Smartphone, palette: Palette,
  sheet: Sheet, calendar: Calendar, idCard: IdCard, receipt: Receipt, landmark: Landmark, briefcase: Briefcase,
  megaphone: Megaphone, chart: ChartColumn, sliders: SlidersVertical, userCheck: UserCheck, lock: Lock, history: History,
  sparkles: Sparkles, checkCircle: CircleCheck, xCircle: CircleX, check: Check, info: Info, search: Search,
  plusCircle: CirclePlus, compass: Compass, globe: Globe, qr: QrCode, moon: Moon, mail: Mail, tag: Tag, arrowRight: ArrowRight, play: Play, monitor: Monitor, chevronLeft: ChevronLeft, chevronRight: ChevronRight,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

// Icônes décoratives : toujours masquées aux lecteurs d'écran.
export default function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  const Cmp = ICONS[name];
  return <Cmp size={size} strokeWidth={2} aria-hidden="true" focusable="false" />;
}
