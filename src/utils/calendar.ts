import type { InvitationConfig } from '../config/invitationConfig';

/**
 * ISO tarih dizgesini RFC 5545 (.ics) UTC tarih biçimine dönüştürür.
 */
function formatIcsUtcDate(isoString: string): string {
  const date = new Date(isoString);
  const validDate = Number.isNaN(date.getTime())
    ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    : date;
  return validDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Takvim açıklaması içindeki özel karakterleri güvenli biçimde kaçış (escape) karakteriyle yazar.
 */
function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Davetiye bilgilerini kullanarak standartlara uygun bir .ics takvim dosyası
 * oluşturur ve tarayıcı üzerinden indirilmesini sağlar.
 */
export function downloadWeddingIcs(config: InvitationConfig): void {
  const coupleTitle = `${config.couple.partnerOne} ${config.couple.conjunction} ${config.couple.partnerTwo} — ${config.eventType}`;
  const dtStart = formatIcsUtcDate(config.date.isoStartDateTime);
  const dtEnd = formatIcsUtcDate(config.date.isoEndDateTime);
  const dtStamp = formatIcsUtcDate(new Date().toISOString());
  const location = `${config.venue.name}, ${config.venue.location}`;
  const description = `${config.invitationMessage}\n\nDate: ${config.date.fullDateDisplay}\nTime: ${config.date.timeDisplay}\nVenue: ${config.venue.name} (${config.venue.location})\nMap: ${config.venue.mapUrl}`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lacy Deluxe//Luxury Digital Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-invitation-${Date.now()}@lacydeluxe.invitation`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(coupleTitle)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `URL:${config.venue.mapUrl}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${escapeIcsText(coupleTitle)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const icsContent = icsLines.join('\r\n');
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  const safeName = `${config.couple.partnerOne}-${config.couple.partnerTwo}-wedding`
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-|-$/g, '');
  link.setAttribute('download', `${safeName || 'wedding-invitation'}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}
