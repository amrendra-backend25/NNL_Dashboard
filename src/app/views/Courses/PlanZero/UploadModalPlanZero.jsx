import Modal from 'react-bootstrap/Modal';
import UploadPlanZero from './UploadPlanZero';
const UploadModalPlanZero = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadPlanZero />
      </Modal>
    </>
  );
};

export default UploadModalPlanZero;
