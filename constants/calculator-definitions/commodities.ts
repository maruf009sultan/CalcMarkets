import type { Calculator } from '../../types';
import { copperPlatinumPlCalculator } from './individual/commodities/copperPlatinumPl';
import { carbonCreditPlCalculator } from './individual/commodities/carbonCreditPl';
import { weatherDerivativesCalculator } from './individual/commodities/weatherDerivatives';
import { electricityFuturesPlCalculator } from './individual/commodities/electricityFuturesPl';
import { shippingFreightIndexCalculator } from './individual/commodities/shippingFreightIndex';
import { brentWtiSpreadCalculator } from './individual/commodities/brentWtiSpread';
import { grainFuturesPlCalculator } from './individual/commodities/grainFuturesPl';
import { naturalGasConverterCalculator } from './individual/commodities/naturalGasConverter';

export const commoditiesCalculators: Calculator[] = [
    copperPlatinumPlCalculator,
    carbonCreditPlCalculator,
    weatherDerivativesCalculator,
    electricityFuturesPlCalculator,
    shippingFreightIndexCalculator,
    brentWtiSpreadCalculator,
    grainFuturesPlCalculator,
    naturalGasConverterCalculator,
];
