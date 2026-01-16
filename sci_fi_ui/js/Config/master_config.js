import { DESIGN_CONFIG } from './design_config.js';
import { STRUCTURE_CONFIG } from './structure_config.js'; 
import { COLOR_CONFIG } from './color_config.js';
import { TYPOGRAPHY_CONFIG } from './typography_config.js';

/**
 * MASTER CONFIGURATION
 * The central registry that combines all sub-configurations.
 */

export const CONFIG = {
    structures: STRUCTURE_CONFIG,
    designs: DESIGN_CONFIG,
    colors: COLOR_CONFIG,
    typography: TYPOGRAPHY_CONFIG
};