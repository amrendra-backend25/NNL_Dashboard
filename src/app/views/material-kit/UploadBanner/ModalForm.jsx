import Modal from 'react-bootstrap/Modal';
import UploadBanner from './UploadBanner';
const ModalForm = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadBanner />
      </Modal>
    </>
  );
};

export default ModalForm;
