import type { Calculator } from '../../types';
import { currencyConverterCalculator } from './individual/forex/currencyConverter';
import { pipValueCalculator } from './individual/forex/pipValue';
import { lotSizeCalculator } from './individual/forex/lotSize';
import { futuresPlCalculator } from './individual/forex/futuresPl';
import { swapCalculator } from './individual/forex/swap';

export const forexCalculators: Calculator[] = [
    currencyConverterCalculator,
    pipValueCalculator,
    lotSizeCalculator,
    futuresPlCalculator,
    swapCalculator,
];
