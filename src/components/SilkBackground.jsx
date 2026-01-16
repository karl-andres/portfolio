"use client";

import Silk from './Silk';

export default function SilkBackground() {
    return (
        <div className="fixed inset-0 -z-10 w-screen h-screen">
            <Silk color="#20424b" speed={6.7} scale={0.8} noiseIntensity={3.0} rotation={2} />
        </div>
    );
}
