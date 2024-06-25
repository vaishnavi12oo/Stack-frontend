import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AskQuestion.css';

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [questionTags, setQuestionTags] = useState('');
  const [video, setVideo] = useState(null);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const backendURL = 'https://stack-backend-db90.onrender.com/'; // Replace with your backend URL

  const handleSendOtp = async () => {
    try {
      await axios.post(`${backendURL}/send-otp`, { email });
      setOtpSent(true);
      setError('');
    } catch (err) {
      setError('Error sending OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${backendURL}/verify-otp`, { email, otp });
      if (response.data.message === 'OTP verified successfully') {
        setOtpVerified(true);
        setError('');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setError('Please verify OTP before submitting the question.');
      return;
    }
    if (!questionTitle.trim() || !questionBody.trim() || !questionTags.length || !video) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('questionTitle', questionTitle);
    formData.append('questionBody', questionBody);
    formData.append('questionTags', questionTags.join(','));
    formData.append('userPosted', 'User');  // Replace with actual user data
    formData.append('userId', 'UserID');  // Replace with actual user data

    try {
      await axios.post(`${backendURL}/upload-video`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setQuestionTitle('');
      setQuestionBody('');
      setQuestionTags('');
      setVideo(null);
      setError('');
      navigate('/');
    } catch (err) {
      setError('Error uploading video. Please try again.');
    }
  };

  return (
    <div className='ask-question'>
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        {!otpVerified ? (
          <>
            <div>
              <label htmlFor='email'>
                <h4>Email</h4>
                <input
                  type="email"
                  name='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email to receive OTP'
                />
              </label>
              <button onClick={handleSendOtp} disabled={otpSent}>Send OTP</button>
            </div>
            {otpSent && (
              <div>
                <label htmlFor='otp'>
                  <h4>OTP</h4>
                  <input
                    type="text"
                    name='otp'
                    id='otp'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder='Enter the OTP sent to your email'
                  />
                </label>
                <button onClick={handleVerifyOtp}>Verify OTP</button>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='ask-form-container'>
              {error && <p className="error-message">{error}</p>}
              <label htmlFor='ask-ques-title'>
                <h4>Title</h4>
                <p>Be specific and imagine you’re asking a question to another person</p>
                <input
                  type="text"
                  name='questionTitle'
                  id='ask-ques-title'
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  placeholder='"e.g. Is there an R function for finding the index of an element in a vector?"'
                />
              </label>

              <label htmlFor='ask-ques-body'>
                <h4>Body</h4>
                <p>Include all the information someone would need to answer your question</p>
                <textarea
                  name="questionBody"
                  id="ask-ques-body"
                  value={questionBody}
                  onChange={(e) => setQuestionBody(e.target.value)}
                  cols="30"
                  rows="10"
                ></textarea>
              </label>

              <label htmlFor='ask-ques-tags'>
                <h4>Tags</h4>
                <p>Add up to 5 tags to describe what your question is about</p>
                <input
                  type="text"
                  name='questionTags'
                  id='ask-ques-tags'
                  value={questionTags}
                  onChange={(e) => setQuestionTags(e.target.value.split(','))}
                  placeholder="e.g. (xml, typescript, wordpress)"
                />
              </label>

              <label htmlFor='ask-ques-video'>
                <h4>Video</h4>
                <p>Upload a video describing your question</p>
                <input
                  type="file"
                  name="video"
                  id="ask-ques-video"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </label>
            </div>
            <input type="submit" value='Review your question' className='review-btn' />
          </form>
        )}
      </div>
    </div>
  );
};

export default AskQuestion;
