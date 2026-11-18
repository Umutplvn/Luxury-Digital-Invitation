import type { InvitationConfig } from '../../config/invitationConfig';
import type { LuxuryThemeSpec } from '../../config/themeRegistry';

export type OpeningStage =
  | 'closed'
  | 'seal-interaction'
  | 'unfastening'
  | 'opening-doors'
  | 'revealing-interior'
  | 'opened';

export interface ThemeOpeningProps {
  config: InvitationConfig;
  theme: LuxuryThemeSpec;
  stage: OpeningStage;
  onTriggerOpen: () => void;
  onStartInteriorReveal?: () => void;
  onOpeningComplete?: () => void;
}
