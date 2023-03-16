import { createPortal } from 'react-dom'

const ModalConfirm = ({ children }) => {
  return createPortal(
    <div className="modal-wrapper">
      <div className="modal-inner">{children}</div>
    </div>,
    document.getElementById('modal-portal')
  )
}

export default ModalConfirm
