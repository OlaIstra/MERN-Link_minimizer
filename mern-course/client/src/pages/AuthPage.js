import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = event => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    reg.test(form.email) && form.password.length > 5
      ? setIsDisabled(false)
      : setIsDisabled(true);

    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log(data);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h3>Minimize link</h3>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <label htmlFor="email">email</label>
                <input
                  placeholder="Enter email"
                  id="email"
                  type="email"
                  className="validate white-text custom-input"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">password</label>
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  className="validate white-text custom-input"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  required
                  minLength="4"
                  maxLength="8"
                  size="8"
                  pattern="[0-9]{4,8}"
                  title="Enter a password consisting of 4-8 digits"
                  inputMode="number"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4 btn-login"
              style={{ marginRight: "10px" }}
              disabled={isDisabled}
              onClick={loginHandler}
            >
              Log in
            </button>
            <button
              className="btn grey darken-4 btn-signup"
              onClick={registerHandler}
              disabled={isDisabled}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
