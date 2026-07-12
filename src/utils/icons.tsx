import { School, Users, GraduationCap, ShieldCheck, HelpCircle, Info, BookOpen, Lightbulb, Settings, MapPin, Phone, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  School,
  Users,
  GraduationCap,
  ShieldCheck,
  HelpCircle,
  Info,
  BookOpen,
  Lightbulb,
  Settings,
  MapPin,
  Phone,
  Mail,
};

export const availableIcons = Object.keys(iconMap);
