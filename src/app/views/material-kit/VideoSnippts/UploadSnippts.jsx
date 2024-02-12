import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import { styled } from '@mui/system';
import toast from 'react-hot-toast';
import { Paths } from '../../../../app/baseApi/baseApi';
import axios from 'axios';
const Container = styled('div')(({ theme }) => ({
  margin: '50px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
function UploadSnippts() {
  const [uploadVideo, setUploadVideo] = useState({
    videoDescription: '',
    videoLink: '',
  });

  const [isError, setIsError] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUploadVideo({ ...uploadVideo, [name]: value });
    setIsError({ ...isError, [name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!uploadVideo.videoDescription.trim()) {
      newErrors.videoDescription = 'Video Description is required';
      isValid = false;
    }
    setIsError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBanner = { ...uploadVideo, id: new Date() };
    if (validateForm()) {
      try {
        const response = await Paths.EndpointsURL.PostVideoSnippts;
        const res = await axios({
          url: response,
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          data: JSON.stringify(newBanner),
        });
        setUploadVideo(res.data.data);
        console.log(res.data);
        toast.success('Data Uploaded Successfully', { position: 'top-right' });
        setUploadVideo({
          videoDescription: '',
          videoLink: '',
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
              <h1 className="text-black mb-4 text-center">Upload Videos</h1>
              <form onSubmit={handleSubmit}>
                <MDBCard>
                  <MDBCardBody className="px-4">
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Video Description</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Video Description..."
                          size="lg"
                          id="videoDescription"
                          name="videoDescription"
                          value={uploadVideo.videoDescription}
                          type="text"
                          onChange={handleChange}
                        />
                        {isError.videoDescription && (
                          <span style={{ color: 'red', textAlign: 'center' }}>
                            {isError.videoDescription}
                          </span>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr className="mx-n3" />
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Video Link</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Videos Link..."
                          size="lg"
                          id="videoLink"
                          name="videoLink"
                          value={uploadVideo.videoLink}
                          type="text"
                          onChange={handleChange}
                        />
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
}

export default UploadSnippts;
