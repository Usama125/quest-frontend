import React from 'react'
import LoginForm from './components/LoginForm';
import LOGO from '../../../assets/images/logo.png';

function Login() {
    return (
        <>
            <section class="user-account">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 action-icon">
                            <a href={null}><span class="icon-close"></span></a>
                        </div>
                    </div>
                    <div class="row justify-content-center align-items-center">
                        <div class="col-sm-8 col-md-7 col-lg-5 text-center">
                            <img class="logo" src={LOGO} alt="logo" />
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
