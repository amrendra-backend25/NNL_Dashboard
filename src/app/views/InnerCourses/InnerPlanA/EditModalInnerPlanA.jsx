import Modal from 'react-bootstrap/Modal';
import EditInnerPlanA from './EditInnerPlanA';
const EditModalInnerPlanA = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditInnerPlanA />
      </Modal>
    </>
  );
};

export default EditModalInnerPlanA;
