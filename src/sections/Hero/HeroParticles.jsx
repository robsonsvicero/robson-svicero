import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) return undefined;

    const ctx = canvas.getContext("2d");
    const section = canvas.closest("section");
    if (!section) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const density = 1 / 11000;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let originX = 0;
    let originY = 0;
    let stars = [];
    let orbiters = [];
    let animId = null;
    let isIntersecting = true;
    let lastTime = 0;

    const randomRange = (min, max) => min + Math.random() * (max - min);

    function fadeFactor(y) {
      return Math.max(0, Math.min(1, (y / height - 0.1) / 0.65));
    }

    function pickAngle(radius) {
      for (let i = 0; i < 24; i++) {
        const ang = randomRange(Math.PI, 2 * Math.PI);
        const x = originX + radius * Math.cos(ang);
        const y = originY + radius * Math.sin(ang);
        if (x > -40 && x < width + 40 && y > 0 && y < height) return ang;
      }
      return 1.5 * Math.PI;
    }

    function createOrbiter(radius) {
      return {
        r: radius,
        angle: pickAngle(radius),
        av: (randomRange(28, 64) / radius) * (Math.random() < 0.5 ? -1 : 1),
        tail: randomRange(70, 150),
        size: randomRange(1.2, 2.1),
        alpha: randomRange(0.55, 0.95),
      };
    }

    function resize() {
      const bounds = section.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      originX = width / 2;
      originY = 1.3 * height;

      const starCount = Math.min(150, Math.round(width * height * density));
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: randomRange(0.5, 1.4),
          base: randomRange(0.12, 0.5),
          phase: Math.random() * Math.PI * 2,
          speed: randomRange(0.3, 1.1),
          blue: Math.random() < 0.35,
        });
      }

      const ringCount = height < 480 ? 4 : 7;
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const stepStart = 5.25 * rootFontSize;
      const stepInc = 10.5 * rootFontSize;
      const maxDist = Math.hypot(width / 2, originY);
      const rings = [];
      for (let r = stepStart; r <= maxDist; r += stepInc) {
        if (originY - r < height) rings.push(r);
      }
      orbiters = rings.slice(0, ringCount).map(createOrbiter);
    }

    function drawOrbiter(orb) {
      const px = originX + orb.r * Math.cos(orb.angle);
      const py = originY + orb.r * Math.sin(orb.angle);
      const factor = fadeFactor(py);
      if (factor <= 0.01) return;

      const arcDist = orb.tail / orb.r;
      const dir = Math.sign(orb.av);
      const segs = 18;
      const segAngle = arcDist / segs;

      for (let i = 0; i < segs; i++) {
        const a1 = orb.angle - dir * segAngle * i;
        const a2 = orb.angle - dir * segAngle * (i + 1);
        const curFade = fadeFactor(originY + orb.r * Math.sin(a1));
        const alpha = orb.alpha * curFade * (1 - i / segs) * 0.5;

        if (alpha > 0.004) {
          ctx.strokeStyle = `rgba(143, 178, 236, ${alpha})`;
          ctx.lineWidth = Math.max(0.4, orb.size * (1 - i / segs));
          ctx.beginPath();
          ctx.arc(originX, originY, orb.r, Math.min(a1, a2), Math.max(a1, a2));
          ctx.stroke();
        }
      }

      const glow = ctx.createRadialGradient(px, py, 0, px, py, 5 * orb.size);
      glow.addColorStop(0, `rgba(220, 233, 255, ${0.9 * orb.alpha * factor})`);
      glow.addColorStop(0.4, `rgba(143, 178, 236, ${0.35 * orb.alpha * factor})`);
      glow.addColorStop(1, "rgba(143, 178, 236, 0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(px, py, 5 * orb.size, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * orb.alpha * factor})`;
      ctx.beginPath();
      ctx.arc(px, py, orb.size, 0, 2 * Math.PI);
      ctx.fill();
    }

    function render(time) {
      animId = null;
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0.016;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Draw background twinkling stars
      for (const s of stars) {
        const pulse = 0.5 + 0.5 * Math.sin(0.001 * time * s.speed + s.phase);
        const currentAlpha = s.base * (0.45 + 0.55 * pulse);
        ctx.fillStyle = s.blue
          ? `rgba(143, 178, 236, ${currentAlpha})`
          : `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Update and draw orbiters
      for (const orb of orbiters) {
        orb.angle += orb.av * dt;
        const px = originX + orb.r * Math.cos(orb.angle);
        const py = originY + orb.r * Math.sin(orb.angle);
        const bound = 60 + orb.tail;

        if (px < -bound || px > width + bound || py < -bound || py > height + bound) {
          Object.assign(orb, createOrbiter(orb.r));
        }
        drawOrbiter(orb);
      }

      if (isIntersecting && !document.hidden && !motionQuery.matches) {
        animId = requestAnimationFrame(render);
      }
    }

    function startAnimation() {
      if (motionQuery.matches) {
        drawStatic();
        return;
      }
      if (!animId && isIntersecting && !document.hidden) {
        lastTime = 0;
        animId = requestAnimationFrame(render);
      }
    }

    function stopAnimation() {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }

    function drawStatic() {
      stopAnimation();
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.fillStyle = s.blue
          ? `rgba(143, 178, 236, ${s.base})`
          : `rgba(255, 255, 255, ${s.base})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (motionQuery.matches) {
          drawStatic();
        } else {
          startAnimation();
        }
      }, 150);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0 }
    );

    const handleVisibility = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    const handleMotion = () => {
      if (motionQuery.matches) {
        drawStatic();
      } else {
        startAnimation();
      }
    };

    resize();
    startAnimation();

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handleMotion);
    observer.observe(section);

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="hero_orbits" aria-hidden="true" />
      <canvas className="hero_particles" aria-hidden="true" ref={canvasRef} />
    </>
  );
}
