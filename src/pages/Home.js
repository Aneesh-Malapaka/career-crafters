import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { prerequisiteTerms } from "../prerequisites";
import CardData from "../components/CardData";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../reducers/searchSlice";

function Home() {
  // const courseCollectionRef = collection(db, "courses");

  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();

    const searchTerm = event.target.query.value;
    dispatch(setSearchTerm(searchTerm));
  };
  //data needs to be set only once. Due to read capacity being high, testing to load only once takes a lot of reads

  // let [data, setData] = useState(false);

  // const setCourseInfo = useCallback(async () => {
  //   const courseData = await fetchCourses();
  //   try {
  //     for (const course of courseData) {
  //       await addDoc(courseCollectionRef, course);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [courseCollectionRef]);

  // useEffect(() => {
  //   if (!data) {
  //     setCourseInfo();
  //     setData(true);
  //   }
  // }, [data, setCourseInfo]);

  return (
    <>
      <Navbar />
      <div className="main--view">
        {/* contains filter, search and course view */}
        <div className="filter--container">Filter container</div>
        <div className="content--container">
          <div className="search--container center">
            <form onSubmit={handleSearch} action="#" className="search--form">
              <div className="search--inp">
                <label htmlFor="query">Search</label>
                <input
                  type="text"
                  name="query"
                  id="query"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search using instructor or course name"
                />
              </div>
              <button type="submit">Search Info</button>
            </form>
          </div>
          <div className="view--container">
            <CardData />
          </div>
        </div>
      </div>
    </>
  );
}

const fetchCourses = async () => {
  try {
    // First API call to get course instructors
    const instructorResponse = await axios.get(
      "https://udemy-course-scrapper-api.p.rapidapi.com/course-names/course-instructor",
      {
        headers: {
          "X-RapidAPI-Key":
            "25823ba57dmsh5ae0a22908fe6bfp14b8e4jsn9a46d658e006",
          "X-RapidAPI-Host": "udemy-course-scrapper-api.p.rapidapi.com",
        },
      }
    );

    // Second API call to get course names
    const nameResponse = await axios.get(
      "https://udemy-course-scrapper-api.p.rapidapi.com/course-names",
      {
        headers: {
          "X-RapidAPI-Key":
            "25823ba57dmsh5ae0a22908fe6bfp14b8e4jsn9a46d658e006",
          "X-RapidAPI-Host": "udemy-course-scrapper-api.p.rapidapi.com",
        },
      }
    );

    const instructors = Object.values(instructorResponse.data).slice(0, 100);
    const names = Object.values(nameResponse.data).slice(0, 100);
    // console.log(instructors, names);

    const combinedData = names.map((names, index) => {
      return {
        // id: (Date.now() + Math.random()) * 10000,
        name: names.course_name,
        instructor: instructors[index].instructor,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        thumbnail:
          "https://source.unsplash.com/random/500%C3%97600/?education,courses,programming",
        price: (Math.random() * 200.0).toFixed(2) + " $",
        duration: Math.floor(Math.random() * 10) + 1 + " weeks",
        schedule: "Lorem ipsum dolor sit amet, cons",
        location: "online",
        prerequisites: prerequisiteTerms.slice(
          Math.random() * prerequisiteTerms.length,
          Math.random() * prerequisiteTerms.length
        ),
        enrolledStudents: [],
        likesCount: 0,
      };
    });
    console.log(combinedData);

    // // Store the combined course data in Firestore
    // for (const course of combinedData) {
    //   await db.collection('courses').add(course);
    // }

    console.log("Courses fetched and stored successfully.");
    return combinedData;
  } catch (error) {
    console.error("Error fetching or storing courses: ", error);
  }
};

// Call the function to fetch and store courses
// fetchCourses();

export default Home;
