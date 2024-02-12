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
import axios from 'axios';
import toast from 'react-hot-toast';
import { Paths } from '../../../../app/baseApi/baseApi';
const Container = styled('div')(({ theme }) => ({
  margin: '50px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
function UploadBanner() {
  const [uploadBanner, setUploadBanner] = useState({
    bannerName: '',
    image: '',
  });

  const [isError, setIsError] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  //const [adminBanner, setAdminBanner] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUploadBanner({ ...uploadBanner, [name]: value });
    setIsError({ ...isError, [name]: '' });
    setSuccessMessage('');
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!uploadBanner.bannerName.trim()) {
      newErrors.bannerName = 'Banner Name is required';
      isValid = false;
    }
    setIsError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBanner = { ...uploadBanner, id: new Date() };
    if (validateForm()) {
      try {
        const response = await Paths.EndpointsURL.PostHomeBanner;
        const res = await axios({
          url: response,
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          data: JSON.stringify(newBanner),
        });
        setUploadBanner(res.data.data);
        console.log(res.data);
        toast.success('Data Uploaded Successfully', { position: 'top-right' });
        setUploadBanner({
          bannerName: '',
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
              <h1 className="text-black mb-4 text-center">Upload Banner</h1>
              <form onSubmit={handleSubmit}>
                <MDBCard>
                  <MDBCardBody className="px-4">
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Banner Name</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Banner Name..."
                          size="lg"
                          id="bannerName"
                          name="bannerName"
                          value={uploadBanner.bannerName}
                          type="text"
                          onChange={handleChange}
                        />
                        {isError.bannerName && (
                          <span style={{ color: 'red', textAlign: 'center' }}>
                            {isError.bannerName}
                          </span>
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
                          value={uploadBanner.image}
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
}

export default UploadBanner;
