import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { styled, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import PageHeader from 'app/PageHeader';
import Button from 'react-bootstrap/Button';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import UploadModal from './UploadModal';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Paths } from '../../../../app/baseApi/baseApi';
import EditNextians from './EditNextians';
const Container = styled('div')(({ theme }) => ({
  margin: '50px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '50px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const DisplayNextians = () => {
  const [nextiansDetails, setNextiansDetails] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [isError, setIsError] = useState('');
  const [isDelete, setIsDelete] = useState('');

  const [editNextians, setEditNextians] = useState({
    student_name: '',
    year: '',
    image: '',
    _id: '',
  });

  const [editedFile, setEditedFile] = useState(null);

  // Read Action perform Here
  const nextianStudents = async () => {
    try {
      const response = await Paths.EndpointsURL.HomeNextians;
      axios({
        url: response,
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((record) => {
        setNextiansDetails(record.data.data);
        //console.log(record.data.data);
      });
    } catch (error) {
      setIsError(error.msg);
      console.log(error.msg);
    }
  };

  // Delete Action perform Here
  const handleDelete = async (id) => {
    try {
      const deleteResp = Paths.EndpointsURL.DeleteNextians + `${id}`;
      const res = await axios.delete(deleteResp);
      if (res.data.status !== 200 && res.data.success) {
        nextianStudents();
        setIsDelete(res.data.data);
        toast.success(res.data.msg, { position: 'top-right' });
      } else {
        // Handle unexpected response status
        toast.error(res.data.msg, { position: 'top-right' });
        console.log(res.data.data);
      }
    } catch (error) {
      console.error('Error deleting data:', error.message);
      toast.error('Error deleting data', { position: 'top-right' });
    }
  };

  const handleUpdate = async (result) => {
    setModalShow1(!modalShow1);
    setEditNextians(result);
    console.log(result);
  };

  //Edit Action Perform Here
  const handleOnUpdate = async (e) => {
    e.preventDefault();
    try {
      const editResp = Paths.EndpointsURL.EditNextians + editNextians;
      const res = await axios.patch(editResp);
      if (res.data.status !== 200 && res.data.success) {
        setModalShow1(true);
        setEditNextians(res.data.data);
        toast.success('Data Updated Successfully', { position: 'top-right' });
        console.log(res.data.data);
      } else {
        // Handle unexpected response status
        console.error('Unexpected response:', res);
        toast.error('Error editing data', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error editing data:', error.meg);
      toast.error('Error editing data', { position: 'top-right' });
    }
  };

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditNextians({ ...EditNextians, [name]: value });
    setIsError({ ...isError, [name]: '' });
    setEditedFile(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditNextians({ ...EditNextians, [name]: value });
    setEditedFile(e.target.files[0]);
  };

  useEffect(() => {
    nextianStudents();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Container>
        <PageHeader
          title="Proud Nextians Details"
          subTitle="Home Nextians"
          icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
        />
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add New
        </Button>
        <UploadModal show={modalShow} onHide={() => setModalShow(false)} />
        <Modal
          show={modalShow1}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onClick={handleUpdate}
        >
          <Modal.Header closeButton></Modal.Header>
          <EditNextians
            handleOnUpdate={handleOnUpdate}
            handleChange={handleChange}
            updateValue={editNextians}
            imageUpdate={editedFile}
            handleFileChange={handleFileChange}
          />
        </Modal>
        <br />
        <br />
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Student Name</th>
              <th scope="col">Image</th>
              <th scope="col">Year</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          {nextiansDetails[0] ? (
            nextiansDetails
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((result, index) => {
                return (
                  <>
                    <MDBTableBody>
                      <tr key={result._id}>
                        <td>
                          <p className="fw-normal mb-1">{result.student_name}</p>
                        </td>
                        <td>
                          <img
                            src={result.image}
                            alt=""
                            style={{ width: '45px', height: '45px' }}
                            className="rounded-circle"
                          />
                        </td>
                        <td>
                          <p className="fw-normal mb-1">{result.year}</p>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">
                            We at Nursing Next Live, hold a vision and Mission to provide a “BRIDGE”
                            between the Nursing & Medical Education.
                          </p>
                        </td>
                        <td>
                          <Link style={{ cursor: 'pointer' }} onClick={() => handleUpdate(result)}>
                            <EditIcon />
                          </Link>
                          <Link style={{ cursor: 'pointer' }}>
                            <VisibilityIcon />
                          </Link>

                          <Link
                            style={{ cursor: 'pointer', color: 'red' }}
                            onClick={() => handleDelete(result._id)}
                          >
                            <DeleteIcon />
                          </Link>
                        </td>
                      </tr>
                    </MDBTableBody>
                  </>
                );
              })
          ) : (
            <h5 className="text-red mb-0 mt-4 ">No Data Available</h5>
          )}
        </MDBTable>
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={nextiansDetails.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 15, 20]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        />
      </Container>
    </>
  );
};

export default DisplayNextians;
