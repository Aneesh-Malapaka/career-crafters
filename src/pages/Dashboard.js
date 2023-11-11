import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardData from "../components/CardData";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useParams } from "react-router-dom";

function Dashboard() {
  const user_id = useParams().uid;
  const [fetchedUsers, setFetchedUsers] = useState(null);

  useEffect(() => {
    const fetchUserCoursesByUid = async (uid) => {
      try {
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();

          setFetchedUsers({ id: userDoc.id, ...userData });
        } else {
          console.log("No user found with the provided UID");
          setFetchedUsers(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setFetchedUsers(null);
      }
    };

    const fetchData = async () => {
      const uid = user_id;
      await fetchUserCoursesByUid(uid);
    };

    fetchData();
  }, [user_id]);
  console.log(fetchedUsers);

  const pfpURL = "https://picsum.photos/200";
  return (
    <>
      <Navbar />
      <div className="dash--container">
        {fetchedUsers ? (
          <>
            <div className="user--info">
              <h1>Your Profile</h1>
              <div className="user--pic">
                <img src={pfpURL} alt="" className="user--logo" />
              </div>
              <div className="moreInfo--div">
                <p className="user--displayName">{fetchedUsers.displayName}</p>
                <p className="user--email">{fetchedUsers.email}</p>
              </div>
            </div>
            <div className="course--info">
              <h2>Your Enrolled Courses are: </h2>
              {fetchedUsers.enrolledCourses.map((course) => {
                return (
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
                      </div>
                      <div className="course--instructor">
                        <p className="lecturer">
                          Instructor(s) <span>{course.instructor}</span>
                        </p>
                      </div>
                    </div>
                    <div className="right--card">
                      <div className="likes--count">
                        liked by: <span>{course.likesCount}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
