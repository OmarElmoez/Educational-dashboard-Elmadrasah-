import { useState, useCallback } from 'react';
import { TLoading } from "@/types/shared.ts";

export function useComponentLoading(initialStatus: TLoading = 'idle') {
  const [status, setStatus] = useState<TLoading>(initialStatus);

  const setIdle = useCallback(() => setStatus('idle'), []);
  const setPending = useCallback(() => setStatus('pending'), []);
  const setSucceeded = useCallback(() => setStatus('succeeded'), []);
  const setFailed = useCallback(() => setStatus('failed'), []);

  return {
    isIdle: status === 'idle',
    isPending: status === 'pending',
    isSucceeded: status === 'succeeded',
    isFailed: status === 'failed',
    setIdle,
    setPending,
    setSucceeded,
    setFailed,
  };
}