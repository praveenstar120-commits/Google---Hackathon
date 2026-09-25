import React, { useState } from 'react';
import { APP_LOGO_URL, USER_AVATAR_URL } from '../data/mockEvents';

interface HeaderProps {
  currentTabName: string;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
  isDesktopPreviewWide: boolean;
  onToggleDesktopWidth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTabName,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 3,
  isDesktopPreviewWide,
  onToggleDesktopWidth,
}) => {
  const [logoLoaded, setLogoLoaded] = useState(true);

  return (
    <header className="sticky top-0 w-full z-40 bg-[#ffffff]/90 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-3 sm:px-4 flex items-center justify-between gap-2 max-w-5xl mx-auto">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
            {logoLoaded ? (
              <img
                alt="TechPulse India Logo"
                className="h-8 w-8 object-contain rounded-md"
                src={APP_LOGO_URL}
                onError={() => setLogoLoaded(false)}
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#4b41e1] flex items-center justify-center text-white font-bold text-xs">
                TP
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg text-[#0b1c30] tracking-tight truncate">
                TechPulse India
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-[11px] font-semibold flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4b41e1] mr-1 animate-pulse"></span>
                BLR &amp; MAA
              </span>
            </div>
            <span className="text-[12px] text-[#45464d] truncate font-medium">
              {currentTabName}
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Optional Desktop viewport expander (only visible on sm+ screens) */}
          <button
            onClick={onToggleDesktopWidth}
            title={isDesktopPreviewWide ? 'Switch to Mobile Frame (420px)' : 'Expand to Wide View'}
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-[#45464d] bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isDesktopPreviewWide ? 'smartphone' : 'laptop'}
            </span>
            <span>{isDesktopPreviewWide ? 'Phone' : 'Wide'}</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="w-10 h-10 relative flex items-center justify-center rounded-xl text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#4b41e1] ring-2 ring-white"></span>
            )}
          </button>

          {/* Account Profile Button */}
          <button
            onClick={onOpenProfile}
            aria-label="Account profile"
            className="w-10 h-10 flex items-center justify-center rounded-xl p-0.5 hover:bg-[#eff4ff] active:scale-95 transition-all"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#e5eeff]"
              src={USER_AVATAR_URL}
              onError={(e) => {
                // Fallback to stylized avatar
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
              }}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
