import React from "react";
import { Tutor } from "../types";
import {
  Star,
  Users,
  Briefcase,
  Globe,
  CheckCircle2,
  Languages,
  Clock,
  ChevronRight,
} from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";
import { Link } from "react-router-dom";

export const TutorCard: React.FC<{ tutor: Tutor }> = ({ tutor }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group">
      <div className="relative">
        <div className="h-auto aspect-square md:h-64 overflow-hidden">
          <img
            src={tutor.photoUrl}
            alt={tutor.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {tutor.badges.map((badge, idx) => (
            <span
              key={idx}
              className="bg-[#074E3C] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm backdrop-blur-md bg-opacity-90"
            >
              {badge}
            </span>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-[#074E3C] fill-[#074E3C]" />
              <span className="font-bold text-sm">{tutor.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] font-medium">
              <Users size={12} />
              <span>{tutor.studentsCount}+ Students</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <AudioPlayer
          url={tutor.recitationSampleUrl}
          title={tutor.recitationSampleTitle}
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#074E3C] transition-colors">
            {tutor.name}
          </h3>
          {tutor.badges.includes("Verified") && (
            <CheckCircle2 size={16} className="text-[#074E3C] mt-1" />
          )}
        </div>

        <div className="space-y-2.5 mb-6 text-sm text-slate-600 flex-grow">
          <div className="flex items-center">
            <Clock size={14} className="mr-2 text-slate-400 shrink-0" />
            <span className="text-[#074E3C] font-medium">
              {tutor.availabilityText}
            </span>
          </div>
          <div className="pt-2 flex flex-wrap gap-1.5">
            {tutor.specialties.map((spec, idx) => (
              <span
                key={idx}
                className="bg-slate-50 text-slate-500 text-[11px] font-semibold px-2 py-1 rounded-md border border-slate-100"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Link
            to="/book-free-trial"
            className="w-full bg-[#074E3C] text-white text-center py-3 rounded-xl font-bold hover:bg-[#053a2d] transition-all active:scale-95 shadow-md shadow-[#074E3C11]"
          >
            Book Free Trial
          </Link>
          <button className="w-full text-slate-600 text-center py-2 text-sm font-semibold hover:text-[#074E3C] flex items-center justify-center group/btn">
            View Profile{" "}
            <ChevronRight
              size={14}
              className="ml-1 group-hover/btn:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
