export const CanvasFilters = {
  NONE: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  WARM: [1.2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  COOL: [0.9, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  SEPIA: [0.3, 0.45, 0.1, 0, 0, 0.2, 0.45, 0.1, 0, 0, 0.1, 0.3, 0.1, 0, 0, 0, 0, 0, 1, 0],
  BLACK_AND_WHITE: [0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0, 0, 0, 0, 1, 0],
  VINTAGE: [0.9, 0.5, 0.4, 0, 0, 0.3, 0.8, 0.2, 0, 0, 0.1, 0.4, 0.9, 0, 0, 0, 0, 0, 1, 0],
  GRAYSCALE: [
    0.33, 0.33, 0.33, 0, 0, 0.33, 0.33, 0.33, 0, 0, 0.33, 0.33, 0.33, 0, 0, 0, 0, 0, 1, 0,
  ],
  CONTRAST: [2, 0, 0, 0, -0.5, 0, 2, 0, 0, -0.5, 0, 0, 2, 0, -0.5, 0, 0, 0, 1, 0],
  BLUR: [
    0.1, 0.1, 0.1, 0.1, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,
    0.1,
  ],
}

export const filterNames = [
  { name: 'None', filter: CanvasFilters.NONE },
  { name: 'Warm', filter: CanvasFilters.WARM },
  { name: 'Cool', filter: CanvasFilters.COOL },
  { name: 'Sepia', filter: CanvasFilters.SEPIA },
  { name: 'Black&White', filter: CanvasFilters.BLACK_AND_WHITE },
  { name: 'Vintage', filter: CanvasFilters.VINTAGE },
  { name: 'Grayscale', filter: CanvasFilters.GRAYSCALE },
  { name: 'Contrast', filter: CanvasFilters.CONTRAST },
  { name: 'Blur', filter: CanvasFilters.BLUR },
]
