import Modal from 'react-bootstrap/Modal';
import UploadMasterMind from './UploadMasterMind';
const UploadModalMaster = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadMasterMind />
      </Modal>
    </>
  );
};

export default UploadModalMaster;
