import Modal from 'react-bootstrap/Modal';
import EditPlanB from './EditPlanB';
const EditModalPlanB = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditPlanB />
      </Modal>
    </>
  );
};

export default EditModalPlanB;
