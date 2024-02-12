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
const UploadInnerPlanA = () => {
  const [uploadCourses, setUploadCourses] = useState({
    topcourse_heading: '',
    course_description: '',
    images: '',
    discount_price: '',
    video: '',
    video_description: '',
  });

  const [isError, setIsError] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  //const [adminBanner, setAdminBanner] = useState([]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!uploadCourses.topcourse_heading.trim()) {
      newErrors.topcourse_heading = 'Topcourse Heading is required';
      isValid = false;
    }
    if (!uploadCourses.course_description.trim()) {
      newErrors.course_description = 'Course Description is required';
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
        const response = await Paths.EndpointsURL.PostNNLCourses;
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
          topcourse_heading: '',
          course_description: '',
          images: '',
          discount_price: '',
          video: '',
          video_description: '',
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
              <h1 className="text-black mb-4 text-center">Upload InnerPlanA Details</h1>
              <form onSubmit={handleSubmit}>
                <MDBCard>
                  <MDBCardBody className="px-4">
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Top Course Heading</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Top Course Heading..."
                          size="lg"
                          id="topcourse_heading"
                          name="topcourse_heading"
                          value={uploadCourses.topcourse_heading}
                          type="text"
                          onChange={handleChange}
                        />
                        {isError.topcourse_heading && (
                          <span style={{ color: 'red', textAlign: 'center' }}>
                            {isError.topcourse_heading}
                          </span>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr className="mx-n3" />
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Discounted Price</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Discounted Price..."
                          size="lg"
                          id="discount_price"
                          name="discount_price"
                          value={uploadCourses.discount_price}
                          type="text"
                          onChange={handleChange}
                        />
                        {isError.discount_price && (
                          <span style={{ color: 'red', textAlign: 'center' }}>
                            {isError.discount_price}
                          </span>
                        )}
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Video URL</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Video URL..."
                          size="lg"
                          id="video"
                          name="video"
                          value={uploadCourses.video}
                          type="text"
                          onChange={handleChange}
                        />
                        {isError.video && (
                          <span style={{ color: 'red', textAlign: 'center' }}>{isError.video}</span>
                        )}
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Course Description</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBTextArea
                          label="Course Description..."
                          size="lg"
                          type="text"
                          id="course_description"
                          name="course_description"
                          value={uploadCourses.course_description}
                          onChange={handleChange}
                        />
                        {isError.course_description && (
                          <span style={{ color: 'red', textAlign: 'center' }}>
                            {isError.course_description}
                          </span>
                        )}
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Video Description</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBTextArea
                          label="Video Description..."
                          size="lg"
                          type="text"
                          id="video_description"
                          name="video_description"
                          value={uploadCourses.video_description}
                          onChange={handleChange}
                        />
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
                          id="images"
                          name="images"
                          value={uploadCourses.images}
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

export default UploadInnerPlanA;
