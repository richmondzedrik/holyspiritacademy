import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Smooth easing functions
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
    const leftFoot = useRef();
    const rightFoot = useRef();
    const leftBlush = useRef();
    const rightBlush = useRef();
    const smile = useRef();
    const crest = useRef();

    // Persistent state for smooth animations
    const state = useRef({
        targetRotY: 0,
        currentRotY: 0,
        blinkTimer: 0,
        blinkPhase: 0,
        eyeTargetX: 0,
        eyeTargetY: 0,
        eyeCurrentX: 0,
        eyeCurrentY: 0,
        hopPhase: 0,
    });

    // Frame counter for performance optimization
    const frameCount = useRef(0);

    // VIBRANT, JOLLY COLOR PALETTE
    const colors = useMemo(() => ({
        // Bright sky blue - more cheerful
        primary: new THREE.Color('#4DA6FF'),
        primaryLight: new THREE.Color('#7DC4FF'),
        primaryDark: new THREE.Color('#2B8AE8'),
        accent: new THREE.Color('#818CF8'),
        // Warm orange beak
        beak: new THREE.Color('#FFB347'),
        beakDark: new THREE.Color('#FF9500'),
        white: new THREE.Color('#FFFFFF'),
        // Bright eyes
        pupil: new THREE.Color('#1E293B'),
        eyeHighlight: new THREE.Color('#FFFFFF'),
        // Rosy pink blush
        blush: new THREE.Color('#FF8FAB'),
        // Smile color
        smileColor: new THREE.Color('#FF6B8A'),
        // Belly cream
        belly: new THREE.Color('#FFF8E7'),
    }), []);

    useFrame((frameState, delta) => {
        if (!group.current) return;

        const t = frameState.clock.getElapsedTime();
        const s = state.current;
        const dt = Math.min(delta, 0.1);

        // Frame skipping for performance - run non-critical animations at 30fps
        frameCount.current++;
        const skipFrame = frameCount.current % 2 === 0;

        // ========== JOYFUL BOUNCING ==========
        const bounceSpeed = isChatOpen ? 5.5 : 2.5;
        const bounceAmp = isChatOpen ? 0.35 : 0.18;

        // Bouncy hop animation
        let floatY = Math.sin(t * bounceSpeed) * bounceAmp;
        floatY += Math.abs(Math.sin(t * bounceSpeed * 0.5)) * 0.08; // Extra "hop" feel
        floatY += Math.sin(t * 4.2) * 0.03; // Micro-bounce

        // Playful sway
        const floatX = Math.sin(t * 1.5) * 0.12;
        const floatZ = Math.cos(t * 1.1) * 0.04;

        group.current.position.y = lerp(group.current.position.y, floatY, dt * 12);
        group.current.position.x = lerp(group.current.position.x, floatX, dt * 10);
        group.current.position.z = lerp(group.current.position.z, floatZ, dt * 10);

        // ========== PLAYFUL TILT/WOBBLE ==========
        const wobbleAmp = isChatOpen ? 0.18 : 0.1;
        group.current.rotation.z = lerp(
            group.current.rotation.z,
            Math.sin(t * 2.5) * wobbleAmp,
            dt * 8
        );

        // Excited forward lean when chatting
        const leanAmp = isChatOpen ? 0.12 : 0.05;
        group.current.rotation.x = lerp(
            group.current.rotation.x,
            Math.sin(t * bounceSpeed + 0.5) * leanAmp,
            dt * 8
        );

        // ========== CURIOUS HEAD MOVEMENTS ==========
        const headTurnSpeed = isChatOpen ? 3 : 1;
        const headTurnAmp = isChatOpen ? 0.25 : 0.5;
        s.targetRotY = Math.sin(t * headTurnSpeed) * headTurnAmp;
        s.currentRotY = lerp(s.currentRotY, s.targetRotY, dt * 5);
        group.current.rotation.y = s.currentRotY;

        if (head.current) {
            const headBobSpeed = isChatOpen ? 4 : 1.8;
            const headBobAmp = isChatOpen ? 0.12 : 0.07;

            // Happy nodding
            head.current.rotation.x = lerp(
                head.current.rotation.x,
                Math.sin(t * headBobSpeed) * headBobAmp,
                dt * 10
            );

            // Curious head tilt
            head.current.rotation.z = lerp(
                head.current.rotation.z,
                Math.sin(t * (headBobSpeed * 0.6)) * 0.15,
                dt * 8
            );
        }

        // ========== EXCITED WING FLAPPING ==========
        if (leftWing.current && rightWing.current) {
            const flapSpeed = isChatOpen ? 14 : 5; // Reduced from 22 to 14 for better performance
            const flapAmp = isChatOpen ? 0.8 : 0.35;

            const wingPrimary = Math.sin(t * flapSpeed) * flapAmp;
            const wingSecondary = Math.sin(t * flapSpeed * 1.5) * 0.12;
            const wingAmount = wingPrimary + wingSecondary;

            leftWing.current.rotation.z = lerp(
                leftWing.current.rotation.z,
                -0.5 + wingAmount,
                dt * 18
            );
            rightWing.current.rotation.z = lerp(
                rightWing.current.rotation.z,
                0.5 - wingAmount,
                dt * 18
            );

            // Wing breathing pulse
            const wingPulse = 1 + Math.sin(t * 3) * 0.08;
            leftWing.current.scale.y = lerp(leftWing.current.scale.y, wingPulse, dt * 12);
            rightWing.current.scale.y = lerp(rightWing.current.scale.y, wingPulse, dt * 12);

            // Forward/back wing motion when excited
            if (isChatOpen) {
                leftWing.current.rotation.y = lerp(
                    leftWing.current.rotation.y,
                    Math.sin(t * flapSpeed * 0.5) * 0.3,
                    dt * 12
                );
                rightWing.current.rotation.y = lerp(
                    rightWing.current.rotation.y,
                    -Math.sin(t * flapSpeed * 0.5) * 0.3,
                    dt * 12
                );
            }
        }

        // ========== LIVELY EYE TRACKING ==========
        if (leftPupil.current && rightPupil.current) {
            if (isChatOpen) {
                s.eyeTargetX = frameState.mouse.x * 0.06;
                s.eyeTargetY = frameState.mouse.y * 0.05;
            } else {
                // Curious wandering
                const wanderSpeed1 = t * 1.5;
                const wanderSpeed2 = t * 1.2;
                s.eyeTargetX = Math.sin(wanderSpeed1) * 0.04 + Math.sin(t * 2.8) * 0.015;
                s.eyeTargetY = Math.cos(wanderSpeed2) * 0.03 + Math.cos(t * 2.2) * 0.01;
            }

            s.eyeCurrentX = lerp(s.eyeCurrentX, s.eyeTargetX, dt * 12);
            s.eyeCurrentY = lerp(s.eyeCurrentY, s.eyeTargetY, dt * 12);

            const maxOffset = 0.04;
            const clampedX = Math.max(-maxOffset, Math.min(maxOffset, s.eyeCurrentX));
            const clampedY = Math.max(-maxOffset * 0.8, Math.min(maxOffset * 0.8, s.eyeCurrentY));

            leftPupil.current.position.x = clampedX;
            leftPupil.current.position.y = clampedY;
            leftPupil.current.position.z = 0.08;

            rightPupil.current.position.x = clampedX;
            rightPupil.current.position.y = clampedY;
            rightPupil.current.position.z = 0.08;
        }

        // ========== NATURAL BLINKING ==========
        s.blinkTimer += dt;
        const blinkInterval = isChatOpen ? 1.8 : 3;

        if (s.blinkTimer > blinkInterval && s.blinkPhase === 0) {
            s.blinkPhase = 1;
            s.blinkTimer = 0;
        }

        if (leftEyelid.current && rightEyelid.current) {
            let targetScale = 0.01;

            if (s.blinkPhase === 1) {
                targetScale = 1;
                if (leftEyelid.current.scale.y > 0.9) {
                    s.blinkPhase = 2;
                }
            } else if (s.blinkPhase === 2) {
                targetScale = 0.01;
                if (leftEyelid.current.scale.y < 0.05) {
                    s.blinkPhase = 0;
                }
            }

            const blinkSpeed = dt * 35;
            leftEyelid.current.scale.y = lerp(leftEyelid.current.scale.y, targetScale, blinkSpeed);
            rightEyelid.current.scale.y = lerp(rightEyelid.current.scale.y, targetScale, blinkSpeed);
        }

        // ========== BODY SQUASH & STRETCH ==========
        if (body.current) {
            const squashPhase = Math.sin(t * bounceSpeed);
            const squashIntensity = isChatOpen ? 1.5 : 1;
            const squashX = 1 + squashPhase * 0.06 * squashIntensity;
            const squashY = 1 - squashPhase * 0.05 * squashIntensity;
            const squashZ = 1 + squashPhase * 0.05 * squashIntensity;

            body.current.scale.x = lerp(body.current.scale.x, squashX, dt * 15);
            body.current.scale.y = lerp(body.current.scale.y, squashY, dt * 15);
            body.current.scale.z = lerp(body.current.scale.z, squashZ, dt * 15);
        }

        // ========== HAPPY TAIL WAG ==========
        if (tail.current) {
            const wagSpeed = isChatOpen ? 16 : 6;
            const wagAmp = isChatOpen ? 0.7 : 0.4;

            tail.current.rotation.z = Math.sin(t * wagSpeed) * wagAmp;
            tail.current.rotation.x = Math.sin(t * 3) * 0.2 - 0.3;
            tail.current.rotation.y = Math.cos(t * wagSpeed * 0.8) * 0.15;
        }

        // ========== HAPPY FEET HOPPING ==========
        if (leftFoot.current && rightFoot.current) {
            const hopSpeed = isChatOpen ? 8 : 4;
            const hopAmp = isChatOpen ? 0.08 : 0.04;

            // Alternating hop
            leftFoot.current.position.y = Math.abs(Math.sin(t * hopSpeed)) * hopAmp;
            rightFoot.current.position.y = Math.abs(Math.sin(t * hopSpeed + Math.PI)) * hopAmp;

            // Little rotation
            leftFoot.current.rotation.x = Math.sin(t * hopSpeed) * 0.2;
            rightFoot.current.rotation.x = Math.sin(t * hopSpeed + Math.PI) * 0.2;
        }

        // ========== PULSING BLUSH (EXCITEMENT) ========== (Throttled)
        if (!skipFrame && leftBlush.current && rightBlush.current) {
            const blushPulse = isChatOpen
                ? 0.6 + Math.sin(t * 4) * 0.2
                : 0.4 + Math.sin(t * 2) * 0.1;

            leftBlush.current.material.opacity = blushPulse;
            rightBlush.current.material.opacity = blushPulse;

            // Scale pulse
            const blushScale = 1 + Math.sin(t * 3) * 0.1;
            leftBlush.current.scale.setScalar(blushScale);
            rightBlush.current.scale.setScalar(blushScale);
        }

        // ========== ANIMATED CREST ========== (Throttled)
        if (!skipFrame && crest.current) {
            const crestBounce = Math.sin(t * bounceSpeed) * 0.1;
            crest.current.rotation.z = Math.sin(t * 3) * 0.15;
            crest.current.position.y = 0.48 + crestBounce;
        }

        // ========== SMILE ANIMATION ========== (Throttled)
        if (!skipFrame && smile.current) {
            const smileScale = isChatOpen
                ? 1.2 + Math.sin(t * 3) * 0.1
                : 1 + Math.sin(t * 1.5) * 0.05;
            smile.current.scale.x = smileScale;
        }
    });

    return (
        <group ref={group} dispose={null}>
            {/* ===== BODY ===== */}
            <group ref={body}>
                {/* Main Body - Rounded and chubby */}
                <Sphere args={[0.9, 32, 32]} scale={[1, 0.88, 0.92]}>
                    <meshStandardMaterial
                        color={colors.primary}
                        roughness={0.3}
                        metalness={0.05}
                    />
                </Sphere>

                {/* Belly - Warm cream color */}
                <Sphere args={[0.68, 48, 48]} position={[0, -0.08, 0.52]} scale={[0.82, 0.72, 0.52]}>
                    <meshStandardMaterial
                        color={colors.belly}
                        roughness={0.45}
                    />
                </Sphere>
            </group>

            {/* ===== HEAD ===== */}
            <group ref={head} position={[0, 0.68, 0.15]}>
                {/* Head sphere */}
                <Sphere args={[0.58, 32, 32]} scale={[1, 0.96, 0.96]}>
                    <meshStandardMaterial
                        color={colors.primary}
                        roughness={0.3}
                        metalness={0.05}
                    />
                </Sphere>

                {/* Face area - lighter blue */}
                <Sphere args={[0.42, 48, 48]} position={[0, -0.03, 0.36]} scale={[0.92, 0.82, 0.52]}>
                    <meshStandardMaterial
                        color={colors.primaryLight}
                        roughness={0.35}
                    />
                </Sphere>

                {/* ===== BIG EXPRESSIVE EYES ===== */}
                <group position={[0, 0.06, 0.42]}>
                    {/* Left Eye Container */}
                    <group position={[-0.2, 0, 0]}>
                        {/* Sclera - bigger eyes */}
                        <Sphere args={[0.16, 32, 32]}>
                            <meshStandardMaterial color={colors.white} roughness={0.15} />
                        </Sphere>
                        {/* Pupil - larger, more visible */}
                        <Sphere ref={leftPupil} args={[0.085, 32, 32]} position={[0, 0, 0.08]}>
                            <meshStandardMaterial color={colors.pupil} roughness={0.1} />
                        </Sphere>
                        {/* Eye shine - bigger highlight */}
                        <Sphere args={[0.035, 16, 16]} position={[0.04, 0.05, 0.13]}>
                            <meshStandardMaterial
                                color={colors.white}
                                emissive={colors.white}
                                emissiveIntensity={1}
                            />
                        </Sphere>
                        {/* Secondary highlight */}
                        <Sphere args={[0.018, 16, 16]} position={[-0.03, -0.04, 0.13]}>
                            <meshStandardMaterial
                                color={colors.white}
                                emissive={colors.white}
                                emissiveIntensity={0.6}
                            />
                        </Sphere>
                        {/* Eyelid */}
                        <Sphere
                            ref={leftEyelid}
                            args={[0.165, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]}
                            rotation={[0.1, 0, 0]}
                            scale={[1, 0.01, 1]}
                        >
                            <meshStandardMaterial color={colors.primary} />
                        </Sphere>
                    </group>

                    {/* Right Eye Container */}
                    <group position={[0.2, 0, 0]}>
                        {/* Sclera */}
                        <Sphere args={[0.16, 32, 32]}>
                            <meshStandardMaterial color={colors.white} roughness={0.15} />
                        </Sphere>
                        {/* Pupil */}
                        <Sphere ref={rightPupil} args={[0.085, 32, 32]} position={[0, 0, 0.08]}>
                            <meshStandardMaterial color={colors.pupil} roughness={0.1} />
                        </Sphere>
                        {/* Eye shine */}
                        <Sphere args={[0.035, 16, 16]} position={[-0.04, 0.05, 0.13]}>
                            <meshStandardMaterial
                                color={colors.white}
                                emissive={colors.white}
                                emissiveIntensity={1}
                            />
                        </Sphere>
                        {/* Secondary highlight */}
                        <Sphere args={[0.018, 16, 16]} position={[0.03, -0.04, 0.13]}>
                            <meshStandardMaterial
                                color={colors.white}
                                emissive={colors.white}
                                emissiveIntensity={0.6}
                            />
                        </Sphere>
                        {/* Eyelid */}
                        <Sphere
                            ref={rightEyelid}
                            args={[0.165, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]}
                            rotation={[0.1, 0, 0]}
                            scale={[1, 0.01, 1]}
                        >
                            <meshStandardMaterial color={colors.primary} />
                        </Sphere>
                    </group>
                </group>

                {/* ===== CUTE BEAK ===== */}
                <group position={[0, -0.1, 0.52]}>
                    {/* Upper beak */}
                    <Sphere args={[0.09, 32, 32]} scale={[1.3, 0.65, 1.6]} position={[0, 0.025, 0]}>
                        <meshStandardMaterial color={colors.beak} roughness={0.25} />
                    </Sphere>
                    {/* Lower beak */}
                    <Sphere args={[0.065, 32, 32]} scale={[1.1, 0.45, 1.3]} position={[0, -0.045, 0]}>
                        <meshStandardMaterial color={colors.beakDark} roughness={0.25} />
                    </Sphere>
                </group>

                {/* ===== HAPPY SMILE ===== */}
                <group ref={smile} position={[0, -0.18, 0.48]}>
                    <Sphere args={[0.04, 24, 24]} scale={[2.5, 0.5, 0.8]}>
                        <meshStandardMaterial
                            color={colors.smileColor}
                            roughness={0.3}
                        />
                    </Sphere>
                </group>

                {/* ===== ROSY BLUSH ===== */}
                <Sphere ref={leftBlush} args={[0.08, 16, 16]} position={[-0.35, -0.06, 0.32]}>
                    <meshStandardMaterial
                        color={colors.blush}
                        transparent
                        opacity={0.5}
                        roughness={0.7}
                    />
                </Sphere>
                <Sphere ref={rightBlush} args={[0.08, 16, 16]} position={[0.35, -0.06, 0.32]}>
                    <meshStandardMaterial
                        color={colors.blush}
                        transparent
                        opacity={0.5}
                        roughness={0.7}
                    />
                </Sphere>

                {/* ===== BOUNCY CREST/TUFT ===== */}
                <group ref={crest} position={[0, 0.48, -0.08]}>
                    <Sphere args={[0.1, 16, 16]} position={[0, 0, 0]} scale={[0.85, 1.8, 0.85]}>
                        <meshStandardMaterial color={colors.primaryDark} roughness={0.35} />
                    </Sphere>
                    <Sphere args={[0.07, 16, 16]} position={[-0.1, -0.06, 0]} scale={[0.75, 1.4, 0.75]} rotation={[0, 0, 0.35]}>
                        <meshStandardMaterial color={colors.primary} roughness={0.35} />
                    </Sphere>
                    <Sphere args={[0.07, 16, 16]} position={[0.1, -0.06, 0]} scale={[0.75, 1.4, 0.75]} rotation={[0, 0, -0.35]}>
                        <meshStandardMaterial color={colors.primary} roughness={0.35} />
                    </Sphere>
                </group>
            </group>

            {/* ===== WINGS ===== */}
            {/* Left Wing */}
            <group ref={leftWing} position={[-0.78, 0.12, 0]}>
                <Sphere args={[0.38, 32, 32]} scale={[0.32, 1.1, 0.65]} rotation={[0, 0, -0.35]}>
                    <meshStandardMaterial color={colors.primary} roughness={0.3} />
                </Sphere>
                <Sphere args={[0.22, 24, 24]} scale={[0.28, 0.65, 0.55]} position={[-0.12, -0.38, 0]}>
                    <meshStandardMaterial color={colors.primaryDark} roughness={0.3} />
                </Sphere>
            </group>

            {/* Right Wing */}
            <group ref={rightWing} position={[0.78, 0.12, 0]}>
                <Sphere args={[0.38, 32, 32]} scale={[0.32, 1.1, 0.65]} rotation={[0, 0, 0.35]}>
                    <meshStandardMaterial color={colors.primary} roughness={0.3} />
                </Sphere>
                <Sphere args={[0.22, 24, 24]} scale={[0.28, 0.65, 0.55]} position={[0.12, -0.38, 0]}>
                    <meshStandardMaterial color={colors.primaryDark} roughness={0.3} />
                </Sphere>
            </group>

            {/* ===== TAIL ===== */}
            <group ref={tail} position={[0, -0.28, -0.72]}>
                <Sphere args={[0.18, 24, 24]} scale={[0.85, 0.55, 1.3]}>
                    <meshStandardMaterial color={colors.primaryDark} roughness={0.35} />
                </Sphere>
                <Sphere args={[0.12, 16, 16]} scale={[0.65, 0.45, 1.1]} position={[0, 0, -0.14]}>
                    <meshStandardMaterial color={colors.primary} roughness={0.35} />
                </Sphere>
            </group>

            {/* ===== ANIMATED FEET ===== */}
            <group position={[0, -0.88, 0.22]}>
                {/* Left foot */}
                <group ref={leftFoot} position={[-0.22, 0, 0]}>
                    <Sphere args={[0.11, 16, 16]} scale={[1.1, 0.35, 1.4]}>
                        <meshStandardMaterial color={colors.beak} roughness={0.35} />
                    </Sphere>
                </group>
                {/* Right foot */}
                <group ref={rightFoot} position={[0.22, 0, 0]}>
                    <Sphere args={[0.11, 16, 16]} scale={[1.1, 0.35, 1.4]}>
                        <meshStandardMaterial color={colors.beak} roughness={0.35} />
                    </Sphere>
                </group>
            </group>
        </group>
    );
};

export default MascotAvatar;
