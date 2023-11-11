import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../reducers/courseSlice";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function CardData() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses).slice(0, 30);
  const searchTerm = useSelector((state) => state.search);
  const uid = useParams().uid;
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // courses.map((course) => {
  //   return console.log(course);
  // });

  //implementing search function

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {searchTerm
        ? filteredCourses.map((course) => {
            const value = course.id;
            return (
              <div className="course--card" id={course.id}>
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
                  <Link
                    to={{
                      pathname: "/course/" + uid + "/" + value,
                    }}
                  >
                    <div className="enroll--btn">
                      <button>View Course</button>
                    </div>
                  </Link>

                  <div className="likes--count">
                    liked by: <span>{course.likesCount}</span>
                  </div>
                </div>
              </div>
            );
          })
        : courses.map((course) => {
            const value = course.id;
            return (
              <div className="course--card" id={course.id}>
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
                  <Link
                    to={{
                      pathname: "/course/" + uid + "/" + value,
                    }}
                  >
                    <div className="enroll--btn">
                      <button>View Course</button>
                    </div>
                  </Link>
                  <div className="likes--count">
                    liked by: <span>{course.likesCount}</span>
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
}

export default CardData;
