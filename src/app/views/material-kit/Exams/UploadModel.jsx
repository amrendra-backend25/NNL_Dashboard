import Modal from 'react-bootstrap/Modal';
import UploadExams from './UploadExams';
const UploadModal = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton style={{ width: '990px' }}></Modal.Header>
        <UploadExams />
      </Modal>
    </>
  );
};

export default UploadModal;
