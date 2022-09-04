import React from 'react'

const SimpleModal = ({ children, show, setShow }) => {
  const content = show && (
    <div className="overlay">
      <div className="modal">
        <button
          className="modal-close"
          type="button"
          onClick={() => setShow(false)}
        >
          x
        </button>
        <div className="modal-body">
          <dfn>
            {children}
          </dfn>
        </div>
      </div>
    </div>
  )

  return content
}

export default SimpleModal
