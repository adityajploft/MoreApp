import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './otp.css';
import Logo from '../../src/assets/img/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, setLoggedIn } from '../fetures/ProfileSlice/selectIsLoggedIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import OtpInput from 'react18-input-otp';
import { Button, Card } from 'react-bootstrap';

const VerificationInput = () => {
  const [otp, setOtp] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedOtp = sessionStorage.getItem('otp');
    if (storedOtp) {
      setOtp(storedOtp);
    }
  }, []);

  const handleOtpChange = (value) => {
    setOtp(value.toUpperCase());
  };

  const handleClear = () => {
    setOtp('');
  };

  const handleVerification = () => {
    const validCode = '111111';
    if (otp === validCode) {
      setIsCodeVerified(true);
      dispatch(setLoggedIn(true));
      const accessToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzYwYWYyNGVkOTRhM2NhMTU3NTEyNmFhNjU1ODUzOGM5MzgyYWJkOTA3NTU3YmI2YjA0ZmEwMmMyZGVkN2Y4ZDFhMjY3MWUwNWE3MTZjZTMiLCJpYXQiOjE2ODgwMzEyODkuNjU4Nzc1LCJuYmYiOjE2ODgwMzEyODkuNjU4Nzc4LCJleHAiOjE3MTk2NTM2ODkuNjUxNzk2LCJzdWIiOiI0OSIsInNjb3BlcyI6W119.MF-PprNyObbMOO1DybqEUr22fWFgWvIJIk9nQGkX7C_rqPRP3hmmWDvAyCVT-sadsHh_IB9DGi-8hKCwoHH99jwXKRS94GoYf_jZwIK0ouTXlXxiSI82RI-9rU1lNFPdYom60loT6oBMvfS5MBWF3yXFlTir3-rflkvQ7EWlk53-eGD2L4pCu7m1mjre2vJkRyOIfc2eE8SFGbEXg2mTOlH65E4W3repghaaMUJhzCZ_8c0BqrV9MIBYkzD6b5ytgqtJtHXwfCuB4RmjK18arf1sQS7Bw4s3_SfwVGjP8qW7WXTDd2EaaVVYJ856BgvbhutzoJdVE-LxowDFEmjB9vhiF-Qca1eUmtX8rQ0h5GC6PRtruV9fhr51hcQOKzzWkI8ozDKu6N0McZI8Q_NrxyOZ78zv0IBuRDVrqhP4BFwgOY5bfFcm-AR9NsjvdDAaPACImvV7QTdSSy0p_gxWvdUlTVqCWyI4bozhblANgyYMOKUh4bqq2n0PDNtEiDQ7aYFWHx9gSBANzjxVvUYvGyFxywDzFq1uqB88JoCWoWHgUDN9fDJSuM5-j49sjTCz9A_PqNQlo7edaZi0dRWvhAcEsBpzdEz-qO8MwBEh4_oygazW9MXAakO01fPJVSWpWwXIJpBBFBs8j2N0VdRYJwIlC30Xo8zcApGj2eNt7WM';
      sessionStorage.setItem('accessToken', accessToken);
    

      navigate('/dashboard/app');
      toast.success('Otp successfully');
    } else {
      toast.error('Please enter the correct OTP.', { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="OTP">
        <Card className="otp-card">
          <Card.Body>
            <Card.Img src={Logo} alt="Logo" className="logo" height={'100px'} width={'326px'} />

            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              className="otp-input"
              numInputs={6}
              separator={<span>-</span>}
              isInputNum
              isDisabled={isCodeVerified}
              shouldAutoFocus
              containerStyle={{ justifyContent: 'center', marginTop: '20px' }}
              inputStyle={{ width: '40px', height: '40px', margin: '0 5px' }}
              errorStyle={{ borderColor: 'red' }}
              focusStyle={{ borderColor: 'blue' }}
              completeStyle={{ borderColor: 'green' }}
            />

            <div className="button-container">
              <Button variant="primary" type="submit" onClick={handleVerification}>
                Verify OTP
              </Button>

              <Button className="secondary" variant="secondary" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default VerificationInput;
