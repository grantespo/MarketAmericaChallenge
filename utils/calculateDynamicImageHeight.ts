export function calculateDynamicImageHeight(
  originalWidth: number,
  originalHeight: number,
  targetWidth: number,
): number {
  if (originalWidth === 0) return 0;

  return (targetWidth / originalWidth) * originalHeight;
}
