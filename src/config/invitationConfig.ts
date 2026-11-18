/**
 * MERKEZİ DAVETİYE İÇERİK YAPILANDIRMASI (Central Invitation Content Configuration)
 *
 * Davetiyede yer alan tüm metinler, çift bilgileri, tarih/saat detayları,
 * düğün programı (Bölüm 2), mekân/konum bilgileri (Bölüm 3), geri sayım sayfası (Bölüm 4)
 * ve arka plan müziği ayarları bu dosyadan tek merkezden düzenlenebilir.
 */

export interface ProgrammeItem {
  /** Etkinlik saati (ör. "4:00 PM") */
  time: string;
  /** Etkinlik başlığı (ör. "Wedding Ceremony") */
  title: string;
  /** İsteğe bağlı kısa açıklama veya alan adı */
  subtitle?: string;
}

export interface InvitationConfig {
  /** Davetiye üst başlığı (ör. "Wedding Invitation") */
  eventType: string;

  /** Çift ve aile bilgileri */
  couple: {
    partnerOne: string;
    partnerTwo: string;
    conjunction: string;
    monogramInitialOne: string;
    monogramInitialTwo: string;
    brideFamily: string;
    groomFamily: string;
  };

  /** Düğün tarihi, saati ve saat dilimi bilgileri */
  date: {
    fullDateDisplay: string;
    day: string;
    month: string;
    year: string;
    dayOfWeek: string;
    timeDisplay: string;
    /** Saat dilimi duyarlı geri sayım hesaplaması için sayısal tarih bileşenleri */
    yearNumber: number;
    monthNumber: number;
    dayNumber: number;
    hour24: number;
    minuteNumber: number;
    /** Takvim (.ics) dosyası ve yedek hesaplama için ISO tarihleri */
    isoStartDateTime: string;
    isoEndDateTime: string;
    /** IANA saat dilimi kimliği (ör. "Europe/Rome" veya "Europe/Dublin") */
    timezone: string;
  };

  /** Düğün mekânı ve konum bilgileri (Bölüm 3 — The Destination) */
  venue: {
    sectionEyebrow: string;
    sectionTitle: string;
    name: string;
    location: string;
    fullAddress: string;
    mapUrl: string;
    illustrationUrl: string;
    openMapButtonLabel: string;
    addToCalendarButtonLabel: string;
  };

  /** Ana davet mesajı (Bölüm 1 — The Wedding Invitation) */
  invitationMessage: string;

  /** Kapalı zarf / kapak etkileşim metinleri */
  envelope: {
    tapPrompt: string;
  };

  /** Bölümler arası gezinme etiketleri */
  navigation: {
    scrollDownLabel: string;
    previousSectionLabel: string;
    replayOpeningLabel: string;
  };

  /** Bölüm 2 (The Celebration), Bölüm 4 (Final Countdown) ve kapanış metinleri */
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

  /** Arka plan müziği yapılandırması (Michael Bublé — Feeling Good) */
  audio: {
    enabled: boolean;
    /** Birincil şarkı adı: Feeling Good */
    trackTitle: string;
    /** Sanatçı adı: Michael Bublé */
    trackArtist: string;
    /** Kullanıcının ekleyeceği lisanslı ses dosyasının yerel yolu */
    primaryAudioUrl: string;
    /** Birincil dosya henüz eklenmemişse kullanılacak yerleşik yedek ses dosyası */
    fallbackAudioUrl: string;
    /** Davetiye açıldığında müziği otomatik başlat */
    autoStartOnOpen: boolean;
  };
}

/**
 * Varsayılan davetiye verileri (İngilizce örnek düğün içeriği).
 */
export const invitationConfig: InvitationConfig = {
  eventType: 'Wedding Invitation',

  couple: {
    partnerOne: 'Isabella',
    partnerTwo: 'Alexander',
    conjunction: '&',
    monogramInitialOne: 'I',
    monogramInitialTwo: 'A',
    brideFamily: 'Sterling',
    groomFamily: 'Vance',
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
    trackArtist: 'Michael Bublé',
    primaryAudioUrl: '/assets/audio/feeling-good.mp3',
    fallbackAudioUrl: '/assets/lacy/romantic-piano.mp3',
    autoStartOnOpen: true,
  },
};
