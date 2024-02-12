import Modal from 'react-bootstrap/Modal';
import UploadPlanRRR from './UploadPlanRRR';
const UploadModalPlanRRR = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadPlanRRR />
      </Modal>
    </>
  );
};

export default UploadModalPlanRRR;
