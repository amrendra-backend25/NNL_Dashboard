import Modal from 'react-bootstrap/Modal';
import EditMasterMind from './EditMasterMind';
const EditModalMaster = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditMasterMind />
      </Modal>
    </>
  );
};

export default EditModalMaster;
