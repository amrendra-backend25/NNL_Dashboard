import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { styled, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import PageHeader from 'app/PageHeader';
import Link from '@mui/material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import Button from 'react-bootstrap/Button';
import UploadModalPlanA from './UploadModalPlanA';
import EditModalPlanA from './EditModalPlanA';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Paths } from '../../../../app/baseApi/baseApi';

const Container = styled('div')(({ theme }) => ({
  margin: '50px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '50px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const DisplayPlanA = () => {
  const [nnlCourses, setNNLCourses] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [isError, setIsError] = useState('');
  const [isDelete, setIsDelete] = useState('');

  const pathshalaDetails = async () => {
    try {
      const response = await Paths.EndpointsURL.HomeNNLCourses;
      axios({
        url: response,
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((record) => {
        setNNLCourses(record.data.data);
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
      const deleteResp = Paths.EndpointsURL.DeleteHomeCourses + `${id}`;
      const res = await axios.delete(deleteResp);
      if (res.data.status !== 200 && res.data.success) {
        pathshalaDetails();
        setIsDelete(res.data.data);
        toast.success(res.data.msg, { position: 'top-right' });
      } else {
        // Handle unexpected response status
        toast.error(res.data.msg, { position: 'top-right' });
        console.log(res.data.msg);
      }
    } catch (error) {
      console.error('Error deleting data:', error.message);
      toast.error('Error deleting data', { position: 'top-right' });
    }
  };

  useEffect(() => {
    pathshalaDetails();
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
    <Container>
      <PageHeader
        title="PlanA Details"
        subTitle="PlanA Home"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add New
      </Button>
      <UploadModalPlanA show={modalShow} onHide={() => setModalShow(false)} />
      <EditModalPlanA show={modalShow1} onHide={() => setModalShow1(false)} />

      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Course Heading</th>
            <th scope="col">Image</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        {nnlCourses
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((result, index) => {
            return (
              <>
                <MDBTableBody>
                  <tr>
                    <td>
                      <p className="fw-normal mb-1">{result.course_heading}</p>
                    </td>
                    <td>
                      <img
                        src={result.image}
                        style={{ width: '45px', height: '45px' }}
                        className="rounded-circle"
                        alt="Image"
                      />
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{result.description}</p>
                    </td>

                    <td>
                      <Link onClick={() => setModalShow1(true)} style={{ cursor: 'pointer' }}>
                        <EditIcon />
                      </Link>
                      <Link onClick={() => setModalShow(true)} style={{ cursor: 'pointer' }}>
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
          })}
      </MDBTable>
      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={nnlCourses.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Container>
  );
};

export default DisplayPlanA;
