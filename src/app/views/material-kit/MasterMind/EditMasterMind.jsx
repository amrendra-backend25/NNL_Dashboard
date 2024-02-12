import { styled } from '@mui/material';
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
const Container = styled('div')(({ theme }) => ({
  margin: '50px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '50px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const EditMasterMind = () => {
  const [uploadNextians, setUploadNextians] = useState({
    student_name: '',
    year: '',
    image: '',
  });

  const [isError, setIsError] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  //const [adminBanner, setAdminBanner] = useState([]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!uploadNextians.student_name.trim()) {
      newErrors.student_name = 'Student Name is required';
      isValid = false;
    }
    if (!uploadNextians.year.trim()) {
      newErrors.year = 'Year is required';
      isValid = false;
    }
    setIsError(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUploadNextians({ ...uploadNextians, [name]: value });
    setIsError({ ...isError, [name]: '' });
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBanner = { ...uploadNextians, id: new Date().toString() };
    if (validateForm()) {
      fetch('http://localhost:5000/api/users/nextians', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newBanner),
      }).then((res) => {
        res.json().then(() => {
          //console.log(result);
          setSuccessMessage('Details Uploaded Successfully!');
          setUploadNextians({
            student_name: '',
            year: '',
            image: '',
          });
        });
      });
    }
  };

  return (
    <>
      <Container>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="6" className="my-1" style={{ width: '100%' }}>
              <h1 className="text-black mb-4 text-center">Edit Mastermind Details</h1>
              <form onSubmit={handleSubmit}>
                <MDBCard>
                  <MDBCardBody className="px-4">
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Facility Name</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Facility Name..."
                          size="lg"
                          id="student_name"
                          name="student_name"
                          value={uploadNextians.student_name}
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
                        <h6 className="mb-0">Subject</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Subject..."
                          size="lg"
                          id="year"
                          name="year"
                          value={uploadNextians.year}
                          type="text"
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
                          value={uploadNextians.image}
                          onChange={handleChange}
                        />
                        <div className="small text-muted mt-2">
                          Upload your file or any other relevant file. Max file size 50 MB
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />
                    {successMessage && (
                      <div style={{ color: 'green', textAlign: 'center' }}>{successMessage}</div>
                    )}
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
    </>
  );
};

export default EditMasterMind;
