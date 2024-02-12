import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { styled, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import PageHeader from 'app/PageHeader';
import Link from '@mui/material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import axios from 'axios';
import { Paths } from '../../../../app/baseApi/baseApi';
import toast from 'react-hot-toast';
const Container = styled('div')(({ theme }) => ({
  margin: '50px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '50px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const DisplayOffersQueryForm = () => {
  const [offers_Form, setOffers_Form] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isError, setIsError] = useState('');
  const [isDelete, setIsDelete] = useState('');

  const offersQueryForm = async () => {
    try {
      const response = await Paths.EndpointsURL.OffersQueryForm;
      axios({
        url: response,
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((record) => {
        setOffers_Form(record.data.data);
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
      const deleteResp = Paths.EndpointsURL.DeleteFormOffers + `${id}`;
      const res = await axios.delete(deleteResp);
      if (res.data.status !== 200 && res.data.success) {
        offersQueryForm();
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
    offersQueryForm();
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
        title="Offers Query Details"
        subTitle="Home Offers"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      {/* <ViewModal show={modalShow} onHide={() => setModalShow(false)} /> */}

      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Message</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        {offers_Form
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
                      <p className="fw-normal mb-1">{result.email}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{result.phone}</p>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{result.message}</p>
                    </td>

                    <td>
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
        count={offers_Form.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Container>
  );
};

export default DisplayOffersQueryForm;
