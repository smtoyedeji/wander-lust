import React, { useContext, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { WanderContext } from "../WanderContext";
import { useNavigate } from "react-router-dom";

function Edit() {
  const { data } = useContext(WanderContext);
  const { id } = useParams();
  const placeToEdit = data.filter((card) => card._id === id);
  console.log(placeToEdit);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    place: placeToEdit[0].place || "",
    topic: placeToEdit[0].topic || "",
    experience: placeToEdit[0].experience || "",
    image: null,
  });

  console.log(formData);

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
      const response = await axios.patch(
        `https://wanderlust-production.up.railway.app/api/v1/wanderlust/${id}`,
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
    if (
      !formData.place ||
      !formData.topic ||
      !formData.experience ||
      !formData.image
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    uploadData(formData);

    navigate("/");
    window.location.reload();
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
            placeholder={placeToEdit[0].place}
            maxLength={20}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTopic">
          <Form.Label>Topic</Form.Label>
          <Form.Control
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder={placeToEdit[0].topic}
            maxLength={50}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicExperience">
          <Form.Label>Edit about the experience</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder={placeToEdit[0].experience}
            style={{ height: "200px" }}
            maxLength={3000}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Picture</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleImageChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Edit;
