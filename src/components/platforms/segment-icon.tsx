import {
  BarChart3,
  Code2,
  GraduationCap,
  Image,
  Megaphone,
  Music,
  Palette,
  PenLine,
  Server,
  Sparkles,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react"
import type { SegmentId } from "@/types/platform"

const iconMap: Record<SegmentId, LucideIcon> = {
  design: Palette,
  programming: Code2,
  sounds: Music,
  visual: Image,
  video: Video,
  writing: PenLine,
  productivity: Zap,
  ai: Sparkles,
  devops: Server,
  learning: GraduationCap,
  marketing: Megaphone,
  analytics: BarChart3,
}

interface SegmentIconProps {
  segmentId: SegmentId
  className?: string
}

export function SegmentIcon({ segmentId, className }: SegmentIconProps) {
  const Icon = iconMap[segmentId]
  return <Icon className={className} aria-hidden="true" />
}
