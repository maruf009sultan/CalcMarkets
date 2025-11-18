import type { Calculator, CalculationResult } from '../../../../types';
import { parseSeries, formatPercent } from '../../../../utils/helpers';

export const vcpCalculator: Calculator = {
    id: 'vcp-calculator',
    name: 'Volatility Contraction Pattern (VCP)',
    description: 'Detects potential VCP (Mark Minervini) characteristics in a price series.',
    category: 'Advanced Trading Analytics',
    inputs: [
        { name: 'prices', label: 'Closing Prices', type: 'textarea', placeholder: '100, 110, 105, 115, 112, 120, 118, ...', info: 'Provide a series of prices representing a potential base.' },
    ],
    calculate: (i): CalculationResult => {
        const prices = parseSeries(i.prices as string);
        if (prices.length < 20) return { error: 'A longer price series is needed to detect a VCP.' };

        const contractions = [];
        let searchPrices = [...prices];
        let baseHigh = Math.max(...searchPrices);
        
        for (let c = 0; c < 5; c++) { // Look for up to 5 contractions
            const high = Math.max(...searchPrices);
            const highIndex = searchPrices.lastIndexOf(high);
            if(highIndex < 1) break;

            const lowPricesAfterHigh = searchPrices.slice(highIndex);
            const low = Math.min(...lowPricesAfterHigh);
            const correction = (high - low) / high;
            
            contractions.push({ depth: correction, high, low });
            
            const lowIndex = searchPrices.lastIndexOf(low);
            if (lowIndex + 1 >= searchPrices.length) break;
            searchPrices = searchPrices.slice(lowIndex + 1);
            if (searchPrices.length < 5) break;
        }

        if (contractions.length < 2) {
            return { label: 'VCP Status', value: 'Not a clear VCP. Fewer than 2 contractions found.' };
        }

        const headers = ['Contraction #', 'Depth', 'High', 'Low'];
        const rows = contractions.map((c, index) => [index+1, formatPercent(c.depth), c.high, c.low]);
        
        let isVCP = true;
        for (let i=1; i < contractions.length; i++) {
            if (contractions[i].depth > contractions[i-1].depth) {
                isVCP = false; // Volatility should decrease
            }
        }
        
        const finalMessage = isVCP ? 'Characteristics of a VCP are present (volatility is contracting).' : 'Pattern found, but volatility is not consistently contracting.';
        
        return {
            label: finalMessage,
            table: { headers, rows }
        };
    },
};
