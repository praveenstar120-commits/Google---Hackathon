import React, { useState } from 'react';
import { CityFilter, TechEvent, TabType } from '../types';

interface DashboardViewProps {
  events: TechEvent[];
  cityFilter: CityFilter;
  onSelectCityFilter: (filter: CityFilter) => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenEventDetail: (event: TechEvent) => void;
  bookmarkedEventIds: Set<string>;
  onToggleBookmark: (eventId: string) => void;
  onOpenRsvp: (event: TechEvent) => void;
  onOpenAddHubModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  events,
  cityFilter,
  onSelectCityFilter,
  onNavigateTab,
  onOpenEventDetail,
  bookmarkedEventIds,
  onToggleBookmark,
  onOpenRsvp,
  onOpenAddHubModal,
}) => {
  const [timeRange, setTimeRange] = useState<'this_week' | 'next_2_weeks' | 'this_month' | 'next_3_months'>('this_week');
  const [eventTabFilter, setEventTabFilter] = useState<'all' | 'strong_match' | 'hackathon' | 'free'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter events based on active city and selected tab
  const filteredEvents = events.filter((ev) => {
    if (cityFilter !== 'all' && ev.hub !== cityFilter) return false;
    if (eventTabFilter === 'strong_match' && ev.matchScore < 90) return false;
    if (eventTabFilter === 'hackathon' && ev.primaryCategory !== 'Hackathon' && ev.priceType !== 'hackathon') return false;
    if (eventTabFilter === 'free' && ev.priceType !== 'free') return false;
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setToastMessage('Autonomous engine synced 140+ tech feeds across BLR & MAA.');
    setTimeout(() => {
      setIsRefreshing(false);
      setTimeout(() => setToastMessage(null), 3000);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#131b2e] text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[16px] text-[#85f8c4]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Subtitle Bar & Quick Status */}
      <div className="px-3 sm:px-4 pt-2 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#4b41e1] animate-pulse flex-shrink-0"></span>
          <p className="text-xs text-[#45464d] truncate font-medium">
            AI-powered technology event intelligence
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#45464d] text-[11px] font-semibold">
          <span className="material-symbols-outlined text-[13px] text-[#4b41e1]">sync</span>
          <span>Live</span>
        </div>
      </div>

      {/* City & Hub Selectors (Horizontal Scroll) */}
      <div className="w-full overflow-x-auto no-scrollbar py-2 px-3 sm:px-4 flex items-center gap-2">
        <button
          onClick={() => onSelectCityFilter('all')}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
            cityFilter === 'all'
              ? 'bg-[#4b41e1] text-white shadow-sm shadow-[#4b41e1]/20'
              : 'bg-white text-[#0b1c30] hover:bg-[#eff4ff] shadow-sm border border-[#e5eeff]'
          }`}
        >
          <span>All Hubs</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              cityFilter === 'all' ? 'bg-white/20 text-white' : 'bg-[#e5eeff] text-[#45464d]'
            }`}
          >
            37
          </span>
        </button>

        <button
          onClick={() => onSelectCityFilter('blr')}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
            cityFilter === 'blr'
              ? 'bg-[#4b41e1] text-white shadow-sm shadow-[#4b41e1]/20'
              : 'bg-white text-[#0b1c30] hover:bg-[#eff4ff] shadow-sm border border-[#e5eeff]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#68dba9]"></span>
          <span>Bengaluru</span>
          <span className="font-mono text-[11px] opacity-80">24</span>
        </button>

        <button
          onClick={() => onSelectCityFilter('maa')}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
            cityFilter === 'maa'
              ? 'bg-[#4b41e1] text-white shadow-sm shadow-[#4b41e1]/20'
              : 'bg-white text-[#0b1c30] hover:bg-[#eff4ff] shadow-sm border border-[#e5eeff]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#645efb]"></span>
          <span>Chennai</span>
          <span className="font-mono text-[11px] opacity-80">13</span>
        </button>

        <button
          onClick={onOpenAddHubModal}
          className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium text-[#4b41e1] bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Add Hub</span>
        </button>
      </div>

      {/* Time Range Chips (Horizontal Scroll) */}
      <div className="w-full overflow-x-auto no-scrollbar pb-3 px-3 sm:px-4 flex items-center gap-1.5">
        <span className="text-[11px] text-[#45464d] uppercase tracking-wider font-semibold mr-1">
          Time:
        </span>
        {[
          { key: 'this_week', label: 'This Week' },
          { key: 'next_2_weeks', label: 'Next 2 Weeks' },
          { key: 'this_month', label: 'This Month' },
          { key: 'next_3_months', label: 'Next 3 Months' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTimeRange(t.key as any)}
            className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              timeRange === t.key
                ? 'bg-[#0b1c30] text-white shadow-xs'
                : 'bg-[#eff4ff] text-[#45464d] hover:bg-[#e5eeff]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* AI Event Intelligence Panel */}
      <div className="px-3 sm:px-4 mb-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#eff4ff] via-white to-[#e2dfff]/40 p-4 shadow-sm border border-[#e5eeff]">
          {/* Decorative Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4b41e1]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-start justify-between relative z-10 mb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#4b41e1] text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm sm:text-base text-[#0b1c30] leading-none">
                    AI Event Intelligence
                  </h2>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-[10px] font-bold">
                    <span className="w-1 h-1 rounded-full bg-[#4b41e1]"></span> Live Sync
                  </span>
                </div>
                <p className="text-[11px] text-[#45464d] mt-0.5">
                  Autonomous discovery engine active
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              aria-label="Refresh AI analysis"
              className="w-8 h-8 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#45464d] hover:text-[#4b41e1] active:scale-95 transition-all"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  isRefreshing ? 'animate-spin text-[#4b41e1]' : ''
                }`}
              >
                refresh
              </span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[#0b1c30] font-medium relative z-10 mb-3">
            <strong className="font-['Plus_Jakarta_Sans'] text-[#4b41e1] text-base font-bold">37</strong>{' '}
            relevant events discovered across Bengaluru and Chennai tech corridors.
          </p>

          {/* Stat Pills Grid */}
          <div className="grid grid-cols-2 gap-2 relative z-10 mb-3">
            <button
              onClick={() => onNavigateTab('explore-events')}
              className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white shadow-xs border border-[#eff4ff] hover:bg-[#eff4ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[#4b41e1] text-[18px]">psychology</span>
              <span className="text-xs text-[#0b1c30] font-semibold">12 AI-focused</span>
            </button>
            <button
              onClick={() => onNavigateTab('explore-events')}
              className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white shadow-xs border border-[#eff4ff] hover:bg-[#eff4ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[#4b41e1] text-[18px]">cloud</span>
              <span className="text-xs text-[#0b1c30] font-semibold">8 Cloud events</span>
            </button>
            <button
              onClick={() => onNavigateTab('explore-events')}
              className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white shadow-xs border border-[#eff4ff] hover:bg-[#eff4ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[#4b41e1] text-[18px]">terminal</span>
              <span className="text-xs text-[#0b1c30] font-semibold">5 Hackathons</span>
            </button>
            <button
              onClick={() => onNavigateTab('explore-events')}
              className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white shadow-xs border border-[#eff4ff] hover:bg-[#eff4ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[#4b41e1] text-[18px]">local_offer</span>
              <span className="text-xs text-[#0b1c30] font-semibold">14 Free access</span>
            </button>
          </div>

          {/* Fresh Discovery Notice Banner */}
          <button
            onClick={() => onNavigateTab('ai-digest')}
            className="w-full relative z-10 flex items-center justify-between px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-[#e5eeff] hover:bg-white transition-all text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#4b41e1] text-[16px] flex-shrink-0 animate-bounce">
                auto_awesome
              </span>
              <span className="text-[11px] text-[#0b1c30] font-medium truncate">
                ✦ 3 new events discovered since update 2h ago
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#4b41e1] font-bold pl-2 flex-shrink-0">
              View →
            </span>
          </button>
        </div>
      </div>

      {/* 6 Compact Clickable KPI Cards (2x3 Grid) */}
      <div className="px-3 sm:px-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[11px] uppercase tracking-wider text-[#45464d] font-bold">
            Metrics Overview
          </h3>
          <button
            onClick={() => onNavigateTab('explore-events')}
            className="text-[11px] text-[#4b41e1] font-semibold hover:underline"
          >
            Filter by category
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {/* KPI 1 */}
          <button
            onClick={() => onNavigateTab('explore-events')}
            className="flex flex-col items-start p-3 rounded-2xl bg-white shadow-sm border border-[#e5eeff] hover:shadow-md hover:border-[#dce9ff] active:scale-98 transition-all text-left group"
          >
            <div className="w-full flex items-center justify-between text-[#45464d] mb-1.5">
              <span className="text-[11px] font-semibold group-hover:text-[#4b41e1]">Upcoming</span>
              <span className="material-symbols-outlined text-[18px] text-[#4b41e1]">calendar_clock</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl text-[#0b1c30] font-bold">37</span>
              <span className="text-[10px] text-[#069669] font-bold">Total</span>
            </div>
            <div className="w-full h-1 bg-[#e5eeff] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#4b41e1] w-full rounded-full"></div>
            </div>
          </button>

          {/* KPI 2 */}
          <button
            onClick={() => onNavigateTab('tech-calendar')}
            className="flex flex-col items-start p-3 rounded-2xl bg-white shadow-sm border border-[#e5eeff] hover:shadow-md hover:border-[#dce9ff] active:scale-98 transition-all text-left group"
          >
            <div className="w-full flex items-center justify-between text-[#45464d] mb-1.5">
              <span className="text-[11px] font-semibold group-hover:text-[#4b41e1]">This Week</span>
              <span className="material-symbols-outlined text-[18px] text-[#4b41e1]">bolt</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl text-[#0b1c30] font-bold">9</span>
              <span className="text-[10px] text-[#45464d] font-medium">Active</span>
            </div>
            <div className="w-full h-1 bg-[#e5eeff] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#645efb] w-[45%] rounded-full"></div>
            </div>
          </button>

          {/* KPI 3 */}
          <button
            onClick={() => onNavigateTab('tech-calendar')}
            className="flex flex-col items-start p-3 rounded-2xl bg-white shadow-sm border border-[#e5eeff] hover:shadow-md hover:border-[#dce9ff] active:scale-98 transition-all text-left group"
          >
            <div className="w-full flex items-center justify-between text-[#45464d] mb-1.5">
              <span className="text-[11px] font-semibold group-hover:text-[#4b41e1]">Next 30 Days</span>
              <span className="material-symbols-outlined text-[18px] text-[#4b41e1]">event</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl text-[#0b1c30] font-bold">28</span>
              <span className="text-[10px] text-[#45464d] font-medium">Events</span>
            </div>
            <div className="w-full h-1 bg-[#e5eeff] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#565e74] w-[75%] rounded-full"></div>
            </div>
          </button>

          {/* KPI 4 */}
          <button
            onClick={() => {
              setEventTabFilter('strong_match');
              onNavigateTab('explore-events');
            }}
            className="flex flex-col items-start p-3 rounded-2xl bg-white shadow-sm border border-[#e5eeff] hover:shadow-md hover:border-[#dce9ff] active:scale-98 transition-all text-left group"
          >
            <div className="w-full flex items-center justify-between text-[#45464d] mb-1.5">
              <span className="text-[11px] font-semibold group-hover:text-[#4b41e1]">AI Events</span>
              <span className="material-symbols-outlined text-[18px] text-[#4b41e1]">smart_toy</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl text-[#4b41e1] font-bold">12</span>
              <span className="text-[10px] text-[#3323cc] font-bold">High Match</span>
            </div>
            <div className="w-full h-1 bg-[#e5eeff] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#4b41e1] w-[80%] rounded-full"></div>
            </div>
          </button>

          {/* KPI 5 */}
          <button
            onClick={() => {
              setEventTabFilter('hackathon');
              onNavigateTab('explore-events');
            }}
            className="flex flex-col items-start p-3 rounded-2xl bg-white shadow-sm border border-[#e5eeff] hover:shadow-md hover:border-[#dce9ff] active:scale-98 transition-all text-left group"
          >
            <div className="w-full flex items-center justify-between text-[#45464d] mb-1.5">
              <span className="text-[11px] font-semibold group-hover:text-[#4b41e1]">Hackathons</span>
              <span className="material-symbols-outlined text-[18px] text-[#4b41e1]">code_blocks</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl text-[#0b1c30] font-bold">5</span>
              <span className="text-[10px] text-[#ba1a1a] font-bold">Prize pools</span>
            </div>
            <div className="w-full h-1 bg-[#e5eeff] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#68dba9] w-[60%] rounded-full"></div>
            </div>
          </button>

          {/* KPI 6 */}
          <button
            onClick={() => {
              setEventTabFilter('free');
              onNavigateTab('explore-events');
            }}
            className="flex flex-col items-start p-3 rounded-2xl bg-white shadow-sm border border-[#e5eeff] hover:shadow-md hover:border-[#dce9ff] active:scale-98 transition-all text-left group"
          >
            <div className="w-full flex items-center justify-between text-[#45464d] mb-1.5">
              <span className="text-[11px] font-semibold group-hover:text-[#4b41e1]">Free Entry</span>
              <span className="material-symbols-outlined text-[18px] text-[#4b41e1]">confirmation_number</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl text-[#0b1c30] font-bold">21</span>
              <span className="text-[10px] text-[#069669] font-bold">Open RSVP</span>
            </div>
            <div className="w-full h-1 bg-[#e5eeff] rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#645efb] w-[70%] rounded-full"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Fast Navigation Shortcuts */}
      <div className="px-3 sm:px-4 mb-6">
        <div className="p-3 rounded-2xl bg-[#eff4ff] border border-[#dce9ff]">
          <div className="text-[#0b1c30] text-[11px] font-bold uppercase tracking-wider mb-2">
            Intelligence Shortcuts
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onNavigateTab('explore-events')}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white hover:bg-[#e2dfff] transition-colors text-center group shadow-xs border border-[#e5eeff]"
            >
              <span className="material-symbols-outlined text-[#4b41e1] text-[22px] group-hover:scale-110 transition-transform">
                explore
              </span>
              <span className="text-xs text-[#0b1c30] font-semibold mt-1">Explore Hubs</span>
            </button>
            <button
              onClick={() => onNavigateTab('tech-calendar')}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white hover:bg-[#e2dfff] transition-colors text-center group shadow-xs border border-[#e5eeff]"
            >
              <span className="material-symbols-outlined text-[#4b41e1] text-[22px] group-hover:scale-110 transition-transform">
                calendar_month
              </span>
              <span className="text-xs text-[#0b1c30] font-semibold mt-1">Calendar</span>
            </button>
            <button
              onClick={() => onNavigateTab('companies-directory')}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white hover:bg-[#e2dfff] transition-colors text-center group shadow-xs border border-[#e5eeff]"
            >
              <span className="material-symbols-outlined text-[#4b41e1] text-[22px] group-hover:scale-110 transition-transform">
                corporate_fare
              </span>
              <span className="text-xs text-[#0b1c30] font-semibold mt-1">Companies</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section: This Week in Tech */}
      <div className="px-3 sm:px-4 mb-2">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl text-[#0b1c30] font-bold leading-tight">
              This Week in Tech
            </h2>
            <p className="text-xs text-[#45464d]">
              Top curated gatherings matched to your profile
            </p>
          </div>
          <span className="text-xs font-semibold text-[#4b41e1] flex items-center gap-0.5">
            <span>{filteredEvents.length} Curated</span>
          </span>
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3">
          {[
            { id: 'all', label: 'All Events' },
            { id: 'strong_match', label: 'Strong Match (5)', icon: 'star' },
            { id: 'hackathon', label: 'Hackathons' },
            { id: 'free', label: 'Free' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setEventTabFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                eventTabFilter === tab.id
                  ? 'bg-[#4b41e1] text-white shadow-xs'
                  : 'bg-[#e5eeff] text-[#45464d] hover:bg-[#dce9ff]'
              }`}
            >
              {tab.icon && (
                <span className="material-symbols-outlined text-[14px]">
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards Stack */}
      <div className="px-3 sm:px-4 flex flex-col gap-4">
        {filteredEvents.slice(0, 3).map((event) => {
          const isSaved = bookmarkedEventIds.has(event.id);

          return (
            <article
              key={event.id}
              className="relative flex flex-col rounded-2xl bg-white p-4 shadow-sm hover:shadow-md border border-[#e5eeff] transition-all duration-200"
            >
              {/* Gradient accent top strip */}
              <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#4b41e1] to-[#68dba9] rounded-t"></div>

              {/* Header Badges & Bookmark */}
              <div className="flex items-start justify-between gap-2 mt-1 mb-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#0f0069] text-[10px] font-bold uppercase">
                    {event.primaryCategory}
                  </span>
                  {event.tags.slice(1, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#45464d] text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#4b41e1] text-white text-[10px] font-semibold">
                    {event.priceLabel.toUpperCase()}
                  </span>
                  {event.verified && (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#069669] text-[10px] font-bold">
                      <span className="material-symbols-outlined text-[12px]">verified</span> VERIFIED
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onToggleBookmark(event.id)}
                  aria-label="Save Event"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                    isSaved
                      ? 'text-[#4b41e1] bg-[#e2dfff]'
                      : 'text-[#45464d] hover:text-[#4b41e1] bg-[#eff4ff]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {isSaved ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>
              </div>

              {/* Title & Organizer */}
              <h3
                onClick={() => onOpenEventDetail(event)}
                className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#0b1c30] font-bold leading-snug hover:text-[#4b41e1] transition-colors cursor-pointer mb-1"
              >
                {event.title}
              </h3>
              <p className="text-xs text-[#45464d] flex items-center gap-1.5 mb-2.5">
                <span className="material-symbols-outlined text-[16px] text-[#4b41e1]">groups</span>
                <span>{event.organizer}</span>
              </p>

              {/* Event Visual */}
              <div
                onClick={() => onOpenEventDetail(event)}
                className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3 cursor-pointer group bg-[#e5eeff]"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  alt={event.title}
                  src={event.imageUrl}
                  onError={(e) => {
                    // Fallback to high tech gradient
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-[#213145]/85 backdrop-blur-sm text-white font-mono text-[11px] font-semibold">
                  {event.hub.toUpperCase()} · {event.area}
                </div>
                {event.spotsLeft && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium">
                    {event.spotsLeft} spots left
                  </div>
                )}
              </div>

              {/* Logistics Details */}
              <div className="flex flex-col gap-1.5 mb-3 text-xs text-[#45464d]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#4b41e1]">schedule</span>
                  <span className="font-mono text-xs text-[#0b1c30] font-semibold">
                    {event.dateStr.split(',')[1]?.trim() || event.dateStr} · {event.timeRange}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#45464d]">location_on</span>
                  <span className="truncate">{event.venueName}, {event.area}</span>
                </div>
              </div>

              {/* AI Relevance Pill */}
              <div className="p-2.5 rounded-xl bg-[#eff4ff] mb-3 flex items-start gap-2 border border-[#dce9ff]">
                <span className="material-symbols-outlined text-[#4b41e1] text-[18px] flex-shrink-0 mt-0.5">
                  auto_awesome
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] text-[#4b41e1] font-bold">
                    Strong AI Match · {event.matchScore}% Relevance
                  </p>
                  <p className="text-[11px] text-[#45464d] leading-tight mt-0.5">
                    {event.matchReason}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onToggleBookmark(event.id)}
                  className={`flex-1 py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all ${
                    isSaved
                      ? 'bg-[#e2dfff] text-[#3323cc]'
                      : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isSaved ? 'check' : 'bookmark_add'}
                  </span>
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  onClick={() => onOpenEventDetail(event)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#4b41e1] text-white font-semibold text-xs shadow-sm hover:bg-[#3323cc] active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>View Details</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Visual Delight / Feed Finisher */}
      <div className="px-3 sm:px-4 mt-6 mb-2">
        <div className="p-4 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#4b41e1] font-bold flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">radar</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#0b1c30] font-bold truncate">Continuous Corridors Crawl</p>
              <p className="text-[11px] text-[#45464d] truncate">Tracking 140+ tech communities in BLR &amp; MAA</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('ai-digest')}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-white text-[#4b41e1] text-xs font-semibold shadow-xs hover:bg-[#f8f9ff] border border-[#e5eeff] transition-colors"
          >
            Tune AI
          </button>
        </div>
      </div>
    </div>
  );
};
