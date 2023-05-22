import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Write() {
    const [formData, setFormData] = useState({
        place: '',
        topic: '',
        experience: ''

    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(formData)
        sendDataToServer(formData)
      };

      const sendDataToServer = async (data) => {
        try {
            const response = await axios.post('https://wanderlust-production.up.railway.app/api/v1/wanderlust', data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
      }

    return (
        <div className="form-group">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Place</Form.Label>
                    <Form.Control type="text" name="place" value={formData.place} onChange={handleChange} placeholder="Name of place visited" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Topic</Form.Label>
                    <Form.Control type="text" name="topic" value={formData.topic} onChange={handleChange} placeholder="A short description of what the experience" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Write about the experience</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Leave a comment here"
                        style={{ height: '150px' }}
                    />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Picture</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>

    );
}

export default Write;