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
import './Upload.css';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Paths } from '../../../../app/baseApi/baseApi';
import axios from 'axios';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
const Container = styled('div')(({ theme }) => ({
  margin: '50px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '50px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const UploadExams = () => {
  const [uploadExams, setUploadExams] = useState({
    examName: '',
    description: '',
    image: '',
  });

  const [isError, setIsError] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUploadExams({ ...uploadExams, [name]: value });
    setIsError({ ...isError, [name]: value });
  };

  const handleQuillChange = (value) => {
    setUploadExams({ ...uploadExams, description: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!uploadExams.examName.trim()) {
      newErrors.examName = 'Exam Name is required';
      isValid = false;
    }
    setIsError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedDescription = stripHtmlTags(uploadExams.description);
    const newExams = {
      ...uploadExams,
      id: new Date(),
      description: sanitizedDescription,
    };
    if (validateForm()) {
      try {
        const response = await Paths.EndpointsURL.PostExams;
        const res = await axios.post(response, newExams, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        toast.success(res.data.msg, { position: 'top-right' });
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

  // Function to strip HTML tags using DOMParser
  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || '';
  };

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ['clean'],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <>
      <Container>
        <MDBContainer fluid className="d-flex justify-content-center align-items-center">
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="8" className="my-1" style={{ width: '900px' }}>
              <h1 className="text-black mb-4 text-center">Upload Exams</h1>
              <form onSubmit={handleSubmit} style={{ width: '900px' }}>
                <MDBCard>
                  <MDBCardBody className="px-4">
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Exam Name</h6>
                      </MDBCol>
                      <MDBCol md="9" className="pe-5">
                        <MDBInput
                          label="Blogger Name..."
                          size="lg"
                          id="examName"
                          name="examName"
                          value={uploadExams.examName}
                          type="text"
                          onChange={handleChange}
                        />
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
                          value={uploadExams.image}
                          onChange={handleChange}
                        />
                        <div className="small text-muted mt-2">
                          Upload your file or any other relevant file. Max file size 50 MB
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <hr className="mx-n3" />
                    <MDBRow className="align-items-center pt-4 pb-3">
                      <MDBCol md="3" className="ps-5">
                        <h6 className="mb-0">Description</h6>
                      </MDBCol>

                      <MDBCol md="9" className="pe-5">
                        <ReactQuill
                          type=""
                          id="description"
                          name="description"
                          value={uploadExams.description}
                          onChange={handleQuillChange}
                          modules={module}
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
};

export default UploadExams;
