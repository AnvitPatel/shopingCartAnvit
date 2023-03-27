import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid } from "@material-ui/core";
import { setLogin } from "redux/action";
import { message } from "antd";
import { useEffect } from "react";

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("password is required"),
});

const useStyles = makeStyles({
  FormWrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainBox: {
    minHeight: "10em",
    minWidth: "25em",
    borderRadius: "10px !important",
    boxShadow: "0 0 7px rgb(0 0 0 / 51%)",
    padding: "10px 30px",
  },
  head: {
    textAlign: "center",
  },
  button: {
    marginTop: 16,
  },
  bottom:{
    marginBottom:"0.5em",
  },
});
function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    useEffect(() => {
        let ldata = localStorage.authTask && JSON.parse(localStorage.authTask);
        ldata && navigate("/dashbord", { replace: true })
      },[]);
    const classes = useStyles();
    const handleSubmit = (values, { resetForm }) => {
        try {
            if(values.email ==="admin@gmail.com"&& values.password ==="abcd@1234"){
                let  send={
                    email:values.email,
                    id:1,
                    proj:"taskDemo",
                }
                dispatch(setLogin(send));
                message.success("Login Success");
                navigate(`/`,{ replace: true });
            }else message.error("Invalid Credentials");
            
        } catch (error) {
            console.log(error);
        }
    };
    
  return (
    <div className={classes.FormWrapper}>
      <div className={classes.mainBox}>
        <h1 className="head">{"Login"}</h1>
        <Formik
          initialValues={{
            id: 0,
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form action="/">
              <Grid container spacing={3} alignItems="center">
                <Grid xs={12} className={classes.bottom}>
                  <Field
                    label="EMail*"
                    name="email"
                    type="email"
                    fullWidth
                    onKeyUp={handleChange}
                    error={touched.email && errors.email}
                    helperText={touched.email && errors.email}
                    value={values.email}
                    as={TextField}
                  />
                </Grid>
                <Grid xs={12} className={classes.bottom}>
                  <Field
                    label="Password*"
                    name="password"
                    type="password"
                    fullWidth
                    onKeyUp={handleChange}
                    error={touched.password && errors.password}
                    helperText={touched.password && errors.password}
                    value={values.password}
                    as={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  {"submit"}
                </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (item) => dispatch(setLogin(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
