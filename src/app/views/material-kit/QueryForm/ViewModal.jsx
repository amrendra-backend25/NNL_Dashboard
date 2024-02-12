import Modal from 'react-bootstrap/Modal';
// import ViewQueryForm from './ViewQueryForm';
const ViewModal = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        {/* <ViewQueryForm /> */}
      </Modal>
    </>
  );
};

export default ViewModal;
