import React, { useState } from 'react';
import { TechEvent } from '../types';
import { APP_LOGO_URL, USER_AVATAR_URL } from '../data/mockEvents';

interface EventDetailViewProps {
  event: TechEvent;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (eventId: string) => void;
  onOpenRsvp: (event: TechEvent) => void;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  event,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onOpenRsvp,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [joinedChat, setJoinedChat] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `${event.title} at ${event.venueName} on ${event.dateStr}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.matchReason}\n\nOrganizer: ${event.organizer}`);
    const location = encodeURIComponent(`${event.venueName}, ${event.fullAddress}`);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="flex flex-col w-full bg-[#f8f9ff] min-h-screen pb-24 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#131b2e] text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#85f8c4]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header Row (Back, Title, Bookmark, Avatar) */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-3 sm:px-4 h-14 flex items-center justify-between border-b border-[#e5eeff]">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#0b1c30] hover:bg-[#eff4ff] active:scale-95 transition-all"
            aria-label="Back to events"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <img
            src={APP_LOGO_URL}
            alt="TechPulse Logo"
            className="w-6 h-6 object-contain rounded"
          />
          <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
            Event Detail
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToggleBookmark(event.id)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#45464d] hover:bg-[#eff4ff] transition-colors"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={isBookmarked ? { fontVariationSettings: "'FILL' 1", color: '#4b41e1' } : undefined}
            >
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
          <img
            src={USER_AVATAR_URL}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-[#e5eeff]"
          />
        </div>
      </div>

      {/* Hero Media Section with LIVE EVENT FEED */}
      <div className="relative w-full h-56 sm:h-64 bg-[#131b2e] overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover opacity-85"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-transparent to-black/60"></div>

        {/* Live event feed badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#85f8c4] animate-pulse"></span>
          <span>LIVE EVENT FEED</span>
        </div>

        {/* Share & Bookmark Floating Overlays */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
            aria-label="Share"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button
            onClick={() => onToggleBookmark(event.id)}
            className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
            aria-label="Bookmark"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={isBookmarked ? { fontVariationSettings: "'FILL' 1", color: '#85f8c4' } : undefined}
            >
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
        </div>

        {/* Live headline pill at bottom of hero */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white text-xs">
          <span className="truncate opacity-90 font-medium">
            {event.liveFeedHeadline || `${event.totalSeats} capacity · Hands-on breakout pods`}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#4b41e1] text-white font-mono text-[10px] font-bold">
            BLR REACTOR
          </span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="px-3 sm:px-4 py-3 flex flex-col gap-4 max-w-2xl mx-auto w-full">
        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="px-2.5 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs font-semibold">
            Community Meetup
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#0f0069] text-xs font-semibold">
            Registration Open
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#85f8c4]/30 text-[#069669] text-xs font-bold">
            Free Entry
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[#069669] text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>Verified</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xl sm:text-2xl text-[#0b1c30] leading-tight">
          {event.title}
        </h2>

        {/* Organizer Lockup */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e5eeff] shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#131b2e] text-white font-bold text-base flex items-center justify-center flex-shrink-0">
              {event.organizerLogo || 'M'}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs sm:text-sm text-[#0b1c30] truncate">
                  {event.organizer}
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#4b41e1] flex-shrink-0">
                  verified
                </span>
              </div>
              <p className="text-[11px] text-[#45464d] truncate">
                Bengaluru Data Platform Group
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsFollowing(!isFollowing);
              showToast(isFollowing ? 'Unfollowed community updates' : 'Following community updates!');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 flex-shrink-0 ${
              isFollowing
                ? 'bg-[#eff4ff] text-[#4b41e1]'
                : 'bg-[#4b41e1] text-white hover:bg-[#3323cc]'
            }`}
          >
            <span>{isFollowing ? 'Following' : '+ Follow'}</span>
          </button>
        </div>

        {/* SECTION 1: Logistics & Venue Intelligence */}
        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#4b41e1]">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
              Logistics &amp; Venue Intelligence
            </h3>
          </div>

          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#eff4ff] text-[#4b41e1] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">event</span>
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                {event.dateStr}
              </p>
              <p className="text-xs text-[#45464d] mt-0.5 font-mono">
                {event.timeRange} · IST (GMT+5:30)
              </p>
              <button
                onClick={handleAddToCalendar}
                className="mt-1 text-xs text-[#4b41e1] font-semibold hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">calendar_add_on</span>
                <span>Add to Google / Outlook Calendar</span>
              </button>
            </div>
          </div>

          {/* In-Person Capacity & Progress */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#eff4ff] text-[#4b41e1] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                  In-Person Experience
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
                  {event.spotsLeft} Spots Left
                </span>
              </div>
              <p className="text-xs text-[#45464d] mt-0.5">
                Capped strictly at {event.totalSeats} attendees for hands-on breakouts.
              </p>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-[#eff4ff] rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4b41e1] to-[#645efb] rounded-full"
                  style={{ width: `${Math.round(((event.totalSeats - event.spotsLeft) / event.totalSeats) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Venue & Map Card */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#eff4ff] text-[#4b41e1] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">apartment</span>
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                {event.venueName}
              </p>
              <p className="text-xs text-[#45464d] mt-0.5 leading-relaxed">
                {event.fullAddress}
              </p>

              {/* Map Preview Card from Screenshot */}
              <div className="mt-3 p-3 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4b41e1] text-[18px]">
                    directions_subway
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#0b1c30]">
                      Bengaluru
                    </p>
                    <p className="text-[11px] text-[#45464d]">
                      {event.metroNearby || 'Near Vidhana Soudha Metro'}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${event.venueName} ${event.fullAddress}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#4b41e1] hover:underline flex items-center gap-0.5"
                >
                  <span>Directions</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Featured Speakers (2 Sessions) */}
        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#4b41e1]">
              <span className="material-symbols-outlined text-[20px]">co_present</span>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
                Featured Speakers
              </h3>
            </div>
            <span className="text-xs text-[#45464d] font-medium">
              {event.speakers.length} Sessions
            </span>
          </div>

          <div className="flex flex-col gap-4 mt-1">
            {event.speakers.map((spk, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-xl bg-[#f8f9ff] border border-[#eff4ff]"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#e5eeff] flex-shrink-0 shadow-xs ring-2 ring-white">
                  <img
                    src={spk.avatarUrl}
                    alt={spk.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = USER_AVATAR_URL;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
                      {spk.name}
                    </h4>
                    <span className="px-1.5 py-0.2 rounded bg-[#e2dfff] text-[#3323cc] text-[10px] font-semibold">
                      Speaker
                    </span>
                  </div>
                  <p className="text-xs text-[#4b41e1] font-medium mt-0.5">
                    {spk.role} · {spk.company}
                  </p>
                  {spk.sessionTopic && (
                    <p className="text-xs text-[#45464d] mt-1 bg-white p-2 rounded-lg border border-[#e5eeff]">
                      {spk.sessionTopic}
                    </p>
                  )}
                  {spk.bio && (
                    <p className="text-[11px] text-[#76777d] mt-1 line-clamp-2">
                      {spk.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Data Provenance & Verification */}
        <div className="p-4 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#4b41e1]">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#0b1c30]">
              Data Provenance &amp; Verification
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div>
              <span className="text-[#45464d] text-[11px]">Official Source:</span>
              <p className="font-bold text-[#0b1c30] truncate">{event.officialSource}</p>
            </div>
            <div>
              <span className="text-[#45464d] text-[11px]">Registration Provider:</span>
              <p className="font-bold text-[#0b1c30] truncate">{event.registrationProvider}</p>
            </div>
          </div>

          <div className="pt-1 text-[11px] flex items-center justify-between border-t border-[#dce9ff]/60">
            <span className="text-[#45464d]">Last Verified:</span>
            <span className="font-mono text-[#069669] font-semibold">
              {event.lastVerifiedTime}
            </span>
          </div>
        </div>

        {/* SECTION 4: Meetup Attendee Channel */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#4b41e1] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">forum</span>
            </div>
            <div>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#0b1c30]">
                Meetup Attendee Channel
              </h4>
              <p className="text-[11px] text-[#45464d]">
                {event.discussionAttendeeCount || 42} engineers already discussing topics
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setJoinedChat(!joinedChat);
              showToast(joinedChat ? 'Left attendee channel' : 'Joined WhatsApp & Discord discussion pod!');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              joinedChat
                ? 'bg-[#eff4ff] text-[#4b41e1]'
                : 'bg-[#4b41e1] text-white hover:bg-[#3323cc]'
            }`}
          >
            {joinedChat ? 'Connected' : 'Join'}
          </button>
        </div>
      </div>

      {/* Sticky Bottom Action Bar (Exact from Screenshot Image 6.jpeg) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#e5eeff] px-4 py-3 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}
      >
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          {/* Price & spots indicator */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
                {event.priceLabel.toUpperCase()}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#069669]"></span>
            </div>
            <p className="text-[11px] text-[#45464d] truncate">
              Only {event.spotsLeft} spots left · Free RSVP
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(event.id)}
              className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#45464d] hover:text-[#4b41e1] transition-colors"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isBookmarked ? { fontVariationSettings: "'FILL' 1", color: '#4b41e1' } : undefined}
              >
                {isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>

            <button
              onClick={() => onOpenRsvp(event)}
              className="px-5 py-2.5 rounded-xl bg-[#4b41e1] text-white font-['Plus_Jakarta_Sans'] font-bold text-xs flex items-center gap-1.5 hover:bg-[#3323cc] active:scale-98 transition-all shadow-md shadow-[#4b41e1]/25"
            >
              <span>Register Now</span>
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
