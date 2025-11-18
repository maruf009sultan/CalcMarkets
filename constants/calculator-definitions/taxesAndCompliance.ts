import type { Calculator } from '../../types';
import { cryptoTaxCalculator } from './individual/crypto/cryptoTax';
import { washSaleDetectorCalculator } from './individual/taxesAndCompliance/washSaleDetector';

export const taxesAndComplianceCalculators: Calculator[] = [
    cryptoTaxCalculator,
    washSaleDetectorCalculator,
];
