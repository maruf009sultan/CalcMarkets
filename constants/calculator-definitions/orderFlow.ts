import type { Calculator } from '../../types';
import { orderFlowImbalanceCalculator } from './individual/orderFlow/orderFlowImbalance';
import { liquidityHeatmapCalculator } from './individual/orderFlow/liquidityHeatmap';
import { effectiveSlippageEstimatorCalculator } from './individual/orderFlow/effectiveSlippageEstimator';
import { feeAdjustedBreakEvenCalculator } from './individual/orderFlow/feeAdjustedBreakEven';
import { microstructureNoiseFilterCalculator } from './individual/orderFlow/microstructureNoiseFilter';
import { latencyCostEstimatorCalculator } from './individual/orderFlow/latencyCostEstimator';

export const orderFlowCalculators: Calculator[] = [
    orderFlowImbalanceCalculator,
    liquidityHeatmapCalculator,
    effectiveSlippageEstimatorCalculator,
    feeAdjustedBreakEvenCalculator,
    microstructureNoiseFilterCalculator,
    latencyCostEstimatorCalculator,
];
