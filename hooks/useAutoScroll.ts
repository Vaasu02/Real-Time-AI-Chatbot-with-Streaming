'use client';

import { useEffect, useRef } from 'react';

//Custom hook for auto-scrolling to latest message
export function useAutoScroll<T extends HTMLElement>(
  dependencies: any[],
  options: { behavior?: ScrollBehavior; block?: ScrollLogicalPosition } = {}
) {
  const scrollRef = useRef<T>(null);
  const { behavior = 'smooth', block = 'end' } = options;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior, block });
    }
  }, dependencies);

  return scrollRef;
}

