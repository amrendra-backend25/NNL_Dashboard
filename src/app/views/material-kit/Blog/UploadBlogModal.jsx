import Modal from 'react-bootstrap/Modal';
import UploadBlog from './UploadBlog';
const UploadBlogModal = (props) => {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <UploadBlog />
      </Modal>
    </>
  );
};

export default UploadBlogModal;
