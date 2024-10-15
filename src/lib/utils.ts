import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result?.toString().split(',')[1];
      if (base64Data) {
        resolve(base64Data);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
};