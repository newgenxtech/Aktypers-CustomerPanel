export const trimAndConvertToNumber = (name: string, filteredStringName: string, replacement: string) => {
    return parseInt(name.replace(filteredStringName, replacement), 10);
};