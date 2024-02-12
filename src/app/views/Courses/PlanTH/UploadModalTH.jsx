import Modal from 'react-bootstrap/Modal';
import UploadPlanTH from './UploadPlanTH';
const UploadModalPlanTH = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadPlanTH />
      </Modal>
    </>
  );
};

export default UploadModalPlanTH;
