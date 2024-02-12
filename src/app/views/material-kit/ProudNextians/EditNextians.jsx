import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFile,
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import { styled } from '@mui/system';
const Container = styled('div')(({ theme }) => ({
  margin: '50px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const EditNextians = ({
  handleOnUpdate,
  handleChange,
  updateValue,
  handleFileChange,
  imageUpdate,
}) => {
  const [isError, setIsError] = useState([]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!EditNextians.student_name.trim()) {
      newErrors.student_name = 'Student Name is required';
      isValid = false;
    }
    if (!EditNextians.year.trim()) {
      newErrors.year = 'Year is required';
      isValid = false;
    }
    setIsError(newErrors);
    return isValid;
  };

  return (
    <Container>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="6" className="my-1" style={{ width: '100%' }}>
            <h1 className="text-black mb-4 text-center">Edit Nextians Details</h1>
            <form onSubmit={handleOnUpdate}>
              <MDBCard>
                <MDBCardBody className="px-4">
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Student Name</h6>
                    </MDBCol>
                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        label="Student Name..."
                        size="lg"
                        id="student_name"
                        name="student_name"
                        value={updateValue.student_name}
                        type="text"
                        onChange={handleChange}
                      />
                      {isError.student_name && (
                        <span style={{ color: 'red', textAlign: 'center' }}>
                          {isError.student_name}
                        </span>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr className="mx-n3" />
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Year</h6>
                    </MDBCol>
                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        label="Year..."
                        size="lg"
                        id="year"
                        name="year"
                        type="text"
                        value={updateValue.year}
                        onChange={handleChange}
                      />
                      {isError.year && (
                        <span style={{ color: 'red', textAlign: 'center' }}>{isError.year}</span>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr className="mx-n3" />
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Upload</h6>
                    </MDBCol>
                    <MDBCol md="9" className="pe-5">
                      <MDBFile
                        size="lg"
                        id="image"
                        name="image"
                        value={updateValue.image}
                        onChange={handleChange}
                      />
                      <div className="small text-muted mt-2">
                        Upload your file or any other relevant file. Max file size 50 MB
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />
                  <MDBBtn className="my-4" size="lg" type="submit">
                    Update
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Container>
  );
};

export default EditNextians;
