export const polar2xy = (r, phi) => ({
  x: r * Math.cos(phi),
  y: r * Math.sin(phi)
});