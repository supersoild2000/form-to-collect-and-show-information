import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { RootState, AppDispatch } from "../../store";
import { updateField } from "../../store/slices/userSlice";
import "./form.css";

const Form: React.FC = () => {
  const initialUserState = useSelector((state: RootState) => state.user);

  const [firstName, setFirstName] = useState(initialUserState.firstName);
  const [lastName, setLastName] = useState(initialUserState.lastName);
  const [email, setEmail] = useState(initialUserState.email);
  const [message, setMessage] = useState(initialUserState.message);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setFirstName(initialUserState.firstName);
    setLastName(initialUserState.lastName);
    setEmail(initialUserState.email);
    setMessage(initialUserState.message);
  }, [initialUserState]);

  const validate = useCallback(() => {
    const isValid =
      !validator.isEmpty(firstName) &&
      !validator.isEmpty(lastName) &&
      validator.isEmail(email) &&
      !validator.isEmpty(message) &&
      message.length >= 10;

    setDisabled(!isValid);
  }, [email, firstName, lastName, message]);

  useEffect(() => {
    validate();
  }, [validate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!disabled) {
      dispatch(updateField({ field: "firstName", value: firstName }));
      dispatch(updateField({ field: "lastName", value: lastName }));
      dispatch(updateField({ field: "email", value: email }));
      dispatch(updateField({ field: "message", value: message }));

      alert("Information recorded!");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form__input"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />

      <input
        className="form__input"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />

      <input
        className="form__input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <textarea
        className="form__textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />

      <button type="submit" className="form__submit" disabled={disabled}>
        Submit
      </button>
    </form>
  );
};

export default Form;
