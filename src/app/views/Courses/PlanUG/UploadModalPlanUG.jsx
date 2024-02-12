import Modal from 'react-bootstrap/Modal';
import UploadPlanUG from './UploadPlanUG';
const UploadModalPlanUG = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadPlanUG />
      </Modal>
    </>
  );
};

export default UploadModalPlanUG;
