import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { styled, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import PageHeader from 'app/PageHeader';
import Link from '@mui/material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import ViewModal from './ViewModal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
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

const QueryForm = () => {
  const [user_Form, setUser_Form] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isDelete, setIsDelete] = useState('');
  const [isError, setIsError] = useState('');

  const topForm = async () => {
    try {
      const response = await Paths.EndpointsURL.HomeTopForm;
      axios({
        url: response,
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((record) => {
        setUser_Form(record.data.data);
        //console.log(record.data.data);
      });
    } catch (error) {
      setIsError(error.msg);
      console.log(error.msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteResp = Paths.EndpointsURL.DeleteForm + `${id}`;
      const res = await axios.delete(deleteResp);
      if (res.data.status !== 200 && res.data.success) {
        topForm();
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
    topForm();
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

  const sortOptions = ['today', 'week', 'month'];

  const handleChange = () => {
    console.log(sortOptions);
    // setSortValue(sortOptions);
  };
  return (
    <Container>
      <PageHeader
        title="Home Page Header"
        subTitle="Top Home"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <ViewModal show={modalShow} onHide={() => setModalShow(false)} />
      <DropdownButton
        style={{ flexDirection: 'row' }}
        id="dropdown-basic-button"
        title="Filter"
        onClick={handleChange}
        // value={sortValue}
      >
        <Dropdown.Item>Today</Dropdown.Item>
        <Dropdown.Item>Week</Dropdown.Item>
        <Dropdown.Item>Month</Dropdown.Item>
      </DropdownButton>

      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        {user_Form
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
                      <p className="fw-normal mb-1">{result.phone}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{result.email}</p>
                    </td>

                    <td>
                      {/* <Link onClick={() => setModalShow(true)} style={{ cursor: 'pointer' }}>
                        <VisibilityIcon />
                      </Link> */}
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
        count={user_Form.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Container>
  );
};

export default QueryForm;
