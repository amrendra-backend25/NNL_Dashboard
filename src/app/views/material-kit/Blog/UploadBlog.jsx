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

const UploadBlog = () => {
  const [uploadBlogs, setUploadBlogs] = useState({
    name: '',
    description: '',
    subject: '',
    byDate: '',
    image: '',
  });
  const [isError, setIsError] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUploadBlogs({ ...uploadBlogs, [name]: value });
    setIsError({ ...isError, [name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!uploadBlogs.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }
    if (!uploadBlogs.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    setIsError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBanner = { ...uploadBlogs, id: new Date() };
    if (validateForm()) {
      try {
        const response = await Paths.EndpointsURL.PostBlogs;
        const res = await axios({
          url: response,
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          data: JSON.stringify(newBanner),
        });
        setUploadBlogs(res.data.data);
        console.log(res.data);
        toast.success(res.data.msg, { position: 'top-right' });
        setUploadBlogs({
          name: '',
          description: '',
          subject: '',
          byDate: '',
          image: '',
        });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          toast.error('500 (Internal Server Error)', { position: 'top-right' });
        } else {
          toast.error('Error uploading data!', {
            position: 'top-right',
          });
        }
        console.error('Error uploading data:', error);
      }
    }
  };

  return (
    <>
      <Container>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="6" className="my-1" style={{ width: '125%' }}>
              <h1 className="text-black mb-4 text-center">Upload Blog</h1>
              <form onSubmit={handleSubmit}>
                <MDBCard>
                  <MDBCardBody className="px-4">
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Blogger Name</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Blogger Name..."
                          size="lg"
                          id="name"
                          name="name"
                          value={uploadBlogs.name}
                          type="text"
                          onChange={handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr className="mx-n3" />
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">By Date</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="By Date..."
                          size="lg"
                          id="byDate"
                          name="byDate"
                          value={uploadBlogs.byDate}
                          type="text"
                          onChange={handleChange}
                        />
                      </MDBCol>
                    </MDBRow>

                    <hr className="mx-n3" />
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Subject</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBTextArea
                          label="Subject..."
                          size="lg"
                          type="text"
                          id="subject"
                          name="subject"
                          value={uploadBlogs.subject}
                          onChange={handleChange}
                        />
                        {isError.subject && (
                          <span style={{ color: 'red', textAlign: 'center' }}>
                            {isError.subject}
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
                          value={uploadBlogs.description}
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
                          value={uploadBlogs.image}
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

export default UploadBlog;
