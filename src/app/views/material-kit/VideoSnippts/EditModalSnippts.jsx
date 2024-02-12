import Modal from 'react-bootstrap/Modal';
import EditSnippts from './EditSnippts';
const EditModalSnippts = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditSnippts />
      </Modal>
    </>
  );
};

export default EditModalSnippts;
