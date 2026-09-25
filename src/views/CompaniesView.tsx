import React, { useState } from 'react';
import { TECH_HUBS } from '../data/mockCompanies';
import { CityFilter, TechEvent } from '../types';

interface CompaniesViewProps {
  cityFilter: CityFilter;
  onSelectCityFilter: (filter: CityFilter) => void;
  onSelectHubEvents: (areaOrName: string) => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  cityFilter,
  onSelectCityFilter,
  onSelectHubEvents,
}) => {
  const [followedHubs, setFollowedHubs] = useState<Set<string>>(new Set(['ms-reactor-blr']));

  const filteredHubs = TECH_HUBS.filter((h) => {
    if (cityFilter === 'blr') return h.cityCode === 'BLR';
    if (cityFilter === 'maa') return h.cityCode === 'MAA';
    return true;
  });

  const toggleFollow = (id: string) => {
    setFollowedHubs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Title */}
      <div className="px-3 sm:px-4 pt-3 pb-2 flex items-center justify-between">
        <div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#0b1c30]">
            Tech Parks &amp; Hubs
          </h2>
          <p className="text-xs text-[#45464d]">
            Top campuses hosting verified developer gatherings
          </p>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs font-semibold">
          {filteredHubs.length} Hubs
        </span>
      </div>

      {/* City filter chips */}
      <div className="px-3 sm:px-4 py-2 flex items-center gap-2">
        <button
          onClick={() => onSelectCityFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            cityFilter === 'all'
              ? 'bg-[#0b1c30] text-white'
              : 'bg-white text-[#45464d] border border-[#e5eeff]'
          }`}
        >
          All Corridors
        </button>
        <button
          onClick={() => onSelectCityFilter('blr')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
            cityFilter === 'blr'
              ? 'bg-[#4b41e1] text-white'
              : 'bg-white text-[#45464d] border border-[#e5eeff]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#68dba9]"></span>
          <span>Bengaluru</span>
        </button>
        <button
          onClick={() => onSelectCityFilter('maa')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
            cityFilter === 'maa'
              ? 'bg-[#4b41e1] text-white'
              : 'bg-white text-[#45464d] border border-[#e5eeff]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#645efb]"></span>
          <span>Chennai</span>
        </button>
      </div>

      {/* Hub Cards */}
      <div className="px-3 sm:px-4 flex flex-col gap-3.5 mt-1">
        {filteredHubs.map((hub) => {
          const isFollowing = followedHubs.has(hub.id);

          return (
            <article
              key={hub.id}
              className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#4b41e1] font-bold text-[10px]">
                      {hub.cityCode} · {hub.area}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] font-semibold text-[10px]">
                      {hub.badge}
                    </span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30] mt-1">
                    {hub.name}
                  </h3>
                </div>

                <button
                  onClick={() => toggleFollow(hub.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    isFollowing
                      ? 'bg-[#eff4ff] text-[#4b41e1]'
                      : 'bg-[#4b41e1] text-white hover:bg-[#3323cc]'
                  }`}
                >
                  {isFollowing ? 'Following' : '+ Track'}
                </button>
              </div>

              {/* Transit & Commute intelligence */}
              <div className="p-2.5 rounded-xl bg-[#f8f9ff] border border-[#eff4ff] text-xs flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[#0b1c30]">
                  <span className="material-symbols-outlined text-[16px] text-[#4b41e1]">
                    directions_subway
                  </span>
                  <span className="font-medium">{hub.metroStatus}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[16px]">traffic</span>
                  <span className="text-[11px] leading-tight">{hub.trafficNotes}</span>
                </div>
              </div>

              {/* Hosting Companies */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex flex-wrap items-center gap-1">
                  {hub.hostingCompanies.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#45464d] text-[10px]"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectHubEvents(hub.name)}
                  className="text-xs font-semibold text-[#4b41e1] hover:underline flex items-center gap-0.5 flex-shrink-0"
                >
                  <span>{hub.activeEventsCount} Meetups</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
