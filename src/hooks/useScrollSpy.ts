// src/hooks/useScrollSpy.ts

'use client';
import { useState, useEffect, useMemo } from 'react';

export const useScrollSpy = (ids: string[], options: { offset: number }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const listener = () => {
      const scroll = window.scrollY;
      
      const a = ids.map(id => {
        const element = document.getElementById(id);
        if (!element) return { id, top: -1, bottom: -1 };
        
        const rect = element.getBoundingClientRect();
        return { id, top: rect.top + scroll, bottom: rect.bottom + scroll };
      });
      
      const b = a.find(({ top, bottom }) => {
        return scroll >= top - options.offset && scroll < bottom - options.offset
      });
      
      setActiveId(b?.id || '');
    };

    listener(); // Run on mount
    window.addEventListener('resize', listener);
    window.addEventListener('scroll', listener);
    
    return () => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('scroll', listener);
    };
  }, [ids, options.offset]);

  return activeId;
};