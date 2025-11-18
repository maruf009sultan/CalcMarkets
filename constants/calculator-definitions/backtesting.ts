import type { Calculator } from '../../types';
import { annualizedReturnCalculator } from './individual/backtesting/annualizedReturn';
import { positionHeatmapCalculator } from './individual/backtesting/positionHeatmap';
import { randomizedTradeGeneratorCalculator } from './individual/backtesting/randomizedTradeGenerator';
import { sqnCalculator } from './individual/backtesting/sqn';

export const backtestingCalculators: Calculator[] = [
    annualizedReturnCalculator,
    positionHeatmapCalculator,
    randomizedTradeGeneratorCalculator,
    sqnCalculator,
];
