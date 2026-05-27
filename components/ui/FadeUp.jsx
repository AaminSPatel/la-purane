import { useInView } from '../../hooks/useInView';

export function FadeUp({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  
  return (
    <div 
      ref={ref} 
      style={{ 
        opacity: inView ? 1 : 0, 
        transform: inView ? 'translateY(0)' : 'translateY(40px)', 
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s` 
      }}
    >
      {children}
    </div>
  );
}