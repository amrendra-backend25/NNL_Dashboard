import Modal from 'react-bootstrap/Modal';
import EditPlanC from './EditPlanC';
const EditModalPlanC = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditPlanC />
      </Modal>
    </>
  );
};

export default EditModalPlanC;
