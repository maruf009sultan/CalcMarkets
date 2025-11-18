import type { Calculator } from '../../types';
import { keltnerChannelCalculator } from './individual/advancedTradingAnalytics/keltnerChannel';
import { donchianChannelsCalculator } from './individual/advancedTradingAnalytics/donchianChannels';
import { ichimokuCloudCalculator } from './individual/advancedTradingAnalytics/ichimokuCloud';
import { vcpCalculator } from './individual/advancedTradingAnalytics/vcp';
import { meanReversionScoreCalculator } from './individual/advancedTradingAnalytics/meanReversionScore';

export const advancedTradingAnalyticsCalculators: Calculator[] = [
    keltnerChannelCalculator,
    donchianChannelsCalculator,
    ichimokuCloudCalculator,
    vcpCalculator,
    meanReversionScoreCalculator,
];
