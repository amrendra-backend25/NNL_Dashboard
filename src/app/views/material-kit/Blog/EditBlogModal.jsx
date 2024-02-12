import Modal from 'react-bootstrap/Modal';
import EditBlog from './EditBlog';
const EditBlogModal = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <EditBlog />
      </Modal>
    </>
  );
};

export default EditBlogModal;
