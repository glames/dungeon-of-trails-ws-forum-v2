import React, { useState } from 'react';
import styles from '../../layouts/MainLayout/Header/Rightbar.module.scss';
import {
  useEditPostMutation,
  useEditProfileMutation,
} from '~/app/api-interaction/GraphQL/schema';

interface EditProfilePopupProps {
  showEditProfileModal: boolean;
  onClose: () => void;
  currentUserData: {
    name: string;
    email: string;
    dob: string;
    gender: number;
    des: string;
  };
  onUpdateProfile: (data: {
    name: string;
    email: string;
    dob: string;
    gender: number;
    des: string;
  }) => void;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({
  showEditProfileModal,
  onClose,
  currentUserData,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(currentUserData.name || '');
  const [email, setEmail] = useState(currentUserData.email || '');
  const [dob, setDob] = useState(currentUserData.dob || '');
  const [gender, setGender] = useState(currentUserData.gender || 0);
  const [des, setDes] = useState(currentUserData.des || '');

  const [EditProfile] = useEditProfileMutation({
    variables: {
      name: name,
      dob: new Date(dob),
      gender: gender === 1 ? true : false,
      email: email,
      des: '',
    },
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, email, dob, gender, des });
    EditProfile();
    onClose();
  };

  return (
    showEditProfileModal && (
      <div className={styles.modal_overlay} style={{ zIndex: 0 }}>
        <div className={styles.modal_container}>
          <div className="modal-content">
            <button className={styles.edit_profile_close} onClick={onClose}>
              X
            </button>
            <h2>Edit Profile</h2>
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label htmlFor="editName">Name</label>
                <br />
                <input
                  required
                  type="text"
                  id="editName"
                  name="editName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editEmail">Email</label>
                <br />
                <input
                  required
                  type="email"
                  id="editEmail"
                  name="editEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editDob">Date of Birth</label>
                <br />
                <input
                  required
                  type="date"
                  id="editDob"
                  name="editDob"
                  value={dob}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDob(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editGender">Gender</label>
                <br />
                <select
                  id="editGender"
                  name="editGender"
                  value={gender}
                  onChange={(e) => setGender(parseInt(e.target.value))}
                >
                  <option value={1}>Male</option>
                  <option value={0}>Female</option>
                </select>
              </div>
              <br />
              <button className={styles.update_profile_button} type="submit">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProfilePopup;
