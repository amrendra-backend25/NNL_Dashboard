import Modal from 'react-bootstrap/Modal';
import EditPlanNP from './EditPlanNP';
const EditModalPlanNP = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditPlanNP />
      </Modal>
    </>
  );
};

export default EditModalPlanNP;
