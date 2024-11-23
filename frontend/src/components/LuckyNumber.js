import React, { useState } from "react";
import axios from "axios";
import "../styles/LuckyNumber.css";

const apiUrl = process.env.REACT_APP_API_URL || "https://mern-numerology-app.netlify.app/.netlify/functions";

const fetchLuckyNumber = async (data) => {
  const response = await axios.post(`${apiUrl}/luckyNumber`, data);
  return response.data;
};

const LuckyNumber = () => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [name, setName] = useState("");
  const [luckyNumber, setLuckyNumber] = useState(null);
  const [error, setError] = useState("");
  const [showImage, setShowImage] = useState(false);

  const messages = {
    1: `TRAILBLAZER, ${name}! Leadership and innovation are your superpowers. With confidence and originality, you carve bold new paths for others to follow.`,
    2: `PEACEMAKER, ${name}! Your gift for harmony and diplomacy bridges divides, fostering unity and understanding wherever you go.`,
    3: `CREATIVE VISIONARY, ${name}! Your imagination knows no bounds, and your vibrant ideas bring joy and inspiration to everyone around you.`,
    4: `MASTER BUILDER, ${name}! With discipline and determination, you construct solid foundations that stand the test of time.`,
    5: `ADVENTURER, ${name}! Your fearless spirit embraces change and thrives in the excitement of new horizons and boundless freedom.`,
    6: `GUARDIAN, ${name}! Your nurturing heart and unwavering responsibility make you a protector and guide for those in need.`,
    7: `SEEKER OF WISDOM, ${name}! Your analytical mind and deep curiosity uncover the mysteries of life, offering profound insights.`,
    8: `VISIONARY LEADER, ${name}! Ambitious and driven, you transform obstacles into stepping stones for extraordinary success.`,
    9: `HUMANITARIAN, ${name}! With compassion and selflessness, you work tirelessly to create a brighter, better future for all.`,
  };

  const handleCalculate = async () => {
    try {
      setError("");
      if (!name || !dateOfBirth) {
        setError("Please fill in both your name and date of birth.");
        return;
      }

      const result = await fetchLuckyNumber({ dob: dateOfBirth, name: name });
      setLuckyNumber(result.luckyNumber);
      setShowImage(true);
    } catch (error) {
      setLuckyNumber(null);
      setShowImage(false);
      setError("Error calculating lucky number. Please try again.");
      console.error(error);
    }
  };

  const maxDate = new Date().toLocaleDateString("en-CA");

  return (
    <div className="lucky-number-container">
      <h2>
        <b>Want to know your Lucky Number?</b>
      </h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        max={maxDate}
      />
      <button onClick={handleCalculate}>Calculate</button>
      <br />

      {luckyNumber !== null && (
        <div className="message-container">
          <h2>Your Lucky Number is {luckyNumber}</h2>
          <p>{messages[luckyNumber]}</p>
        </div>
      )}

      {showImage && luckyNumber !== null && (
        <div className="fullscreen-image-overlay">
          <button
            className="close-button"
            onClick={() => setShowImage(false)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            X
          </button>
          <img
            src={`${process.env.PUBLIC_URL}/${luckyNumber}.jpg`}
            alt={`Lucky Number ${luckyNumber}`}
            className="fullscreen-image"
          />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LuckyNumber;
