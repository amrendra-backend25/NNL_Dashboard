import Modal from 'react-bootstrap/Modal';
import UploadInnerPlanA from './UploadInnerPlanA';
const UploadModalInnerPlanA = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadInnerPlanA />
      </Modal>
    </>
  );
};

export default UploadModalInnerPlanA;
