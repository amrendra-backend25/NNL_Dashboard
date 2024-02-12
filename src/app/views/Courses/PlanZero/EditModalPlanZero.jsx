import Modal from 'react-bootstrap/Modal';
import EditPlanZero from './EditPlanZero';
const EditModalPlanZero = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditPlanZero />
      </Modal>
    </>
  );
};

export default EditModalPlanZero;
