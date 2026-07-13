import { 
  School, Users, GraduationCap, ShieldCheck, HelpCircle, Info, BookOpen, Lightbulb, 
  Settings, MapPin, Phone, Mail, Calendar, Clock, Briefcase, FileText, Award, 
  Star, Heart, CheckCircle, AlertCircle, Bus, Calculator, Library, PenTool, 
  Globe, Laptop, Wifi, Coffee, CreditCard, DollarSign, UserPlus, Building, 
  ClipboardList, Home, MessageCircle, FileQuestion, ThumbsUp 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  School, Users, GraduationCap, ShieldCheck, HelpCircle, Info, BookOpen, Lightbulb, 
  Settings, MapPin, Phone, Mail, Calendar, Clock, Briefcase, FileText, Award, 
  Star, Heart, CheckCircle, AlertCircle, Bus, Calculator, Library, PenTool, 
  Globe, Laptop, Wifi, Coffee, CreditCard, DollarSign, UserPlus, Building, 
  ClipboardList, Home, MessageCircle, FileQuestion, ThumbsUp
};

export const availableIcons = Object.keys(iconMap);
