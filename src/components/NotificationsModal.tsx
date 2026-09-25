import React from 'react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'event' | 'traffic' | 'ticket' | 'sync';
  read: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent?: (eventId: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectEvent,
}) => {
  if (!isOpen) return null;

  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: '✦ 3 New Events Discovered',
      desc: 'Autonomous crawler matched Claude 3.5 Sonnet Hackathon & Vertex AI DevFest to your profile.',
      time: '2 hours ago',
      type: 'sync',
      read: false,
    },
    {
      id: '2',
      title: 'Silk Board & ORR Traffic Buffer',
      desc: 'AI calculated +25 mins commute buffer for Koramangala to Lavelle Rd corridor during peak transit.',
      time: '4 hours ago',
      type: 'traffic',
      read: false,
    },
    {
      id: '3',
      title: 'Urgent: Passes Running Low',
      desc: 'Only 6 subsidized passes remaining for NVIDIA TensorRT-LLM hands-on workshop in Whitefield.',
      time: '5 hours ago',
      type: 'ticket',
      read: false,
    },
    {
      id: '4',
      title: 'Microsoft Fabric Breakouts Confirmed',
      desc: 'Priya Sharma and Karthik Narayanan released session outline for Thursday at Microsoft Reactor.',
      time: 'Yesterday',
      type: 'event',
      read: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-[#e5eeff]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#e5eeff] bg-[#eff4ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4b41e1] text-[20px]">
              notifications_active
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
              Intelligence Alerts
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#4b41e1] text-white">
              3 new
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#45464d] hover:bg-[#e5eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#eff4ff] p-2">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (onSelectEvent) {
                  onSelectEvent('microsoft-fabric-agentic-ai');
                  onClose();
                }
              }}
              className="p-3 rounded-xl hover:bg-[#f8f9ff] cursor-pointer transition-colors flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#e2dfff] text-[#4b41e1] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">
                  {item.type === 'traffic'
                    ? 'traffic'
                    : item.type === 'ticket'
                    ? 'local_activity'
                    : item.type === 'sync'
                    ? 'sync'
                    : 'event'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-bold text-[#0b1c30] truncate">
                    {item.title}
                  </p>
                  <span className="text-[10px] text-[#45464d] flex-shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-[#45464d] mt-0.5 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#e5eeff] bg-[#f8f9ff] flex items-center justify-between">
          <span className="text-xs text-[#45464d]">Autonomous Feed: Active</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#4b41e1] text-white hover:bg-[#3323cc] transition-colors"
          >
            Mark All Read
          </button>
        </div>
      </div>
    </div>
  );
};
