import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthApi from '../../../../api/Auth';
import { useHistory } from 'react-router-dom';
import { RootContext } from '../../../../contextApi/index';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import instance from '../../../../axios';
import { usePromiseTracker } from "react-promise-tracker";
import HashLoader from "react-spinners/HashLoader";

const LoginForm = () => {

  const { user, setUser, setSelectedNav } = useContext(RootContext);

  useEffect(() => {
    if (user && user.role) {
      history.push("/admin/game-types");
    }
  }, []);

  const { promiseInProgress } = usePromiseTracker();

  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required("Required")
    }),
    onSubmit: async values => {
      await AuthApi.login(values).then(res => {
        toast.success("Logged In Successfully");
        setUser(res?.data?.data?.user);

        instance.defaults.headers.common['authorization'] = "Bearer" + " " + res?.data?.data?.token;

        setSelectedNav("Quests");
        localStorage.setItem("auth", res?.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
        localStorage.setItem("familyMembers", JSON.stringify(res?.data?.data?.familyMembers));
        history.push("/admin/game-types");
      }).catch(err => {
        toast.error(err.response.data.message || "Invalid Credentials")
      })
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div class="form-group">
        <input type="email" {...formik.getFieldProps('email')} class={(formik.touched.email && formik.errors.email) ? "form-control is-invalid" : "form-control"} placeholder="Email" />
        {formik.touched.email && formik.errors.email ? (
          <div class="invalid-feedback text-right-aligned">{formik.errors.email}</div>
        ) : null}
      </div>

      <div class="form-group mb-2">
        <input type="password" {...formik.getFieldProps('password')} class={(formik.touched.password && formik.errors.password) ? "form-control is-invalid" : "form-control"} placeholder="Password" />
        {formik.touched.password && formik.errors.password ? (
          <div class="invalid-feedback text-right-aligned">{formik.errors.password}</div>
        ) : null}
      </div>

      <div class="form-group mt-4">
        <button type="submit" disabled={promiseInProgress} style={promiseInProgress ? { padding: '20px' } : {}} class="btn btn-primary">
          {promiseInProgress ? (
            <HashLoader color="#fff" loading={true} size={15} />
          ) : (
            <>Sign in</>
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;