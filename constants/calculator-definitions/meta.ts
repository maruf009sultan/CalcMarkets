import type { Calculator } from '../../types';
import { tradeOutcomeSimulatorCalculator } from './individual/meta/tradeOutcomeSimulator';
import { multiTradeAnalyzerCalculator } from './individual/meta/multiTradeAnalyzer';
import { statisticalEdgeCalculator } from './individual/meta/statisticalEdge';
import { profitDistributionVisualizerCalculator } from './individual/meta/profitDistributionVisualizer';

export const metaCalculators: Calculator[] = [
    tradeOutcomeSimulatorCalculator,
    multiTradeAnalyzerCalculator,
    statisticalEdgeCalculator,
    profitDistributionVisualizerCalculator,
];