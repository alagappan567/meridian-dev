// Static film grain overlay — purely presentational, pointer-events: none
export function GrainOverlay() {
  return (
    <div
      className="grain-overlay"
      aria-hidden="true"
      role="presentation"
    />
  );
}
