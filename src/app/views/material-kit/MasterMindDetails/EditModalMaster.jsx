import Modal from 'react-bootstrap/Modal';
import EditMaster from './EditMaster';
const EditModalMaster = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditMaster />
      </Modal>
    </>
  );
};

export default EditModalMaster;
