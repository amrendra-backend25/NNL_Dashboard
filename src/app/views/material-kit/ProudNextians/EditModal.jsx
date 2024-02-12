// import Modal from 'react-bootstrap/Modal';
// import EditNextians from './EditNextians';
// import { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { Paths } from '../../../../app/baseApi/baseApi';
// const EditModal = (props) => {
//   const [EditModalNextians, setEditModalNextians] = useState({
//     student_name: '',
//     year: '',
//     image: '',
//     id: '',
//   });

//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setEditModalNextians({ ...EditModalNextians, [name]: value });
//     //setIsError({ ...isError, [name]: '' });
//   };

//   const handleUpdate = async (id) => {
//     try {
//       const editResp = Paths.EndpointsURL.EditNextians + id;
//       const res = await axios.patch(editResp);
//       if (res.data.status !== 200 && res.data.success) {
//         setEditModalNextians(res.data.data);
//         toast.success('Data Updated Successfully', { position: 'top-right' });
//         console.log(res);
//       } else {
//         // Handle unexpected response status
//         console.error('Unexpected response:', res);
//         toast.error('Error editing data', { position: 'top-right' });
//       }
//     } catch (error) {
//       console.error('Error editing data:', error.meg);
//       toast.error('Error editing data', { position: 'top-right' });
//     }
//   };
//   return (
//     <>
//       <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
//         <Modal.Header closeButton></Modal.Header>
//         <EditNextians handleChange={handleChange} handleUpdate={handleUpdate} />
//       </Modal>
//     </>
//   );
// };

// export default EditModal;
