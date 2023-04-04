import React, { useState, useEffect } from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import toast from 'react-hot-toast';
import { TabHeader, LoginModalForm } from './Common';
import { useLogin, useForgetPass, useSetPassword, useActivateAccount, useCheckCode } from '../../api/auth';
import BlueMailImg from '../../assets/images/blueMail.png';
import './style.scss';

export const LoginForm = () => {
  const [fp, setFP] = React.useState(false);
  const [formTitle, setFormTitle] = React.useState('ورود به حساب‌کاربری');
  useEffect(() => {
    if (fp) setFormTitle('فراموشی رمز‌عبور');
  }, [fp]);
  const login = useLogin();

  const login_submit = userData => {
    toast.promise(login.mutateAsync({ username: userData.user_email, password: userData.password }), {
      loading: 'در حال بررسی...',
      success: res => {
        localStorage.setItem('access-token', res.data['access']);
        localStorage.setItem('refresh-token', res.data['refresh']);
        window.location.reload(false);
        return 'با موفقیت لاگین شدید.';
      },
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        if (err.response.status === 401) return 'رمز یا نام‌کاربری اشتباه است.';
        else return `مشکلی پیش آمد، دوباره امتحان کنید.`;
      },
    });
  };

  const forgetPass = useForgetPass();
  const email_submit = userData => {
    toast.promise(forgetPass.mutateAsync(userData), {
      loading: 'در حال بررسی...',
      success: res => {
        setFormTitle('ایمیل خود را چک کنید');
        return 'ایمیل با موفقیت برای شما ارسال شد.';
      },
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        if (err.response.status === 404) return 'حساب کاربری با این ایمیل یافت نشد.';
        else return `مشکلی پیش آمد، دوباره امتحان کنید.`;
      },
    });
  };

  return (
    <>
      <TabHeader title={formTitle} />
      <div className="login-modal__TabContent" title="..ورود..">
        {!fp && (
          <LoginModalForm
            isLogin={true}
            onForgetPassClick={() => setFP(true)}
            fields={['user_email', 'password']}
            onSubmit={login_submit}
            isLoading={login.isLoading}
          />
        )}
        {fp &&
          (forgetPass.isSuccess ? (
            <div className="check-email">
              <img src={BlueMailImg} alt="عکس ایمیل" className="check-email__image" />
            </div>
          ) : (
            <>
              <LoginModalForm fields={['email']} onSubmit={email_submit} isLoading={forgetPass.isLoading} />
            </>
          ))}
      </div>
    </>
  );
};

export const SignupForm = ({ handleFormIsDirty, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');

  const authActivate = useActivateAccount();
  const checkCode = useCheckCode();

  const submit_step1 = userData => {
    toast
      .promise(authActivate.mutateAsync(userData), {
        loading: 'در حال بررسی...',
        success: res => {
          localStorage.setItem('email', userData.email);
          localStorage.setItem('username', userData.username);

          return 'کد تایید به ایمیلتون فرستاده شد.';
        },
        error: err => {
          if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
          let resp = err.response;
          let problem = resp.data.split(' ')[0];
          if (resp.status === 400) {
            if (problem === 'username') return 'نام کاربری تکراری است.';
            else if (problem === 'email') return 'این ایمیل قبلا در سیستم ثبت شده است.';
          } else return `مشکلی پیش آمد، دوباره امتحان کنید.`;
        },
      })
      .then(x => setCurrentStep(1));
  };

  const submit_step2 = code => {
    if (code.length !== 6) return;
    localStorage.setItem('user-code', code);
    toast
      .promise(checkCode.mutateAsync({ email: localStorage.getItem('email'), token: code }), {
        loading: 'در حال بررسی...',
        success: 'لطفا برای حساب خود رمز انتخاب کنید',
        error: err => {
          if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
          let resp = err.response;
          if (resp.status === 400) {
            return 'کد صحیح نمیباشد.';
          } else return `مشکلی پیش آمد، دوباره امتحان کنید.`;
        },
      })
      .then(x => setCurrentStep(2));
  };

  const setPass = useSetPassword();

  const submit_step3 = userData => {
    const formData = new FormData();
    formData.append('username', localStorage.getItem('username'));
    formData.append('email', localStorage.getItem('email'));
    formData.append('token', localStorage.getItem('user-code'));
    formData.append('password', userData.password);
    formData.append('re_password', userData.re_password);

    toast.promise(setPass.mutateAsync(formData), {
      loading: 'در حال بررسی...',
      success: 'حساب شما با موفقیت ساخته شد.',
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        return `مشکلی پیش آمد، دوباره امتحان کنید.`;
      },
    })
    .then(x => {
      console.log("navigating to the login tab.")
      onComplete(0);
    });
  };

  return (
    <>
      <TabHeader title="بیا یه ایرانگرد شو" />

      <div className="login-modal__TabContent" title="..ثبت نام..">
        {currentStep === 0 && (
          <LoginModalForm
            fields={['username', 'email']}
            onSubmit={submit_step1}
            onDirty={handleFormIsDirty}
            isLoading={authActivate.isLoading}
          />
        )}
        {window.location.reload}
        {currentStep === 1 && (
          <div className="login-modal-form">
            لطفا کد تایید ایمیل رو وارد کن
            <div className="react-input-verification-code">
              <ReactInputVerificationCode
                length={6}
                autoFocus={true}
                onChange={setVerificationCode}
                value={verificationCode}
                placeholder=""
                onCompleted={code => submit_step2(code)}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <LoginModalForm fields={['password', 're_password']} onSubmit={submit_step3} isLoading={setPass.isLoading} />
        )}
      </div>
    </>
  );
};
