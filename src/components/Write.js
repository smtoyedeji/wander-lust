import React, { useState } from "react"
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

function Write() {

  const [formData, setFormData] = useState({
    place: "",
    topic: "",
    experience: "",
    image: null,
  });

  console.log(formData)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const uploadData = async (data) => {
    const { place, topic, experience, image } = formData;

    const formDataUpload = new FormData();

    formDataUpload.append("place", place);
    formDataUpload.append("topic", topic);
    formDataUpload.append("experience", experience);

    const imageFile = new File([image], "image.jpg", { type: "image/jpeg" });
    formDataUpload.append("image", imageFile);

    try {
      const response = await axios.post(
        "https://wanderlust-production.up.railway.app/api/v1/wanderlust",
        formDataUpload,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.place || !formData.topic || !formData.experience || !formData.image) {
      alert('Please fill in all the required fields.');
      return;
    }

    uploadData(formData);

    setFormData({
      place: "",
      topic: "",
      experience: "",
      image: null,
    });
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
