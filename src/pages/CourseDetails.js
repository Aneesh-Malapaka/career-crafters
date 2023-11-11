import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

import Navbar from "../components/Navbar";

function CourseDetails() {
  const course_id = useParams().id;
  const user_id = useParams().uid;

  // console.log(course_id);

  const [course, setCourse] = useState(null);
  const [enroll, setEnroll] = useState(false);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseDocRef = doc(db, "courses", course_id);
        const courseDoc = await getDoc(courseDocRef);

        if (courseDoc.exists()) {
          setCourse(courseDoc.data());
        } else {
          console.error("Document not found");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [course_id]);

  // console.log(course);

  //function to get user doc data
  const fetchUserByUid = async (uid) => {
    try {
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return { id: userDoc.id, ...userData };
      } else {
        console.log("No user found with the provided UID");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };
  const usage = async () => {
    const uid = user_id;
    const user = await fetchUserByUid(uid);
    if (user) {
      console.log("User found:", user);
      return user;
    } else {
      console.log("User not found");
      return null;
    }
  };

  const updateEnrolledCourses = async (docId, detailsOfCourseForStudent) => {
    try {
      const userDoc = doc(db, "users", docId);
      const userDocSnapshot = await getDoc(userDoc);
      const currentEnrolledCourses =
        userDocSnapshot.data().enrolledCourses || [];

      const updatedEnrolledCourses = [
        ...currentEnrolledCourses,
        detailsOfCourseForStudent,
      ];

      console.log("Updated Enrolled Courses:", updatedEnrolledCourses);

      await updateDoc(userDoc, { enrolledCourses: updatedEnrolledCourses });
    } catch (error) {
      console.error("Error updating enrolled courses:", error);
    }
  };

  const updateEnrolledStudents = async (courseDocRef, userDetails) => {
    try {
      const courseDoc = await getDoc(courseDocRef);
      console.log(
        "Current Enrolled Students:",
        courseDoc.data().enrolledStudents
      );

      const currentEnrolledStudents = courseDoc.data().enrolledStudents || [];
      console.log(
        "Current Enrolled Students (Fallback):",
        currentEnrolledStudents
      );

      const updatedEnrolledStudents = [...currentEnrolledStudents, userDetails];

      console.log("Updated Enrolled Students:", updatedEnrolledStudents);

      await updateDoc(courseDocRef, {
        enrolledStudents: updatedEnrolledStudents,
      });
    } catch (error) {
      console.error("Error updating enrolled students:", error);
    }
  };
  const enrollUser = async () => {
    setEnroll(true);
    const userFetched = await usage();
    const docId = userFetched.id;

    console.log(userFetched);
    if (docId) {
      const detailsOfCourseForStudent = {
        name: course.name,
        instructor: course.instructor,
        completed: false,
        enrolledDate: Date(Date.now()),
        duration: course.duration,
      };
      console.log("Details of course for student:", detailsOfCourseForStudent);

      await updateEnrolledCourses(docId, detailsOfCourseForStudent);

      const userDetails = {
        displayName: userFetched.displayName,
        email: userFetched.email,
        photo: userFetched.photo,
      };

      const courseDocRef = doc(db, "courses", course_id);
      await updateEnrolledStudents(courseDocRef, userDetails);
    }
  };

  return (
    <>
      <Navbar />
      <div className="details--container">
        {course ? (
          <>
            <div className="main--details">
              <div className="course--card course--specific-card">
                <div className="left--card">
                  <img src={course.thumbnail} alt="course-logo" />
                </div>
                <div className="middle--card">
                  <div className="name">
                    <h2>{course.name}</h2>
                  </div>
                  <div className="basic--info">
                    <p className="price">
                      Price: <span>{course.price}</span>
                    </p>
                    <p className="time">
                      Duration: <span>{course.duration}</span>
                    </p>
                    <p className="students">
                      Students enrolled: {course.enrolledStudents.length}
                    </p>
                  </div>
                  <div className="course--instructor">
                    <p className="lecturer">
                      Instructor(s) <span>{course.instructor}</span>
                    </p>
                  </div>
                </div>
                <div className="right--card">
                  <div className="enroll--btn">
                    {enroll ? (
                      <button onClick={enrollUser} disabled>
                        Enrolled
                      </button>
                    ) : (
                      <button onClick={enrollUser}>Enroll Course</button>
                    )}
                  </div>
                  <div className="likes--count">
                    liked by: <span>{course.likesCount}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="more--details">
              <div className="description">
                <h2>Description: </h2>
                <p>{course.description}</p>
              </div>
              <div className="schedule">
                <h2>Schedule: </h2>
                <p>Schedule will be mailed once course starts</p>
              </div>
              <div className="prerequisites">
                <h2>Pre-requisites for the course</h2>
                <ol>
                  {course.prerequisites.map((val) => {
                    return <li>{val}</li>;
                  })}
                </ol>
              </div>
              <div className="syllabus"></div>
            </div>
          </>
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </>
  );
}

export default CourseDetails;
