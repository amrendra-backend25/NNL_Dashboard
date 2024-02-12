import Modal from 'react-bootstrap/Modal';

import EditPlanRRR from './EditPlanRRR';
const EditModalPlanRRR = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditPlanRRR />
      </Modal>
    </>
  );
};

export default EditModalPlanRRR;
