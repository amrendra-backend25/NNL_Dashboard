import { styled } from '@mui/material';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
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

const EditSuccess = () => {
  const [uploadBanner, setUploadBanner] = useState({
    file_name: '',
    file_url: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBanner = { ...uploadBanner, id: new Date().toString() };
    //setAdminBanner([...adminBanner, newBanner]);
    //console.log(newBanner);
    fetch('http://localhost:5000/api/Upload/slider', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newBanner),
    }).then((res) => {
      res.json().then(() => {
        //console.log(result);
        setSuccessMessage('Banner Updated!');
        setUploadBanner({
          file_name: '',
          file_url: '',
        });
      });
    });
  };
  return (
    <>
      <Container>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="6" className="my-1" style={{ width: '100%' }}>
              <h1 className="text-black mb-4 text-center">Edit Success Stories</h1>
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
                          id="file_name"
                          name="file_name"
                          value={uploadBanner.file_name}
                          type="text"
                          onChange={handleChange}
                        />
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
                          id="file_url"
                          name="file_url"
                          value={uploadBanner.file_url}
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

export default EditSuccess;
