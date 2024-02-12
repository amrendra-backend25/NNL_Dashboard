import Modal from 'react-bootstrap/Modal';
import EditPlanTH from './EditPlanTH';
const EditModalPlanTH = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditPlanTH />
      </Modal>
    </>
  );
};

export default EditModalPlanTH;
