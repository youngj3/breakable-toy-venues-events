import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";
import UploadUserImage from '../uploads/UploadUserImage.js'

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
    userName: "",
    image: {}
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation, firstName, lastName, userName } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    if(firstName.trim() === ''){
      newErrors = {
        ...newErrors,
        firstName: "is required"
      }
    }

    if(lastName.trim() === ''){
      newErrors = {
        ...newErrors,
        lastName: "is required"
      }
    }

    if(userName.trim() === ''){
      newErrors = {
        ...newErrors,
        userName: "is required"
      }
    }

    setErrors(newErrors);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    validateInput(userPayload);
    const newUploadBody = new FormData()
    newUploadBody.append("image", userPayload.image)
    newUploadBody.append("email", userPayload.email)
    newUploadBody.append("password", userPayload.password)
    newUploadBody.append("passwordConfirmation", userPayload.passwordConfirmation)
    newUploadBody.append("firstName", userPayload.firstName)
    newUploadBody.append("lastName", userPayload.lastName)
    newUploadBody.append("userName", userPayload.userName)
    debugger
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/users", {
          method: "POST",
          body: newUploadBody,
          headers: new Headers({
            "Accept": "image/jpeg"
          }),
        });
        debugger
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        setShouldRedirect(true);
      }
    } catch (err) {
      console.log(err)
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        
          <label>First name
            <input 
              type="text"
              name="firstName"
              value={userPayload.firstName}
              onChange={onInputChange}
            />
            <FormError error={errors.firstName} />
          </label>
        
        
          <label>Last name
            <input 
              type="text"
              name="lastName"
              value={userPayload.lastName}
              onChange={onInputChange}
            />
            <FormError error={errors.lastName} />
          </label>

          <label>User name
            <input 
              type="text"
              name="userName"
              value={userPayload.userName}
              onChange={onInputChange}
            />
            <FormError error={errors.userName} />
          </label>

        
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        
          <label>
            Password
            <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>

          <input type="submit" className="button" value="Register" />
      </form>
      <UploadUserImage 
        setUserPayload={setUserPayload}
        userPayload={userPayload}
      />
    </div>
  );
};

export default RegistrationForm;