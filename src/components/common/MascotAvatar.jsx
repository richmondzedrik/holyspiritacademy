import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Smooth easing function for buttery animations
const smoothstep = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

const MascotAvatar = ({ isChatOpen }) => {
    const group = useRef();
    const body = useRef();
    const head = useRef();
    const leftWing = useRef();
    const rightWing = useRef();
    const leftPupil = useRef();
    const rightPupil = useRef();
    const leftEyelid = useRef();
    const rightEyelid = useRef();
    const tail = useRef();

    // Persistent state for smooth animations
    const state = useRef({
        targetRotY: 0,
        currentRotY: 0,
        blinkTimer: 0,
        blinkPhase: 0, // 0 = open, 1 = closing, 2 = opening
        hoverAmount: 0,
        eyeTargetX: 0,
        eyeTargetY: 0,
        eyeCurrentX: 0,
        eyeCurrentY: 0,
    });

    // Premium gradient colors
    const colors = useMemo(() => ({
        primary: new THREE.Color('#3B82F6'),
        primaryLight: new THREE.Color('#60A5FA'),
        primaryDark: new THREE.Color('#1D4ED8'),
        accent: new THREE.Color('#6366F1'),
        beak: new THREE.Color('#F59E0B'),
        beakDark: new THREE.Color('#D97706'),
        white: new THREE.Color('#FFFFFF'),
        pupil: new THREE.Color('#0F172A'),
        blush: new THREE.Color('#FDA4AF'),
    }), []);

    useFrame((frameState, delta) => {
        if (!group.current) return;

        const t = frameState.clock.getElapsedTime();
        const s = state.current;

        // Clamp delta to prevent jumps on tab switch
        const dt = Math.min(delta, 0.1);

        // ========== SMOOTH FLOATING ==========
        // Multiple sine waves for organic movement
        const floatY =
            Math.sin(t * 1.2) * 0.08 +
            Math.sin(t * 2.1) * 0.03 +
            Math.sin(t * 0.7) * 0.04;

        const floatX = Math.sin(t * 0.9) * 0.02;
        const floatZ = Math.cos(t * 0.8) * 0.015;

        group.current.position.y = lerp(group.current.position.y, floatY, dt * 8);
        group.current.position.x = lerp(group.current.position.x, floatX, dt * 6);
        group.current.position.z = lerp(group.current.position.z, floatZ, dt * 6);

        // Subtle rotation for liveliness
        group.current.rotation.z = lerp(
            group.current.rotation.z,
            Math.sin(t * 0.6) * 0.03,
            dt * 4
        );

        // ========== HEAD/BODY ROTATION ==========
        s.targetRotY = isChatOpen ? 0 : Math.sin(t * 0.35) * 0.35;
        s.currentRotY = lerp(s.currentRotY, s.targetRotY, dt * 3);
        group.current.rotation.y = s.currentRotY;

        // Slight head tilt independent of body
        if (head.current) {
            head.current.rotation.x = Math.sin(t * 0.8) * 0.04;
            head.current.rotation.z = Math.sin(t * 1.1) * 0.03;
        }

        // ========== SMOOTH WING ANIMATION ==========
        if (leftWing.current && rightWing.current) {
            // Smooth wing flap using multiple frequencies
            const wingBase = Math.sin(t * 2.5) * 0.12;
            const wingDetail = Math.sin(t * 5) * 0.03;
            const wingAmount = wingBase + wingDetail;

            // Apply with smooth interpolation
            leftWing.current.rotation.z = lerp(
                leftWing.current.rotation.z,
                -0.3 + wingAmount,
                dt * 12
            );
            rightWing.current.rotation.z = lerp(
                rightWing.current.rotation.z,
                0.3 - wingAmount,
                dt * 12
            );

            // Subtle wing breathing
            const wingScale = 1 + Math.sin(t * 1.5) * 0.02;
            leftWing.current.scale.y = lerp(leftWing.current.scale.y, wingScale, dt * 8);
            rightWing.current.scale.y = lerp(rightWing.current.scale.y, wingScale, dt * 8);
        }

        // ========== SMOOTH EYE TRACKING ==========
        if (leftPupil.current && rightPupil.current) {
            if (isChatOpen) {
                s.eyeTargetX = frameState.mouse.x * 0.06;
                s.eyeTargetY = frameState.mouse.y * 0.04;
            } else {
                s.eyeTargetX = Math.sin(t * 0.5) * 0.03;
                s.eyeTargetY = Math.cos(t * 0.4) * 0.02;
            }

            // Super smooth eye movement
            s.eyeCurrentX = lerp(s.eyeCurrentX, s.eyeTargetX, dt * 6);
            s.eyeCurrentY = lerp(s.eyeCurrentY, s.eyeTargetY, dt * 6);

            leftPupil.current.position.x = -0.22 + s.eyeCurrentX;
            leftPupil.current.position.y = 0.08 + s.eyeCurrentY;

            rightPupil.current.position.x = 0.22 + s.eyeCurrentX;
            rightPupil.current.position.y = 0.08 + s.eyeCurrentY;
        }

        // ========== NATURAL BLINKING ==========
        s.blinkTimer += dt;

        // Blink every 3-5 seconds with variation
        const blinkInterval = 3.5 + Math.sin(t * 0.1) * 1.5;

        if (s.blinkTimer > blinkInterval && s.blinkPhase === 0) {
            s.blinkPhase = 1;
            s.blinkTimer = 0;
        }

        if (leftEyelid.current && rightEyelid.current) {
            let targetScale = 0.01; // Fully open (minimal eyelid)

            if (s.blinkPhase === 1) {
                targetScale = 1; // Closing
                if (leftEyelid.current.scale.y > 0.9) {
                    s.blinkPhase = 2;
                }
            } else if (s.blinkPhase === 2) {
                targetScale = 0.01; // Opening
                if (leftEyelid.current.scale.y < 0.05) {
                    s.blinkPhase = 0;
                }
            }

            // Very fast, snappy blink
            const blinkSpeed = dt * 25;
            leftEyelid.current.scale.y = lerp(leftEyelid.current.scale.y, targetScale, blinkSpeed);
            rightEyelid.current.scale.y = lerp(rightEyelid.current.scale.y, targetScale, blinkSpeed);
        }

        // ========== BODY BREATHING ==========
        if (body.current) {
            const breathe = 1 + Math.sin(t * 1.8) * 0.015;
            body.current.scale.x = lerp(body.current.scale.x, breathe, dt * 8);
            body.current.scale.z = lerp(body.current.scale.z, breathe, dt * 8);
        }

        // ========== TAIL WAG ==========
        if (tail.current) {
            tail.current.rotation.z = Math.sin(t * 3) * 0.2;
            tail.current.rotation.x = Math.sin(t * 2) * 0.1 - 0.3;
        }
    });

    return (
        <group ref={group} dispose={null}>
            {/* ===== BODY ===== */}
            <group ref={body}>
                {/* Main Body - Rounded for softness */}
                <Sphere args={[0.9, 64, 64]} scale={[1, 0.85, 0.9]}>
                    <meshStandardMaterial
                        color={colors.primary}
                        roughness={0.35}
                        metalness={0.05}
                    />
                </Sphere>

                {/* Belly - Soft white patch */}
                <Sphere args={[0.65, 48, 48]} position={[0, -0.1, 0.5]} scale={[0.8, 0.7, 0.5]}>
                    <meshStandardMaterial
                        color={colors.white}
                        roughness={0.5}
                    />
                </Sphere>
            </group>

            {/* ===== HEAD ===== */}
            <group ref={head} position={[0, 0.65, 0.15]}>
                {/* Head sphere */}
                <Sphere args={[0.55, 64, 64]} scale={[1, 0.95, 0.95]}>
                    <meshStandardMaterial
                        color={colors.primary}
                        roughness={0.35}
                        metalness={0.05}
                    />
                </Sphere>

                {/* Face area - slightly lighter */}
                <Sphere args={[0.4, 48, 48]} position={[0, -0.05, 0.35]} scale={[0.9, 0.8, 0.5]}>
                    <meshStandardMaterial
                        color={colors.primaryLight}
                        roughness={0.4}
                    />
                </Sphere>

                {/* ===== EYES ===== */}
                <group position={[0, 0.05, 0.4]}>
                    {/* Left Eye Container */}
                    <group position={[-0.22, 0, 0]}>
                        {/* Sclera */}
                        <Sphere args={[0.14, 32, 32]}>
                            <meshStandardMaterial color={colors.white} roughness={0.2} />
                        </Sphere>
                        {/* Pupil */}
                        <Sphere ref={leftPupil} args={[0.07, 32, 32]} position={[0, 0.08, 0.1]}>
                            <meshStandardMaterial color={colors.pupil} roughness={0.1} />
                        </Sphere>
                        {/* Highlight */}
                        <Sphere args={[0.025, 16, 16]} position={[0.03, 0.12, 0.12]}>
                            <meshStandardMaterial
                                color={colors.white}
                                emissive={colors.white}
                                emissiveIntensity={0.8}
                            />
                        </Sphere>
                        {/* Eyelid */}
                        <Sphere
                            ref={leftEyelid}
                            args={[0.145, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]}
                            rotation={[0.1, 0, 0]}
                            scale={[1, 0.01, 1]}
                        >
                            <meshStandardMaterial color={colors.primary} />
                        </Sphere>
                    </group>

                    {/* Right Eye Container */}
                    <group position={[0.22, 0, 0]}>
                        {/* Sclera */}
                        <Sphere args={[0.14, 32, 32]}>
                            <meshStandardMaterial color={colors.white} roughness={0.2} />
                        </Sphere>
                        {/* Pupil */}
                        <Sphere ref={rightPupil} args={[0.07, 32, 32]} position={[0, 0.08, 0.1]}>
                            <meshStandardMaterial color={colors.pupil} roughness={0.1} />
                        </Sphere>
                        {/* Highlight */}
                        <Sphere args={[0.025, 16, 16]} position={[-0.03, 0.12, 0.12]}>
                            <meshStandardMaterial
                                color={colors.white}
                                emissive={colors.white}
                                emissiveIntensity={0.8}
                            />
                        </Sphere>
                        {/* Eyelid */}
                        <Sphere
                            ref={rightEyelid}
                            args={[0.145, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]}
                            rotation={[0.1, 0, 0]}
                            scale={[1, 0.01, 1]}
                        >
                            <meshStandardMaterial color={colors.primary} />
                        </Sphere>
                    </group>
                </group>

                {/* ===== BEAK ===== */}
                <group position={[0, -0.12, 0.5]}>
                    {/* Upper beak */}
                    <Sphere args={[0.08, 32, 32]} scale={[1.2, 0.6, 1.5]} position={[0, 0.02, 0]}>
                        <meshStandardMaterial color={colors.beak} roughness={0.3} />
                    </Sphere>
                    {/* Lower beak */}
                    <Sphere args={[0.06, 32, 32]} scale={[1, 0.4, 1.2]} position={[0, -0.04, 0]}>
                        <meshStandardMaterial color={colors.beakDark} roughness={0.3} />
                    </Sphere>
                </group>

                {/* ===== BLUSH ===== */}
                <Sphere args={[0.06, 16, 16]} position={[-0.32, -0.08, 0.3]}>
                    <meshStandardMaterial
                        color={colors.blush}
                        transparent
                        opacity={0.5}
                        roughness={0.8}
                    />
                </Sphere>
                <Sphere args={[0.06, 16, 16]} position={[0.32, -0.08, 0.3]}>
                    <meshStandardMaterial
                        color={colors.blush}
                        transparent
                        opacity={0.5}
                        roughness={0.8}
                    />
                </Sphere>

                {/* ===== CREST/TUFT ===== */}
                <group position={[0, 0.45, -0.1]}>
                    <Sphere args={[0.08, 16, 16]} position={[0, 0, 0]} scale={[0.8, 1.5, 0.8]}>
                        <meshStandardMaterial color={colors.primaryDark} roughness={0.4} />
                    </Sphere>
                    <Sphere args={[0.06, 16, 16]} position={[-0.08, -0.05, 0]} scale={[0.7, 1.2, 0.7]} rotation={[0, 0, 0.3]}>
                        <meshStandardMaterial color={colors.primary} roughness={0.4} />
                    </Sphere>
                    <Sphere args={[0.06, 16, 16]} position={[0.08, -0.05, 0]} scale={[0.7, 1.2, 0.7]} rotation={[0, 0, -0.3]}>
                        <meshStandardMaterial color={colors.primary} roughness={0.4} />
                    </Sphere>
                </group>
            </group>

            {/* ===== WINGS ===== */}
            {/* Left Wing */}
            <group ref={leftWing} position={[-0.75, 0.1, 0]}>
                <Sphere args={[0.35, 32, 32]} scale={[0.3, 1, 0.6]} rotation={[0, 0, -0.3]}>
                    <meshStandardMaterial color={colors.primary} roughness={0.35} />
                </Sphere>
                <Sphere args={[0.2, 24, 24]} scale={[0.25, 0.6, 0.5]} position={[-0.1, -0.35, 0]}>
                    <meshStandardMaterial color={colors.primaryDark} roughness={0.35} />
                </Sphere>
            </group>

            {/* Right Wing */}
            <group ref={rightWing} position={[0.75, 0.1, 0]}>
                <Sphere args={[0.35, 32, 32]} scale={[0.3, 1, 0.6]} rotation={[0, 0, 0.3]}>
                    <meshStandardMaterial color={colors.primary} roughness={0.35} />
                </Sphere>
                <Sphere args={[0.2, 24, 24]} scale={[0.25, 0.6, 0.5]} position={[0.1, -0.35, 0]}>
                    <meshStandardMaterial color={colors.primaryDark} roughness={0.35} />
                </Sphere>
            </group>

            {/* ===== TAIL ===== */}
            <group ref={tail} position={[0, -0.3, -0.7]}>
                <Sphere args={[0.15, 24, 24]} scale={[0.8, 0.5, 1.2]}>
                    <meshStandardMaterial color={colors.primaryDark} roughness={0.4} />
                </Sphere>
                <Sphere args={[0.1, 16, 16]} scale={[0.6, 0.4, 1]} position={[0, 0, -0.12]}>
                    <meshStandardMaterial color={colors.primary} roughness={0.4} />
                </Sphere>
            </group>

            {/* ===== FEET ===== */}
            <group position={[0, -0.85, 0.2]}>
                {/* Left foot */}
                <Sphere args={[0.1, 16, 16]} position={[-0.2, 0, 0]} scale={[1, 0.3, 1.3]}>
                    <meshStandardMaterial color={colors.beak} roughness={0.4} />
                </Sphere>
                {/* Right foot */}
                <Sphere args={[0.1, 16, 16]} position={[0.2, 0, 0]} scale={[1, 0.3, 1.3]}>
                    <meshStandardMaterial color={colors.beak} roughness={0.4} />
                </Sphere>
            </group>
        </group>
    );
};

export default MascotAvatar;
