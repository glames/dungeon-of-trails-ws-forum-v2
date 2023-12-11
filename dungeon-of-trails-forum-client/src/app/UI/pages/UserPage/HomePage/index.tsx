import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import './Demo.css';

import { useGetUserProfileQuery } from '~/app/api-interaction/GraphQL/schema';
import { getUserId } from '~/app/utils/local-storage';
import styles from './userPage.module.scss';
import { UserPostTab } from '../UserPostPage/userpost';
import { RecentCommentTab } from '../UserPostPage/recentcomment';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Cropper, ReactCropperElement } from 'react-cropper';
import ImageUploader from '~/app/UI/components/ImageUploader/ImageUploader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCameraRotate,
  faPenToSquare,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import EditProfilePopup from '~/app/UI/components/Popup/EditProfilePopup';

const defaultSrc =
  'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg';

const UserPage = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('post');
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const setImageAfterCrop = (image: string) => {
    setCroppedImage(image);
    SetIsOpenUploadAvaterModal(false);
  };

  const [isOpenUploadAvaterModal, SetIsOpenUploadAvaterModal] =
    useState<boolean>(false);

  // Gọi query để lấy thông tin người dùng
  const { loading, error, data, refetch } = useGetUserProfileQuery({
    variables: { userId },
    fetchPolicy: 'no-cache',
  });

  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState('#');
  const cropperRef = useRef<ReactCropperElement>(null);
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  const openEditProfileModal = () => {
    setShowEditProfileModal(true);
  };

  const closeEditProfileModal = () => {
    setShowEditProfileModal(false);
  };

  const handleUpdateProfile = (updatedData: any) => {
    refetch();
    closeEditProfileModal();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user = data?.GetUserProfile;

  return (
    <div className={styles.profile_page_cont}>
      <div className={styles.profile_upper}>
        <div className={styles.profile_avt}>
          <img
            src={user?.avatarUrl || '/assets/images/avtar/default-avatar.png'}
            alt=""
          />
        </div>
        <div>
          <h1 className={styles.profile_name}>
            <b>{user?.name}</b>
          </h1>
          <p className={styles.profile_des}>{user?.description}</p>
          {user?.gender === 1 ? (
            <div>Gender: Male</div>
          ) : (
            <div>Gender: Female</div>
          )}
        </div>
        {userId?.toLowerCase() === getUserId().toLowerCase() && (
          <div className={styles.profile_setting_cont}>
            <img
              onClick={() => setShowOptions(!showOptions)}
              src="/assets/images/profile_setting_icon.png"
              alt=""
            />
            {showOptions && (
              <ul className={styles.OptionsList}>
                <li onClick={() => openEditProfileModal()}>
                  <FontAwesomeIcon icon={faPenToSquare} /> &nbsp;Edit
                </li>
                <li
                  onClick={() =>
                    SetIsOpenUploadAvaterModal(!isOpenUploadAvaterModal)
                  }
                >
                  <FontAwesomeIcon icon={faCameraRotate} />
                  &nbsp;Change Avatar
                </li>
                {/* <li onClick={() => setShowDeleteModal(true)}>
                <FontAwesomeIcon icon={faTrashAlt} />
                &nbsp; Delete
              </li> */}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className={styles.PostList}>
        <div className={styles.tabs}>
          <div
            className={`tab ${activeTab === 'post' ? 'active' : ''}`}
            onClick={() => handleTabChange('post')}
          >
            Posts
          </div>
          <div
            className={`tab ${activeTab === 'cmt' ? 'active' : ''}`}
            onClick={() => handleTabChange('cmt')}
          >
            Comments
          </div>
        </div>
        <div className="tab-content">
          {activeTab === 'post' && (
            <UserPostTab
              hotPosts={data?.GetUserProfile?.posts}
              avatar={data?.GetUserProfile?.avatarUrl}
            />
          )}
          {activeTab === 'cmt' && (
            <RecentCommentTab
              hotPosts={data?.GetUserProfile?.comments}
              avatar={data?.GetUserProfile?.avatarUrl}
            />
          )}
        </div>
      </div>
      {/* {userId === getUserId() && <button>Edit Profile</button>} */}
      <Modal isOpen={isOpenUploadAvaterModal} size="md">
        <ModalHeader toggle={() => SetIsOpenUploadAvaterModal(false)}>
          Đổi mật khẩu
        </ModalHeader>
        <ModalBody>
          <ImageUploader onCrop={setImageAfterCrop} />
          <div className="cropImage">
            {croppedImage && <img src={croppedImage} alt="Cropped Image" />}
          </div>
        </ModalBody>
      </Modal>
      <EditProfilePopup
        showEditProfileModal={showEditProfileModal}
        onClose={closeEditProfileModal}
        currentUserData={{
          name: user?.name || '',
          email: user?.email || '',
          dob: user?.dob.substring(0, 10).toString() || '',
          gender: user?.gender || 0, //user?.gender ||
          des: user?.description || '',
        }}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};

export default UserPage;
