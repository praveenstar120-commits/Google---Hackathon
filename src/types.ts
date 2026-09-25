export type CityFilter = 'all' | 'blr' | 'maa';

export type TimeRangeFilter = 'this_week' | 'next_2_weeks' | 'this_month' | 'next_3_months';

export type TabType = 'dashboard' | 'explore-events' | 'tech-calendar' | 'companies-directory' | 'ai-digest' | 'quick-menu';

export interface Speaker {
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  bio?: string;
  sessionTopic?: string;
}

export interface TechEvent {
  id: string;
  title: string;
  organizer: string;
  organizerLogo?: string;
  organizerVerified?: boolean;
  hub: 'blr' | 'maa';
  hubName: string;
  area: string;
  venueName: string;
  fullAddress: string;
  metroNearby?: string;
  dateStr: string;
  dayOfWeek: string;
  dayOfMonth: number;
  month: string;
  timeRange: string;
  startTime: string;
  endTime: string;
  isoDate: string;
  isHybrid?: boolean;
  isVirtual?: boolean;
  tags: string[];
  primaryCategory: 'AI' | 'Cloud' | 'Data' | 'Hackathon' | 'DevOps';
  matchScore: number;
  matchReason: string;
  priceType: 'free' | 'paid' | 'invite' | 'hackathon';
  priceLabel: string;
  verified: boolean;
  totalSeats: number;
  spotsLeft: number;
  imageUrl: string;
  speakers: Speaker[];
  perks?: string;
  peerAttendees?: {
    count: number;
    initials: string[];
  };
  liveFeedHeadline?: string;
  technicalPrerequisites?: string;
  officialSource: string;
  registrationProvider: string;
  lastVerifiedTime: string;
  discussionAttendeeCount?: number;
}
