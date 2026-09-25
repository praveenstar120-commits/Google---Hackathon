import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TechEvent } from '../types';

interface RegistrationModalProps {
  event: TechEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmRegistration: (eventId: string) => void;
  isAlreadyRegistered?: boolean;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  event,
  isOpen,
  onClose,
  onConfirmRegistration,
  isAlreadyRegistered = false,
}) => {
  const [attendeeName, setAttendeeName] = useState('Praveen Star');
  const [attendeeEmail, setAttendeeEmail] = useState('praveenstar120@gmail.com');
  const [attendeeRole, setAttendeeRole] = useState('Staff Solutions Architect');
  const [orgName, setOrgName] = useState('Enterprise AI Solutions');
  const [isSuccess, setIsSuccess] = useState(isAlreadyRegistered);
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Sync isSuccess when modal opens or event changes
  useEffect(() => {
    setIsSuccess(isAlreadyRegistered);
  }, [isAlreadyRegistered, event?.id, isOpen]);

  // Subtle confetti burst function tailored to brand colors
  const triggerSubtleConfetti = () => {
    try {
      // First gentle burst
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.4 },
        colors: ['#4b41e1', '#85f8c4', '#645efb', '#069669', '#38bdf8', '#fbbf24'],
        scalar: 0.85,
        ticks: 160,
        gravity: 1.1,
        disableForReducedMotion: true,
      });

      // Side sparkle secondary burst
      setTimeout(() => {
        confetti({
          particleCount: 20,
          angle: 60,
          spread: 45,
          origin: { x: 0.35, y: 0.45 },
          colors: ['#85f8c4', '#4b41e1', '#645efb'],
          scalar: 0.7,
          ticks: 120,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 20,
          angle: 120,
          spread: 45,
          origin: { x: 0.65, y: 0.45 },
          colors: ['#85f8c4', '#4b41e1', '#645efb'],
          scalar: 0.7,
          ticks: 120,
          disableForReducedMotion: true,
        });
      }, 150);
    } catch {
      // fallback gracefully if canvas is blocked
    }
  };

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setAnimationKey((prev) => prev + 1);
      onConfirmRegistration(event.id);
      triggerSubtleConfetti();
    }, 600);
  };

  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TechPulse India//Tech Calendar//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.matchReason} Organizer: ${event.organizer}
LOCATION:${event.venueName}, ${event.fullAddress}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e5eeff] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#e5eeff] bg-gradient-to-r from-[#eff4ff] to-[#f8f9ff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#4b41e1] text-white flex items-center justify-center font-bold text-sm">
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
            </span>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                {isSuccess ? 'Registration Confirmed!' : 'Fast-Track RSVP'}
              </h3>
              <p className="text-[11px] text-[#45464d] truncate max-w-[260px]">
                {event.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#45464d] hover:bg-[#e5eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="flex flex-col items-center text-center py-3">
              {/* Subtle Confetti & Animated SVG Checkmark */}
              <div key={animationKey} className="relative flex items-center justify-center mb-3">
                {/* Glow ring */}
                <div className="w-20 h-20 rounded-full bg-[#85f8c4]/25 animate-checkmark-pulse flex items-center justify-center shadow-sm">
                  {/* SVG Animated Checkmark with Stroke Draw */}
                  <svg className="w-14 h-14" viewBox="0 0 52 52">
                    {/* Circle outline animation */}
                    <circle
                      className="animate-checkmark-circle text-[#069669]"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      cx="26"
                      cy="26"
                      r="23"
                    />
                    {/* Check icon path animation */}
                    <path
                      className="animate-checkmark-check text-[#069669]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.5 27l8 8 16-17"
                    />
                  </svg>
                </div>

                {/* Micro Celebration Sparkle trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setAnimationKey((prev) => prev + 1);
                    triggerSubtleConfetti();
                  }}
                  title="Replay celebration"
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#e2dfff] text-[#3323cc] hover:bg-[#d3e4fe] flex items-center justify-center text-[12px] shadow-xs active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">celebration</span>
                </button>
              </div>

              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#0b1c30]">
                You're On The Guestlist!
              </h4>
              <p className="text-xs text-[#45464d] mt-1 max-w-xs">
                Pass confirmed for <strong className="text-[#0b1c30]">{attendeeName}</strong>. An encrypted entry pass was synced to <strong className="text-[#0b1c30]">{attendeeEmail}</strong>.
              </p>

              {/* Digital Pass Card */}
              <div className="w-full mt-4 p-4 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] text-left">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[#4b41e1]">
                      Verified Attendee Pass
                    </span>
                    <h5 className="font-bold text-xs text-[#0b1c30] mt-0.5">
                      {event.title}
                    </h5>
                    <p className="text-[11px] text-[#45464d] mt-1">
                      📍 {event.venueName}
                    </p>
                    <p className="text-[11px] font-mono text-[#0b1c30] mt-0.5">
                      📅 {event.dateStr} · {event.timeRange}
                    </p>
                  </div>
                  {/* QR code visual representation */}
                  <div className="w-16 h-16 bg-white p-1 rounded-lg border border-[#e5eeff] flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-[#0b1c30] text-[36px]">
                      qr_code_2
                    </span>
                    <span className="text-[8px] font-mono text-[#45464d]">#TP-{event.id.slice(0, 4).toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col w-full gap-2 mt-5">
                <button
                  onClick={handleDownloadCalendar}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#4b41e1] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#3323cc] active:scale-98 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                  <span>Add to Calendar (.ics / Google)</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 px-4 rounded-xl bg-[#eff4ff] text-[#0b1c30] font-semibold text-xs hover:bg-[#e5eeff] transition-colors"
                >
                  Back to Event
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Event mini summary */}
              <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex items-center gap-1.5 text-xs text-[#4b41e1] font-bold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>{event.priceLabel} · {event.spotsLeft} Spots Remaining</span>
                </div>
                <p className="text-xs text-[#0b1c30] font-medium mt-1">
                  📅 {event.dateStr}
                </p>
                <p className="text-[11px] text-[#45464d] truncate">
                  🏢 {event.venueName}, {event.area}
                </p>
              </div>

              {/* Form fields */}
              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#f8f9ff] border border-[#e5eeff] focus:outline-none focus:ring-2 focus:ring-[#4b41e1]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                  Work / Developer Email
                </label>
                <input
                  type="email"
                  required
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#f8f9ff] border border-[#e5eeff] focus:outline-none focus:ring-2 focus:ring-[#4b41e1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                    Current Role
                  </label>
                  <input
                    type="text"
                    value={attendeeRole}
                    onChange={(e) => setAttendeeRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#f8f9ff] border border-[#e5eeff] focus:outline-none focus:ring-2 focus:ring-[#4b41e1]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                    Company / Org
                  </label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#f8f9ff] border border-[#e5eeff] focus:outline-none focus:ring-2 focus:ring-[#4b41e1]"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f8f9ff] border border-[#e5eeff] flex items-start gap-2 mt-1">
                <span className="material-symbols-outlined text-[#069669] text-[18px] flex-shrink-0">
                  check_circle
                </span>
                <p className="text-[11px] text-[#45464d] leading-tight">
                  Auto-verification enabled via official provider: <strong className="text-[#0b1c30]">{event.registrationProvider}</strong>. No waitlist delays.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#4b41e1] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#3323cc] active:scale-98 transition-all shadow-md shadow-[#4b41e1]/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      sync
                    </span>
                    <span>Reserving Seat...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm RSVP ({event.priceLabel})</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
