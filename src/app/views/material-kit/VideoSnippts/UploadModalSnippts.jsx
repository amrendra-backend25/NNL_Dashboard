import Modal from 'react-bootstrap/Modal';
import UploadSnippts from './UploadSnippts';
const UploadModalSnippts = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadSnippts />
      </Modal>
    </>
  );
};

export default UploadModalSnippts;
