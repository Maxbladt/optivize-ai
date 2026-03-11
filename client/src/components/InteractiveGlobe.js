import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import createGlobe from 'cobe';

/* ─── Styled Components ─────────────────────────── */

const GlobeOuter = styled.div`
  position: relative;
  width: 100%;
  max-width: 520px;
  aspect-ratio: 1;
  margin: 0 auto;
  min-width: 280px;
`;

const CanvasWrap = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
`;

/* ─── Globe Locations & Arc Data ────────────────── */

const LOCATIONS = {
  utrecht: [52.0907, 5.1214],
  manila: [14.5995, 120.9842],
  mumbai: [19.0760, 72.8777],
};

function makeArcMarkers(start, end, n = 30) {
  const m = [];
  for (let i = 1; i < n; i++) {
    const t = i / n;
    m.push({
      location: [start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t],
      size: 0.006,
    });
  }
  return m;
}

const globeMarkers = [
  { location: LOCATIONS.utrecht, size: 0.08 },
  { location: LOCATIONS.mumbai, size: 0.06 },
  { location: LOCATIONS.manila, size: 0.06 },
  ...makeArcMarkers(LOCATIONS.utrecht, LOCATIONS.mumbai),
  ...makeArcMarkers(LOCATIONS.utrecht, LOCATIONS.manila),
];

/* ─── Main Component ────────────────────────────── */

export default function InteractiveGlobe() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const thetaRef = useRef(0);
  const pointerStart = useRef({ x: 0, y: 0 });
  const thetaOffset = useRef(0);
  const globeRef = useRef(null);

  const onPointerDown = useCallback((e) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    pointerStart.current = { x: e.clientX, y: e.clientY };
    thetaOffset.current = thetaRef.current;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
  }, []);

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
  }, []);

  const onPointerOut = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
  }, []);

  const onPointerMove = useCallback((e) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = deltaX;
      const deltaY = e.clientY - pointerStart.current.y;
      thetaRef.current = thetaOffset.current + deltaY / 300;
      thetaRef.current = Math.max(-0.8, Math.min(0.8, thetaRef.current));
    }
  }, []);

  const onTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      pointerInteracting.current = t.clientX - pointerInteractionMovement.current;
      pointerStart.current = { x: t.clientX, y: t.clientY };
      thetaOffset.current = thetaRef.current;
    }
  }, []);

  const onTouchMove = useCallback((e) => {
    if (e.touches.length === 1 && pointerInteracting.current !== null) {
      const t = e.touches[0];
      const deltaX = t.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = deltaX;
      const deltaY = t.clientY - pointerStart.current.y;
      thetaRef.current = thetaOffset.current + deltaY / 300;
      thetaRef.current = Math.max(-0.8, Math.min(0.8, thetaRef.current));
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    pointerInteracting.current = null;
  }, []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    let width = containerRef.current.offsetWidth;
    if (width === 0) width = 500;

    const onResize = () => {
      if (containerRef.current) width = containerRef.current.offsetWidth;
    };
    window.addEventListener('resize', onResize);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    globeRef.current = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: 0.3,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 3,
      baseColor: [0.15, 0.2, 0.35],
      markerColor: [0.23, 0.51, 0.96],
      glowColor: [0.12, 0.16, 0.28],
      markers: globeMarkers,
      onRender: (state) => {
        if (pointerInteracting.current === null) phiRef.current += 0.003;
        state.phi = phiRef.current + pointerInteractionMovement.current / 200;
        state.theta = thetaRef.current;
        state.width = width * dpr;
        state.height = width * dpr;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
    }, 300);

    return () => {
      if (globeRef.current) globeRef.current.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <GlobeOuter>
      <CanvasWrap ref={containerRef}>
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerOut={onPointerOut}
          onPointerMove={onPointerMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            cursor: 'grab',
            opacity: 0,
            transition: 'opacity 0.8s ease',
            touchAction: 'none',
          }}
        />
      </CanvasWrap>
    </GlobeOuter>
  );
}
