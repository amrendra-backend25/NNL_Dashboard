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
const UploadMasterMind = () => {
  const [uploadMasterPack, setUploadMasterPack] = useState({
    facilityName: '',
    specialization: '',
    image: '',
  });

  const [isError, setIsError] = useState([]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!uploadMasterPack.facilityName.trim()) {
      newErrors.facilityName = 'facilityName is required';
      isValid = false;
    }
    if (!uploadMasterPack.specialization.trim()) {
      newErrors.specialization = 'Specialization is required';
      isValid = false;
    }
    setIsError(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUploadMasterPack({ ...uploadMasterPack, [name]: value });
    setIsError({ ...isError, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBanner = { ...uploadMasterPack, id: new Date() };
    if (validateForm()) {
      try {
        const response = await Paths.EndpointsURL.PostMasterMind;
        const res = await axios({
          url: response,
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          data: JSON.stringify(newBanner),
        });
        setUploadMasterPack(res.data.data);
        //console.log(res.data);
        toast.success('Data Uploaded Successfully', { position: 'top-right' });
        setUploadMasterPack({
          facilityName: '',
          specialization: '',
          image: '',
        });
      } catch (error) {
        toast.error('Error uploading data:', error);
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
              <h1 className="text-black mb-4 text-center">Upload Mastermind Details</h1>
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
                          id="facilityName"
                          name="facilityName"
                          value={uploadMasterPack.facilityName}
                          type="text"
                          onChange={handleChange}
                        />
                        {isError.facilityName && (
                          <span style={{ color: 'red', textAlign: 'center' }}>
                            {isError.facilityName}
                          </span>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr className="mx-n3" />
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Specialization</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Specialization..."
                          size="lg"
                          id="specialization"
                          name="specialization"
                          value={uploadMasterPack.specialization}
                          type="text"
                          onChange={handleChange}
                        />
                        {isError.specialization && (
                          <span style={{ color: 'red', textAlign: 'center' }}>
                            {isError.specialization}
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
                          value={uploadMasterPack.image}
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

export default UploadMasterMind;
