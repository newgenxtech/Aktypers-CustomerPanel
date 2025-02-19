import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box, Cylinder, Html, OrbitControls } from "@react-three/drei";
import { ITyrePressure } from "./Tyre";

type IAxcelsData = {
  axlePositions: Array<[number, number, number]>;
  axleRadius: number;
  axleLength: number;
  rotation?: [number, number, number];
};

interface TruckProps {
  cabWidth: number;
  cabLength: number;
  trailerWidth: number;
  trailerLength: number;
  wheelRadius: number;
  wheelWidth: number;
  wheelPositions: Array<[number, number, number]>;
  axlesData: IAxcelsData[];
  TyrePressureData: ITyrePressure[];
}

const WheelAxelConstant = [
  {
    axlePositions: [[0, -0, 4.7]],
    axleRadius: 0.05,
    axleLength: 2,
    rotation: [0, 0, Math.PI / 2],
  },
  {
    axlePositions: [[0, -0, 3.3]],
    axleRadius: 0.05,
    axleLength: 2,
    rotation: [0, 0, Math.PI / 2],
  },
  {
    axlePositions: [[0, -0, 2.3]],
    axleRadius: 0.05,
    axleLength: 2,
    rotation: [0, 0, Math.PI / 2],
  },
  {
    axlePositions: [[0, -0, -0.85]],
    axleRadius: 0.05,
    axleLength: 8.3,
    rotation: [Math.PI / 2, 0, 0],
  },
  {
    axlePositions: [[0, -0, -3]],
    axleRadius: 0.05,
    axleLength: 2,
    rotation: [0, 0, Math.PI / 2],
  },
  {
    axlePositions: [[0, -0, -4]],
    axleRadius: 0.05,
    axleLength: 2,
    rotation: [0, 0, Math.PI / 2],
  },
  {
    axlePositions: [[0, -0, -5]],
    axleRadius: 0.05,
    axleLength: 2,
    rotation: [0, 0, Math.PI / 2],
  },
];

// const calcul;

const Truck: React.FC<TruckProps> = ({
  cabWidth,
  cabLength,
  trailerWidth,
  trailerLength,
  wheelRadius,
  wheelWidth,
  wheelPositions,
  // axlesData,
  TyrePressureData,
}) => {
  const renderWheels = () => {
    return wheelPositions.map((position, index) => {
      console.log(position, index, TyrePressureData[index].tyre_position);
      return <group key={index} position={position}>
        {/* Tire */}
        <Cylinder
          args={[wheelRadius, wheelRadius, wheelWidth, 32]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial color="black" />
          <Html>
            <div
              style={{
                color: "white",
                fontSize: "0.8rem",
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                marginLeft:
                  TyrePressureData[index]?.tyre_position?.includes("L")
                    ? TyrePressureData[index]?.tyre_position.includes("L1")
                      ? "2rem"
                      : "-2rem"
                    : TyrePressureData[index]?.tyre_position.includes("R")
                      ? TyrePressureData[index]?.tyre_position.includes("R1")
                        ? "-2rem"
                        : "2rem"
                      : "0rem",
              }}
            >
              <div style={{ marginBottom: "0.2rem" }}>
                {TyrePressureData[index]?.tyre_position}
              </div>
              <div style={{ color: "white" }}>
                {TyrePressureData[index]?.tyre_pressure}
              </div>
            </div>
          </Html>
        </Cylinder>
        {/* Rim */}
        <Cylinder
          args={[wheelRadius * 0.6, wheelRadius * 0.6, wheelWidth * 1.1, 32]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial color="gray" />
        </Cylinder>
      </group>
    });
  };

  // const renderAxles = (truckData: IAxcelsData[]) => {
  //   return truckData.map(
  //     ({ axlePositions, axleRadius, axleLength, rotation }) => {
  //       return axlePositions.map((position, index) => (
  //         <Cylinder
  //           key={index}
  //           args={[axleRadius, axleRadius, axleLength, 32]}
  //           position={position}
  //           rotation={rotation}
  //         >
  //           <meshStandardMaterial color="#71B9FF" />
  //         </Cylinder>
  //       ));
  //     },
  //   );
  // };

  return (
    <group>
      {/* Front Cab */}
      <Box args={[cabWidth, 1, cabLength]} position={[0, 0.7, 4]}>
        <meshStandardMaterial color="red" />
      </Box>

      {/* Trailer */}
      <Box args={[trailerWidth, 1.5, trailerLength]} position={[0, 0.8, -0.9]}>
        <meshStandardMaterial color="#D9D9D9" />
      </Box>

      {/* Axles */}
      {/* {renderAxles(axlesData)} */}

      {/* Wheels */}
      {renderWheels()}
    </group>
  );
};
interface Position {
  // left: string;
  // right: string;
  // EachSideWheelCount: number;
  position: string;
}
interface TruckCanvasProps {
  TyreData: Position[];
  TyreDetailData: {
    total_tyres: string;
    total_axles: string;
    axtyre: string;
    config: string;
    wheels: string;
  };
  TyrePressureData: ITyrePressure[];
}

const TruckCanvas: React.FC<TruckCanvasProps> = ({
  TyreData,
  TyreDetailData,
  TyrePressureData,
}) => {
  console.table(TyreData);

  console.table(TyreDetailData);
  console.table(TyrePressureData);

  const WheelPositionData = JSON.parse(TyreDetailData.config);
  console.log(WheelPositionData);

  const cabWidth = React.useMemo(() => 2, []);
  const cabLength = React.useMemo(() => 3, []);
  const trailerWidth = React.useMemo(() => 2.7, []);
  const trailerLength = React.useMemo(() => 9.5, []);
  const wheelRadius = React.useMemo(() => 0.4, []);
  const wheelWidth = React.useMemo(() => 0.2, []);

  const wheelPositions: Array<[number, number, number]> = React.useMemo(() => {
    return WheelPositionData[0].wheelPositions;

  }, [WheelPositionData]);

  const axlesData: IAxcelsData[] = React.useMemo(() => {
    const result = WheelPositionData[0].axlesData
      .map((isAxlePresent: boolean, index: number) => {
        if (isAxlePresent) {
          return WheelAxelConstant[index];
        }
      })
      .filter((item: undefined) => item !== undefined);
    console.log(result);

    return result;
  }, [WheelPositionData]);

  return (
    <Canvas
      camera={{
        // position: [90, -90, 0],
        position: [0, -90, 0],
        fov: 7,
        // scale: [1, 1, 1]
      }}
      className="bg-[#1F2324] rounded-lg mx-3"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Truck
        cabWidth={cabWidth}
        cabLength={cabLength}
        trailerWidth={trailerWidth}
        trailerLength={trailerLength}
        wheelRadius={wheelRadius}
        wheelWidth={wheelWidth}
        wheelPositions={wheelPositions}
        axlesData={axlesData}
        TyrePressureData={TyrePressureData}
      />
      <OrbitControls />
    </Canvas>
  );
};

export default TruckCanvas;
