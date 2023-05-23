import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Write() {

  // useState to handle form data
  const [formData, setFormData] = useState({
    place: "",
    topic: "",
    experience: "",
    image: null,
  });


  // handleChange function to track changes in form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  // handleImageChange function to track image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const buffer = reader.result;
      const { name, size, type, lastModified } = file;
      setFormData((prevData) => ({
        ...prevData,
        image: buffer,
        name,
        size,
        type,
        lastModified,
      }));
    };

    reader.readAsArrayBuffer(file);
  };

  // upload formData function
  const uploadData = async (data) => {
    const formData = new FormData();
    formData.append("place", data.place);
    formData.append("topic", data.topic);
    formData.append("experience", data.experience);
    formData.append("image", data.image);
    formData.append("name", data.name);
    formData.append("size", data.size);
    formData.append("mimetype", data.type);
    formData.append("createdAt", data.lastModified);

    try {
      const response = await axios.post(
        "https://wanderlust-production.up.railway.app/api/v1/wanderlust",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // submit formdata function
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (!formData.place || !formData.topic || !formData.experience || !formData.image) {
    //   alert('Please fill in all the required fields.');
    //   return;
    // }
    console.log(formData);
    uploadData(formData);
  };

  return (
    <div className="form-group">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPlace">
          <Form.Label>Place</Form.Label>
          <Form.Control
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="Place visited (not more than 20 characters)"
            maxLength={20}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTopic">
          <Form.Label>Topic</Form.Label>
          <Form.Control
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="A short description of the experience (not more than 50 characters)"
            maxLength={50}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicExperience">
          <Form.Label>Write about the experience</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Not more than 3000 characters"
            style={{ height: "200px" }}
            maxLength={3000}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Picture</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImageChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Write;
