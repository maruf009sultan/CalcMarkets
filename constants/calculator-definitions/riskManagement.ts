import type { Calculator } from '../../types';
import { positionSizeCalculator } from './individual/riskManagement/positionSize';
import { riskRewardRatioCalculator } from './individual/riskManagement/riskRewardRatio';
import { stopLossTakeProfitCalculator } from './individual/riskManagement/stopLossTakeProfit';
import { drawdownCalculator } from './individual/riskManagement/drawdown';
import { marginCalculator } from './individual/riskManagement/margin';
import { trailingStopCalculator } from './individual/riskManagement/trailingStop';
import { varCvarCalculator } from './individual/riskManagement/varCvar';
import { kellyFractionCalculator } from './individual/riskManagement/kellyFraction';
import { winProbabilityCalculator } from './individual/riskManagement/winProbability';
import { riskOfRuinCalculator } from './individual/riskManagement/riskOfRuin';
import { optimalStopLossAtrCalculator } from './individual/riskManagement/optimalStopLossAtr';
import { maxDrawdownRecoveryCalculator } from './individual/riskManagement/maxDrawdownRecovery';
import { hedgePositionCalculator } from './individual/riskManagement/hedgePosition';
import { portfolioRiskParityCalculator } from './individual/riskManagement/portfolioRiskParity';
import { equityCurveSimulatorCalculator } from './individual/riskManagement/equityCurveSimulator';
import { equityCurveDrawdownDistributionCalculator } from './individual/riskManagement/equityCurveDrawdownDistribution';

export const riskManagementCalculators: Calculator[] = [
    positionSizeCalculator,
    riskRewardRatioCalculator,
    stopLossTakeProfitCalculator,
    drawdownCalculator,
    marginCalculator,
    trailingStopCalculator,
    varCvarCalculator,
    kellyFractionCalculator,
    winProbabilityCalculator,
    riskOfRuinCalculator,
    optimalStopLossAtrCalculator,
    maxDrawdownRecoveryCalculator,
    hedgePositionCalculator,
    portfolioRiskParityCalculator,
    equityCurveSimulatorCalculator,
    equityCurveDrawdownDistributionCalculator,
];
