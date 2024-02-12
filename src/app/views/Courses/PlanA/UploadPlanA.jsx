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
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { useState } from 'react';
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
const UploadPlanA = () => {
  const [uploadCourses, setUploadCourses] = useState({
    course_heading: '',
    description: '',
    image: '',
  });

  const [isError, setIsError] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  //const [adminBanner, setAdminBanner] = useState([]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!uploadCourses.course_heading.trim()) {
      newErrors.course_heading = 'Course Heading is required';
      isValid = false;
    }
    if (!uploadCourses.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    setIsError(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUploadCourses({ ...uploadCourses, [name]: value });
    setIsError({ ...isError, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBanner = { ...uploadCourses, id: new Date() };
    if (validateForm()) {
      try {
        const response = await Paths.EndpointsURL.PostHomeNNLCourses;
        const res = await axios({
          url: response,
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          data: JSON.stringify(newBanner),
        });
        setUploadCourses(res.data.data);
        console.log(res.data);
        toast.success('Data Uploaded Successfully', { position: 'top-right' });
        setUploadCourses({
          course_heading: '',
          description: '',
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
              <h1 className="text-black mb-4 text-center">Update PlanA Details</h1>
              <form onSubmit={handleSubmit}>
                <MDBCard>
                  <MDBCardBody className="px-4">
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Course Heading</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Course Heading..."
                          size="lg"
                          id="course_heading"
                          name="course_heading"
                          value={uploadCourses.course_heading}
                          type="text"
                          onChange={handleChange}
                        />
                        {isError.course_heading && (
                          <span style={{ color: 'red', textAlign: 'center' }}>
                            {isError.course_heading}
                          </span>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr className="mx-n3" />
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Description</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBTextArea
                          label="Description..."
                          size="lg"
                          type="text"
                          id="description"
                          name="description"
                          value={uploadCourses.description}
                          onChange={handleChange}
                        />
                        {isError.description && (
                          <span style={{ color: 'red', textAlign: 'center' }}>
                            {isError.description}
                          </span>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr className="mx-n3" />
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Upload Image</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBFile
                          size="lg"
                          id="image"
                          name="image"
                          value={uploadCourses.image}
                          onChange={handleChange}
                        />
                        <div className="small text-muted mt-2">
                          Upload your file or any other relevant file. Max file size 50 MB
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />
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

export default UploadPlanA;
