/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CityFilter, TabType, TechEvent } from './types';
import { MOCK_EVENTS } from './data/mockEvents';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { NotificationsModal } from './components/NotificationsModal';
import { RegistrationModal } from './components/RegistrationModal';
import { SuggestMeetupModal } from './components/SuggestMeetupModal';

import { DashboardView } from './views/DashboardView';
import { ExploreEventsView } from './views/ExploreEventsView';
import { CalendarView } from './views/CalendarView';
import { EventDetailView } from './views/EventDetailView';
import { CompaniesView } from './views/CompaniesView';
import { DigestView } from './views/DigestView';
import { MoreView } from './views/MoreView';

export default function App() {
  const [events, setEvents] = useState<TechEvent[]>(MOCK_EVENTS);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [cityFilter, setCityFilter] = useState<CityFilter>('all');
  const [selectedEvent, setSelectedEvent] = useState<TechEvent | null>(null);

  // User interactions state
  const [bookmarkedEventIds, setBookmarkedEventIds] = useState<Set<string>>(
    new Set(['microsoft-fabric-agentic-ai'])
  );
  const [registeredEventIds, setRegisteredEventIds] = useState<Set<string>>(
    new Set(['aws-genai-immersion-day'])
  );

  // Modals state
  const [rsvpModalEvent, setRsvpModalEvent] = useState<TechEvent | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);

  // Desktop view width toggle (mobile device frame vs wide responsive)
  const [isDesktopPreviewWide, setIsDesktopPreviewWide] = useState(false);

  // Handle bookmark toggle
  const handleToggleBookmark = (eventId: string) => {
    setBookmarkedEventIds((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  // Handle registration confirm
  const handleConfirmRegistration = (eventId: string) => {
    setRegisteredEventIds((prev) => new Set(prev).add(eventId));
  };

  // Tab labels for top header
  const getTabLabel = (tab: TabType): string => {
    switch (tab) {
      case 'dashboard':
        return 'Dashboard';
      case 'explore-events':
        return 'Explore Events';
      case 'tech-calendar':
        return 'Tech Calendar';
      case 'companies-directory':
        return 'Tech Hubs & Campuses';
      case 'ai-digest':
        return 'AI Digest';
      case 'quick-menu':
        return 'Account & Settings';
      default:
        return 'Dashboard';
    }
  };

  // Navigation handlers
  const handleNavigateTab = (tab: TabType) => {
    setSelectedEvent(null);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEventDetail = (event: TechEvent) => {
    setSelectedEvent(event);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetail = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-[#eff4ff] text-[#0b1c30] flex flex-col items-center">
      {/* Container Frame: Responsive mobile frame on desktop, full-width on mobile */}
      <div
        className={`w-full min-h-screen bg-[#f8f9ff] flex flex-col relative transition-all duration-300 shadow-xl ${
          isDesktopPreviewWide ? 'max-w-4xl' : 'max-w-[430px]'
        }`}
      >
        {/* Top Header Bar (hidden in detail view as detail view has its own immersive header) */}
        {!selectedEvent && (
          <Header
            currentTabName={getTabLabel(activeTab)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenProfile={() => handleNavigateTab('quick-menu')}
            unreadCount={3}
            isDesktopPreviewWide={isDesktopPreviewWide}
            onToggleDesktopWidth={() => setIsDesktopPreviewWide(!isDesktopPreviewWide)}
          />
        )}

        {/* Main Scrollable Views */}
        <main className="flex-1 w-full flex flex-col">
          {selectedEvent ? (
            <EventDetailView
              event={selectedEvent}
              onBack={handleBackFromDetail}
              isBookmarked={bookmarkedEventIds.has(selectedEvent.id)}
              onToggleBookmark={handleToggleBookmark}
              onOpenRsvp={(ev) => setRsvpModalEvent(ev)}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardView
                  events={events}
                  cityFilter={cityFilter}
                  onSelectCityFilter={setCityFilter}
                  onNavigateTab={handleNavigateTab}
                  onOpenEventDetail={handleOpenEventDetail}
                  bookmarkedEventIds={bookmarkedEventIds}
                  onToggleBookmark={handleToggleBookmark}
                  onOpenRsvp={(ev) => setRsvpModalEvent(ev)}
                  onOpenAddHubModal={() => setIsSuggestModalOpen(true)}
                />
              )}

              {activeTab === 'explore-events' && (
                <ExploreEventsView
                  events={events}
                  cityFilter={cityFilter}
                  onSelectCityFilter={setCityFilter}
                  onOpenEventDetail={handleOpenEventDetail}
                  bookmarkedEventIds={bookmarkedEventIds}
                  onToggleBookmark={handleToggleBookmark}
                  onOpenRsvp={(ev) => setRsvpModalEvent(ev)}
                  onOpenSuggestMeetup={() => setIsSuggestModalOpen(true)}
                />
              )}

              {activeTab === 'tech-calendar' && (
                <CalendarView
                  events={events}
                  cityFilter={cityFilter}
                  onSelectCityFilter={setCityFilter}
                  onOpenEventDetail={handleOpenEventDetail}
                  bookmarkedEventIds={bookmarkedEventIds}
                  onToggleBookmark={handleToggleBookmark}
                  onOpenRsvp={(ev) => setRsvpModalEvent(ev)}
                />
              )}

              {activeTab === 'companies-directory' && (
                <CompaniesView
                  cityFilter={cityFilter}
                  onSelectCityFilter={setCityFilter}
                  onSelectHubEvents={(hubName) => {
                    handleNavigateTab('explore-events');
                  }}
                />
              )}

              {activeTab === 'ai-digest' && (
                <DigestView
                  events={events}
                  onOpenEventDetail={handleOpenEventDetail}
                />
              )}

              {activeTab === 'quick-menu' && (
                <MoreView
                  events={events}
                  bookmarkedEventIds={bookmarkedEventIds}
                  registeredEventIds={registeredEventIds}
                  onOpenEventDetail={handleOpenEventDetail}
                  onToggleBookmark={handleToggleBookmark}
                  onOpenSuggestMeetup={() => setIsSuggestModalOpen(true)}
                />
              )}
            </>
          )}
        </main>

        {/* Bottom Fixed Navigation Bar (hidden in Event Detail view to make space for the sticky Register bar) */}
        {!selectedEvent && (
          <BottomNav
            activeTab={activeTab}
            onSelectTab={handleNavigateTab}
            unreadDigestCount={1}
          />
        )}

        {/* Global Modals */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onSelectEvent={(eventId) => {
            const ev = events.find((e) => e.id === eventId);
            if (ev) handleOpenEventDetail(ev);
          }}
        />

        <RegistrationModal
          event={rsvpModalEvent}
          isOpen={!!rsvpModalEvent}
          onClose={() => setRsvpModalEvent(null)}
          onConfirmRegistration={handleConfirmRegistration}
          isAlreadyRegistered={rsvpModalEvent ? registeredEventIds.has(rsvpModalEvent.id) : false}
        />

        <SuggestMeetupModal
          isOpen={isSuggestModalOpen}
          onClose={() => setIsSuggestModalOpen(false)}
          onSubmit={(data) => {
            console.log('Meetup suggested:', data);
          }}
        />
      </div>
    </div>
  );
}
