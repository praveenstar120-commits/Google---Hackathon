export interface TechHubVenue {
  id: string;
  name: string;
  city: 'Bengaluru' | 'Chennai';
  cityCode: 'BLR' | 'MAA';
  area: string;
  address: string;
  metroStatus: string;
  metroNearby?: string;
  activeEventsCount: number;
  hostingCompanies: string[];
  trafficNotes: string;
  imageUrl: string;
  badge: string;
}

export const TECH_HUBS: TechHubVenue[] = [
  {
    id: 'ms-reactor-blr',
    name: 'Microsoft Reactor Bengaluru',
    city: 'Bengaluru',
    cityCode: 'BLR',
    area: 'Lavelle Road / High Grounds',
    address: '10th Floor, Prestige Trade Tower, Palace Road, High Grounds',
    metroStatus: '800m from Vidhana Soudha Metro (Purple Line)',
    activeEventsCount: 6,
    hostingCompanies: ['Microsoft', 'Azure AI', 'GitHub', 'Semantic Kernel'],
    trafficNotes: 'Central Business District. Congested 5:30-7:30 PM. Metro recommended.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAAp6Wu1B1v-_DdYKQCQoqaFl-M8ZR-782DlYFmK_U1R5xQnYMP7u-GsGAupEAjUAssFFu8Zk-fhm5oQauyJmtOgw_zJUm0hIqUoKl5wBF0cKdM441Rx6y1BMzBdUwcZwDrY-18UlPxN03xhDaYVWH3W1nNNGIurxg690S_7-riRi5a4ujMRb6HU7Z5jqT28XJH-FMOSGq1qKg_62iPzg83nvbr2J5Ggd4IRS8klc0nqPKWmfq01-4K',
    badge: 'Premier Hub',
  },
  {
    id: 'iit-madras-research-park',
    name: 'IIT Madras Research Park',
    city: 'Chennai',
    cityCode: 'MAA',
    area: 'Taramani Tech Corridor',
    address: 'Kanagam Road, Taramani, Chennai 600113',
    metroStatus: 'Direct access from Taramani MRTS Station & OMR link',
    activeEventsCount: 8,
    hostingCompanies: ['Google Cloud', 'IITM Pravartak', 'Zoho', 'Deep Tech Consortium'],
    trafficNotes: 'Smooth access via Madhya Kailash & SRP Tools flyover.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQnUZBpfPBFtOl2GcbSLf_8XdLgj6oBF5BqcnBDjB4cSF4Ne2U7FSD3EU1GVLDbrUg1eKt9jp-DXwJ8vKVPP6tNY6F8obbEr57if5p7OHneQ1JZug89lb2tPhSq59h7vus8pqy5h8-psDU05xyT526mhljD87utJkvQIYWqUPc42Xg9Fsy_mltOfNbmtOUpnfSOUDYSkA_Yohn2sxrTROvr4YogCXZ1m0ohHBD81w75PWAu78ygDVk',
    badge: 'Deep Tech Center',
  },
  {
    id: 'bagmane-tech-park',
    name: 'Bagmane Tech Park (Amazon & Google)',
    city: 'Bengaluru',
    cityCode: 'BLR',
    area: 'CV Raman Nagar / Byappanahalli',
    address: 'CV Raman Nagar, Near Old Madras Road, Bengaluru 560093',
    metroNearby: 'Swami Vivekananda Road & Byappanahalli Metro',
    metroStatus: '1.2km from Swami Vivekananda Road Metro (Purple Line)',
    activeEventsCount: 5,
    hostingCompanies: ['AWS', 'Amazon Dev Centre', 'Boeing', 'Cisco'],
    trafficNotes: 'Heavy queue on Old Madras Road during evening peak.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnpPq6Ej_X1H58V1itiwYyZn4HCTffssv1O-MdYJCtdTMAhnm1jqSP-46JFa1gVkweTssWhw_xRlsrTNHsyXMMfp81-GOpy5Z8Efd-kIx0jzUqHxyWgzvXP5xeZM1g7mRdVogRGCev16KWD76oxaFnSVYrvTFIQk3JDZGpHHSgupggLCB1JIP7Pv5RK9tQYOD9JihBAjs7tqEmtoQv-3KHaOofTc456DVEQcjQ_KhvH7dIh_ltIslz',
    badge: 'Cloud & AI Campus',
  },
  {
    id: 'olympia-tech-park',
    name: 'Olympia Tech Park Guindy',
    city: 'Chennai',
    cityCode: 'MAA',
    area: 'Guindy Industrial Estate',
    address: '1 SIDCO Industrial Estate, Guindy, Chennai 600032',
    metroStatus: 'Direct walkway from Guindy Metro Station',
    activeEventsCount: 4,
    hostingCompanies: ['Salesforce', 'Verizon', 'HP Enterprise', 'RBS'],
    trafficNotes: 'Kathipara flyover bottleneck during 6:00-8:00 PM.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQnUZBpfPBFtOl2GcbSLf_8XdLgj6oBF5BqcnBDjB4cSF4Ne2U7FSD3EU1GVLDbrUg1eKt9jp-DXwJ8vKVPP6tNY6F8obbEr57if5p7OHneQ1JZug89lb2tPhSq59h7vus8pqy5h8-psDU05xyT526mhljD87utJkvQIYWqUPc42Xg9Fsy_mltOfNbmtOUpnfSOUDYSkA_Yohn2sxrTROvr4YogCXZ1m0ohHBD81w75PWAu78ygDVk',
    badge: 'Enterprise Hub',
  },
  {
    id: 'koramangala-hacker-corridor',
    name: 'Koramangala Startup & Hacker Corridor',
    city: 'Bengaluru',
    cityCode: 'BLR',
    area: 'Koramangala 4th & 5th Block',
    address: '80ft Road & 100ft Road startup collective, Bengaluru 560034',
    metroStatus: 'Accessible via Koramangala Sony World / Dairy Circle Metro (Upcoming)',
    activeEventsCount: 9,
    hostingCompanies: ['Bengaluru AI Collective', 'Anthropic Labs', 'WeWork Galaxy', 'HackerHouse BLR'],
    trafficNotes: 'Silk Board & Sony World signal delays. +25 min buffer needed.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnpPq6Ej_X1H58V1itiwYyZn4HCTffssv1O-MdYJCtdTMAhnm1jqSP-46JFa1gVkweTssWhw_xRlsrTNHsyXMMfp81-GOpy5Z8Efd-kIx0jzUqHxyWgzvXP5xeZM1g7mRdVogRGCev16KWD76oxaFnSVYrvTFIQk3JDZGpHHSgupggLCB1JIP7Pv5RK9tQYOD9JihBAjs7tqEmtoQv-3KHaOofTc456DVEQcjQ_KhvH7dIh_ltIslz',
    badge: 'Founders & Hacker Hub',
  },
];
