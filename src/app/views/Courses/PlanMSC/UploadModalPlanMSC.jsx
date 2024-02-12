import Modal from 'react-bootstrap/Modal';
import UploadPlanMSC from './UploadPlanMSC';
const UploadModalPlanMSC = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadPlanMSC />
      </Modal>
    </>
  );
};

export default UploadModalPlanMSC;
