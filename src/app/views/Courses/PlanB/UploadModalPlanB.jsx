import Modal from 'react-bootstrap/Modal';
import UploadPlanB from './UploadPlanB';
const UploadModalPlanB = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadPlanB />
      </Modal>
    </>
  );
};

export default UploadModalPlanB;
