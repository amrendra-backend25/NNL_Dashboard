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
import toast from 'react-hot-toast';
import { Paths } from '../../../../app/baseApi/baseApi';
import axios from 'axios';
const Container = styled('div')(({ theme }) => ({
  margin: '50px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '50px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const UploadSuccess = () => {
  const [uploadStories, setUploadStories] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [isError, setIsError] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUploadStories({ ...uploadStories, [name]: value });
    setIsError({ ...isError, [name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!uploadStories.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!uploadStories.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    setIsError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBanner = { ...uploadStories, id: new Date().toString() };
    if (validateForm()) {
      try {
        const response = await Paths.EndpointsURL.PostStories;
        const res = await axios({
          url: response,
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          data: JSON.stringify(newBanner),
        });
        setUploadStories(res.data.data);
        console.log(res.data);
        toast.success('Data Uploaded Successfully', { position: 'top-right' });
        setUploadStories({
          name: '',
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
              <h1 className="text-black mb-4 text-center">Upload Success Stories</h1>
              <form onSubmit={handleSubmit}>
                <MDBCard>
                  <MDBCardBody className="px-4">
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Name</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Name..."
                          size="lg"
                          id="name"
                          name="name"
                          value={uploadStories.name}
                          type="text"
                          onChange={handleChange}
                        />
                        {isError.name && (
                          <span style={{ color: 'red', textAlign: 'center' }}>{isError.name}</span>
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
                          value={uploadStories.description}
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
                        <h6 className="mb-0">Upload</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBFile
                          size="lg"
                          id="image"
                          name="image"
                          value={uploadStories.image}
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
    </>
  );
};

export default UploadSuccess;
