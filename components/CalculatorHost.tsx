import React, { useState, useCallback } from 'react';
import type { Calculator, CalculationResult } from '../types';

interface CalculatorHostProps {
    calculator: Calculator;
    onBack: () => void;
}

const TooltipIcon: React.FC<{ info: string }> = ({ info }) => {
    return (
        <div className="group relative flex items-center ml-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500 hover:text-slate-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-slate-800 text-slate-200 text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border border-slate-700 shadow-lg">
                {info}
            </div>
        </div>
    );
};

const InputField: React.FC<{
    definition: Calculator['inputs'][0];
    value: string;
    onChange: (name: string, value: string) => void;
}> = ({ definition, value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(definition.name, e.target.value);
    };

    const commonProps = {
        id: definition.name,
        name: definition.name,
        value: value,
        onChange: handleChange,
        placeholder: definition.placeholder,
        className: "w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-slate-200 placeholder-slate-500"
    };

    return (
        <div className="mb-4">
            <div className="flex items-center mb-1.5">
                <label htmlFor={definition.name} className="block text-sm font-medium text-slate-300">{definition.label}</label>
                {definition.info && <TooltipIcon info={definition.info} />}
            </div>
            {definition.type === 'textarea' ? (
                <textarea {...commonProps} rows={4} />
            ) : (
                <input {...commonProps} type={definition.type} />
            )}
        </div>
    );
};

const ResultDisplay: React.FC<{ results: CalculationResult[] | CalculationResult | null }> = ({ results }) => {
    if (!results) return null;

    const resultsArray = Array.isArray(results) ? results : [results];

    const errorResult = resultsArray.find(r => 'error' in r) as { error: string } | undefined;
    if (errorResult) {
        return (
            <div className="bg-red-900/50 border border-red-500/30 text-red-400 p-4 rounded-lg">
                <p className="font-semibold">Error</p>
                <p>{errorResult.error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {resultsArray.map((res, index) => {
                if ('table' in res) {
                    return (
                        <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                             <h4 className="text-md font-semibold text-slate-200 p-4 bg-slate-800/70">{res.label}</h4>
                             <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-700/50 text-xs text-slate-300 uppercase">
                                        <tr>
                                            {res.table.headers.map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {res.table.rows.map((row, rIndex) => (
                                            <tr key={rIndex} className="hover:bg-slate-800/60">
                                                {row.map((cell, cIndex) => <td key={cIndex} className="px-4 py-3">{cell}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                        </div>
                    );
                }
                if ('value' in res) {
                    return (
                       <div key={index} className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center">
                            <div className="flex items-center">
                                <p className="text-slate-400 font-medium">{res.label}:</p>
                                {res.info && <TooltipIcon info={res.info} />}
                            </div>
                            <p className="text-xl font-bold text-white text-left sm:text-right">{res.value}</p>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};


export const CalculatorHost: React.FC<CalculatorHostProps> = ({ calculator, onBack }) => {
    const initialInputs = calculator.inputs.reduce((acc, input) => {
        acc[input.name] = input.defaultValue || '';
        return acc;
    }, {} as { [key: string]: string });

    const [inputs, setInputs] = useState(initialInputs);
    const [results, setResults] = useState<CalculationResult[] | CalculationResult | null>(null);

    const handleInputChange = useCallback((name: string, value: string) => {
        setInputs(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            // Enhanced Validation
            const parsedInputs: { [key: string]: number | string } = {};
            for (const key in inputs) {
                const value = inputs[key];
                const inputDef = calculator.inputs.find(i => i.name === key);
                
                if (inputDef?.type === 'number') {
                    if (value === '') { // Allow empty for optional fields, handled in calculator logic
                        parsedInputs[key] = '';
                        continue;
                    }
                    if (value.includes(',')) { // Don't parse series data as a single number
                        parsedInputs[key] = value;
                        continue;
                    }
                    const num = parseFloat(value);
                    if (isNaN(num)) {
                        throw new Error(`Invalid number for "${inputDef.label}". Please enter a valid number.`);
                    }
                    parsedInputs[key] = num;
                } else {
                    parsedInputs[key] = value;
                }
            }

            const result = calculator.calculate(parsedInputs);
            setResults(result);
        } catch (error) {
            setResults({ error: error instanceof Error ? error.message : "An unexpected error occurred." });
        }
    };
    
    const handleReset = () => {
        setInputs(initialInputs);
        setResults(null);
    }

    return (
        <div className="max-w-4xl mx-auto">
             <div className="mb-6">
                 <button onClick={onBack} className="flex items-center text-sm text-indigo-400 font-semibold hover:text-indigo-300 transition-colors duration-200">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                     </svg>
                    Back to all calculators
                 </button>
            </div>
            <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-black/20 border border-slate-800">
                <header className="mb-6 pb-6 border-b border-slate-800">
                    <h2 className="text-3xl font-bold text-white">{calculator.name}</h2>
                    <p className="text-slate-400 mt-2">{calculator.description}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    <form onSubmit={handleCalculate} onReset={handleReset}>
                        <div className="space-y-4">
                            {calculator.inputs.map(def => (
                                <InputField
                                    key={def.name}
                                    definition={def}
                                    value={inputs[def.name]}
                                    onChange={handleInputChange}
                                />
                            ))}
                        </div>
                        <div className="flex items-center space-x-4 mt-8">
                             <button type="submit" className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200">
                                Calculate
                            </button>
                            <button type="reset" className="flex-1 bg-slate-700 text-slate-300 font-semibold py-3 px-6 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-all duration-200">
                                Reset
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 md:mt-0">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">Results</h3>
                        <div className="min-h-[150px]">
                          <ResultDisplay results={results} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};