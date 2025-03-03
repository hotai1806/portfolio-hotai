import { motion } from "framer-motion";
import { myFont } from "@/app/lib/customeFont";

const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipLinkProps {
  children: string;
  href: string;
  style: React.CSSProperties;
  className?: string;
  additionTailwindClass: string;
}

const FlipLink = ({ href, children, additionTailwindClass }: FlipLinkProps) => {
  return (
    <div className={`${myFont.className}`}>
      <motion.a
        initial="initial"
        whileHover="hovered"
        href={href}
        className={`relative items-center inline-block overflow-hidden -nowrap  font-black uppercase ${additionTailwindClass}`}
        style={{
          lineHeight: 0.75,
        }}
      >
        <div>
          {children.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: "10%",
                },
                hovered: {
                  y: "-120%",
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
        <div className="absolute inset-0 ">
          {children.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: "130%",
                },
                hovered: {
                  y: "10%",
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block text-red-primary"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </motion.a>
    </div>
  );
};

export default FlipLink;
