declare module 'wow.js' {
  export interface WowOptions {
    boxClass?: string;
    animateClass?: string;
    offset?: number;
    mobile?: boolean;
    live?: boolean;
    callback?: Function;
    scrollContainer?: string;
  }

  export default class WOW {
    constructor(options?: WowOptions);
    init(): void;
    sync(): void;
    show(element: Element): void;
  }
}