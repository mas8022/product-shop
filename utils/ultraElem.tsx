"use client";
import React, {
  memo,
  useState,
  useEffect,
  Suspense,
  useRef,
  useCallback,
} from "react";

interface UseInViewOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseInViewReturn {
  ref: (node: HTMLElement | null) => void;
  inView: boolean;
  entry: IntersectionObserverEntry | undefined;
}

const useInView = ({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  triggerOnce = false,
}: UseInViewOptions = {}): UseInViewReturn => {
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();
  const nodeRef = useRef<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && nodeRef.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setInView(entry.isIntersecting);
          setEntry(entry);
          if (entry.isIntersecting && triggerOnce) {
            observer.current?.disconnect();
          }
        },
        {
          threshold,
          root,
          rootMargin,
        }
      );
      observer.current.observe(nodeRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [threshold, root, rootMargin, triggerOnce]);

  const ref = useCallback((node: HTMLElement | null) => {
    if (node) {
      nodeRef.current = node;
      if (observer.current) {
        observer.current.observe(node);
      }
    }
  }, []);

  return { ref, inView, entry };
};

const Loader: React.FC = () => (
  <div className="containerLoadingBox">
    <div className="loadingBox"></div>
  </div>
);

interface UeProps {
  className?: string;
  children: React.ReactNode;
}

const Ue: React.FC<UeProps> = memo(({ className: classes, children }) => {
  const [loaded, setLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && inView && !loaded) {
      setLoaded(true);
    }
  }, [inView, loaded, isClient]);

  return (
    <div ref={ref} className={classes}>
      {loaded ? (
        <Suspense fallback={<Loader />}>{children}</Suspense>
      ) : (
        <Loader />
      )}
    </div>
  );
});

export { Ue };
