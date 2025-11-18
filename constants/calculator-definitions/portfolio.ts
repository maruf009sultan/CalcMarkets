import type { Calculator } from '../../types';
import { cagrCalculator } from './individual/portfolio/cagr';
import { ratiosCalculator } from './individual/portfolio/ratios';
import { kellyCriterionCalculator } from './individual/portfolio/kellyCriterion';
import { compoundGrowthCalculator } from './individual/portfolio/compoundGrowth';
import { portfolioRebalancingCalculator } from './individual/portfolio/portfolioRebalancing';
import { waccCalculator } from './individual/portfolio/wacc';
import { dripCalculator } from './individual/portfolio/drip';
import { diversificationScoreCalculator } from './individual/portfolio/diversificationScore';
import { equityCurveSmoothnessCalculator } from './individual/portfolio/equityCurveSmoothness';
import { reinvestmentRateCalculator } from './individual/portfolio/reinvestmentRate';
import { rollingSharpeVolatilityCalculator } from './individual/portfolio/rollingSharpeVolatility';
import { kellyVsOptimalFCalculator } from './individual/portfolio/kellyVsOptimalF';
import { twrCalculator } from './individual/portfolio/twr';
import { mwrCalculator } from './individual/portfolio/mwr';


export const portfolioStrategyCalculators: Calculator[] = [
    cagrCalculator,
    ratiosCalculator,
    kellyCriterionCalculator,
    compoundGrowthCalculator,
    portfolioRebalancingCalculator,
    waccCalculator,
    dripCalculator,
    diversificationScoreCalculator,
    equityCurveSmoothnessCalculator,
    reinvestmentRateCalculator,
    rollingSharpeVolatilityCalculator,
    kellyVsOptimalFCalculator,
    twrCalculator,
    mwrCalculator,
];
