import Modal from 'react-bootstrap/Modal';
import UploadNextiansDetails from './UploadNextiansDetails';
const UploadNextiansModalDetails = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadNextiansDetails />
      </Modal>
    </>
  );
};

export default UploadNextiansModalDetails;
