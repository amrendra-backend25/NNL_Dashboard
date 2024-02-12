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
import UploadModalMaster from './UploadModalMaster';
import EditModalMaster from './EditModalMaster';
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
const DisplayMasterMind = () => {
  const [masterMindPack, setMasterMindPack] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [isError, setIsError] = useState('');
  const [isDelete, setIsDelete] = useState('');

  const DisplayMasterPack = async () => {
    try {
      const response = await Paths.EndpointsURL.HomeMasterMind;
      axios({
        url: response,
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((record) => {
        setMasterMindPack(record.data.data);
        //console.log(record.data.data);
      });
    } catch (error) {
      setIsError(error.msg);
      console.log(error.msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteResp = Paths.EndpointsURL.DeleteMasterMind + `${id}`;
      const res = await axios.delete(deleteResp);
      if (res.data.status !== 200 && res.data.success) {
        DisplayMasterPack();
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
    DisplayMasterPack();
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
          title="Mastermind facility"
          subTitle="Home facility"
          icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
        />
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add New
        </Button>
        <UploadModalMaster show={modalShow} onHide={() => setModalShow(false)} />
        <EditModalMaster show={modalShow1} onHide={() => setModalShow1(false)} />
        <br />
        <br />
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Facility Name</th>
              <th scope="col">Image</th>
              <th scope="col">Specialization</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          {masterMindPack
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((result, index) => {
              return (
                <>
                  <MDBTableBody>
                    <tr>
                      <td>
                        <p className="fw-v normal mb-1">{result.facilityName}</p>
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
                        <p className="fw-normal mb-1">{result.specialization}</p>
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
          count={masterMindPack.length}
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

export default DisplayMasterMind;
