import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import "./AddCourse.css";
import { MongoClient } from "mongodb";

export default function AddCourse() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const courseName = event.target.courseName.value;
    const description = event.target.description.value;
    const imageURL = event.target.imageURL.value;
    const startDate = event.target.startDate.value;
    const endDate = event.target.endDate.value;

    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    client.connect((err) => {
      if (err) {
        console.log("Error connecting to MongoDB", err);
        return;
      }

      console.log("Connected to MongoDB");

      const db = client.db("lms");
      const collection = db.collection("courses");

      const course = {
        courseName: courseName,
        description: description,
        imageURL: imageURL,
        startDate: startDate,
        endDate: endDate,
      };

      collection.insertOne(course, (err, result) => {
        if (err) {
          console.log("Error inserting course", err);
          return;
        }

        console.log("Course added to MongoDB");

        client.close();
      });
    });
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        AddCourse
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Enter Course Details</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Course Name: </Form.Label>
                <Form.Control type="text" name="courseName" placeholder="Enter course name" />
              </Form.Group>

              <br></br>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description: </Form.Label>
                <Form.Control type="text" name="description" placeholder="Enter Description" />
              </Form.Group>

              <br></br>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Image URL: </Form.Label>
                <Form.Control type="URL" name="imageURL" placeholder="Enter Image URL" />
              </Form.Group>

              <br></br>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>StartDate: </Form.Label>
                <Form.Control type="date" name="startDate" placeholder="Enter Start Date" />
              </Form.Group>

              <br></br>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>EndDate: </Form.Label>
                <Form.Control type="date" name="endDate" placeholder="Enter End Date" />
              </Form.Group>

              <br></br>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <button className="close-modal" onClick={toggleModal}>
              CANCEL
            </button>
          </div>
        </div>
      )}
    </>);
}
