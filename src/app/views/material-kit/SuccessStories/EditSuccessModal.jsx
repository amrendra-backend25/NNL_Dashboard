import Modal from 'react-bootstrap/Modal';
import EditSuccess from './EditSuccess';
const EditSuccessModal = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditSuccess />
      </Modal>
    </>
  );
};

export default EditSuccessModal;
