import type { Calculator } from '../../types';
import { cryptoProfitCalculator } from './individual/crypto/cryptoProfit';
import { impermanentLossGainCalculator } from './individual/crypto/impermanentLossGain';
import { lpRoiCalculator } from './individual/crypto/lpRoi';
import { cryptoStakingCalculator } from './individual/crypto/cryptoStaking';
import { ammSlippageCalculator } from './individual/crypto/ammSlippage';
import { cryptoTaxCalculator } from './individual/crypto/cryptoTax';
import { gasFeeCalculator } from './individual/crypto/gasFee';
import { defiApyCalculator } from './individual/crypto/defiApy';
import { miningProfitabilityCalculator } from './individual/crypto/miningProfitability';
import { tokenEmissionsCalculator } from './individual/crypto/tokenEmissions';
import { stablecoinYieldAggregatorCalculator } from './individual/crypto/stablecoinYieldAggregator';
import { validatorRewardsCalculator } from './individual/crypto/validatorRewards';
import { l2CostComparisonCalculator } from './individual/crypto/l2CostComparison';
import { lpImpermanentGainZonesCalculator } from './individual/crypto/lpImpermanentGainZones';
import { yieldFarmingRoiCalculator } from './individual/crypto/yieldFarmingRoi';
import { rebaseTokenCalculator } from './individual/crypto/rebaseToken';
import { miningBreakEvenTimeCalculator } from './individual/crypto/miningBreakEvenTime';

export const cryptoCalculators: Calculator[] = [
    cryptoProfitCalculator,
    impermanentLossGainCalculator,
    lpRoiCalculator,
    cryptoStakingCalculator,
    ammSlippageCalculator,
    cryptoTaxCalculator,
    gasFeeCalculator,
    defiApyCalculator,
    miningProfitabilityCalculator,
    tokenEmissionsCalculator,
    stablecoinYieldAggregatorCalculator,
    validatorRewardsCalculator,
    l2CostComparisonCalculator,
    lpImpermanentGainZonesCalculator,
    yieldFarmingRoiCalculator,
    rebaseTokenCalculator,
    miningBreakEvenTimeCalculator,
];
