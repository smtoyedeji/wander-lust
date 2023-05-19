import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Write() {
    return (
        <div className="form-group">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Place</Form.Label>
                    <Form.Control type="email" placeholder="Name" />
                    <Form.Text className="text-muted">
                        Name of place visited
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Topic</Form.Label>
                    <Form.Control type="email" placeholder="A summary of what the experience is like" />
                    <Form.Text className="text-muted">
                        A short description of what the experience
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Experience</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '150px' }}
                    />
                    <Form.Text className="text-muted">
                        Write about the experience
                    </Form.Text>
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