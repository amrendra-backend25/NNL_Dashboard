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
import UploadModalPlanMSC from './UploadModalPlanMSC';
import EditModalPlanMSC from './EditModalPlanMSC';
// import ViewModal from './ViewModal';

const Container = styled('div')(({ theme }) => ({
  margin: '50px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '50px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const DisplayPlanMSC = () => {
  const [user_Form, setUser_Form] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [sortValue, setSortValue] = useState('');
  useEffect(() => {
    fetch('http://localhost:5000/api/All/users/form')
      .then((res) => res.json())
      .then((result) => setUser_Form(result));
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
        title="PlanMSC Details"
        subTitle="PlanMSC Home"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add New
      </Button>
      <UploadModalPlanMSC show={modalShow} onHide={() => setModalShow(false)} />
      <EditModalPlanMSC show={modalShow1} onHide={() => setModalShow1(false)} />

      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Course Heading</th>
            <th scope="col">Image</th>
            <th scope="col">Description</th>
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
                      <p className="fw-normal mb-1">Plan MSc - MSc Entrance Pack 2.0</p>
                    </td>
                    <td>
                      <img src="" alt="Image" />
                    </td>
                    <td>
                      <p className="fw-normal mb-1">Excel in All the MSc Entrance Exams</p>
                    </td>

                    <td>
                      <Link onClick={() => setModalShow1(true)} style={{ cursor: 'pointer' }}>
                        <EditIcon />
                      </Link>
                      <Link onClick={() => setModalShow(true)} style={{ cursor: 'pointer' }}>
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

export default DisplayPlanMSC;
