import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronRight, Check, Plus } from 'lucide-react';

const ProgressTracker = ({ userId }) => {
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [topic, setTopic] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:9000/courses/${userId}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error('Error fetching courses:', error));
  }, [userId]);

  const generateTasks = () => {
    if (!topic) return;
    axios.post('http://localhost:9000/generate-tasks', { topic })
      .then(response => {
        setCourses(prev => [...prev, response.data]);
        setTopic('');
      })
      .catch(error => console.error('Error generating tasks:', error));
  };

  const toggleActivity = (courseId, activityId, completed) => {
    setCourses((prevCourses) => prevCourses.map((course) => {
      if (course._id === courseId) {
        return {
          ...course,
          activities: course.activities.map((activity) =>
            activity._id === activityId ? { ...activity, completed } : activity
          ),
        };
      }
      return course;
    }));
  };

  const submitChanges = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    if (course) {
      axios.put(`http://localhost:9000/courses/${courseId}`, { activities: course.activities })
        .then(() => console.log('Course updated'))
        .catch((error) => console.error('Error updating course:', error));
    }
  };

  const toggleDropdown = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Progress Tracker</h2>
      
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Enter topic name"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={generateTasks}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="mr-2" size={20} />
          Generate Tasks
        </button>
      </div>

      {courses.map((course) => {
        const completedCount = course.activities.filter((a) => a.completed).length;
        const progress = (completedCount / course.activities.length) * 100;

        return (
          <div 
            key={course._id} 
            className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm"
          >
            <div 
              onClick={() => toggleDropdown(course._id)} 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                {expandedCourse === course._id ? (
                  <ChevronDown className="mr-2 text-gray-600" />
                ) : (
                  <ChevronRight className="mr-2 text-gray-600" />
                )}
                <h3 className="text-lg font-semibold text-gray-800">{course.courseName}</h3>
              </div>
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mx-4">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
                <span className="text-sm text-gray-600 ml-2">{progress.toFixed(0)}%</span>
              </div>
            </div>

            {expandedCourse === course._id && (
              <div className="p-4 bg-white">
                <ul className="space-y-2">
                  {course.activities.map((activity) => (
                    <li 
                      key={activity._id} 
                      className="flex items-center hover:bg-gray-50 p-2 rounded-md"
                    >
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activity.completed}
                          onChange={() => toggleActivity(course._id, activity._id, !activity.completed)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span 
                          className={`${activity.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                        >
                          {activity.name}
                        </span>
                      </label>
                      {activity.completed && (
                        <Check className="ml-2 text-green-500" size={20} />
                      )}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => submitChanges(course._id)}
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Submit Changes
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTracker;