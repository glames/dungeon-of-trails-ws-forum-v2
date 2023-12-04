import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ChangePassword.module.scss';
import { useChangePasswordMutation } from '~/app/api-interaction/GraphQL/schema';

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ChangePassword] = useChangePasswordMutation();
  const { code } = useParams();
  const navigate = useNavigate();

  const handleChangePassword = () => {
    // Xử lý logic thay đổi mật khẩu ở đây
    if (newPassword.length < 6) {
      setErrorMessage('Passwords is at least 6 charaters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match");
    } else {
      ChangePassword({
        variables: {
          link: code,
          newPassword: newPassword,
        },
      })
        .then((response) => {
          if (response.data?.ChangePassword != null) {
            setErrorMessage('Change password successfully!');
            setTimeout(() => {
              navigate('/');
            }, 2000);
          } else {
            setErrorMessage('Change password failed!');
          }
        })
        .catch((error) => {
          // Handle error if needed
        });
    }
  };

  return (
    <div className={styles.ChangePasswordCont}>
      <h2>Change Your Password</h2>
      <div className={styles.inputDiv}>
        <label>
          New Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <br />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '10px' }} className={styles.inputDiv}>
        <label>Confirm New Password:</label>
        <br />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {errorMessage && (
        <div
          className={`${styles.errosMsg} ${
            errorMessage.includes('successfully') && styles.successMsg
          }`}
        >
          {errorMessage}
        </div>
      )}
      <button
        className={styles.SubmitPasswordButton}
        onClick={handleChangePassword}
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePasswordPage;
