import { useReducedMotion } from 'framer-motion';
import { motionTokens } from './tokens';
import { easing } from './easing';

export function useMotion() {
  const reduce = useReducedMotion();

  return {
    reduce,

    // timing
    duration: {
      micro: reduce ? 0 : motionTokens.micro / 1000,
      ui: reduce ? 0 : motionTokens.ui / 1000,
      page: reduce ? 0 : motionTokens.page / 1000,
      modal: reduce ? 0 : motionTokens.modal / 1000,
    },

    easing: {
      out: easing.out,
      in: easing.in,
      inOut: easing.inOut,
    },
  };
}