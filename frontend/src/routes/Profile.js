// Profile.js
import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Profile.css';

const Profile = () => {
  const handleEdit = () => {
    // edit options
  };

  return (
    <div className="profile-outer-container">
      <Container className="profile-container">
        <Row className="justify-content-center">
          <Col md="auto">
            <Image src="profile-pic-url" roundedCircle />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="auto" className="text-center">
            <h2>Test Name</h2>
            <p>Email: Test@test.com</p>
            <p>Testing testing testing</p>
            <Button variant="primary" onClick={handleEdit}>Edit Profile</Button>
          </Col>
        </Row>
      </Container>
    </div> 
  );
};

export default Profile;
