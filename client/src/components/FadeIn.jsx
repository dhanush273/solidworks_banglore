import React, { useEffect, useRef, useState } from 'react';

/**
 * FadeIn component triggers a smooth GPU-accelerated fade-in transition
 * when the element scrolls into view (or on mount).
 *
 * @param {React.ReactNode} children - The content to wrap
 * @param {'up' | 'down' | 'left' | 'right' | 'none'} [direction='up'] - Direction of subtle motion
 * @param {number} [delay=0] - Delay in milliseconds before fade starts
 * @param {number} [duration=700] - Duration in milliseconds
 * @param {number} [distance=24] - Distance in px to translate from
 * @param {string} [className=''] - Extra classes
 * @param {string} [as='div'] - HTML element to render
 * @param {boolean} [once=true] - Whether transition triggers only once
 * @param {number} [threshold=0.15] - Intersection observer threshold
 */
export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  distance = 24,
  className = '',
  as: Component = 'div',
  once = true,
  threshold = 0.15,
  ...rest
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If IntersectionObserver is not supported, reveal immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentEl = ref.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [once, threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: `${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
    ...rest.style,
  };

  return (
    <Component ref={ref} style={style} className={className} {...rest}>
      {children}
    </Component>
  );
}
