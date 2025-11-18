import type { Calculator } from '../../types';
import { movingAverageCalculator } from './individual/marketAnalysis/movingAverage';
import { vwapTwapCalculator } from './individual/marketAnalysis/vwapTwap';
import { realizedVolatilityCalculator } from './individual/marketAnalysis/realizedVolatility';
import { alphaBetaCalculator } from './individual/marketAnalysis/alphaBeta';
import { mfeMaeCalculator } from './individual/marketAnalysis/mfeMae';
import { historicalVolatilityCalculator } from './individual/marketAnalysis/historicalVolatility';
import { marketCorrelationCalculator } from './individual/marketAnalysis/marketCorrelation';
import { priceElasticityCalculator } from './individual/marketAnalysis/priceElasticity';
import { stdDevPriceRangeCalculator } from './individual/marketAnalysis/stdDevPriceRange';
import { tradeDurationCalculator } from './individual/marketAnalysis/tradeDuration';
import { zScoreCalculator } from './individual/marketAnalysis/zScore';
import { fvgCalculator } from './individual/marketAnalysis/fvg';
import { premiumDiscountCalculator } from './individual/marketAnalysis/premiumDiscount';

export const marketAnalysisCalculators: Calculator[] = [
    movingAverageCalculator,
    vwapTwapCalculator,
    realizedVolatilityCalculator,
    alphaBetaCalculator,
    mfeMaeCalculator,
    historicalVolatilityCalculator,
    marketCorrelationCalculator,
    priceElasticityCalculator,
    stdDevPriceRangeCalculator,
    tradeDurationCalculator,
    zScoreCalculator,
    fvgCalculator,
    premiumDiscountCalculator,
];
