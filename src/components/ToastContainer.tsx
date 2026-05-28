import { AnimatePresence, motion } from 'framer-motion';
import { useMotion } from '../motion';

export function ToastContainer({ toasts }: any) {
  const { reduce, duration, easing } = useMotion();

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24 }}>
      <AnimatePresence>
        {toasts.map((t: any) => (
          <motion.div
            key={t.id}
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
            transition={{
              duration: duration.ui,
              ease: easing.out,
            }}
            style={{
              background: '#1f2937',
              color: 'white',
              padding: '12px 16px',
              borderRadius: 12,
              marginBottom: 8,
            }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}