export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof window.addEventListener === 'function';
export const isServer = !isBrowser;
export const isClient = !isServer;