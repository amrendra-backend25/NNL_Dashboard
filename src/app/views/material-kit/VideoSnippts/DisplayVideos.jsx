import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import PageHeader from 'app/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import UploadModalSnippts from './UploadModalSnippts';
import EditModalSnippts from './EditModalSnippts';
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

const DisplayVideos = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [showSnippts, setShowSnippts] = useState([]);
  const [isError, setIsError] = useState('');
  const [isDelete, setIsDelete] = useState('');

  // Read Action perform Here
  const videosSnippts = async () => {
    try {
      const response = await Paths.EndpointsURL.VideoSnippts;
      axios({
        url: response,
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((record) => {
        setShowSnippts(record.data.data);
        //console.log(record.data.data);
      });
    } catch (error) {
      setIsError(error.msg);
      console.log(error.msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteResp = Paths.EndpointsURL.DeleteVideoSnippts + `${id}`;
      const res = await axios.delete(deleteResp);
      if (res.data.status !== 200 && res.data.success) {
        videosSnippts();
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

  useEffect(() => {
    videosSnippts();
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
        title="Home Videos Snippts"
        subTitle="Home Videos"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add New
      </Button>
      <UploadModalSnippts show={modalShow} onHide={() => setModalShow(false)} />
      <EditModalSnippts show={modalShow1} onHide={() => setModalShow1(false)} />
      <br />
      <br />
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Video Heading</th>
            <th scope="col">Link</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        {showSnippts
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((result, index) => {
            return (
              <>
                <MDBTableBody>
                  <tr>
                    <td>
                      <p className="fw-normal mb-1">{result.videoDescription}</p>
                    </td>
                    <td>
                      <Link to="" style={{ cursor: 'pointer' }}>
                        <p className="fw-normal mb-1">{result.videoLink}</p>
                      </Link>
                    </td>

                    <td>
                      <Link style={{ cursor: 'pointer' }} onClick={() => setModalShow1(true)}>
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
          })}
      </MDBTable>
      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={showSnippts.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Container>
  );
};

export default DisplayVideos;
