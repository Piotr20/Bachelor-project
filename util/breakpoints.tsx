export const breakpoints = {
    /**
     * Small phones
     */
    xs: 320,
    /**
     * Larger phones, tablet portrait
     */
    sm: 415,
    /**
     * Tablet
     */
    md: 768,
    /**
     * Small laptops
     */
    lg: 1024,
    /**
     * Larger laptops
     */
    xl: 1600,
    /**
     * Desktop
     */
    "2xl": 1920,
};

export type Breakpoints = typeof breakpoints;

export type BreakpointKeys = keyof Breakpoints;
