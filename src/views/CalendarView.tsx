import React, { useState } from 'react';
import { TechEvent, CityFilter } from '../types';

interface CalendarViewProps {
  events: TechEvent[];
  cityFilter: CityFilter;
  onSelectCityFilter: (filter: CityFilter) => void;
  onOpenEventDetail: (event: TechEvent) => void;
  bookmarkedEventIds: Set<string>;
  onToggleBookmark: (eventId: string) => void;
  onOpenRsvp: (event: TechEvent) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  cityFilter,
  onSelectCityFilter,
  onOpenEventDetail,
  bookmarkedEventIds,
  onToggleBookmark,
  onOpenRsvp,
}) => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'agenda'>('week');
  const [selectedDay, setSelectedDay] = useState<number>(26); // Thursday 26th
  const [hideConflicts, setHideConflicts] = useState(false);
  const [onlyTrackedTopics, setOnlyTrackedTopics] = useState(false);

  // Week 39 days data for September 2024
  const weekDays = [
    { dayStr: 'Mon', num: 23, dotColors: ['bg-[#4b41e1]'] },
    { dayStr: 'Tue', num: 24, dotColors: ['bg-[#4b41e1]', 'bg-[#131b2e]'] },
    { dayStr: 'Wed', num: 25, dotColors: ['bg-[#069669]'] },
    { dayStr: 'Thu', num: 26, dotColors: ['bg-white', 'bg-white', 'bg-white'] }, // Active
    { dayStr: 'Fri', num: 27, dotColors: ['bg-[#4b41e1]', 'bg-[#131b2e]', 'bg-[#069669]', 'bg-[#645efb]'] },
    { dayStr: 'Sat', num: 28, dotColors: ['bg-[#ba1a1a]', 'bg-[#4b41e1]', 'bg-[#069669]'], countBadge: '+5' },
    { dayStr: 'Sun', num: 29, dotColors: ['bg-[#069669]', 'bg-[#4b41e1]'] },
  ];

  // Events for selected day (default: Sep 26th)
  const selectedDayEvents = events.filter((ev) => {
    if (selectedDay === 26) {
      return (
        ev.id === 'aws-genai-immersion-day' ||
        ev.id === 'snowflake-cortex-llm-lab' ||
        ev.id === 'microsoft-fabric-agentic-ai'
      );
    }
    if (selectedDay === 27) {
      return ev.id === 'nvidia-tensorrt-llm';
    }
    if (selectedDay === 28) {
      return ev.id === 'google-cloud-vertex-devfest';
    }
    if (selectedDay === 29) {
      return ev.id === 'anthropic-claude-hackathon';
    }
    return ev.dayOfMonth === selectedDay;
  });

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Top View Mode & Today Toolbar */}
      <div className="px-3 sm:px-4 pt-3 pb-2 flex items-center justify-between gap-1 flex-wrap">
        <div className="flex items-center p-0.5 rounded-xl bg-[#eff4ff] border border-[#e5eeff]">
          {(['month', 'week', 'agenda'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                viewMode === mode
                  ? 'bg-white text-[#0b1c30] shadow-xs'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedDay(26)}
            className="flex items-center gap-1 px-3 py-1 rounded-xl bg-[#eff4ff] text-[#4b41e1] text-xs font-semibold hover:bg-[#e5eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span>Today</span>
          </button>
          <button
            onClick={() => setSelectedDay(26)}
            title="Refresh schedule"
            className="w-8 h-8 rounded-xl bg-[#eff4ff] text-[#45464d] hover:text-[#4b41e1] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">cached</span>
          </button>
        </div>
      </div>

      {/* Month Header & Nav */}
      <div className="px-3 sm:px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#0b1c30]">
            September 2024
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] font-mono text-xs font-bold">
            W39
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedDay((prev) => Math.max(23, prev - 1))}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30]"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            onClick={() => setSelectedDay((prev) => Math.min(29, prev + 1))}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30]"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* City Counts Bar */}
      <div className="w-full overflow-x-auto no-scrollbar px-3 sm:px-4 pb-2 flex items-center gap-2 text-xs">
        <button
          onClick={() => onSelectCityFilter('all')}
          className={`px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 transition-all ${
            cityFilter === 'all'
              ? 'bg-[#eff4ff] text-[#0b1c30] ring-1 ring-[#dce9ff]'
              : 'text-[#45464d] hover:bg-[#eff4ff]'
          }`}
        >
          <span>All Cities</span>
          <span className="font-mono font-bold">48</span>
        </button>

        <button
          onClick={() => onSelectCityFilter('blr')}
          className={`px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 transition-all ${
            cityFilter === 'blr'
              ? 'bg-[#e2dfff] text-[#3323cc] ring-1 ring-[#c3c0ff]'
              : 'text-[#45464d] hover:bg-[#eff4ff]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#4b41e1]"></span>
          <span>Bengaluru</span>
          <span className="font-mono font-bold">31</span>
        </button>

        <button
          onClick={() => onSelectCityFilter('maa')}
          className={`px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 transition-all ${
            cityFilter === 'maa'
              ? 'bg-[#85f8c4]/30 text-[#069669] ring-1 ring-[#85f8c4]'
              : 'text-[#45464d] hover:bg-[#eff4ff]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#069669]"></span>
          <span>Chennai</span>
          <span className="font-mono font-bold">17</span>
        </button>
      </div>

      {/* Timeline Horizon Header */}
      <div className="px-3 sm:px-4 pt-2 pb-1 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#45464d]">
          TIMELINE HORIZON
        </span>
        <span className="text-xs font-semibold text-[#4b41e1]">
          Selected: {selectedDayEvents.length} Events
        </span>
      </div>

      {/* Days of Week Horizon (Horizontal Grid) */}
      <div className="px-3 sm:px-4 py-2">
        <div className="grid grid-cols-7 gap-1.5 bg-white p-2 rounded-2xl border border-[#e5eeff] shadow-xs">
          {weekDays.map((item) => {
            const isSelected = selectedDay === item.num;

            return (
              <button
                key={item.num}
                onClick={() => setSelectedDay(item.num)}
                className={`flex flex-col items-center justify-between py-2 px-1 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-[#4b41e1] text-white shadow-sm shadow-[#4b41e1]/25'
                    : 'text-[#0b1c30] hover:bg-[#eff4ff]'
                }`}
              >
                <span className={`text-[11px] font-medium ${isSelected ? 'text-white/80' : 'text-[#45464d]'}`}>
                  {item.dayStr}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-base my-0.5">
                  {item.num}
                </span>
                <div className="flex items-center gap-0.5 h-2">
                  {item.dotColors.map((color, i) => (
                    <span
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : color}`}
                    ></span>
                  ))}
                  {item.countBadge && !isSelected && (
                    <span className="text-[9px] font-bold text-[#ba1a1a]">
                      {item.countBadge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic Legend Pills */}
      <div className="w-full overflow-x-auto no-scrollbar px-3 sm:px-4 py-1.5 flex items-center gap-3 text-[11px] text-[#45464d]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#4b41e1]"></span>
          <span>AI / GenAI</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#131b2e]"></span>
          <span>Cloud &amp; Ops</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#645efb]"></span>
          <span>Data &amp; LLMs</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#069669]"></span>
          <span>Free Pass</span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="px-3 sm:px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setHideConflicts(!hideConflicts)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all flex-shrink-0 ${
            hideConflicts
              ? 'bg-[#0b1c30] text-white'
              : 'bg-white text-[#45464d] border border-[#e5eeff] hover:bg-[#eff4ff]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">filter_list_off</span>
          <span>Hide conflicts</span>
        </button>

        <button
          onClick={() => setOnlyTrackedTopics(!onlyTrackedTopics)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all flex-shrink-0 ${
            onlyTrackedTopics
              ? 'bg-[#4b41e1] text-white'
              : 'bg-white text-[#45464d] border border-[#e5eeff] hover:bg-[#eff4ff]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">bookmark</span>
          <span>Tracked topics</span>
        </button>

        <span className="text-[11px] font-mono text-[#76777d] px-2 py-1 bg-[#eff4ff] rounded-xl flex-shrink-0">
          IST (UTC+5:30)
        </span>
      </div>

      {/* Selected Day Header */}
      <div className="px-3 sm:px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4b41e1]"></span>
          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
            Thursday, September {selectedDay}
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs font-semibold">
          {selectedDayEvents.length} Confirmed Sessions
        </span>
      </div>

      {/* Timeline Sessions Stack with Connector Lines */}
      <div className="px-3 sm:px-4 flex flex-col gap-4 relative">
        {selectedDayEvents.map((event, idx) => {
          const isSaved = bookmarkedEventIds.has(event.id);

          return (
            <div key={event.id} className="relative flex gap-3">
              {/* Timeline Connector Line & Dot */}
              <div className="flex flex-col items-center flex-shrink-0 pt-3">
                <span className="w-3 h-3 rounded-full bg-[#4b41e1] ring-4 ring-[#e2dfff]"></span>
                {idx < selectedDayEvents.length - 1 && (
                  <div className="w-0.5 flex-1 bg-[#dce9ff] my-1"></div>
                )}
              </div>

              {/* Event Card */}
              <div className="flex-1 bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-sm hover:shadow-md transition-all">
                {/* Time & Badges */}
                <div className="flex items-center justify-between gap-1 mb-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-[#0b1c30] bg-[#eff4ff] px-2 py-0.5 rounded-md">
                      {event.timeRange}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#45464d] text-[10px] font-semibold">
                      {event.tags[0] || 'Tech'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#069669] text-[10px] font-bold">
                      {event.priceLabel}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    <span>{event.matchScore}% Match</span>
                  </span>
                </div>

                {/* Subtitle / Community */}
                {event.organizerVerified && (
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#4b41e1] mb-0.5 flex items-center gap-1">
                    <span>{event.organizer}</span>
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                  </p>
                )}

                {/* Title */}
                <h4
                  onClick={() => onOpenEventDetail(event)}
                  className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30] leading-snug hover:text-[#4b41e1] transition-colors cursor-pointer mb-1.5"
                >
                  {event.title}
                </h4>

                {/* Venue / Location */}
                <p className="text-xs text-[#45464d] flex items-center gap-1 mb-3">
                  <span className="material-symbols-outlined text-[15px] text-[#76777d]">
                    {event.isHybrid ? 'videocam' : 'location_on'}
                  </span>
                  <span className="truncate">{event.venueName}, {event.area}</span>
                </p>

                {/* Special Visual for Microsoft Fabric Event from Screenshot */}
                {event.id === 'microsoft-fabric-agentic-ai' && (
                  <div
                    onClick={() => onOpenEventDetail(event)}
                    className="relative w-full h-28 rounded-xl overflow-hidden mb-3 cursor-pointer group"
                  >
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-xs text-white font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#85f8c4]">group</span>
                        <span>180+ Engineers &amp; Founders Attending</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Technical workspace spec (if Snowflake lab) */}
                {event.technicalPrerequisites && (
                  <div className="p-2 rounded-xl bg-[#eff4ff] border border-[#dce9ff] mb-3 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-[#0b1c30] font-mono font-medium truncate">
                      <span className="material-symbols-outlined text-[15px] text-[#4b41e1]">terminal</span>
                      <span className="truncate">{event.technicalPrerequisites}</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-white text-[#4b41e1] font-bold text-[10px] flex-shrink-0">
                      Hands-on
                    </span>
                  </div>
                )}

                {/* Speaker highlight row */}
                {event.speakers.length > 0 && (
                  <div
                    onClick={() => onOpenEventDetail(event)}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] cursor-pointer transition-colors mb-3"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={event.speakers[0].avatarUrl}
                        alt={event.speakers[0].name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-[#dce9ff]"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#0b1c30] truncate">
                          {event.speakers[0].name}
                        </p>
                        <p className="text-[11px] text-[#45464d] truncate">
                          {event.speakers[0].role}
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[16px] text-[#4b41e1]">arrow_forward</span>
                  </div>
                )}

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-1 border-t border-[#f8f9ff]">
                  <button
                    onClick={() => onOpenEventDetail(event)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#4b41e1] text-white font-semibold text-xs flex items-center justify-center gap-1 hover:bg-[#3323cc] active:scale-98 transition-all"
                  >
                    <span>View Full Agenda</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>

                  <button
                    onClick={() => onOpenRsvp(event)}
                    className="px-4 py-2 rounded-xl bg-[#eff4ff] text-[#0b1c30] font-semibold text-xs hover:bg-[#e5eeff] transition-colors"
                  >
                    RSVP
                  </button>

                  <button
                    onClick={() => onToggleBookmark(event.id)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[#45464d] hover:bg-[#eff4ff] transition-colors"
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={isSaved ? { fontVariationSettings: "'FILL' 1", color: '#4b41e1' } : undefined}
                    >
                      {isSaved ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Silk Board & ORR Traffic Buffer Callout (Exact from Image 8.png) */}
      <div className="px-3 sm:px-4 mt-6">
        <div className="p-4 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#e2dfff] text-[#3323cc] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]">near_me</span>
          </div>
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xs sm:text-sm text-[#0b1c30]">
              Silk Board &amp; ORR Traffic Buffer
            </h4>
            <p className="text-xs text-[#45464d] mt-0.5 leading-relaxed">
              AI calculated <strong className="text-[#0b1c30]">+25 mins commute buffer</strong> for Koramangala to Lavelle Rd corridor during peak 5:30 PM transit. Consider taking Vidhana Soudha Metro for on-time arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
