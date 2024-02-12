import Modal from 'react-bootstrap/Modal';
import UploadPlanNP from './UploadPlanNP';
const UploadModalPlanNP = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadPlanNP />
      </Modal>
    </>
  );
};

export default UploadModalPlanNP;
