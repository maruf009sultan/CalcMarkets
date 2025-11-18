import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const naturalGasConverterCalculator: Calculator = {
    id: 'natural-gas-converter',
    name: 'Natural Gas Converter',
    description: 'Convert between common natural gas units (MMBtu, therms, kWh).',
    category: 'Commodities & Niche',
    inputs: [
        { name: 'value', label: 'Value', type: 'number', placeholder: '1' },
        { name: 'fromUnit', label: 'From Unit', type: 'text', placeholder: 'MMBtu', info: 'Enter MMBtu, therm, or kWh' },
    ],
    calculate: (i) => {
        const value = i.value as number;
        const fromUnit = (i.fromUnit as string).toLowerCase();

        let valueInMMBtu = 0;
        if (fromUnit === 'mmbtu') {
            valueInMMBtu = value;
        } else if (fromUnit === 'therm') {
            valueInMMBtu = value / 10;
        } else if (fromUnit === 'kwh') {
            valueInMMBtu = value / 293.071;
        } else {
            return { error: 'Invalid "From Unit". Use MMBtu, therm, or kWh.' };
        }

        const valueInTherms = valueInMMBtu * 10;
        const valueInKwh = valueInMMBtu * 293.071;

        return [
            { label: 'MMBtu (Million British Thermal Units)', value: formatNumber(valueInMMBtu, 4) },
            { label: 'Therms', value: formatNumber(valueInTherms, 4) },
            { label: 'kWh (Kilowatt-hours)', value: formatNumber(valueInKwh, 4) },
        ];
    },
};
