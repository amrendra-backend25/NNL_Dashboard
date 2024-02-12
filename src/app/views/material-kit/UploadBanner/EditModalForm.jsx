import Modal from 'react-bootstrap/Modal';
import EditBanner from './EditBanner';
const EditModalForm = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditBanner />
      </Modal>
    </>
  );
};

export default EditModalForm;
