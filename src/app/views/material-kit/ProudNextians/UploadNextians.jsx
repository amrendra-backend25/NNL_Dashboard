import { styled } from '@mui/material';
import axios from 'axios';
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
const UploadNextians = () => {
  const [uploadNextians, setUploadNextians] = useState({
    student_name: '',
    year: '',
    image: '',
  });

  const [isError, setIsError] = useState([]);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBanner = { ...uploadNextians, id: new Date() };
    if (validateForm()) {
      try {
        const response = await Paths.EndpointsURL.PostNextians;
        const res = await axios({
          url: response,
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          data: JSON.stringify(newBanner),
        });
        setUploadNextians(res.data.data);
        console.log(res.data);
        toast.success('Data Uploaded Successfully', { position: 'top-right' });
        setUploadNextians({
          student_name: '',
          year: '',
          image: '',
        });
      } catch (error) {
        console.error('Error uploading data:', error);
        // Handle error, show toast, etc.
      }
    }
  };

  return (
    <>
      <Container>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="6" className="my-1" style={{ width: '100%' }}>
              <h1 className="text-black mb-4 text-center">Update Nextians Details</h1>
              <form onSubmit={handleSubmit}>
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
                        <h6 className="mb-0">Year</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Year..."
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
                    {/* {successMessage && (
                      <div style={{ color: 'green', textAlign: 'center' }}>{successMessage}</div>
                    )} */}
                    <MDBBtn className="my-4" size="lg" type="submit">
                      Submit
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

export default UploadNextians;
