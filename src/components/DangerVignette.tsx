import { motion, AnimatePresence } from 'framer-motion';
import type { Resources, ResourceKey } from '../types';

interface Props {
  resources: Resources;
}

const DANGER_THRESHOLD_LOW = 15;
const DANGER_THRESHOLD_HIGH = 85;

const RESOURCE_COLORS: Record<ResourceKey, string> = {
  budget: 'rgba(234, 179, 8, 0.35)',       // gelb (Geld)
  zufriedenheit: 'rgba(239, 68, 68, 0.35)', // rot (Wut)
  personal: 'rgba(168, 85, 247, 0.35)',     // lila (Personal)
  effizienz: 'rgba(249, 115, 22, 0.35)',    // orange (Chaos)
};

export default function DangerVignette({ resources }: Props) {
  const dangerResources: ResourceKey[] = (
    ['budget', 'zufriedenheit', 'personal', 'effizienz'] as ResourceKey[]
  ).filter(
    (k) => resources[k] <= DANGER_THRESHOLD_LOW || resources[k] >= DANGER_THRESHOLD_HIGH
  );

  const isActive = dangerResources.length > 0;
  // Mische die Farben aller gefährlichen Ressourcen – nimm die erste für einfache Darstellung
  const color = dangerResources.length > 0 ? RESOURCE_COLORS[dangerResources[0]] : 'transparent';

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="vignette"
          className="absolute inset-0 z-5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
            default: { duration: 0.3 },
          }}
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, ${color} 100%)`,
            boxShadow: `inset 0 0 80px 20px ${color}`,
          }}
        />
      )}
    </AnimatePresence>
  );
}
