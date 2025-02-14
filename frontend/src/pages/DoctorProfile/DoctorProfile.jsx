import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const DoctorProfile = (props) => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(props.doctor || null);
  const [loading, setLoading] = useState(!props.doctor);
  
  useEffect(() => {
    if (!doctor && id) {
      // Fetch doctor data from API if not passed via props
      axios.get(`http://localhost:5000/doctor/${id}`)
        .then((res) => {
          setDoctor(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, doctor]);

  if (loading) return <div>Loading...</div>;
  if (!doctor) return <div>Doctor not found.</div>;

  return (
    <div>
      <h1>{doctor.name}</h1>
      <p>ID: {doctor.id}</p>
      {/* Render other doctor details */}
    </div>
  );
};

export default DoctorProfile;
