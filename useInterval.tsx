import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void | undefined>(undefined);

  // Se souvenir de la dernière fonction de rappel.
  useEffect(() => {
    savedCallback.current = callback
  });

  // Configurer l’intervalle.
  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }
    let id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay]);
}

export { useInterval }