import { AnimatePresence, motion, useAnimation, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type FloatingDockItem = {
  title: string;
  icon: React.ReactNode;
};

type FloatingDockProps = {
  items: FloatingDockItem[];
  desktopClassName?: string;
};

export const FloatingDock = ({ items, desktopClassName }: FloatingDockProps) => {
  return <FloatingDockDesktop items={items} className={desktopClassName} />;
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  const [showHint, setShowHint] = useState(true);
  const controls = useAnimation();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (showHint) {
      controls.start({
        opacity: [0, 1, 1, 0],
        x: [-50, -50, 50, 50],
        transition: {
          duration: 2,
          repeatDelay: 2,
          delay: 2,
          times: [0, 0.2, 0.8, 1],
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      controls.stop();
    }

    return () => {
      controls.stop();
      if (timer.current) clearInterval(timer.current);
    };
  }, [controls, showHint]);

  return (
    <div className="relative h-fit flex items-center justify-center pointer-events-auto">
      <motion.div
        onMouseMove={(event) => {
          mouseX.set(event.pageX);
          setShowHint(false);
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={[
          "flex gap-2 md:gap-4",
          "mx-auto h-16 items-end rounded-2xl bg-white/30 dark:bg-black/50 px-4 pb-3",
          className ?? "",
        ].join(" ")}
      >
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </motion.div>
      {showHint && (
        <div className="z-10 absolute t-0 w-full h-full pointer-events-none" onMouseEnter={() => setShowHint(false)}>
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="w-5 h-5 border-2 left-[50%] top-0 border-foreground rounded-full"
              style={{ transform: "translateX(-50px)" }}
              initial={{ opacity: 0, x: -50 }}
              animate={controls}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
}: {
  mouseX: ReturnType<typeof useMotionValue>;
  title: string;
  icon: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="aspect-square rounded-full bg-secondary/30 flex items-center justify-center relative"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-popover border border-border text-popover-foreground absolute left-1/2 -translate-x-1/2 -bottom-8 w-fit text-xs"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
        {icon}
      </motion.div>
    </motion.div>
  );
}