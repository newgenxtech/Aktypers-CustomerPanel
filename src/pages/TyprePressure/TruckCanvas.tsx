import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, Cylinder, OrbitControls } from '@react-three/drei';
import { ITyrePressure } from './Tyre';

type IAxcelsData = {
    axlePositions: Array<[number, number, number]>;
    axleRadius: number;
    axleLength: number;
    rotation?: [number, number, number];
}

interface TruckProps {
    cabWidth: number;
    cabLength: number;
    trailerWidth: number;
    trailerLength: number;
    wheelRadius: number;
    wheelWidth: number;
    wheelPositions: Array<[number, number, number]>;
    axlesData: IAxcelsData[];
}



const WheelAxelConstant = [
    { axlePositions: [[0, -0, 4.7]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
    { axlePositions: [[0, -0, 3.3]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
    { axlePositions: [[0, -0, 2.3]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
    { axlePositions: [[0, -0, -0.85]], axleRadius: 0.05, axleLength: 8.3, rotation: [Math.PI / 2, 0, 0] },
    { axlePositions: [[0, -0, -3]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
    { axlePositions: [[0, -0, -4]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
    { axlePositions: [[0, -0, -5]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
]

const Truck: React.FC<TruckProps> = ({
    cabWidth,
    cabLength,
    trailerWidth,
    trailerLength,
    wheelRadius,
    wheelWidth,
    wheelPositions,
    axlesData
}) => {
    const renderWheels = () => {
        return wheelPositions.map((position, index) => (
            <group key={index} position={position}>
                {/* Tire */}
                <Cylinder
                    args={[wheelRadius, wheelRadius, wheelWidth, 32]}
                    rotation={[0, 0, Math.PI / 2]}
                >
                    <meshStandardMaterial color="black" />
                </Cylinder>
                {/* Rim */}
                <Cylinder
                    args={[wheelRadius * 0.6, wheelRadius * 0.6, wheelWidth * 1.1, 32]}
                    rotation={[0, 0, Math.PI / 2]}
                >
                    <meshStandardMaterial color="gray" />
                </Cylinder>
            </group>
        ));
    };

    const renderAxles = (truckData: IAxcelsData[]) => {
        return truckData.map(({ axlePositions, axleRadius, axleLength, rotation }) => {
            return axlePositions.map((position, index) => (
                <Cylinder
                    key={index}
                    args={[axleRadius, axleRadius, axleLength, 32]}
                    position={position}
                    rotation={rotation}

                >
                    <meshStandardMaterial color="#71B9FF" />
                </Cylinder>
            ));
        });
    };

    return (
        <group>
            {/* Front Cab */}
            <Box args={[cabWidth, 1, cabLength]} position={[0, 0.6, 4]}>
                <meshStandardMaterial color="red" />
            </Box>

            {/* Trailer */}
            <Box args={[trailerWidth, 1.5, trailerLength]} position={[0, 0.8, -0.9]}>
                <meshStandardMaterial color="#D9D9D9" />
            </Box>

            {/* Axles */}
            {renderAxles(axlesData)}

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
    TyrePressureData: ITyrePressure[]
}

const TruckCanvas: React.FC<TruckCanvasProps> = ({
    TyreData,
    TyreDetailData,
    TyrePressureData
}) => {
    console.log(TyreData);
    console.log(TyreDetailData);
    console.log(TyrePressureData);


    // {
    //     "wheels": "12",
    //     "axtyre": "[{\"tyre\":1},{\"tyre\":1},{\"tyre\":2},{\"tyre\":2}]",
    //     "total_tyres": "12",
    //     "total_axles": "4",
    //     "config": " [{\n    \"TotalWheel\": 12,\n    \"TotalAxle\": 4,\n    \"wheelPositions\": [\n      [-1, 0, 4.7], [1, 0, 4.7],\n      [-1.2, 0, 3.3], [1.2, 0, 3.3],\n      [-1.2, 0, -4], [-0.9, 0, -4], [0.9, 0, -4], [1.2, 0, -4],\n      [-1.2, 0, -5], [-0.9, 0, -5], [0.9, 0, -5], [1.2, 0, -5]\n    ],\n    \"axlesData\": [true, true, true, false, true, true]\n  }]"
    // }

    // [
    //     {
    //       TotalWheel: 12,
    //       TotalAxle: 4,
    //       wheelPositions: [
    //         [Array], [Array],
    //         [Array], [Array],
    //         [Array], [Array],
    //         [Array], [Array],
    //         [Array], [Array],
    //         [Array], [Array]
    //       ],
    //       axlesData: [ true, true, true, false, true, true ]
    //     }
    //   ]

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


        // [
        //     // Front Cab
        //     [-1, 0, 4.7], [1, 0, 4.7], // Wheels 1 and 2

        //     [-1.2, 0, 3.3], [-0.9, 0, 3.3], [0.9, 0, 3.3], [1.2, 0, 3.3], // Wheels 3 and 4
        //     [-1.2, 0, 2.3], [-0.9, 0, 2.3], [0.9, 0, 2.3], [1.2, 0, 2.3], // Wheels 7, 8, 9, 10
        //     // Trailer Wheels
        //     [-1.2, 0, -3], [-0.9, 0, -3], [0.9, 0, -3], [1.2, 0, -3], // Wheels 11-14
        //     [-1.2, 0, -4], [-0.9, 0, -4], [0.9, 0, -4], [1.2, 0, -4], // Wheels 15-18
        //     [-1.2, 0, -5], [-0.9, 0, -5], [0.9, 0, -5], [1.2, 0, -5], // Wheels 19-22
        // ]
    }, [
        WheelPositionData[0].wheelPositions
    ]);

    const axlesData: IAxcelsData[] = React.useMemo(() => {
        const result = WheelPositionData[0].axlesData.map((isAxlePresent: boolean, index: number) => {
            if (isAxlePresent) {
                return WheelAxelConstant[index];
            }
        }).filter((item: undefined) => item !== undefined);
        console.log(result);

        return result
        // [
        //     { axlePositions: [[0, -0, 4.7]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
        //     { axlePositions: [[0, -0, 3.3]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
        //     { axlePositions: [[0, -0, 2.3]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
        //     { axlePositions: [[0, -0, -0.85]], axleRadius: 0.05, axleLength: 8.3, rotation: [Math.PI / 2, 0, 0] },
        //     { axlePositions: [[0, -0, -3]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
        //     { axlePositions: [[0, -0, -4]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
        //     { axlePositions: [[0, -0, -5]], axleRadius: 0.05, axleLength: 2, rotation: [0, 0, Math.PI / 2] },
        // ]
    }, [
        WheelPositionData[0].axlesData
    ]);


    return (
        <Canvas camera={{
            // position: [90, -90, 0],
            position: [90, -90, 0],
            fov: 2,
            // scale: [-10, -10, -10]
        }}
            style={{
                height: '20vh',
            }}
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
            />
            <OrbitControls />
        </Canvas>
    );
};

export default TruckCanvas;