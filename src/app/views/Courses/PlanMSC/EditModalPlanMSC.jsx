import Modal from 'react-bootstrap/Modal';
import EditPlanMSC from './EditPlanMSC';
const EditModalPlanMSC = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditPlanMSC />
      </Modal>
    </>
  );
};

export default EditModalPlanMSC;
