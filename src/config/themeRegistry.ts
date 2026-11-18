export type ThemeId =
  | 'ivory'
  | 'blush'
  | 'emerald'
  | 'noir'
  | 'chateau-blue'
  | 'golden-rose';

export interface ThemePaletteSwatch {
  name: string;
  hex: string;
}

export interface LuxuryThemeSpec {
  id: ThemeId;
  route: `/${ThemeId}`;
  number: string;
  name: string;
  themeTitle: string;
  culturalSubtitle: string;
  openingStyle: string;
  shortDescription: string;
  palette: ThemePaletteSwatch[];
  studioBgColor: string;
  studioRadialGradient: string;
  cardBgColor: string;
  cardShadow: string;
  preloaderBg: string;
  preloaderText: string;
  preloaderTrack: string;
  preloaderFill: string;
  debossedNameClass: string;
  debossedInkClass: string;
  embossedAccentClass: string;
  nacreButtonClass: string;
  pearlBeadClass: string;
  accentHex: string;
  accentDeepHex: string;
  secondaryTextHex: string;
  subtleLinkHex: string;
  subtleLinkHoverHex: string;
  assets: {
    innerCardBg: string;
    dateMedallion: string;
    dayTimePlaque: string;
    titlePlaque: string;
    venueArchFrame: string;
    sealCameo: string;
  };
  timing: {
    sealInteractionMs: number;
    unfasteningMs: number;
    openingDurationMs: number;
    interiorRevealMs: number;
  };
}

/**
 * Shared Ivory Opening Benchmark (Total = 5450ms / 5.45s)
 */
export const IVORY_BENCHMARK_TIMING = {
  sealInteractionMs: 700,
  unfasteningMs: 500,
  openingDurationMs: 3250,
  interiorRevealMs: 1000,
} as const;

export const LUXURY_THEMES: Record<ThemeId, LuxuryThemeSpec> = {
  ivory: {
    id: 'ivory',
    route: '/ivory',
    number: '01',
    name: 'The Ivory',
    themeTitle: 'Classic European Luxury · Italian Lake Wedding',
    culturalSubtitle: 'Villa Balbiano · Lake Como, Italy',
    openingStyle: 'French Gatefold',
    shortDescription:
      'Hand-finished ivory cotton paper, French Chantilly lace doors, natural pearls and a champagne mother-of-pearl cameo seal crafted for an Italian lakefront celebration.',
    palette: [
      { name: 'Ivory Cotton', hex: '#EFEAE3' },
      { name: 'Champagne Gold', hex: '#B28A5D' },
      { name: 'Warm Silk', hex: '#D9CEC5' },
      { name: 'Espresso Ink', hex: '#5E4F3E' },
    ],
    studioBgColor: '#D9CEC5',
    studioRadialGradient:
      'radial-gradient(ellipse at 50% 30%, rgba(247, 242, 234, 0.85) 0%, rgba(227, 217, 204, 0.75) 55%, rgba(208, 195, 180, 0.95) 100%)',
    cardBgColor: '#EFEAE3',
    cardShadow:
      '0_32px_90px_-12px_rgba(58,44,30,0.38),0_12px_28px_-6px_rgba(58,44,30,0.22)',
    preloaderBg: '#EFEAE3',
    preloaderText: '#7D6340',
    preloaderTrack: '#D9CEC5',
    preloaderFill: 'from-[#D8C5A8] via-[#8F6B42] to-[#D8C5A8]',
    debossedNameClass: 'lacy-debossed-name',
    debossedInkClass: 'lacy-debossed-ink',
    embossedAccentClass: 'lacy-embossed-gold',
    nacreButtonClass: 'lacy-nacre-button',
    pearlBeadClass: 'lacy-pearl-bead',
    accentHex: '#B28A5D',
    accentDeepHex: '#8F6B42',
    secondaryTextHex: '#6E5E4E',
    subtleLinkHex: '#7D6A56',
    subtleLinkHoverHex: '#4E4032',
    assets: {
      innerCardBg: '/assets/lacy/inner-card-bg.webp',
      dateMedallion: '/assets/lacy/date-medallion.webp',
      dayTimePlaque: '/assets/lacy/day-time-plaque.webp',
      titlePlaque: '/assets/lacy/title-plaque.webp',
      venueArchFrame: '/assets/lacy/venue-arch-frame.webp',
      sealCameo: '/assets/lacy/seal-cameo.png',
    },
    timing: { ...IVORY_BENCHMARK_TIMING },
  },

  blush: {
    id: 'blush',
    route: '/blush',
    number: '02',
    name: 'The Blush',
    themeTitle: 'Romantic Botanical Garden · Irish Wedding',
    culturalSubtitle: 'Powerscourt House & Gardens · County Wicklow, Ireland',
    openingStyle: 'Floral Envelope Reveal',
    shortDescription:
      'Blush pink, dusty rose, warm cream and muted botanical sage stationery with hand-painted watercolor florals, romantic calligraphy and a physical floral envelope pull-out.',
    palette: [
      { name: 'Blush Rose', hex: '#F2CEC7' },
      { name: 'Dusty Rose', hex: '#C47D72' },
      { name: 'Warm Cream', hex: '#FFFDF9' },
      { name: 'Botanical Sage', hex: '#6E8770' },
    ],
    studioBgColor: '#E8D6D0',
    studioRadialGradient:
      'radial-gradient(ellipse at 50% 28%, rgba(255, 249, 246, 0.92) 0%, rgba(242, 220, 214, 0.82) 54%, rgba(210, 198, 190, 0.96) 100%)',
    cardBgColor: '#FCF6F2',
    cardShadow:
      '0_32px_90px_-12px_rgba(88,52,46,0.32),0_12px_28px_-6px_rgba(88,52,46,0.18)',
    preloaderBg: '#FCF6F2',
    preloaderText: '#9E5E52',
    preloaderTrack: '#E8CFC9',
    preloaderFill: 'from-[#E8B8AC] via-[#6E8770] to-[#C47D72]',
    debossedNameClass: 'blush-debossed-name',
    debossedInkClass: 'blush-debossed-ink',
    embossedAccentClass: 'blush-embossed-rosegold',
    nacreButtonClass: 'blush-nacre-button',
    pearlBeadClass: 'blush-pearl-bead',
    accentHex: '#C47D72',
    accentDeepHex: '#9E5E50',
    secondaryTextHex: '#5A6D5C',
    subtleLinkHex: '#6E8770',
    subtleLinkHoverHex: '#4E3632',
    assets: {
      innerCardBg: '/assets/themes/blush/card-bg.webp',
      dateMedallion: '/assets/themes/blush/date-medallion.webp',
      dayTimePlaque: '/assets/themes/blush/day-time-plaque.webp',
      titlePlaque: '/assets/themes/blush/title-plaque.webp',
      venueArchFrame: '/assets/themes/blush/venue-arch-frame.webp',
      sealCameo: '/assets/themes/blush/seal-cameo.png',
    },
    timing: { ...IVORY_BENCHMARK_TIMING },
  },

  emerald: {
    id: 'emerald',
    route: '/emerald',
    number: '03',
    name: 'The Emerald',
    themeTitle: 'Celtic Heritage & Castle Elegance · Irish Wedding',
    culturalSubtitle: 'Ashford Castle · County Mayo, Ireland',
    openingStyle: 'Wax Seal & Castle Folio',
    shortDescription:
      'Deep emerald-green and aged parchment stationery with antique-gold heraldic detailing, refined Celtic knotwork motifs and a ceremonial wax-seal unfolding.',
    palette: [
      { name: 'Royal Emerald', hex: '#0F2E22' },
      { name: 'Antique Gold', hex: '#C9A461' },
      { name: 'Aged Parchment', hex: '#F3E8D2' },
      { name: 'Forest Ink', hex: '#14382A' },
    ],
    studioBgColor: '#DFD8C8',
    studioRadialGradient:
      'radial-gradient(ellipse at 50% 28%, rgba(251, 248, 242, 0.92) 0%, rgba(225, 218, 204, 0.84) 55%, rgba(196, 188, 172, 0.96) 100%)',
    cardBgColor: '#F8F5EE',
    cardShadow:
      '0_32px_90px_-12px_rgba(20,42,32,0.28),0_12px_28px_-6px_rgba(20,42,32,0.16)',
    preloaderBg: '#F8F5EE',
    preloaderText: '#14382A',
    preloaderTrack: '#D8D0C0',
    preloaderFill: 'from-[#DFC07B] via-[#A68038] to-[#DFC07B]',
    debossedNameClass: 'emerald-debossed-name',
    debossedInkClass: 'emerald-debossed-ink',
    embossedAccentClass: 'emerald-embossed-gold',
    nacreButtonClass: 'emerald-nacre-button',
    pearlBeadClass: 'emerald-pearl-bead',
    accentHex: '#C9A461',
    accentDeepHex: '#8C6A30',
    secondaryTextHex: '#284A3A',
    subtleLinkHex: '#1F3F30',
    subtleLinkHoverHex: '#0F2E22',
    assets: {
      innerCardBg: '/assets/themes/emerald/card-bg.webp',
      dateMedallion: '/assets/themes/emerald/date-medallion.webp',
      dayTimePlaque: '/assets/themes/emerald/day-time-plaque.webp',
      titlePlaque: '/assets/themes/emerald/title-plaque.webp',
      venueArchFrame: '/assets/themes/emerald/venue-arch-frame.webp',
      sealCameo: '/assets/themes/emerald/seal-cameo.png',
    },
    timing: { ...IVORY_BENCHMARK_TIMING },
  },

  noir: {
    id: 'noir',
    route: '/noir',
    number: '04',
    name: 'The Noir',
    themeTitle: 'Fifth Avenue Pearl & Champagne · New York Wedding',
    culturalSubtitle: 'The Plaza Hotel · New York City, USA',
    openingStyle: 'Architectural Shutter Reveal',
    shortDescription:
      'Luminous pearl silk, warm rose-champagne, brushed gold and espresso-noir editorial typography crafted for a Fifth Avenue celebration at The Plaza.',
    palette: [
      { name: 'Pearl Silk', hex: '#FAF7F2' },
      { name: 'Rose Champagne', hex: '#E8D5C4' },
      { name: 'Brushed Gold', hex: '#C59B58' },
      { name: 'Espresso Noir', hex: '#231F20' },
    ],
    studioBgColor: '#E5D9CC',
    studioRadialGradient:
      'radial-gradient(ellipse at 50% 28%, rgba(253, 249, 244, 0.94) 0%, rgba(235, 222, 208, 0.85) 55%, rgba(212, 195, 178, 0.96) 100%)',
    cardBgColor: '#FAF7F2',
    cardShadow:
      '0_32px_90px_-12px_rgba(42,32,24,0.28),0_12px_28px_-6px_rgba(42,32,24,0.16)',
    preloaderBg: '#FAF7F2',
    preloaderText: '#231F20',
    preloaderTrack: '#E5D9CC',
    preloaderFill: 'from-[#E8D5C4] via-[#C59B58] to-[#231F20]',
    debossedNameClass: 'noir-debossed-name',
    debossedInkClass: 'noir-debossed-ink',
    embossedAccentClass: 'noir-embossed-gold',
    nacreButtonClass: 'noir-nacre-button',
    pearlBeadClass: 'noir-pearl-bead',
    accentHex: '#C59B58',
    accentDeepHex: '#9E7638',
    secondaryTextHex: '#5C5048',
    subtleLinkHex: '#6E5E52',
    subtleLinkHoverHex: '#231F20',
    assets: {
      innerCardBg: '/assets/themes/noir/card-bg.webp',
      dateMedallion: '/assets/themes/noir/date-medallion.webp',
      dayTimePlaque: '/assets/themes/noir/day-time-plaque.webp',
      titlePlaque: '/assets/themes/noir/title-plaque.webp',
      venueArchFrame: '/assets/themes/noir/venue-arch-frame.webp',
      sealCameo: '/assets/themes/noir/seal-cameo.png',
    },
    timing: { ...IVORY_BENCHMARK_TIMING },
  },

  'chateau-blue': {
    id: 'chateau-blue',
    route: '/chateau-blue',
    number: '05',
    name: 'The Château Blue',
    themeTitle: 'English Country Estate Romance · British Wedding',
    culturalSubtitle: 'Blenheim Palace · Oxfordshire, England',
    openingStyle: 'Silk Ribbon & Trifold Reveal',
    shortDescription:
      'Powder blue, porcelain white and antique gold Regency stationery with fine architectural illustrations, engraved borders and a tactile ribbon-release unfolding.',
    palette: [
      { name: 'Powder Blue', hex: '#6E8FAD' },
      { name: 'Porcelain White', hex: '#FAFBFD' },
      { name: 'Antique Gold', hex: '#C4A265' },
      { name: 'Oxford Slate', hex: '#26394D' },
    ],
    studioBgColor: '#BCCAD8',
    studioRadialGradient:
      'radial-gradient(ellipse at 50% 30%, rgba(242, 246, 251, 0.90) 0%, rgba(206, 218, 230, 0.82) 55%, rgba(168, 185, 204, 0.96) 100%)',
    cardBgColor: '#FAFBFD',
    cardShadow:
      '0_32px_90px_-12px_rgba(32,50,70,0.36),0_12px_28px_-6px_rgba(32,50,70,0.22)',
    preloaderBg: '#EEF3F8',
    preloaderText: '#486480',
    preloaderTrack: '#C9D6E3',
    preloaderFill: 'from-[#CFD9E5] via-[#6884A0] to-[#C4A265]',
    debossedNameClass: 'chateau-debossed-name',
    debossedInkClass: 'chateau-debossed-ink',
    embossedAccentClass: 'chateau-embossed-silver',
    nacreButtonClass: 'chateau-nacre-button',
    pearlBeadClass: 'chateau-pearl-bead',
    accentHex: '#C4A265',
    accentDeepHex: '#8C6B32',
    secondaryTextHex: '#465B70',
    subtleLinkHex: '#566E86',
    subtleLinkHoverHex: '#26394D',
    assets: {
      innerCardBg: '/assets/themes/chateau-blue/card-bg.webp',
      dateMedallion: '/assets/themes/chateau-blue/date-medallion.webp',
      dayTimePlaque: '/assets/themes/chateau-blue/day-time-plaque.webp',
      titlePlaque: '/assets/themes/chateau-blue/title-plaque.webp',
      venueArchFrame: '/assets/themes/chateau-blue/venue-arch-frame.webp',
      sealCameo: '/assets/themes/chateau-blue/seal-cameo.png',
    },
    timing: { ...IVORY_BENCHMARK_TIMING },
  },

  'golden-rose': {
    id: 'golden-rose',
    route: '/golden-rose',
    number: '06',
    name: 'The Golden Rose',
    themeTitle: 'Luminous Amber & Golden Rose · Provence Wedding',
    culturalSubtitle: 'Château de Tourreau · Provence, France',
    openingStyle: 'Four-Flap Golden Envelope',
    shortDescription:
      'Warm bronze-amber four-flap envelope with illuminated golden rose line-art reliefs, a radiant monogram wax seal, and a continuous vertical Provence estate suite.',
    palette: [
      { name: 'Espresso Bronze', hex: '#4A2C18' },
      { name: 'Luminous Gold', hex: '#E5B869' },
      { name: 'Provence Cream', hex: '#FBF5EA' },
      { name: 'Rosewood Amber', hex: '#8C5836' },
    ],
    studioBgColor: '#E8DAC8',
    studioRadialGradient:
      'radial-gradient(ellipse at 50% 28%, rgba(254, 248, 238, 0.94) 0%, rgba(236, 220, 198, 0.86) 55%, rgba(212, 190, 162, 0.96) 100%)',
    cardBgColor: '#FBF5EA',
    cardShadow:
      '0_32px_90px_-12px_rgba(18,10,5,0.72),0_0_40px_-8px_rgba(229,184,105,0.25)',
    preloaderBg: '#362013',
    preloaderText: '#F2CF88',
    preloaderTrack: '#5C3A22',
    preloaderFill: 'from-[#F5D99B] via-[#C99242] to-[#F5D99B]',
    debossedNameClass: 'lacy-debossed-name',
    debossedInkClass: 'lacy-debossed-ink',
    embossedAccentClass: 'lacy-embossed-gold',
    nacreButtonClass: 'lacy-nacre-button',
    pearlBeadClass: 'lacy-pearl-bead',
    accentHex: '#C99648',
    accentDeepHex: '#8C5A28',
    secondaryTextHex: '#6E5038',
    subtleLinkHex: '#7D5C42',
    subtleLinkHoverHex: '#3B2314',
    assets: {
      innerCardBg: '/assets/themes/golden-rose/card-bg.webp',
      dateMedallion: '/assets/lacy/date-medallion.webp',
      dayTimePlaque: '/assets/lacy/day-time-plaque.webp',
      titlePlaque: '/assets/lacy/title-plaque.webp',
      venueArchFrame: '/assets/lacy/venue-arch-frame.webp',
      sealCameo: '/assets/lacy/seal-cameo.png',
    },
    timing: { ...IVORY_BENCHMARK_TIMING },
  },
};

export const LUXURY_THEME_LIST: LuxuryThemeSpec[] = [
  LUXURY_THEMES.ivory,
  LUXURY_THEMES.blush,
  LUXURY_THEMES.emerald,
  LUXURY_THEMES.noir,
  LUXURY_THEMES['chateau-blue'],
  LUXURY_THEMES['golden-rose'],
];
