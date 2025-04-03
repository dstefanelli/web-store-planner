import { useState } from 'react';
import { ExclamationCircleFill, Dash, Plus } from 'react-bootstrap-icons';

export default function ZoomWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const MAX_ZOOM = 1;
  const MIN_ZOOM = 0.1;
  const STEP = 0.2;
  const [zoom, setZoom] = useState(1);
  const isZoomed = zoom !== 1;

  function zoomIn() {
    setZoom((prev) => Math.min(prev + STEP, MAX_ZOOM));
  }

  function zoomOut() {
    setZoom((prev) => Math.max(prev - STEP, MIN_ZOOM));
  }

  function resetZoom() {
    setZoom(1);
  }

  return (
    <div>
      <div className="grid__zoom-controls">
        <div>
          <p>
            Use the + and – buttons to zoom in and out of the grid. Click Reset
            to return to the default view.{' '}
            {isZoomed && (
              <strong>
                <ExclamationCircleFill
                  className="align-text-top mx-2"
                  color="#dc3545"
                  size={18}
                />
                <span>Zoom is active — reset to interact with the grid.</span>
              </strong>
            )}
          </p>
        </div>
        <div className="btn-group" role="group" aria-label="Zoom controls">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => zoomOut()}
          >
            <Dash />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => resetZoom()}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => zoomIn()}
          >
            <Plus />
          </button>
        </div>
      </div>
      <div
        className={`grid__zoom-wrapper ${isZoomed ? 'grid--zoomed' : ''}`}
        style={{
          transform: zoom === 1 ? 'none' : `scale(${zoom})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
