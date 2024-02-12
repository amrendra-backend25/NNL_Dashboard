import Modal from 'react-bootstrap/Modal';
import UploadPlanA from './UploadPlanA';
const UploadModalPlanA = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadPlanA />
      </Modal>
    </>
  );
};

export default UploadModalPlanA;
