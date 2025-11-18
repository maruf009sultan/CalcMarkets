export type InputType = 'number' | 'text' | 'textarea';

export interface InputDefinition {
    name: string;
    label: string;
    type: InputType;
    placeholder: string;
    defaultValue?: string;
    info?: string;
}

export type KeyValueResult = {
    value: string | number;
    label: string;
    info?: string;
};

export type TableResult = {
    headers: string[];
    rows: (string | number)[][];
};

export type CalculationResult = 
    | KeyValueResult
    | { error: string }
    | { table: TableResult; label: string };

// FIX: Add Calculator interface definition.
export interface Calculator {
    id: string;
    name: string;
    description: string;
    category: string;
    inputs: InputDefinition[];
    calculate: (inputs: { [key: string]: string | number }) => CalculationResult | CalculationResult[];
}