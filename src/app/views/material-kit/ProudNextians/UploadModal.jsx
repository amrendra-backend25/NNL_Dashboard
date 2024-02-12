import Modal from 'react-bootstrap/Modal';
import UploadNextians from './UploadNextians';
const UploadModal = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadNextians />
      </Modal>
    </>
  );
};

export default UploadModal;
