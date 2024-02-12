import Modal from 'react-bootstrap/Modal';
import UploadFAQ from './UploadFAQ';
const UploadFaqModal = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton style={{ width: '990px' }}></Modal.Header>
        <UploadFAQ />
      </Modal>
    </>
  );
};

export default UploadFaqModal;
