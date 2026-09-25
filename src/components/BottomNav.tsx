import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadDigestCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadDigestCount = 1,
}) => {
  const navItems: { id: TabType; label: string; icon: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'explore-events', label: 'Events', icon: 'explore' },
    { id: 'tech-calendar', label: 'Calendar', icon: 'calendar_month' },
    { id: 'companies-directory', label: 'Companies', icon: 'corporate_fare' },
    { id: 'ai-digest', label: 'Digest', icon: 'auto_awesome', badge: unreadDigestCount },
    { id: 'quick-menu', label: 'More', icon: 'menu' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#ffffff]/95 backdrop-blur-xl border-t border-[#e5eeff] shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 h-14 min-w-[48px] py-1 transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-[#4b41e1] font-semibold'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.badge && item.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#4b41e1] ring-2 ring-white"></span>
                )}
              </div>
              <span className="text-[11px] leading-tight mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#4b41e1] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
