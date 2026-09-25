import React, { useState, useMemo } from 'react';
import { TechEvent, CityFilter } from '../types';

interface ExploreEventsViewProps {
  events: TechEvent[];
  cityFilter: CityFilter;
  onSelectCityFilter: (filter: CityFilter) => void;
  onOpenEventDetail: (event: TechEvent) => void;
  bookmarkedEventIds: Set<string>;
  onToggleBookmark: (eventId: string) => void;
  onOpenRsvp: (event: TechEvent) => void;
  onOpenSuggestMeetup: () => void;
}

export const ExploreEventsView: React.FC<ExploreEventsViewProps> = ({
  events,
  cityFilter,
  onSelectCityFilter,
  onOpenEventDetail,
  bookmarkedEventIds,
  onToggleBookmark,
  onOpenRsvp,
  onOpenSuggestMeetup,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'list' | 'grid'>('list');
  const [strongMatchOnly, setStrongMatchOnly] = useState(false);
  const [thisWeekendOnly, setThisWeekendOnly] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // City filter
      if (cityFilter !== 'all' && ev.hub !== cityFilter) return false;

      // Strong match
      if (strongMatchOnly && ev.matchScore < 90) return false;

      // This weekend filter (Sep 28 & 29)
      if (thisWeekendOnly && !(ev.dayOfWeek === 'Sat' || ev.dayOfWeek === 'Sun')) {
        return false;
      }

      // Category filter
      if (categoryFilter && !ev.tags.some(t => t.toLowerCase().includes(categoryFilter.toLowerCase())) && ev.primaryCategory !== categoryFilter) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = ev.title.toLowerCase().includes(query);
        const inDesc = ev.matchReason.toLowerCase().includes(query);
        const inArea = ev.area.toLowerCase().includes(query);
        const inVenue = ev.venueName.toLowerCase().includes(query);
        const inTags = ev.tags.some((t) => t.toLowerCase().includes(query));
        const inSpeakers = ev.speakers.some((s) => s.name.toLowerCase().includes(query));
        return inTitle || inDesc || inArea || inVenue || inTags || inSpeakers;
      }

      return true;
    });
  }, [events, cityFilter, strongMatchOnly, thisWeekendOnly, categoryFilter, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStrongMatchOnly(false);
    setThisWeekendOnly(false);
    setCategoryFilter(null);
    onSelectCityFilter('all');
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Top Title & Controls */}
      <div className="px-3 sm:px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-xl sm:text-2xl text-[#0b1c30]">
            Explore Events
          </h1>
          <span className="px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs font-semibold">
            {events.length} Active
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* List / Grid layout toggle */}
          <div className="flex items-center bg-[#eff4ff] p-0.5 rounded-lg border border-[#e5eeff]">
            <button
              onClick={() => setLayoutMode('list')}
              aria-label="List view"
              className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
                layoutMode === 'list'
                  ? 'bg-white text-[#4b41e1] shadow-xs font-bold'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">view_list</span>
            </button>
            <button
              onClick={() => setLayoutMode('grid')}
              aria-label="Grid view"
              className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
                layoutMode === 'grid'
                  ? 'bg-white text-[#4b41e1] shadow-xs font-bold'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
          </div>

          {/* Reset button */}
          <button
            onClick={handleResetFilters}
            className="text-xs font-semibold text-[#4b41e1] hover:underline px-1"
          >
            Reset
          </button>
        </div>
      </div>

      {/* AI Search Bar */}
      <div className="px-3 sm:px-4 mb-2.5">
        <div className="relative flex items-center w-full">
          <span className="absolute left-3 text-[#4b41e1] flex items-center justify-center pointer-events-none">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Try: Microsoft Fabric events in Bengaluru"
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white border border-[#dce9ff] text-xs sm:text-sm text-[#0b1c30] placeholder:text-[#76777d] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4b41e1] focus:border-transparent transition-all"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 w-6 h-6 flex items-center justify-center rounded-full text-[#76777d] hover:bg-[#eff4ff]"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          ) : (
            <button
              title="Voice search simulator"
              onClick={() => setSearchQuery('Microsoft Fabric')}
              className="absolute right-3 w-6 h-6 flex items-center justify-center rounded-full text-[#45464d] hover:text-[#4b41e1]"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
          )}
        </div>
      </div>

      {/* City Hub Chips */}
      <div className="w-full overflow-x-auto no-scrollbar py-1.5 px-3 sm:px-4 flex items-center gap-2">
        <button
          onClick={() => onSelectCityFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 ${
            cityFilter === 'all'
              ? 'bg-[#0b1c30] text-white shadow-xs'
              : 'bg-white text-[#0b1c30] hover:bg-[#eff4ff] border border-[#e5eeff]'
          }`}
        >
          <span>All Hubs</span>
        </button>

        <button
          onClick={() => onSelectCityFilter('blr')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 ${
            cityFilter === 'blr'
              ? 'bg-[#4b41e1] text-white shadow-sm shadow-[#4b41e1]/20'
              : 'bg-white text-[#0b1c30] hover:bg-[#eff4ff] border border-[#e5eeff]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#68dba9]"></span>
          <span>Bengaluru</span>
        </button>

        <button
          onClick={() => onSelectCityFilter('maa')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 ${
            cityFilter === 'maa'
              ? 'bg-[#4b41e1] text-white shadow-sm shadow-[#4b41e1]/20'
              : 'bg-white text-[#0b1c30] hover:bg-[#eff4ff] border border-[#e5eeff]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#645efb]"></span>
          <span>Chennai</span>
        </button>
      </div>

      {/* Quick Filter Chips (Horizontal) */}
      <div className="w-full overflow-x-auto no-scrollbar pb-3 px-3 sm:px-4 flex items-center gap-1.5">
        <button
          onClick={() => setStrongMatchOnly(!strongMatchOnly)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            strongMatchOnly
              ? 'bg-[#4b41e1] text-white shadow-xs'
              : 'bg-[#e2dfff] text-[#3323cc] hover:bg-[#d3e4fe]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">bolt</span>
          <span>Strong Match Only</span>
        </button>

        <button
          onClick={() => setThisWeekendOnly(!thisWeekendOnly)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
            thisWeekendOnly
              ? 'bg-[#0b1c30] text-white shadow-xs'
              : 'bg-white text-[#45464d] hover:bg-[#eff4ff] border border-[#e5eeff]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">event</span>
          <span>This Weekend</span>
        </button>

        <button
          onClick={() => setCategoryFilter(categoryFilter === 'AI' ? null : 'AI')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
            categoryFilter === 'AI'
              ? 'bg-[#0b1c30] text-white shadow-xs'
              : 'bg-white text-[#45464d] hover:bg-[#eff4ff] border border-[#e5eeff]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">psychology</span>
          <span>Generative AI</span>
        </button>

        <button
          onClick={() => setCategoryFilter(categoryFilter === 'Cloud' ? null : 'Cloud')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
            categoryFilter === 'Cloud'
              ? 'bg-[#0b1c30] text-white shadow-xs'
              : 'bg-white text-[#45464d] hover:bg-[#eff4ff] border border-[#e5eeff]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">cloud</span>
          <span>Cloud &amp; Ops</span>
        </button>
      </div>

      {/* Results Header Status */}
      <div className="px-3 sm:px-4 py-1 flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs text-[#0b1c30] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#4b41e1]"></span>
          <span>
            Showing <strong className="font-bold text-[#4b41e1]">{filteredEvents.length} verified tech events</strong> for you
          </span>
        </div>
        <button
          onClick={() => setStrongMatchOnly(!strongMatchOnly)}
          className="flex items-center gap-1 text-xs text-[#45464d] hover:text-[#4b41e1] font-semibold"
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span>Filter</span>
        </button>
      </div>

      {/* Event Cards (List or Grid) */}
      <div
        className={`px-3 sm:px-4 ${
          layoutMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
            : 'flex flex-col gap-3.5'
        }`}
      >
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#e5eeff] my-4">
            <span className="material-symbols-outlined text-4xl text-[#76777d] mb-2">search_off</span>
            <p className="text-sm font-bold text-[#0b1c30]">No matching events found</p>
            <p className="text-xs text-[#45464d] mt-1 max-w-xs mx-auto">
              Try adjusting your search terms or reset filters to see all upcoming meetups.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-[#4b41e1] text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const isSaved = bookmarkedEventIds.has(event.id);

            return (
              <article
                key={event.id}
                className="flex flex-col rounded-2xl bg-white p-3.5 sm:p-4 shadow-sm hover:shadow-md border border-[#e5eeff] transition-all duration-200"
              >
                {/* Top Badges & Match Score */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#45464d] text-[10px] font-semibold">
                      {event.hub === 'blr' ? 'Bengaluru' : 'Chennai Hub'}
                    </span>
                    {event.verified && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#069669] text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[12px]">verified</span> Verified
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        event.priceType === 'paid'
                          ? 'bg-[#e2dfff] text-[#3323cc]'
                          : event.priceType === 'invite'
                          ? 'bg-[#f8f9ff] text-[#45464d] border border-[#e5eeff]'
                          : 'bg-[#eff4ff] text-[#0b1c30]'
                      }`}
                    >
                      {event.priceLabel}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] font-['Plus_Jakarta_Sans'] font-bold text-xs">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    <span>{event.matchScore}% Match</span>
                  </span>
                </div>

                {/* Content Row: Image + Title + Info */}
                <div className="flex items-start gap-3">
                  <div
                    onClick={() => onOpenEventDetail(event)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#e5eeff] flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      onClick={() => onOpenEventDetail(event)}
                      className="font-['Plus_Jakarta_Sans'] font-bold text-sm sm:text-base text-[#0b1c30] leading-snug hover:text-[#4b41e1] transition-colors cursor-pointer line-clamp-2"
                    >
                      {event.title}
                    </h3>
                    <p className="text-[11px] text-[#45464d] flex items-center gap-1 mt-1 truncate">
                      <span className="material-symbols-outlined text-[14px] text-[#76777d]">location_on</span>
                      <span>{event.venueName}, {event.area}</span>
                    </p>
                  </div>
                </div>

                {/* Date & Capacity info */}
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#f8f9ff] text-xs">
                  <div className="flex items-center gap-1.5 text-[#0b1c30] font-medium text-[11px]">
                    <span className="material-symbols-outlined text-[15px] text-[#4b41e1]">calendar_today</span>
                    <span>
                      {event.dayOfWeek}, {event.dateStr.split(',')[1]?.split(' ')[1] || 'Sep'} {event.dayOfMonth} · {event.timeRange.split('–')[0]}
                    </span>
                  </div>

                  <span className={`text-[11px] font-semibold ${event.spotsLeft < 10 ? 'text-[#ba1a1a]' : 'text-[#45464d]'}`}>
                    {event.spotsLeft < 10 ? `Only ${event.spotsLeft} Passes Left` : `${event.spotsLeft} Seats Left`}
                  </span>
                </div>

                {/* Why match rationale */}
                <p className="text-[11px] text-[#45464d] mt-2 line-clamp-2 leading-relaxed bg-[#f8f9ff] p-2 rounded-xl border border-[#eff4ff]">
                  <strong className="text-[#0b1c30]">Why match:</strong> {event.matchReason}
                </p>

                {/* Perks or Social Proof if present */}
                {event.peerAttendees ? (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {event.peerAttendees.initials.slice(0, 3).map((init, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full bg-[#4b41e1] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white"
                        >
                          {init}
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] text-[#45464d] font-medium">
                      +{event.peerAttendees.count} peers going
                    </span>
                  </div>
                ) : event.perks ? (
                  <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#069669] font-medium truncate">
                    <span className="material-symbols-outlined text-[14px]">local_cafe</span>
                    <span className="truncate">{event.perks}</span>
                  </div>
                ) : null}

                {/* Bottom Actions */}
                <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-[#e5eeff]">
                  <button
                    onClick={() => onToggleBookmark(event.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#45464d] hover:text-[#4b41e1] hover:bg-[#eff4ff] transition-colors"
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={isSaved ? { fontVariationSettings: "'FILL' 1", color: '#4b41e1' } : undefined}
                    >
                      {isSaved ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenEventDetail(event)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onOpenRsvp(event)}
                      className="px-4 py-1.5 rounded-xl bg-[#4b41e1] text-white text-xs font-semibold hover:bg-[#3323cc] active:scale-98 transition-all shadow-xs"
                    >
                      {event.priceType === 'paid'
                        ? 'Get Ticket'
                        : event.priceType === 'invite'
                        ? 'Request Pass'
                        : event.priceType === 'hackathon'
                        ? 'Apply Team'
                        : 'RSVP Free'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Suggest Meetup Callout Box (from Image 10.png) */}
      <div className="px-3 sm:px-4 mt-8">
        <div className="p-5 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#4b41e1] mb-2.5">
            <span className="material-symbols-outlined text-[26px]">map</span>
          </div>
          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
            Can't find what you're looking for?
          </h3>
          <p className="text-xs text-[#45464d] max-w-sm mt-1 leading-relaxed">
            Suggest a tech meetup in your tech park, or toggle between Bengaluru and Chennai to view regional live streams.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <button
              onClick={onOpenSuggestMeetup}
              className="px-4 py-2 rounded-xl bg-white text-[#0b1c30] font-semibold text-xs border border-[#e5eeff] hover:bg-[#f8f9ff] active:scale-98 transition-all shadow-xs"
            >
              Suggest Meetup
            </button>
            <button
              onClick={() => onSelectCityFilter('all')}
              className="px-4 py-2 rounded-xl bg-[#4b41e1] text-white font-semibold text-xs hover:bg-[#3323cc] active:scale-98 transition-all shadow-sm"
            >
              Expand City Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
