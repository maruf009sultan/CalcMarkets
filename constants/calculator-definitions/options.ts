import type { Calculator } from '../../types';
import { blackScholesCalculator } from './individual/options/blackScholes';
import { impliedVolatilityCalculator } from './individual/options/impliedVolatility';
import { optionsProfitCalculator } from './individual/options/optionsProfit';
import { coveredCallCalculator } from './individual/options/coveredCall';
import { optionsGreeksCalculator } from './individual/options/optionsGreeks';
import { binomialOptionsCalculator } from './individual/options/binomialOptions';
import { trinomialOptionsCalculator } from './individual/options/trinomialOptions';
import { greeksSensitivityCalculator } from './individual/options/greeksSensitivity';
import { gexCalculator } from './individual/options/gex';
import { thetaDecayCalculator } from './individual/options/thetaDecay';
import { syntheticPositionCalculator } from './individual/options/syntheticPosition';
import { assignmentProbabilityCalculator } from './individual/options/assignmentProbability';
import { riskNeutralProbabilityCalculator } from './individual/options/riskNeutralProbability';
import { volatilitySurfaceInterpolatorCalculator } from './individual/options/volatilitySurfaceInterpolator';
import { putCallParityCalculator } from './individual/options/putCallParity';
import { skewSmileCalculator } from './individual/options/skewSmile';
import { optionsArbitrageCheckerCalculator } from './individual/options/optionsArbitrage';

export const optionsCalculators: Calculator[] = [
    blackScholesCalculator,
    impliedVolatilityCalculator,
    optionsProfitCalculator,
    coveredCallCalculator,
    optionsGreeksCalculator,
    binomialOptionsCalculator,
    trinomialOptionsCalculator,
    greeksSensitivityCalculator,
    gexCalculator,
    thetaDecayCalculator,
    syntheticPositionCalculator,
    assignmentProbabilityCalculator,
    riskNeutralProbabilityCalculator,
    volatilitySurfaceInterpolatorCalculator,
    putCallParityCalculator,
    skewSmileCalculator,
    optionsArbitrageCheckerCalculator,
];
