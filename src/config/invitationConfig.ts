import type { ThemeId } from './themeRegistry';

export interface ProgrammeItem {
  time: string;
  title: string;
  subtitle?: string;
}

export interface InvitationConfig {
  eventType: string;

  couple: {
    partnerOne: string;
    partnerOneFull?: string;
    partnerTwo: string;
    partnerTwoFull?: string;
    conjunction: string;
    monogramInitialOne: string;
    monogramInitialTwo: string;
    brideFamily: string;
    groomFamily: string;
    hostLine?: string;
  };

  date: {
    fullDateDisplay: string;
    day: string;
    month: string;
    year: string;
    dayOfWeek: string;
    timeDisplay: string;
    yearNumber: number;
    monthNumber: number;
    dayNumber: number;
    hour24: number;
    minuteNumber: number;
    isoStartDateTime: string;
    isoEndDateTime: string;
    timezone: string;
  };

  venue: {
    sectionEyebrow: string;
    sectionTitle: string;
    name: string;
    location: string;
    fullAddress: string;
    description?: string;
    ceremonyNote?: string;
    mapUrl: string;
    illustrationUrl: string;
    openMapButtonLabel: string;
    addToCalendarButtonLabel: string;
  };

  invitationMessage: string;

  envelope: {
    tapPrompt: string;
  };

  navigation: {
    scrollDownLabel: string;
    previousSectionLabel: string;
    replayOpeningLabel: string;
  };

  sections: {
    celebration: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: ProgrammeItem[];
    };
    countdown: {
      eyebrow: string;
      title: string;
      arrivedTitle: string;
      arrivedMessage: string;
      quote: string;
      labels: {
        days: string;
        hours: string;
        minutes: string;
        seconds: string;
      };
    };
    closing: {
      quote: string;
      signOff: string;
    };
  };

  audio: {
    enabled: boolean;
    trackTitle: string;
    trackArtist: string;
    licensingStatus?: string;
    primaryAudioUrl: string;
    fallbackAudioUrl: string;
    autoStartOnOpen: boolean;
  };
}

/**
 * 01 — THE IVORY (Baseline Functional & Timing Reference)
 * Classic European Luxury | Italian Lake Wedding
 * Couple: Isabella Sterling & Alexander Vance
 */
export const invitationConfig: InvitationConfig = {
  eventType: 'Wedding Invitation',

  couple: {
    partnerOne: 'Isabella',
    partnerOneFull: 'Isabella Sterling',
    partnerTwo: 'Alexander',
    partnerTwoFull: 'Alexander Vance',
    conjunction: '&',
    monogramInitialOne: 'I',
    monogramInitialTwo: 'A',
    brideFamily: 'Sterling',
    groomFamily: 'Vance',
    hostLine: 'Sterling & Vance Families',
  },

  date: {
    fullDateDisplay: 'Saturday, 19 June 2027',
    day: '19',
    month: 'June',
    year: '2027',
    dayOfWeek: 'Saturday',
    timeDisplay: '4:00 PM',
    yearNumber: 2027,
    monthNumber: 6,
    dayNumber: 19,
    hour24: 16,
    minuteNumber: 0,
    isoStartDateTime: '2027-06-19T14:00:00Z',
    isoEndDateTime: '2027-06-19T23:59:00Z',
    timezone: 'Europe/Rome',
  },

  venue: {
    sectionEyebrow: 'The Destination',
    sectionTitle: 'Wedding Location',
    name: 'Villa Balbiano',
    location: 'Lake Como, Italy',
    fullAddress: 'Piazza Cardinal Durini, 22010 Ossuccio, Lake Como, Italy',
    description:
      'A sixteenth-century cardinal’s palace on the western shore of Lake Como, famed for its baroque frescoes and lakeside parterre gardens.',
    ceremonyNote: 'Lakefront Ceremony at 4:00 PM · Black-Tie Reception to follow',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Villa+Balbiano+Lake+Como+Italy',
    illustrationUrl: '/assets/lacy/villa-balbiano-como.jpg',
    openMapButtonLabel: 'Open in Google Maps',
    addToCalendarButtonLabel: 'Add to Calendar',
  },

  invitationMessage:
    'Together with our families, we joyfully invite you to celebrate our wedding.',

  envelope: {
    tapPrompt: 'Tap to Open',
  },

  navigation: {
    scrollDownLabel: 'Scroll Down ↓',
    previousSectionLabel: '↑ Previous',
    replayOpeningLabel: 'Replay Opening',
  },

  sections: {
    celebration: {
      eyebrow: 'Wedding Programme',
      title: 'The Celebration',
      subtitle: 'Saturday, 19 June 2027 · Villa Balbiano',
      items: [
        {
          time: '4:00 PM',
          title: 'Wedding Ceremony',
          subtitle: 'The Lakefront Parterre Garden',
        },
        {
          time: '5:00 PM',
          title: 'Cocktail Reception',
          subtitle: 'The Baroque Fountain Terrace',
        },
        {
          time: '6:30 PM',
          title: 'Wedding Dinner',
          subtitle: 'The Grand Fresco Courtyard',
        },
        {
          time: '8:30 PM',
          title: 'First Dance',
          subtitle: 'The Waterfront Loggia',
        },
        {
          time: '9:00 PM',
          title: 'Evening Celebration',
          subtitle: 'The Marble Pavilion',
        },
      ],
    },
    countdown: {
      eyebrow: 'Counting the Moments',
      title: 'Until We Say I Do',
      arrivedTitle: 'Today Is The Day',
      arrivedMessage:
        'Our wedding day has arrived. With joyful hearts, we celebrate the beginning of forever.',
      quote: '“Every passing moment brings us closer to the day we say I do.”',
      labels: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
      },
    },
    closing: {
      quote:
        'We would be deeply honoured by your presence as we celebrate the beginning of our new life together.',
      signOff: 'With all our love, Isabella & Alexander',
    },
  },

  audio: {
    enabled: true,
    trackTitle: 'Feeling Good',
    trackArtist: 'Michael Bublé',
    licensingStatus: 'Local Preview Track (Requires Sync License for Public Production; Falls Back to Royalty-Free Piano)',
    primaryAudioUrl: '/assets/audio/local-tracks/feeling-good.mp3',
    fallbackAudioUrl: '/assets/lacy/romantic-piano.mp3',
    autoStartOnOpen: true,
  },
};

/**
 * 02 — THE BLUSH
 * Romantic Botanical Garden | Irish Wedding
 * Couple: Aoife O'Sullivan & Cian Murphy
 * Date: Saturday, 14 August 2027
 * Venue: Powerscourt House & Gardens, County Wicklow, Ireland
 */
export const blushInvitationConfig: InvitationConfig = {
  eventType: 'Garden Wedding Invitation',

  couple: {
    partnerOne: 'Aoife',
    partnerOneFull: "Aoife O'Sullivan",
    partnerTwo: 'Cian',
    partnerTwoFull: 'Cian Murphy',
    conjunction: '&',
    monogramInitialOne: 'A',
    monogramInitialTwo: 'C',
    brideFamily: "O'Sullivan",
    groomFamily: 'Murphy',
    hostLine: "Together with the O'Sullivan & Murphy Families",
  },

  date: {
    fullDateDisplay: 'Saturday, 14 August 2027',
    day: '14',
    month: 'August',
    year: '2027',
    dayOfWeek: 'Saturday',
    timeDisplay: '2:30 PM',
    yearNumber: 2027,
    monthNumber: 8,
    dayNumber: 14,
    hour24: 14,
    minuteNumber: 30,
    isoStartDateTime: '2027-08-14T13:30:00Z',
    isoEndDateTime: '2027-08-14T23:30:00Z',
    timezone: 'Europe/Dublin',
  },

  venue: {
    sectionEyebrow: 'The Botanical Estate',
    sectionTitle: 'Powerscourt Gardens',
    name: 'Powerscourt House & Gardens',
    location: 'County Wicklow, Ireland',
    fullAddress: 'Powerscourt Estate, Enniskerry, Co. Wicklow, A98 W0D0, Ireland',
    description:
      'Set amidst forty-seven acres of terraced Italian gardens, sweeping stone staircases, and wild summer roses at the foot of the Wicklow Mountains.',
    ceremonyNote: 'Garden Ceremony at 2:30 PM · Champagne Reception on the Italian Terraces',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Powerscourt+House+and+Gardens+Enniskerry+County+Wicklow+Ireland',
    illustrationUrl: '/assets/themes/blush/venue-powerscourt.jpg',
    openMapButtonLabel: 'Open in Google Maps',
    addToCalendarButtonLabel: 'Add to Calendar',
  },

  invitationMessage:
    'Surrounded by summer roses and the hills of Wicklow, we warmly invite you to share in the joy of our marriage.',

  envelope: {
    tapPrompt: 'Touch Seal to Open',
  },

  navigation: {
    scrollDownLabel: 'Scroll Down ↓',
    previousSectionLabel: '↑ Previous',
    replayOpeningLabel: 'Replay Opening',
  },

  sections: {
    celebration: {
      eyebrow: 'Order of the Day',
      title: 'The Garden Celebration',
      subtitle: 'Saturday, 14 August 2027 · Powerscourt Estate',
      items: [
        {
          time: '2:00 PM',
          title: 'Guest Arrival & Garden Stroll',
          subtitle: 'The Walled Rose Garden',
        },
        {
          time: '2:30 PM',
          title: 'Marriage Ceremony',
          subtitle: 'The Italian Terraces Overlooking Sugar Loaf',
        },
        {
          time: '3:45 PM',
          title: 'Champagne & Botanical Canapés',
          subtitle: 'The Triton Lake Peristyle',
        },
        {
          time: '5:30 PM',
          title: 'Midsummer Banquet & Speeches',
          subtitle: 'The Georgian Ballroom',
        },
        {
          time: '8:30 PM',
          title: 'First Dance & Acoustic Strings',
          subtitle: 'The Garden Conservatory',
        },
        {
          time: '9:30 PM',
          title: 'Starlight Dancing & Late Supper',
          subtitle: 'The Cedar Lawn Pavilion',
        },
      ],
    },
    countdown: {
      eyebrow: 'Until the Roses Bloom',
      title: 'Counting Every Moment',
      arrivedTitle: 'Our Garden Day Has Arrived',
      arrivedMessage:
        'Among the roses of Wicklow, we celebrate the beginning of our marriage today.',
      quote: '“Like wildflowers in an Irish summer, our love has found its sweetest season.”',
      labels: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
      },
    },
    closing: {
      quote:
        'Your presence among the gardens of Powerscourt will make our celebration complete.',
      signOff: 'With all our love, Aoife & Cian',
    },
  },

  audio: {
    enabled: true,
    trackTitle: 'A Thousand Years',
    trackArtist: 'Christina Perri',
    licensingStatus: 'Local Preview Track (Requires Sync License for Public Production; Falls Back to Royalty-Free Garden Piano)',
    primaryAudioUrl: '/assets/audio/local-tracks/a-thousand-years.mp3',
    fallbackAudioUrl: '/assets/audio/blush-botanical-garden.mp3',
    autoStartOnOpen: true,
  },
};

/**
 * 03 — THE EMERALD
 * Celtic Heritage & Castle Elegance | Irish Wedding
 * Couple: Saoirse O'Connor & James Fitzgerald
 * Date: Saturday, 18 September 2027
 * Venue: Ashford Castle, County Mayo, Ireland
 */
export const emeraldInvitationConfig: InvitationConfig = {
  eventType: 'Royal Castle Wedding',

  couple: {
    partnerOne: 'Saoirse',
    partnerOneFull: "Saoirse O'Connor",
    partnerTwo: 'James',
    partnerTwoFull: 'James Fitzgerald',
    conjunction: '&',
    monogramInitialOne: 'S',
    monogramInitialTwo: 'J',
    brideFamily: "O'Connor",
    groomFamily: 'Fitzgerald',
    hostLine: "With the Blessing of the O'Connor & Fitzgerald Families",
  },

  date: {
    fullDateDisplay: 'Saturday, 18 September 2027',
    day: '18',
    month: 'September',
    year: '2027',
    dayOfWeek: 'Saturday',
    timeDisplay: '3:00 PM',
    yearNumber: 2027,
    monthNumber: 9,
    dayNumber: 18,
    hour24: 15,
    minuteNumber: 0,
    isoStartDateTime: '2027-09-18T14:00:00Z',
    isoEndDateTime: '2027-09-18T23:59:00Z',
    timezone: 'Europe/Dublin',
  },

  venue: {
    sectionEyebrow: 'The Historic Demesne',
    sectionTitle: 'Ashford Castle',
    name: 'Ashford Castle',
    location: 'County Mayo, Ireland',
    fullAddress: 'Ashford Castle Estate, Cong, Co. Mayo, F31 CA48, Ireland',
    description:
      'An eight-hundred-year-old medieval fortress of turreted limestone, ancient oak forests, and mist-veiled waters on the edge of Lough Corrib.',
    ceremonyNote: 'Chapel Ceremony at 3:00 PM · Castle State Banquet to follow',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Ashford+Castle+Cong+County+Mayo+Ireland',
    illustrationUrl: '/assets/themes/emerald/venue-ashford-castle.jpg',
    openMapButtonLabel: 'Open in Google Maps',
    addToCalendarButtonLabel: 'Add to Calendar',
  },

  invitationMessage:
    'By the ancient shores of Lough Corrib, we request the honour of your presence as we unite our lives in marriage.',

  envelope: {
    tapPrompt: 'Break Wax Seal',
  },

  navigation: {
    scrollDownLabel: 'Scroll Down ↓',
    previousSectionLabel: '↑ Previous',
    replayOpeningLabel: 'Replay Opening',
  },

  sections: {
    celebration: {
      eyebrow: 'Royal Castle Itinerary',
      title: 'Order of the Day',
      subtitle: 'Saturday, 18 September 2027 · Ashford Castle',
      items: [
        {
          time: '2:15 PM',
          title: 'Piper Welcome at the Drawbridge',
          subtitle: 'The Grand Castle Courtyard',
        },
        {
          time: '3:00 PM',
          title: 'Nuptial Ceremony & Handfasting',
          subtitle: "St. Mary's Woodland Chapel",
        },
        {
          time: '4:30 PM',
          title: 'Champagne & Clarsach Harp Reception',
          subtitle: 'The Connaught Room & Lake Terraces',
        },
        {
          time: '6:15 PM',
          title: 'The Castle State Banquet',
          subtitle: 'The George V Dining Room',
        },
        {
          time: '8:00 PM',
          title: 'Toasts & Traditional Blessings',
          subtitle: 'The Oak Hall',
        },
        {
          time: '9:15 PM',
          title: 'First Dance & Lough Corrib Fireworks',
          subtitle: 'The Castle Battlements',
        },
      ],
    },
    countdown: {
      eyebrow: 'Until the Castle Bells Ring',
      title: 'Our Forever Begins',
      arrivedTitle: 'The Castle Gates Are Open',
      arrivedMessage:
        'Today we gather at Ashford Castle to celebrate the union of Saoirse and James.',
      quote: '“Two souls woven together like ancient gold, steadfast through every season.”',
      labels: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
      },
    },
    closing: {
      quote:
        'We look forward to welcoming you to the historic halls of Ashford Castle to celebrate with us.',
      signOff: 'Sláinte & love, Saoirse & James',
    },
  },

  audio: {
    enabled: true,
    trackTitle: 'Iris',
    trackArtist: 'Goo Goo Dolls',
    licensingStatus: 'Local Preview Track (Requires Sync License for Public Production; Falls Back to Royalty-Free Celtic Harp)',
    primaryAudioUrl: '/assets/audio/local-tracks/goo-goo-dolls.mp3',
    fallbackAudioUrl: '/assets/audio/emerald-celtic-castle.mp3',
    autoStartOnOpen: true,
  },
};

/**
 * 04 — THE NOIR
 * Modern Black-Tie Glamour | American Wedding
 * Couple: Olivia Bennett & William Carter
 * Date: Saturday, 9 October 2027
 * Venue: The Plaza Hotel, New York City, USA
 */
export const noirInvitationConfig: InvitationConfig = {
  eventType: 'Black-Tie Evening Wedding',

  couple: {
    partnerOne: 'Olivia',
    partnerOneFull: 'Olivia Bennett',
    partnerTwo: 'William',
    partnerTwoFull: 'William Carter',
    conjunction: '&',
    monogramInitialOne: 'O',
    monogramInitialTwo: 'W',
    brideFamily: 'Bennett',
    groomFamily: 'Carter',
    hostLine: 'The Bennett & Carter Families · Black Tie Required',
  },

  date: {
    fullDateDisplay: 'Saturday, 9 October 2027',
    day: '09',
    month: 'October',
    year: '2027',
    dayOfWeek: 'Saturday',
    timeDisplay: '6:00 PM',
    yearNumber: 2027,
    monthNumber: 10,
    dayNumber: 9,
    hour24: 18,
    minuteNumber: 0,
    isoStartDateTime: '2027-10-09T22:00:00Z',
    isoEndDateTime: '2027-10-10T05:00:00Z',
    timezone: 'America/New_York',
  },

  venue: {
    sectionEyebrow: 'Fifth Avenue · Manhattan',
    sectionTitle: 'The Plaza Hotel',
    name: 'The Plaza Hotel',
    location: 'New York City, USA',
    fullAddress: '768 Fifth Avenue at Central Park South, New York, NY 10019, USA',
    description:
      'An icon of New York glamour overlooking Central Park and Fifth Avenue, where gilded Beaux-Arts grandeur meets modern Manhattan sophistication.',
    ceremonyNote: 'Candlelight Ceremony at 6:00 PM · Black-Tie Gala in The Grand Ballroom',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Plaza+Hotel+Fifth+Avenue+New+York+NY',
    illustrationUrl: '/assets/themes/noir/venue-plaza-nyc.jpg',
    openMapButtonLabel: 'Open in Google Maps',
    addToCalendarButtonLabel: 'Add to Calendar',
  },

  invitationMessage:
    'The pleasure of your company is requested for an evening of ceremony, champagne, and black-tie celebration in the heart of Manhattan.',

  envelope: {
    tapPrompt: 'Unlock Invitation',
  },

  navigation: {
    scrollDownLabel: 'Scroll Down ↓',
    previousSectionLabel: '↑ Previous',
    replayOpeningLabel: 'Replay Opening',
  },

  sections: {
    celebration: {
      eyebrow: 'Manhattan Black-Tie Gala',
      title: 'The Evening Itinerary',
      subtitle: 'Saturday, 9 October 2027 · The Plaza, New York',
      items: [
        {
          time: '5:30 PM',
          title: 'Champagne Tower Arrival',
          subtitle: 'The Palm Court Rotunda',
        },
        {
          time: '6:00 PM',
          title: 'Candlelight Vows',
          subtitle: 'The Terrace Room',
        },
        {
          time: '7:00 PM',
          title: 'Caviar & Jazz Cocktail Hour',
          subtitle: 'The Fifth Avenue Foyer',
        },
        {
          time: '8:15 PM',
          title: 'Black-Tie Gala Dinner & Toasts',
          subtitle: 'The Grand Ballroom',
        },
        {
          time: '10:00 PM',
          title: 'First Dance & Big Band Orchestra',
          subtitle: 'The Grand Ballroom Stage',
        },
        {
          time: '11:30 PM',
          title: 'Midnight Espresso Martini Lounge',
          subtitle: 'The Rose Club',
        },
      ],
    },
    countdown: {
      eyebrow: 'Countdown to Midnight in Manhattan',
      title: 'Until Fifth Avenue Glows',
      arrivedTitle: 'Tonight in New York',
      arrivedMessage:
        'Under the chandeliers of The Plaza, we celebrate the marriage of Olivia and William.',
      quote: '“Under the chandeliers of New York, every second brings us closer to forever.”',
      labels: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
      },
    },
    closing: {
      quote:
        'We cannot wait to raise a glass with you for an unforgettable autumn night in New York City.',
      signOff: 'See you on Fifth Avenue, Olivia & William',
    },
  },

  audio: {
    enabled: true,
    trackTitle: 'Daylight',
    trackArtist: 'David Kushner',
    licensingStatus: 'Local Preview Track (Requires Sync License for Public Production; Falls Back to Royalty-Free Manhattan Jazz)',
    primaryAudioUrl: '/assets/audio/local-tracks/daylight.mp3',
    fallbackAudioUrl: '/assets/audio/noir-manhattan-jazz.mp3',
    autoStartOnOpen: true,
  },
};

/**
 * 05 — THE CHÂTEAU BLUE
 * English Country Estate Romance | British Wedding
 * Couple: Charlotte Whitmore & Henry Ashford
 * Date: Saturday, 12 June 2027
 * Venue: Blenheim Palace, Oxfordshire, England
 */
export const chateauBlueInvitationConfig: InvitationConfig = {
  eventType: 'Summer Palace Wedding',

  couple: {
    partnerOne: 'Charlotte',
    partnerOneFull: 'Charlotte Whitmore',
    partnerTwo: 'Henry',
    partnerTwoFull: 'Henry Ashford',
    conjunction: '&',
    monogramInitialOne: 'C',
    monogramInitialTwo: 'H',
    brideFamily: 'Whitmore',
    groomFamily: 'Ashford',
    hostLine: 'Mr. & Mrs. Whitmore and Lord & Lady Ashford',
  },

  date: {
    fullDateDisplay: 'Saturday, 12 June 2027',
    day: '12',
    month: 'June',
    year: '2027',
    dayOfWeek: 'Saturday',
    timeDisplay: '1:30 PM',
    yearNumber: 2027,
    monthNumber: 6,
    dayNumber: 12,
    hour24: 13,
    minuteNumber: 30,
    isoStartDateTime: '2027-06-12T12:30:00Z',
    isoEndDateTime: '2027-06-12T23:00:00Z',
    timezone: 'Europe/London',
  },

  venue: {
    sectionEyebrow: 'The Country Estate',
    sectionTitle: 'Blenheim Palace',
    name: 'Blenheim Palace',
    location: 'Oxfordshire, England',
    fullAddress: 'Woodstock, Oxfordshire, OX20 1PP, United Kingdom',
    description:
      'A masterpiece of eighteenth-century English Baroque architecture surrounded by two thousand acres of Capability Brown parkland and formal water terraces.',
    ceremonyNote: 'Palace Chapel Service at 1:30 PM · Morning Dress or Lounge Suits',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Blenheim+Palace+Woodstock+Oxfordshire+England',
    illustrationUrl: '/assets/themes/chateau-blue/venue-blenheim-palace.jpg',
    openMapButtonLabel: 'Open in Google Maps',
    addToCalendarButtonLabel: 'Add to Calendar',
  },

  invitationMessage:
    'Mr. & Mrs. Whitmore and the Ashford Family request the pleasure of your company at the marriage of Charlotte and Henry.',

  envelope: {
    tapPrompt: 'Untie Silk Ribbon',
  },

  navigation: {
    scrollDownLabel: 'Scroll Down ↓',
    previousSectionLabel: '↑ Previous',
    replayOpeningLabel: 'Replay Opening',
  },

  sections: {
    celebration: {
      eyebrow: 'The Royal Oxfordshire Suite',
      title: 'The Wedding Breakfast',
      subtitle: 'Saturday, 12 June 2027 · Blenheim Palace',
      items: [
        {
          time: '1:00 PM',
          title: 'Carriage Arrival at the Great Court',
          subtitle: 'The Baroque Palace Forecourt',
        },
        {
          time: '1:30 PM',
          title: 'Solemnisation of Matrimony',
          subtitle: 'The Palace Chapel',
        },
        {
          time: '2:45 PM',
          title: "Pimm's & String Quartet on the Lawn",
          subtitle: 'The Water Terraces',
        },
        {
          time: '4:30 PM',
          title: 'The Wedding Breakfast & Speeches',
          subtitle: 'The Long Library',
        },
        {
          time: '7:30 PM',
          title: 'Cutting of the Cake & First Waltz',
          subtitle: 'The State Saloon',
        },
        {
          time: '8:30 PM',
          title: 'Evening Dancing & Orangery Supper',
          subtitle: 'The Italian Garden Orangery',
        },
      ],
    },
    countdown: {
      eyebrow: 'An English Summer Awaits',
      title: 'Until Our Wedding Day',
      arrivedTitle: 'Our Wedding Day Has Come',
      arrivedMessage:
        'In the grandeur of Blenheim Palace, we celebrate the marriage of Charlotte and Henry.',
      quote: '“In the quiet grace of an Oxfordshire summer, our greatest chapter begins.”',
      labels: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
      },
    },
    closing: {
      quote:
        'We would be delighted to share the beauty of Blenheim Palace with you on our wedding day.',
      signOff: 'Yours affectionately, Charlotte & Henry',
    },
  },

  audio: {
    enabled: true,
    trackTitle: 'Jar of Hearts',
    trackArtist: 'Christina Perri',
    licensingStatus: 'Local Preview Track (Requires Sync License for Public Production; Falls Back to Royalty-Free Chamber Strings)',
    primaryAudioUrl: '/assets/audio/local-tracks/jar-of-hearts.mp3',
    fallbackAudioUrl: '/assets/audio/chateau-chamber-music.mp3',
    autoStartOnOpen: true,
  },
};


/**
 * 06 — THE GOLDEN ROSE (Instagram / Webgency Reference Edition)
 * Luminous Amber & Golden Rose | French Provence Château Wedding
 * Couple: Julian Moreau & Genevieve Laurent
 * Date: Saturday, 24 July 2027 (24.07.27)
 * Venue: Château de Tourreau, Provence, France
 */
export const goldenRoseInvitationConfig: InvitationConfig = {
  eventType: 'Wedding Day',

  couple: {
    partnerOne: 'Julian',
    partnerOneFull: 'Julian Moreau',
    partnerTwo: 'Genevieve',
    partnerTwoFull: 'Genevieve Laurent',
    conjunction: '&',
    monogramInitialOne: 'J',
    monogramInitialTwo: 'G',
    brideFamily: 'Laurent',
    groomFamily: 'Moreau',
    hostLine: 'Dear Friends and Family,',
  },

  date: {
    fullDateDisplay: 'Saturday, 24 July 2027',
    day: '24',
    month: 'July',
    year: '2027',
    dayOfWeek: 'Saturday',
    timeDisplay: '16:00',
    yearNumber: 2027,
    monthNumber: 7,
    dayNumber: 24,
    hour24: 16,
    minuteNumber: 0,
    isoStartDateTime: '2027-07-24T14:00:00Z',
    isoEndDateTime: '2027-07-24T23:59:00Z',
    timezone: 'Europe/Paris',
  },

  venue: {
    sectionEyebrow: 'Location',
    sectionTitle: 'Château de Tourreau',
    name: 'Château de Tourreau',
    location: 'Provence, France',
    fullAddress: '2317 Route de Tourreau, 84260 Sarrians, Provence, France',
    description:
      'An eighteenth-century Provençal estate surrounded by cypress alleys, lavender courtyards, and sunlit fountains in the heart of Vaucluse.',
    ceremonyNote: 'Dress Code: Formal summer attire in warm champagne, taupe, bronze, or ivory.',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Chateau+de+Tourreau+Sarrians+Provence+France',
    illustrationUrl: '/assets/themes/golden-rose/venue-provence-chateau.jpg',
    openMapButtonLabel: 'Open in Google Maps',
    addToCalendarButtonLabel: 'Add to Calendar',
  },

  invitationMessage:
    'As we get ready to say “I do,” we feel grateful for the wonderful people in our lives. Your support means the world to us, and we would be honored to have you with us as we begin our life together.',

  envelope: {
    tapPrompt: 'Click to Open',
  },

  navigation: {
    scrollDownLabel: 'Scroll Down ↓',
    previousSectionLabel: '↑ Previous',
    replayOpeningLabel: 'Replay Opening',
  },

  sections: {
    celebration: {
      eyebrow: 'The Celebration',
      title: 'Schedule of Events',
      subtitle: '24.07.27 · Château de Tourreau, Provence',
      items: [
        {
          time: '16:00',
          title: 'Wedding Ceremony',
          subtitle: 'The Cypress Fountain Courtyard',
        },
        {
          time: '17:00',
          title: 'Cocktail Hour',
          subtitle: 'The Provençal Rose Parterre',
        },
        {
          time: '19:00',
          title: 'Dinner Banquet',
          subtitle: 'The Grand Limestone Orangerie',
        },
        {
          time: '20:30',
          title: 'First Dance & Party',
          subtitle: 'The Illuminated Pool Terrace',
        },
        {
          time: '23:00',
          title: 'Starlight Finale',
          subtitle: 'The South Lawn',
        },
      ],
    },
    countdown: {
      eyebrow: '24.07.27 · Provence',
      title: 'The Celebration Begins In',
      arrivedTitle: 'Our Wedding Day Is Here',
      arrivedMessage:
        'Under the Provençal sun, we celebrate the beginning of our forever together.',
      quote: '“We kindly invite you to dress in elegant attire that reflects the style and spirit of our special day.”',
      labels: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
      },
    },
    closing: {
      quote:
        'Your presence is the greatest gift to us as we gather in Provence to celebrate our marriage.',
      signOff: 'Hope to see you there! Julian & Genevieve',
    },
  },

  audio: {
    enabled: true,
    trackTitle: 'All of Me',
    trackArtist: 'John Legend',
    licensingStatus:
      'Local Preview Track (Requires Sync License for Public Production; Falls Back to Royalty-Free Piano)',
    primaryAudioUrl: '/assets/audio/local-tracks/all-of-me.mp3',
    fallbackAudioUrl: '/assets/lacy/romantic-piano.mp3',
    autoStartOnOpen: true,
  },
};

export const THEME_INVITATION_CONFIGS: Record<ThemeId, InvitationConfig> = {
  ivory: invitationConfig,
  blush: blushInvitationConfig,
  emerald: emeraldInvitationConfig,
  noir: noirInvitationConfig,
  'chateau-blue': chateauBlueInvitationConfig,
  'golden-rose': goldenRoseInvitationConfig,
};

export function getInvitationConfigForTheme(themeId: ThemeId): InvitationConfig {
  return THEME_INVITATION_CONFIGS[themeId] || invitationConfig;
}
