import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalDetails: {
      name: '',
      email: '',
    },
    address: {
      street: '',
      city: '',
    },
    paymentDetails: {
      cardNumber: '',
      expirationDate: '',
    },
  });
  const [errors, setErrors] = useState({});
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [step === 1 ? 'personalDetails' : step === 2 ? 'address' : 'paymentDetails']: {
        ...formData[step === 1 ? 'personalDetails' : step === 2 ? 'address' : 'paymentDetails'],
        [name]: value,
      },
    });
  };

  const handleNext = () => {
    if (step === 1 && !formData.personalDetails.name) {
      setErrors({ ...errors, name: 'Name is required' });
    } else if (step === 2 && (!formData.address.street || !formData.address.city)) {
      setErrors({
        ...errors,
        street: 'Street is required',
        city: 'City is required',
      });
    } else if (step === 3 && (!formData.paymentDetails.cardNumber || !formData.paymentDetails.expirationDate)) {
      setErrors({
        ...errors,
        cardNumber: 'Card Number is required',
        expirationDate: 'Expiration Date is required',
      });
    } else {
      setErrors({});
      if (step < 3) setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailRegex.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    validateEmail(newEmail);
    setFormData({
      ...formData,
      personalDetails: {
        ...formData.personalDetails,
        email: newEmail,
      },
    });
  };

  const handleSubmit = () => {
    // Handle form submission (e.g., sending data to a server)
    alert('Form submitted! Data: ' + JSON.stringify(formData));
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <h1>Multi-Step Form</h1>
        <div>
          {step === 1 && (
            <div>
              <h2>Step 1: Personal Details</h2>
              <input type="text" name="name" value={formData.personalDetails.name} onChange={handleChange} />
              {errors.name && <div className="error">{errors.name}</div>}
              <input
                type="text"
                name="email"
                value={formData.personalDetails.email}
                onChange={handleEmailChange}
              />
              {!isValidEmail && <p className="error">Invalid email address</p>}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Step 2: Address</h2>
              <input type="text" name="street" value={formData.address.street} onChange={handleChange} />
              {errors.street && <div className="error">{errors.street}</div>}
              <input type="text" name="city" value={formData.address.city} onChange={handleChange} />
              {errors.city && <div className="error">{errors.city}</div>}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Step 3: Payment Details</h2>
              <input
                type="number"
                name="cardNumber"
                value={formData.paymentDetails.cardNumber}
                onChange={handleChange}
              />
              {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}
              <input
                type="date"
                name="expirationDate"
                value={formData.paymentDetails.expirationDate}
                onChange={handleChange}
              />
              {errors.expirationDate && <div className="error">{errors.expirationDate}</div>}
            </div>
          )}
        </div>

        <div>
          {step > 1 && <button onClick={handlePrev}>Previous</button>}
          {step < 3 ? (
            <button onClick={handleNext}>Next</button>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
