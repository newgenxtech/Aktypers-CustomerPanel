import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, Cylinder, Line, OrbitControls } from '@react-three/drei';

const Truck: React.FC = () => {
    // Truck dimensions and spacing based on your layout
    const cabWidth = 2;
    const cabLength = 3;
    const trailerWidth = 2.7;
    const trailerLength = 9.5;
    const wheelRadius = 0.4;
    const wheelWidth = .2;

    // Positions for each set of wheels based on image layout
    const wheelPositions: Array<[number, number, number]> = [
        // Front Cab
        [-1, 0, 4.7], [1, 0, 4.7], // Wheels 1 and 2
        // x, y, z
        [-1.2, 0, 3.3], [-0.9, 0, 3.3], [0.9, 0, 3.3,], [1.2, 0, 3.3], // Wheels 3 and 4
        [-1.2, 0, 2.3], [-0.9, 0, 2.3], [0.9, 0, 2.3], [1.2, 0, 2.3], // Wheels 7, 8, 9, 10

        // Trailer Wheels
        [-1.2, 0, -3], [-0.9, 0, -3], [0.9, 0, -3], [1.2, 0, -3], // Wheels 11-14
        [-1.2, 0, -4], [-0.9, 0, -4], [0.9, 0, -4], [1.2, 0, -4], // Wheels 15-18
        [-1.2, 0, -5], [-0.9, 0, -5], [0.9, 0, -5], [1.2, 0, -5], // Wheels 19-22
    ];

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

    const renderAxles = () => {
        const axleRadius = 0.05;
        const axleLength = 2;

        const axlePositions: Array<[number, number, number]> = [
            [0, -0, 4.7],
            [0, -0, 3.3],
            [0, -0, 2.3],
            [0, -0, -3],
            [0, -0, -4],
            [0, -0, -5],
        ];

        return axlePositions.map((position, index) => (
            <Cylinder
                key={index}

                args={[axleRadius, axleRadius, axleLength, 32]}
                position={position}
                rotation={[0, 0, Math.PI / 2]}
            >
                <meshStandardMaterial color="#71B9FF" />
            </Cylinder>
        ));
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
            {renderAxles()}

            {/* Wheels */}
            {renderWheels()}
        </group>
    );
};

const TyrePressure: React.FC = () => {
    return (
        <Canvas camera={{ position: [10, 10, 20], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Truck />
            <OrbitControls />
        </Canvas>
    );
};

export default TyrePressure;
