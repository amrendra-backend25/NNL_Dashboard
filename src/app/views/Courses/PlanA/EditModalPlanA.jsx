import Modal from 'react-bootstrap/Modal';
import EditPlanA from './EditPlanA';
const EditModalPlanA = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditPlanA />
      </Modal>
    </>
  );
};

export default EditModalPlanA;
