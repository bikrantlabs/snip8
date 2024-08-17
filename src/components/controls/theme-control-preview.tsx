import { cn } from "@/lib/utils"

const darkenColor = (color: string, percent: number): string => {
  const num = parseInt(color.slice(1), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}
export const ThemeControlPreview = ({
  accentColor,
}: {
  accentColor: string
}) => {
  return (
    <span
      className={cn("mr-2 h-4 w-4 rounded-full")}
      style={{
        background: `linear-gradient(to bottom right, ${darkenColor(accentColor, 30)}, ${accentColor})`,
      }}
    ></span>
  )
}
