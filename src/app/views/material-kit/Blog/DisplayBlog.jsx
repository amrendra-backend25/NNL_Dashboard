import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { styled, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import PageHeader from 'app/PageHeader';
import Link from '@mui/material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import Button from 'react-bootstrap/Button';
import EditIcon from '@mui/icons-material/Edit';
import UploadBlogModal from './UploadBlogModal';
import EditBlogModal from './EditBlogModal';
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

const DisplayBlog = () => {
  const [disBlogs, setDisBlogs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [isError, setIsError] = useState('');
  const [isDelete, setIsDelete] = useState('');

  // Read Action perform Here
  const blogsDisplay = async () => {
    try {
      const response = await Paths.EndpointsURL.HomeBlogs;
      axios({
        url: response,
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((record) => {
        setDisBlogs(record.data.data);
        // console.log(record.data);
      });
    } catch (error) {
      setIsError(error.msg);
      // console.log(error.msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteResp = Paths.EndpointsURL.DeleteBlogs + `${id}`;
      const res = await axios.delete(deleteResp);
      if (res.data.status !== 200 && res.data.success) {
        blogsDisplay();
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
    blogsDisplay();
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
        title="Inner Blog Details "
        subTitle="Latest Blogs"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add New
      </Button>
      <EditBlogModal show={modalShow1} onHide={() => setModalShow1(false)} />
      <UploadBlogModal show={modalShow} onHide={() => setModalShow(false)} />

      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Bloger Name</th>
            <th scope="col">Image</th>
            <th scope="col">By Date</th>
            <th scope="col">Subject</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        {disBlogs
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((result, index) => {
            return (
              <>
                <MDBTableBody>
                  <tr>
                    <td>
                      <p className="fw-normal mb-1">{result.name}</p>
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
                      <p className="fw-normal mb-1">{result.byDate}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{result.subject}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{result.description}</p>
                    </td>
                    <td>
                      <Link style={{ cursor: 'pointer' }} onClick={() => setModalShow1(true)}>
                        <EditIcon />
                      </Link>
                      <Link style={{ cursor: 'pointer' }}>
                        <VisibilityIcon />
                      </Link>

                      <Link
                        style={{ color: 'red', cursor: 'pointer' }}
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
        count={disBlogs.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Container>
  );
};

export default DisplayBlog;
