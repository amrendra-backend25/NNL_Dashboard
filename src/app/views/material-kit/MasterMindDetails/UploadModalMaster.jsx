import Modal from 'react-bootstrap/Modal';
import UploadMaster from './UploadMaster';
const UploadModalMaster = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadMaster />
      </Modal>
    </>
  );
};

export default UploadModalMaster;
