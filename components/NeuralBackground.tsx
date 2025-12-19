import React, { useRef, useEffect, useCallback } from 'react';

interface Node {
  id: number;
  x: number; // Current X
  y: number; // Current Y
  baseX: number; // Origin X for organic movement
  baseY: number; // Origin Y for organic movement
  phase: number; // For sine wave animation
  phaseY: number; // Independent phase for Y
  speed: number;
  size: number;
  amplitudeX: number; // Independent amplitude for X
  amplitudeY: number; // Independent amplitude for Y
}

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafId = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodes = useRef<Node[]>([]);
  const timeRef = useRef(0);

  // MOUSE HANDLER
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const animate = useCallback((_timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // We rely on DPR scaling setup in useEffect, so logic coords are roughly screen CSS pixels
    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    timeRef.current += 0.005; // Global time for organic waves

    ctx.clearRect(0, 0, width, height);
    
    // Create a deep atmospheric fade
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Trail effect
    ctx.fillRect(0, 0, width, height);

    // UPDATE & DRAW NODES
    nodes.current.forEach(node => {
      // 1. Organic Floating
      // Use distinct phases/amplitudes for X and Y to create non-circular, organic paths
      const floatX = Math.sin(timeRef.current * node.speed + node.phase) * node.amplitudeX;
      // Using a slightly different frequency multiplier (0.9) for Y prevents perfect loops
      const floatY = Math.cos(timeRef.current * node.speed * 0.9 + node.phaseY) * node.amplitudeY;

      // 2. Mouse Interaction (Subtle attraction)
      let dx = mouseRef.current.x - (node.baseX + floatX);
      let dy = mouseRef.current.y - (node.baseY + floatY);
      let dist = Math.sqrt(dx * dx + dy * dy);
      let attractionX = 0;
      let attractionY = 0;

      if (dist < 300) {
        const force = (300 - dist) / 300;
        attractionX = dx * force * 0.05;
        attractionY = dy * force * 0.05;
      }

      node.x = node.baseX + floatX + attractionX;
      node.y = node.baseY + floatY + attractionY;

      // Draw Glowing "Star" Node
      // Using Radial Gradient for soft look
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, node.size * 2
      );
      gradient.addColorStop(0, 'rgba(220, 38, 38, 0.9)'); // Bright Red Core
      gradient.addColorStop(0.4, 'rgba(139, 29, 29, 0.4)'); // Mid Red
      gradient.addColorStop(1, 'rgba(139, 29, 29, 0)'); // Transparent Edge

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // DRAW CONNECTIONS (Synapses)
    const maxDistance = 220; // Slightly increased range
    const mouseInfluenceRadius = 250;

    for (let i = 0; i < nodes.current.length; i++) {
      for (let j = i + 1; j < nodes.current.length; j++) {
        const n1 = nodes.current[i];
        const n2 = nodes.current[j];
        
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
            // Calculate Mouse Proximity to the connection center
            const midX = (n1.x + n2.x) / 2;
            const midY = (n1.y + n2.y) / 2;
            const mDx = mouseRef.current.x - midX;
            const mDy = mouseRef.current.y - midY;
            const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
            
            let mouseFactor = 0;
            if (mDist < mouseInfluenceRadius) {
                mouseFactor = (mouseInfluenceRadius - mDist) / mouseInfluenceRadius;
            }

            // Opacity Calculation
            // 1. Distance Fade (Quadratic for softer falloff)
            const edgeFade = 1 - Math.pow(dist / maxDistance, 2); 

            // 2. Time Pulse (Organic breathing)
            const pulse = (Math.sin(timeRef.current * 3 + n1.id + n2.id) + 1) / 2;
            
            // 3. Combine: Base opacity + Mouse Boost + Pulse
            // Base opacity is low (0.15)
            // Mouse boost can add up to 0.5
            // Pulse adds subtle variation
            let alpha = (0.15 + (mouseFactor * 0.5)) * edgeFade;
            alpha += (pulse * 0.05); 

            // Clamp alpha
            if (alpha > 0.8) alpha = 0.8;
            if (alpha < 0.05) continue; // Skip very faint lines for performance

            ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`;
            // Mouse proximity also increases line width slightly
            ctx.lineWidth = 1 + (mouseFactor * 1.5);
            
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
        }
      }
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // REMOVED: prefers-reduced-motion check
    // La animación ahora se muestra SIEMPRE en todos los dispositivos

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Resize Logic
    const handleResize = () => {
        if (!canvas.parentElement) return;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        ctx.scale(dpr, dpr);
        
        // Re-init nodes on resize to fill screen
        initNodes(rect.width, rect.height);
    };

    const initNodes = (w: number, h: number) => {
        const count = Math.floor((w * h) / 14000); // Dense but performant
        const newNodes: Node[] = [];
        for(let i=0; i<count; i++) {
            newNodes.push({
                id: i,
                x: Math.random() * w,
                y: Math.random() * h,
                baseX: Math.random() * w,
                baseY: Math.random() * h,
                phase: Math.random() * Math.PI * 2,
                phaseY: Math.random() * Math.PI * 2, // New phase Y
                speed: 0.2 + Math.random() * 0.5, // slightly more variation
                size: 1.5 + Math.random() * 2,
                amplitudeX: 20 + Math.random() * 40, // New amplitude
                amplitudeY: 20 + Math.random() * 40 // New amplitude
            });
        }
        nodes.current = newNodes;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize(); // Initial setup

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animate, handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ opacity: 0.8 }} // Global opacity tune
    />
  );
};

export default NeuralBackground;
