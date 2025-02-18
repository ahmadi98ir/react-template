import { memo, useCallback, useEffect, useRef } from 'react';
const MarqueeSection = memo(({ items = [], className = "", style = "one" }) => {
  const marqueeRef = useRef(null);
  
  const startAnimation = useCallback(() => {
    if (!marqueeRef.current) return;
    
    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
          } else {
            entry.target.style.animationPlayState = 'paused';
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(marqueeRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    startAnimation();
  }, [startAnimation]);
  
  return (
    <div className={`headline-area ${className} rel z-2 py-25`}>
      <div className="headline-wrap" ref={marqueeRef}>
        <span className={`marquee-wrap ${style === "two" ? "style-two" : ""}`}>
          {/* Render only visible items for better performance */}
          {[1].map((_, index) => (
            <span key={index} className="marquee-inner left">
              {style === "one" ? (
                items.map((item, idx) => (
                  <span key={idx} className="marquee-item">
                    {item}
                    <i className="far fa-asterisk" aria-hidden="true" />
                  </span>
                ))
              ) : (
                <span className="marquee-item">
                  <span className="designer">Designer</span>
                  <span className="portfolio">Portfolio</span>
                  <span className="developer">Developer</span>
                </span>
              )}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
});

MarqueeSection.displayName = 'MarqueeSection';
export default MarqueeSection;