import { MessageInstance } from "antd/es/message/interface";
import { clsx, type ClassValue } from "clsx"
import { NavigateFunction } from "react-router-dom";
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


export const getTyreLayout = (totalTyres: number, totalAxles: number, axtyre: string, isSelectOption?: boolean): {
  // left: string;
  // right: string;
  // EachSideWheelCount: number;
  position: string;
  value?: string;
  label?: string;
}[] => {

  console.log(totalTyres, totalAxles, axtyre);
  const parsedAxTyre = JSON.parse(axtyre);
  console.log(parsedAxTyre);


  const layout = [];
  console.log(totalTyres, totalAxles, axtyre);

  for (let axle = 0; axle < totalAxles; axle++) {
    const axleTyres = parsedAxTyre[axle].tyre; // Number of tyres on this axle
    for (let side = 0; side < axleTyres; side++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isSelectOption ? layout.push(
        { position: `${axle + 1}L${side}`, value: `${axle + 1}L${side}`, label: `${axle + 1}L${side}` }, // Left side
        { position: `${axle + 1}R${side}`, value: `${axle + 1}R${side}`, label: `${axle + 1}R${side}` }  // Right
      ) : layout.push(
        { position: `${axle + 1}L${side}` }, // Left side
        { position: `${axle + 1}R${side}` }  // Right side
        // {
        //     left: `${axle + 1}L${side}`,
        //     right: `${axle + 1}R${side}`,
        //     EachSideWheelCount: axleTyres
        // }
      );
    }
  }

  return layout;
}


export const Logout = ({
  navigate,
  message
}: {
  navigate: NavigateFunction;
  message: MessageInstance;
}) => {
  if (confirm("Are you sure you want to logout?")) {
    message.success("Logout Successful");
    // jwt: string;
    // customer_id: string;
    // role: string;
    // login_id: string;
    // driver: null;

    localStorage.removeItem("jwt");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("role");
    localStorage.removeItem("login_id");
    localStorage.removeItem("driver");
    navigate('/auth/login');
  } else {
    message.error("Logout Cancelled");
  }

}