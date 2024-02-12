import Modal from 'react-bootstrap/Modal';
import UploadSuccess from './UploadSuccess';
const UploadModalSuccess = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadSuccess />
      </Modal>
    </>
  );
};

export default UploadModalSuccess;
