import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { styled, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import PageHeader from 'app/PageHeader';
import Button from 'react-bootstrap/Button';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadModalMaster from './UploadModalMaster';
import EditModalMaster from './EditModalMaster';
const Container = styled('div')(({ theme }) => ({
  margin: '50px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '50px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const DisplayMaster = () => {
  const [nextiansDetails, setNextiansDetails] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  useEffect(() => {
    fetch('http://localhost:5000/api/All/users/nextians')
      .then((res) => res.json())
      .then((result) => setNextiansDetails(result));
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
          title="Inner Mastermind Details"
          subTitle="Know More Master Mind "
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
              <th scope="col">Subject</th>
              <th scope="col">Specilazation</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          {nextiansDetails
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((result, index) => {
              return (
                <>
                  <MDBTableBody>
                    <tr>
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
                        <p className="fw-normal mb-1">Adult Health Nursing</p>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">MBBS, DGO from MLN...</p>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">With a vast experience of teaching...</p>
                      </td>
                      <td>
                        <Link style={{ cursor: 'pointer' }} onClick={() => setModalShow1(true)}>
                          <EditIcon />
                        </Link>
                        <Link style={{ cursor: 'pointer' }}>
                          <VisibilityIcon />
                        </Link>
                        <Link style={{ cursor: 'pointer', color: 'red' }}>
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

export default DisplayMaster;
