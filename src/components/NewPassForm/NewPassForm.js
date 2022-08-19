import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classes from './NewPassForm.module.css' 
import { useDispatch, useSelector } from "react-redux";
import { checkUser, decodeToken, logOut, setCredntials } from "../../store/reducers/authReducer/authReducer";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../store/services";


const Forget = require('axios');

const NewPassForm = props => {
  let navigate = useNavigate();


  const theme = useSelector((state) => state.theme.currentTheme);

  const [passShowState,setPassShowState] = useState({
      isShown:false,
      inputType: "password",
      iconClass: "bi bi-eye-slash" 
  })


  const authState = useSelector(state => state.auth.userRole)
  const dispatch  = useDispatch();
  const [login, loginresponse] = api.useLoginMutation();
  // dispatch(logOut())
  useEffect(() => {
    if(authState == 'regUser'){
      navigate('/')
    }else if (authState == 'rootAdmin'){
      navigate('/admin')
    }
  }, [authState]);

  const toggleShowPass = () => {
      if (passShowState.isShown){
          setPassShowState({
              isShown:false,
              inputType: "password",
              iconClass: "bi bi-eye-slash"  
          })  
      } else {
          setPassShowState({
              isShown:true,
              inputType: "text",
              iconClass: "bi bi-eye"
          })  
      }
  }

  const loginSchema = Yup.object().shape({
    
    userName: Yup.string().required("Field is required"),

    thePassword: Yup.string()
    .required("Password is required"),
    
  });
  
  return (
    <div className="container">
      <div className="row">
          <div className="col-md-12">
              <div className={theme === "night" ? classes.formNight : classes.form}>
                        <h2>New Password</h2>
                        <Formik
                            initialValues={{
                                  userName:"",
                                  thePassword:""
                            }}
                            validationSchema={loginSchema}
                            onSubmit={values => {
                              const data= {

                                userName:values.userName,
                                email:values.userName,
                                phone:values.userName,
                                pass:values.thePassword,
                              }
                              // axios.post('https://e-bookalypse.herokuapp.com/login', data)
                              login(data)
                              .then(function  (response) {
                                //  console.log(response.data);
                                // dispatch(setCredntials(response.data.token));
                                // dispatch( decodeToken())

                               dispatch(setCredntials(response.data));
                               console.log(response)
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                              console.log(values);
                            }}
                          >
                            {({errors,touched})=>(
                            <Form>
                                <div className="form-group mb-3 col-md-12 col-sm-12" >
                                <label htmlFor="thePassword" className={`form-label ${theme === "night" ? classes.lightTxt : ""}`}>
                                Password
                                </label>
                                <span className={classes.passwordVisiblity}><i className={passShowState.iconClass} onClick={toggleShowPass}></i></span>
                                <Field name="thePassword" className={`form-control ${errors.thePassword ? "border-danger" : ""}`}style={{color:"#8D27AE", fontWeight:"700"}} type={passShowState.inputType}/>
                                {errors.thePassword && touched.thePassword ? (
                                    <div className="form-text text-danger">{errors.thePassword}</div>
                                ) : null}
                            </div>

                            <div className="form-group mb-3 col-12">
                                <label htmlFor="cnfrmPass" className={`form-label ${theme === "night" ? classes.lightTxt : ""}`}>
                                    Confirm Password
                                </label>
                                <Field name="cnfrmPass" className={`form-control ${errors.cnfrmPass ? "border-danger" : ""}`} style={{color:"#8D27AE", fontWeight:"700"}}type={passShowState.inputType}/>
                                {errors.cnfrmPass && touched.cnfrmPass ? (
                                    <div className="form-text text-danger">{errors.cnfrmPass}</div>
                                ) : null}
                            </div>
                        
                                <button type="submit" className={classes.btn}>
                                Submit
                                </button>
                            </Form>)}
                    </Formik>
              </div>
          </div>
      </div>
    </div>  
  )
}

export default NewPassForm