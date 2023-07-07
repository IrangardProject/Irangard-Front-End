import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import HeaderImg from '../../assets/images/loginHead.jpg';
import HeaderImg2 from '../../assets/images/loginHead2.jpg';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import './style.scss';
const commonErrors = {
  required: 'این فیلد باید پر شود.',
};

export const ErrorMessage = ({ error }) => {
  let errorMsg = 'ارور';
  if (error.type in commonErrors) errorMsg = commonErrors[error.type];
  else errorMsg = error.message;
  return (
    <div className="error-msg" role="alert">
      <p>{errorMsg}</p>
    </div>
  );
};
export const TabHeader = ({ title }) => {
  return (
    <div className="login-modal__TabHeader">
      <img src={HeaderImg} alt="Hello" className="login-modal__HeaderImg" />
      <div className="tab-header-title"> {title}</div>
      <img src={HeaderImg2} alt="Hello" className="login-modal__HeaderImg" />
    </div>
  );
};

export const getFields = (watch, field_list) => {
  const fields = {
    user_email: {
      label: 'نام‌کاربری یا ایمیل',
      validation: {
        required: true,
      },
    },
    username: {
      label: 'نام کاربری',
      validation: {
        required: true,
        minLength: {
          value: 4,
          message: 'نام‌کاربری باید ییشتر از ۴ کارکتر باشد.',
        },
        maxLength: {
          value: 10,
          message: 'نام‌کاربری باید کمتر از ۱۰ کارکتر باشد.',
        },
        pattern: {
          value: /^[a-z0-9]*$/i,
          message: 'نام‌کاربری تنها باید از حروف و اعداد انگلیسی تشکیل شده باشد.',
        },
      },
    },
    email: {
      label: 'ایمیل',
      validation: {
        required: true,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'ایمیل نامعتبر است.',
        },
      },
    },
    password: {
      label: 'رمز عبور',
      validation: {
        required: true,
        minLength: {
          value: 6,
          message: 'رمز عبور باید ییشتر از ۶ کارکتر باشد.',
        },
        maxLength: {
          value: 50,
          message: 'رمز عبور باید کمتر از ۵۰ کارکتر باشد.',
        },
      },
    },
    re_password: {
      label: 'تکرار رمز عبور',
      validation: {
        required: true,
        validate: val => {
          if (watch('password') != val) {
            return 'تکرار رمز با رمز‌عبور یکسان نمی‌باشد.';
          }
        },
      },
    },
  };
  return field_list.map(x => ({ id: x, ...fields[x] }));
};

export const LoginModalForm = ({ fields, onSubmit, isLoading, onDirty, isLogin = false, onForgetPassClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
    },
  });
  useEffect(() => {
    if (onDirty) onDirty(isDirty);
  }, [isDirty]);
  return (
    <form className="login-modal-form" onSubmit={handleSubmit(onSubmit)} role="form">
      {getFields(watch, fields).map(field => {
        // console.log('the field is: ', field);
        return (
          <div key={field.id} className="form__group field">
            <div style={{ position: 'relative' }}>
              {field.id === 'password' && (
                <button
                  type="button"
                  placeholder='ToggleShowPassword'
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    transform: 'translateY(-50%)',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <BsFillEyeSlashFill size={20} /> : <BsFillEyeFill size={20} />}
                </button>
              )}
              <input
                type={field.id === 'password' ? (showPassword ? 'text' : 'password') : 'input'}
                className="form__field"
                placeholder={field.id}
                id={field.id}
                name={field.id}
                {...register(field.id, field.validation)}
              />
            </div>
            <label htmlFor={field.id} className="form__label">
              {field.label}
            </label>
            {errors[field.id] && <ErrorMessage error={errors[field.id]} />}
          </div>
        );
      })}
      {isLogin && (
        <div className="forget-password-link" data-testid="forget-password-link">
          رمز عبور خود را فراموش کرده اید؟
          <span onClick={onForgetPassClick} >کلیک کنید</span>
        </div>
      )}
      <button className="submit-btn" type="submit" disabled={isLoading}>
        {isLogin ? 'ورود' : 'ثبت'}
      </button>
    </form>
  );
};
