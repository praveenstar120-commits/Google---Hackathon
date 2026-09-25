import React, { useState } from 'react';
import { TechEvent } from '../types';
import { USER_AVATAR_URL } from '../data/mockEvents';

interface MoreViewProps {
  events: TechEvent[];
  bookmarkedEventIds: Set<string>;
  registeredEventIds: Set<string>;
  onOpenEventDetail: (event: TechEvent) => void;
  onToggleBookmark: (eventId: string) => void;
  onOpenSuggestMeetup: () => void;
}

export const MoreView: React.FC<MoreViewProps> = ({
  events,
  bookmarkedEventIds,
  registeredEventIds,
  onOpenEventDetail,
  onToggleBookmark,
  onOpenSuggestMeetup,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'registered' | 'saved' | 'topics' | 'settings'>('registered');
  const [trackedTopics, setTrackedTopics] = useState<string[]>([
    'Agentic AI Workflows',
    'INT4 / FP8 Quantization',
    'Vector Search & RAG',
    'Microsoft Fabric & Lakehouse',
    'Semantic Kernel',
    'AWS Bedrock',
  ]);
  const [newTopicInput, setNewTopicInput] = useState('');

  const registeredEvents = events.filter((e) => registeredEventIds.has(e.id));
  const savedEvents = events.filter((e) => bookmarkedEventIds.has(e.id));

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopicInput.trim() && !trackedTopics.includes(newTopicInput.trim())) {
      setTrackedTopics([...trackedTopics, newTopicInput.trim()]);
      setNewTopicInput('');
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setTrackedTopics(trackedTopics.filter((t) => t !== topic));
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Profile Card */}
      <div className="px-3 sm:px-4 pt-3 pb-2">
        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={USER_AVATAR_URL}
              alt="Praveen Star"
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#e5eeff]"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                  Praveen Star
                </h2>
                <span className="material-symbols-outlined text-[#4b41e1] text-[16px]">verified</span>
              </div>
              <p className="text-xs text-[#4b41e1] font-medium">
                Staff Solutions Architect
              </p>
              <p className="text-[11px] text-[#45464d] truncate">
                praveenstar120@gmail.com · BLR Corridor
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="px-2 py-0.5 rounded-full bg-[#85f8c4]/30 text-[#069669] text-[10px] font-bold">
              Active Member
            </span>
          </div>
        </div>
      </div>

      {/* Subtabs Toolbar */}
      <div className="w-full overflow-x-auto no-scrollbar px-3 sm:px-4 py-2 flex items-center gap-1.5 border-b border-[#e5eeff]">
        {[
          { key: 'registered', label: `My Passes (${registeredEvents.length})`, icon: 'confirmation_number' },
          { key: 'saved', label: `Saved (${savedEvents.length})`, icon: 'bookmark' },
          { key: 'topics', label: 'Tracked Topics', icon: 'tag' },
          { key: 'settings', label: 'Preferences', icon: 'settings' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSubTab(tab.key as any)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === tab.key
                ? 'bg-[#4b41e1] text-white shadow-xs'
                : 'bg-white text-[#45464d] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content depending on subtab */}
      <div className="px-3 sm:px-4 pt-3">
        {activeSubTab === 'registered' && (
          <div className="flex flex-col gap-3">
            {registeredEvents.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#e5eeff]">
                <span className="material-symbols-outlined text-4xl text-[#76777d] mb-1">
                  confirmation_number
                </span>
                <p className="text-xs font-bold text-[#0b1c30]">No active passes yet</p>
                <p className="text-[11px] text-[#45464d] mt-1 max-w-xs mx-auto">
                  RSVP to Microsoft Fabric Meetup, AWS GenAI Immersion Day, or others to see your confirmed QR passes here.
                </p>
              </div>
            ) : (
              registeredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-sm flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <span className="px-2 py-0.5 rounded-full bg-[#85f8c4]/30 text-[#069669] text-[10px] font-bold uppercase">
                      Confirmed Entry Pass
                    </span>
                    <h4
                      onClick={() => onOpenEventDetail(event)}
                      className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30] hover:text-[#4b41e1] cursor-pointer mt-1"
                    >
                      {event.title}
                    </h4>
                    <p className="text-xs text-[#45464d] mt-0.5">
                      📍 {event.venueName}
                    </p>
                    <p className="text-xs font-mono text-[#0b1c30] mt-1">
                      📅 {event.dateStr} · {event.timeRange}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-[#eff4ff] p-1 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border border-[#dce9ff]">
                    <span className="material-symbols-outlined text-[#0b1c30] text-[32px]">
                      qr_code_2
                    </span>
                    <span className="text-[8px] font-mono text-[#45464d]">#PASS</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeSubTab === 'saved' && (
          <div className="flex flex-col gap-3">
            {savedEvents.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#e5eeff]">
                <span className="material-symbols-outlined text-4xl text-[#76777d] mb-1">
                  bookmark_border
                </span>
                <p className="text-xs font-bold text-[#0b1c30]">No saved events</p>
                <p className="text-[11px] text-[#45464d] mt-1">
                  Click the bookmark button on any event card to save it for later.
                </p>
              </div>
            ) : (
              savedEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3.5 rounded-2xl bg-white border border-[#e5eeff] shadow-sm flex items-center justify-between gap-2"
                >
                  <div
                    onClick={() => onOpenEventDetail(event)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <span className="text-[10px] font-semibold text-[#4b41e1]">
                      {event.dayOfWeek} · {event.area}
                    </span>
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xs sm:text-sm text-[#0b1c30] truncate">
                      {event.title}
                    </h4>
                    <p className="text-[11px] text-[#45464d]">
                      {event.venueName}
                    </p>
                  </div>
                  <button
                    onClick={() => onToggleBookmark(event.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeSubTab === 'topics' && (
          <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-3">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
                AI Affinity Tuning
              </h3>
              <p className="text-xs text-[#45464d] mt-0.5">
                The discovery crawler matches tech meetups against these tracked focus areas.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {trackedTopics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[#0b1c30] text-xs font-medium border border-[#dce9ff]"
                >
                  <span>{topic}</span>
                  <button
                    onClick={() => handleRemoveTopic(topic)}
                    className="text-[#76777d] hover:text-[#ba1a1a]"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddTopic} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newTopicInput}
                onChange={(e) => setNewTopicInput(e.target.value)}
                placeholder="Add skill or tech (e.g. LangGraph, Triton)..."
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#f8f9ff] border border-[#e5eeff] focus:outline-none focus:ring-2 focus:ring-[#4b41e1]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#4b41e1] text-white text-xs font-semibold rounded-xl hover:bg-[#3323cc] transition-colors"
              >
                Add Topic
              </button>
            </form>
          </div>
        )}

        {activeSubTab === 'settings' && (
          <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-3 text-xs">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
              Notification Preferences
            </h3>
            <label className="flex items-center justify-between p-2 rounded-xl bg-[#f8f9ff]">
              <span>Real-time Discord &amp; WhatsApp Meetup Alerts</span>
              <input type="checkbox" defaultChecked className="accent-[#4b41e1] w-4 h-4" />
            </label>
            <label className="flex items-center justify-between p-2 rounded-xl bg-[#f8f9ff]">
              <span>Silk Board / ORR Commute Buffer Notifications</span>
              <input type="checkbox" defaultChecked className="accent-[#4b41e1] w-4 h-4" />
            </label>
            <label className="flex items-center justify-between p-2 rounded-xl bg-[#f8f9ff]">
              <span>Weekly AI Executive Digest Email</span>
              <input type="checkbox" defaultChecked className="accent-[#4b41e1] w-4 h-4" />
            </label>

            <button
              onClick={onOpenSuggestMeetup}
              className="mt-3 w-full py-2.5 px-4 rounded-xl bg-[#eff4ff] text-[#4b41e1] font-semibold text-xs border border-[#dce9ff] hover:bg-[#e5eeff] transition-colors"
            >
              + Suggest a Community or Venue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
