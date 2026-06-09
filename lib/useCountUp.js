'use client'
import { useState, useEffect } from 'react'

export function useCountUp(target, run) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    const dur = 1500
    const start = performance.now()
    let raf
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [run, target])
  return val
}
