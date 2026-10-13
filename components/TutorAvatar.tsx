import React, { useMemo } from "react";
import {
  BookOpen,
  GraduationCap,
  User,
  type LucideIcon,
} from "lucide-react";

const ICONS: LucideIcon[] = [GraduationCap, BookOpen, User];

type Props = {
  name: string;
  gender?: "Male" | "Female";
  size?: number;
  accent?: string;
  className?: string;
};

export const TutorAvatar: React.FC<Props> = ({
  name,
  gender,
  size = 72,
  accent = "#c9973a",
  className = "",
}) => {
  const Icon = useMemo(() => {
    const pool =
      gender === "Female"
        ? [BookOpen, User]
        : gender === "Male"
          ? [GraduationCap, User]
          : ICONS;
    let hash = 0;
    for (let i = 0; i < name.length; i += 1) {
      hash = (hash + name.charCodeAt(i)) % pool.length;
    }
    return pool[hash];
  }, [name, gender]);

  const iconSize = Math.round(size * 0.42);

  return (
    <div
      className={className}
      role="img"
      aria-label={`${name} profile`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        background: `linear-gradient(145deg, rgba(14,66,36,.85) 0%, rgba(5,22,16,.95) 100%)`,
        border: `2px solid ${accent}55`,
        boxShadow: `0 8px 28px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06)`,
      }}
    >
      <Icon size={iconSize} color={accent} strokeWidth={1.75} aria-hidden />
    </div>
  );
};
