import { useState, useEffect, useReducer } from "react";
import "../shared/styles/Authentication.scss";
// import {
//   ErrorMsg,
//   Heading2,
//   InputField,
//   Label,
//   SubmitButton,
// } from "../shared/components";
import {
  ErrorMsg,
} from "../shared/components/atomicComponents/ErrorMsg.jsx";
import {
  Heading2,
} from "../shared/components/atomicComponents/Heading.jsx";
import {
  InputField,
} from "../shared/components/atomicComponents/InputField.jsx";
import {
  Label,
} from "../shared/components/atomicComponents/Label.jsx";
import {
  SubmitButton,
} from "../shared/components/atomicComponents/SubmitButton.jsx";


import { useFocus } from "../customHooks/useFocus.js";
// import {
//   changeToSmallCase,
//   formReducer,
//   isValidEmail,
//   isValidPasswrd,
//   trimElement,
// } from "../shared/utils";
import { changeToSmallCase } from "../shared/utils/generalFunc.js";
import { formReducer } from "../shared/utils/reducerHandler.js";
import { isValidEmail } from "../shared/utils/validaton.js";
import { isValidPasswrd } from "../shared/utils/validaton.js";
import { trimElement } from "../shared/utils/generalFunc.js";

// import {
//   AUTH_ERROR_LOGIN,
//   BUTTON_NAME,
//   EMAIL_ERROR,
//   EMAIL_INPUT_NAME,
//   EMAIL_PLACEHOLDER,
//   LOGIN_HEADING,
//   FIELD_NULL_ERROR,
//   PASSWORD_ERROR,
//   PASSWORD_INPUT_NAME,
//   PASSWORD_PLACEHOLDER,
//   HOME,
//   REGISTER,
// } from "../constants";

import {
  AUTH_ERROR_LOGIN
} from "../constants/authentication.js";
import {
  BUTTON_NAME
} from "../constants/authentication.js";
import {
  EMAIL_ERROR
} from "../constants/authentication.js";
import {
  EMAIL_INPUT_NAME
} from "../constants/authentication.js";
import {
  EMAIL_PLACEHOLDER
} from "../constants/authentication.js";
import {
  LOGIN_HEADING
} from "../constants/authentication.js";
import {
  FIELD_NULL_ERROR
} from "../constants/authentication.js";

import {
  PASSWORD_ERROR
} from "../constants/authentication.js";
import {
  PASSWORD_INPUT_NAME
} from "../constants/authentication.js";
import {
  PASSWORD_PLACEHOLDER
} from "../constants/authentication.js";
import {
  HOME
} from "../constants/routePaths.js";
import {
  REGISTER
} from "../constants/routePaths.js";


import { reset, signin } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const { user, isError } = useSelector((state) => state.auth);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      fieldName: event.target.name,
      fieldValue: event.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const isMailContent = trimElement(formData.email);
    const isPasswrdContent = trimElement(formData.password);
    if (!isMailContent || !isPasswrdContent) {
      setError(FIELD_NULL_ERROR);
    } else {
      const isMail = isValidEmail(formData.email);
      const isPasswrd = isValidPasswrd(formData.password);
      if (!isMail) {
        setError(EMAIL_ERROR);
      } else if (!isPasswrd) {
        setError(PASSWORD_ERROR);
      } else {
        const userData = {
          email: formData.email,
          password: formData.password,
        };

        reduxDispatch(signin(userData));
        dispatch({ type: "RESET_FORM" });
      }
    }
  };

  useEffect(() => {
    if (isError) setError(AUTH_ERROR_LOGIN);
  }, [isError]);

  useEffect(() => {
    if (user) navigate(HOME);
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      reduxDispatch(reset());
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const inputRef = useFocus();
  const mail = changeToSmallCase(EMAIL_INPUT_NAME);
  const passwrd = changeToSmallCase(PASSWORD_INPUT_NAME);
  const btn = changeToSmallCase(BUTTON_NAME);

  return (
    <div>
      <Heading2 heading={LOGIN_HEADING} />
      <form className="container">
        <Label htmlFor={mail} label={EMAIL_INPUT_NAME} />
        <InputField
          value={formData.email}
          ref={inputRef}
          onChange={handleInputChange}
          type={mail}
          id={mail}
          name={mail}
          placeholder={EMAIL_PLACEHOLDER}
        />

        <Label htmlFor={passwrd} label={PASSWORD_INPUT_NAME} />
        <InputField
          value={formData.password}
          focus={false}
          onChange={handleInputChange}
          type={passwrd}
          id={passwrd}
          name={passwrd}
          placeholder={PASSWORD_PLACEHOLDER}
        />

        {error && <ErrorMsg msg={error} />}

        <SubmitButton onClick={handleClick} type={btn} name={BUTTON_NAME} />
        <div className="link">
          <Link to={REGISTER}>Not registered yet?</Link>
        </div>
      </form>
    </div>
  );
};
