import { useState } from 'react';
import {
  FileText,
  LogIn,
  Mail,
  User,
  MessageSquare,
  Bell,
  Search,
} from 'react-feather';
import { useNavigate } from 'react-router-dom';
import styles from './Rightbar.module.scss';
import { useMutation } from '@apollo/client';
import {
  useSignInWithTokenQuery,
  useUserLoginMutation,
  useUserRegisterMutation,
} from '~/app/api-interaction/GraphQL/schema';
import {
  getAccessToken,
  removeAllUserInfo,
  setAccessToken,
  setUserEmail,
} from '~/app/utils/local-storage';
import { HOME_PATH } from '~/app/routes/paths';
import './styles.css';
import UploadPostModal from '~/app/UI/components/Modal/UploadPostModal';
import { setTokenForUser } from '~/app/redux-tk/slices/auth.slice';
import { useAppDispatch } from '~/app/redux-tk/store/hooks';
import { setCurrentUser } from '~/app/redux-tk/slices/currenUser.slice';
import NotificationComponent from '~/app/UI/components/NotificationsComponent/notifications';

const Rightbar = (props: any) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [searchresponsive, setSearchresponsive] = useState(false);
  const [moonlight, setMoonlight] = useState(false);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const [chatDropDown, setChatDropDown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUploadPostModal, setShowUploadPostModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successClass, setSuccessClass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState<string | undefined>(undefined);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerGender, setRegisterGender] = useState(0);
  const [userLogin] = useUserLoginMutation();
  const [userRegister] = useUserRegisterMutation();
  //const { data: signInWithToken, refetch } = useSignInWithTokenQuery({});
  const dispatch = useAppDispatch();

  // refetch()
  //   .then((response) => {
  //     if (response && response.data?.SignInWithToken != null) {
  //       updateCurrentUser(
  //         response.data.SignInWithToken.email,
  //         response.data.SignInWithToken.id,
  //         response.data.SignInWithToken.name,
  //         response.data.SignInWithToken.avatarUrl
  //       );
  //     } else {
  //       removeAllUserInfo();
  //     }
  //   })
  //   .catch((error) => {
  //     if (
  //       error.message === 'Response not successful: Received status code 401'
  //     ) {
  //       // Xử lý lỗi 401 Unauthorized tại đây
  //       // Ví dụ: Hiển thị thông báo lỗi hoặc không làm gì cả
  //       console.error('Error 401 Unauthorized:', error);
  //     } else {
  //       // Xử lý các lỗi khác nếu cần
  //       console.error('Other error:', error);
  //     }
  //   });
  // Thay đổi giá trị của accessToken và refreshToken
  const updateTokenForUser = (accessToken: any, refreshToken: any) => {
    dispatch(setTokenForUser({ accessToken, refreshToken }));
  };

  // Thay đổi giá trị của userEmail và userId
  const updateCurrentUser = (
    userEmail: any,
    userId: any,
    name: any,
    avatarUrl: any
  ) => {
    dispatch(setCurrentUser({ userEmail, userId, name, avatarUrl }));
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleUploadPostModal = () => {
    setShowUploadPostModal(!showUploadPostModal);
    setIsModalVisible(!isModalVisible);
  };

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const redirectToChats = () => {
    navigate(`chat-app`);
  };

  const userMenuRedirect = (redirect: any) => {
    navigate(redirect);
  };

  const searchResponsive = (isResponsive: any) => {
    if (isResponsive) {
      setSearchresponsive(!searchresponsive);
      document.querySelector('.search-full')?.classList.add('open');
      document.querySelector('.more_lang')?.classList.remove('active');
    } else {
      setSearchresponsive(!searchresponsive);
      document.querySelector('.search-full')?.classList.remove('open');
    }
  };

  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    userLogin({
      variables: {
        Email: email,
        Password: password,
      },
    })
      .then((response) => {
        if (
          response.data?.UserLogin != null &&
          response.data?.UserLogin.accessToken != ''
        ) {
          updateTokenForUser(response.data.UserLogin.accessToken, '');
          updateCurrentUser(
            response.data.UserLogin.user.email,
            response.data.UserLogin.user.id,
            response.data.UserLogin.user.name,
            response.data.UserLogin.user.avatarUrl
          );
          setShowSuccessModal(true);
          setSuccessMessage('Login successful!');
          setSuccessClass('success_msg');
          setShowModal(false);
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
          }, 2000);
          location.reload();
        } else {
          removeAllUserInfo();
          setShowSuccessModal(true);
          setSuccessClass('error_msg');
          setSuccessMessage('Login Failed! Please try again');
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
          }, 2000);
        }
      })
      .catch((error) => {
        // Handle error if needed
      });
  };

  const handleRegisterSubmit = (e: any) => {
    e.preventDefault();

    userRegister({
      variables: {
        dob: dob,
        email: registerEmail,
        password: registerPassword,
        name: registerName,
        gender: registerGender,
      },
    })
      .then((response) => {
        if (
          response.data?.UserRegister != null &&
          response.data?.UserRegister != 'Existed'
        ) {
          setAccessToken(response.data.UserRegister);
          setShowSuccessModal(true);
          setSuccessMessage('Register successful!');
          setSuccessClass('success_msg');
          setShowRegisterModal(false);
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
          }, 2000);
          navigate(HOME_PATH);
        } else {
          alert('?');
          setAccessToken('');
          setShowSuccessModal(true);
          setSuccessClass('error_msg');
          if (response.data?.UserRegister == null) {
            setSuccessMessage('Register Failed! Please try again');
          } else {
            setSuccessMessage('Register Failed! Email already existed');
          }
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
          }, 2000);
        }
      })
      .catch((error) => {
        // Handle error if needed
      });
  };

  return (
    <div className="nav-right col-xxl-7 col-xl-6 col-md-7 col-8 pull-right right-header p-0">
      <ul className="nav-menus">
        <li>
          <span className="header-search">
            <Search onClick={() => searchResponsive(searchresponsive)} />
          </span>
        </li>
        <li>
          <NotificationComponent />
        </li>

        {getAccessToken() != '' ? (
          showUploadPostModal ? (
            <li className="profile-nav onhover-dropdown p-0">
              <button
                className={`${styles.uploadPostButton} ${styles.closeBtn}`}
                onClick={toggleUploadPostModal}
              >
                Close
              </button>
            </li>
          ) : (
            <li className="profile-nav onhover-dropdown p-0">
              <button
                className={styles.uploadPostButton}
                onClick={toggleUploadPostModal}
              >
                Upload Your Post
              </button>
            </li>
          )
        ) : (
          <li className="profile-nav onhover-dropdown p-0">
            <div className="profile-dropdown">
              <button className="btn btn-primary" onClick={toggleModal}>
                Login
              </button>
            </div>
          </li>
        )}
      </ul>
      {showModal && (
        <div className={styles.modal_overlay} onClick={toggleModal}>
          <div
            className={styles.modal_container}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <h2>Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br />
                <button className={styles.LoginSubmit} type="submit">
                  Login
                </button>
              </form>
              <a className="text-center" href="/ForgetPassword">
                Forget Password?
              </a>
            </div>
            <hr />
            <div className="text-center">
              Don't have an account?{' '}
              <button
                className={styles.registerBtn}
                onClick={toggleRegisterModal}
              >
                Register here
              </button>
            </div>
          </div>
        </div>
      )}
      {showRegisterModal && (
        <div className={styles.modal_overlay} onClick={toggleRegisterModal}>
          <div
            className={styles.modal_container}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <h2>Register</h2>
              <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label htmlFor="registerName">Name</label>
                  <br />
                  <input
                    required
                    type="text"
                    id="registerName"
                    name="registerName"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="registerEmail">Email</label>
                  <br />
                  <input
                    required
                    type="email"
                    id="registerEmail"
                    name="registerEmail"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="registerPassword">Password</label>
                  <br />
                  <input
                    required
                    type="password"
                    id="registerPassword"
                    name="registerPassword"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <br />
                  <input
                    required
                    type="date"
                    id="dob"
                    name="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="registerGender">Gender</label>
                  <br />
                  <select
                    id="registerGender"
                    name="registerGender"
                    value={registerGender}
                    onChange={(e) =>
                      setRegisterGender(parseInt(e.target.value))
                    }
                  >
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                </div>
                <br />
                <button className={styles.LoginSubmit} type="submit">
                  Register
                </button>
              </form>
            </div>
            <hr />
            <div className="text-center">
              Already have an account?{' '}
              <button
                className={styles.registerBtn}
                onClick={toggleRegisterModal}
              >
                Login here
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <div className={`${styles.success_modal} ${successClass}`}>
          <div className={styles.success_modal_content}>
            <button
              className={styles.success_modal_close}
              onClick={() => {
                setShowSuccessModal(false);
                setSuccessMessage('');
              }}
            >
              X
            </button>
            <br />
            <p className={`${styles.success_modal_message}`}>
              {successMessage}
            </p>
          </div>
        </div>
      )}
      {showUploadPostModal && (
        <div
          className={`${styles.modal_overlay} ${
            isModalVisible ? 'visible' : ''
          }`}
        />
      )}
      {showUploadPostModal && (
        <UploadPostModal showUploadModal={showUploadPostModal} />
      )}
    </div>
  );
};

export default Rightbar;
