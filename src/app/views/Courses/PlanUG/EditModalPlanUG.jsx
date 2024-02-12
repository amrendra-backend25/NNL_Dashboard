import Modal from 'react-bootstrap/Modal';
import EditPlanUG from './EditPlanUG';
const EditModalPlanUG = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditPlanUG />
      </Modal>
    </>
  );
};

export default EditModalPlanUG;
