import Modal from 'react-bootstrap/Modal';
import EditNextiansDetails from './EditNextiansDetails';
const EditNextiansModalDetails = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditNextiansDetails />
      </Modal>
    </>
  );
};

export default EditNextiansModalDetails;
