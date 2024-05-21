// validators.ts
export const validateRow = (row: any, requiredFields: string[]): boolean => {
    return requiredFields.every(field => row[field] !== '' && row[field] !== null && row[field] !== undefined);
};

export const validateAllRows = (rows: any[], requiredFields: string[]): boolean => {
    return rows.every(row => validateRow(row, requiredFields));
};