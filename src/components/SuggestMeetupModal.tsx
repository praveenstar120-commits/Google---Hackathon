import React, { useState } from 'react';

interface SuggestMeetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const SuggestMeetupModal: React.FC<SuggestMeetupModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [eventName, setEventName] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [city, setCity] = useState<'blr' | 'maa'>('blr');
  const [techPark, setTechPark] = useState('');
  const [lumaLink, setLumaLink] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ eventName, organizer, city, techPark, lumaLink });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-[#e5eeff]">
        <div className="p-4 border-b border-[#e5eeff] bg-[#eff4ff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4b41e1] text-[20px]">
              add_location_alt
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
              Suggest a Tech Meetup / Hub
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#45464d] hover:bg-[#e5eeff]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-4">
          {submitted ? (
            <div className="text-center py-6">
              <span className="material-symbols-outlined text-4xl text-[#069669] mb-2">
                check_circle
              </span>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                Community Submitted!
              </h4>
              <p className="text-xs text-[#45464d] mt-1">
                Our autonomous crawler will verify the event details and sync the agenda within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                  Meetup / Conference Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LangChain Bengaluru Hands-on"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#f8f9ff] border border-[#e5eeff] focus:outline-none focus:ring-2 focus:ring-[#4b41e1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                    City Hub
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#f8f9ff] border border-[#e5eeff] focus:outline-none focus:ring-2 focus:ring-[#4b41e1]"
                  >
                    <option value="blr">Bengaluru (BLR)</option>
                    <option value="maa">Chennai (MAA)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                    Tech Park / Venue
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bagmane / Taramani"
                    value={techPark}
                    onChange={(e) => setTechPark(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#f8f9ff] border border-[#e5eeff] focus:outline-none focus:ring-2 focus:ring-[#4b41e1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                  Registration URL (Luma, Guild, Devfolio, Meetup)
                </label>
                <input
                  type="url"
                  placeholder="https://lu.ma/..."
                  value={lumaLink}
                  onChange={(e) => setLumaLink(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#f8f9ff] border border-[#e5eeff] focus:outline-none focus:ring-2 focus:ring-[#4b41e1]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#4b41e1] text-white font-semibold text-xs hover:bg-[#3323cc] active:scale-98 transition-all shadow-sm"
              >
                Submit for Instant AI Verification
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
