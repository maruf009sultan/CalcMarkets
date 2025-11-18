import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const tradeDurationCalculator: Calculator = {
    id: 'trade-duration',
    name: 'Trade Duration',
    description: 'Calculate the duration of a trade in various units.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'entryTime', label: 'Entry Timestamp', type: 'text', placeholder: '2023-10-27 09:30:00', info: 'Format: YYYY-MM-DD HH:MM:SS' },
        { name: 'exitTime', label: 'Exit Timestamp', type: 'text', placeholder: '2023-10-27 15:45:00', info: 'Format: YYYY-MM-DD HH:MM:SS' },
    ],
    calculate: (i) => {
        const entry = new Date(i.entryTime as string).getTime();
        const exit = new Date(i.exitTime as string).getTime();
        if (isNaN(entry) || isNaN(exit)) return { error: 'Invalid date format.' };
        const diffMs = exit - entry;
        if (diffMs < 0) return { error: 'Exit time cannot be before entry time.' };
        const diffSecs = diffMs / 1000;
        const diffMins = diffSecs / 60;
        const diffHours = diffMins / 60;
        return [
            { label: 'Duration (Hours)', value: formatNumber(diffHours, 2) },
            { label: 'Duration (Minutes)', value: formatNumber(diffMins, 2) },
            { label: 'Duration (Seconds)', value: formatNumber(diffSecs, 0) },
        ];
    }
};