import Modal from 'react-bootstrap/Modal';
import UploadPlanC from './UploadPlanC';
const UploadModalPlanC = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadPlanC />
      </Modal>
    </>
  );
};

export default UploadModalPlanC;
