import  { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function AddEvent() {
  const {user} = useContext(UserContext);
  const [formData, setFormData] = useState({

    owner: user? user.name : "",
    title: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    // image: null,
    likes: 0
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/createEvent", formData)
      .then((response) => {
        console.log("Event posted successfully:", response.data);
        alert('Event Created successfully...'); 
      })
      .catch((error) => {
        console.error("Error posting event:", error);
        alert('Fail to create event.............');
      });
  };

  return (
    <div className='flex flex-row'>
      <h1>Post an Event</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <label>
          Title:
          <input
            type="text"
            name="title"
            placeholder="Enter Post an Event Here"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
          />
        </label>
        <label>
          Organized By:
          <input
            type="text"
            name="organizedBy"
            placeholder="Enter Organized by"
            value={formData.organizedBy}
            onChange={handleChange}
          />
        </label>
        <label>
          Event Date:
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Event Time:
          <input
            type="time"
            name="eventTime"
            value={formData.eventTime}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            placeholder="Enter Location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Ticket Price:
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
          />
        </label>
        {/* <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleChange}
          />
        </label> */}
        <button className='primary' type="submit">Submit</button>
      </form>
    </div>
  );
}
