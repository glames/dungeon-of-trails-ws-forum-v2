import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useGetUserProfileQuery } from '~/app/api-interaction/GraphQL/schema';
import { getUserId } from '~/app/utils/local-storage';
import styles from './userPage.module.scss';
import { UserPostTab } from '../UserPostPage/userpost';
import { RecentCommentTab } from '../UserPostPage/recentcomment';

const UserPage = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('post');
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Gọi query để lấy thông tin người dùng
  const { loading, error, data } = useGetUserProfileQuery({
    variables: { userId },
  });

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
          <img src="/assets/images/avtar/default-avatar.png" alt="" />
        </div>
        <div>
          <h1 className={styles.profile_name}>
            <b>{user?.name}</b>
          </h1>
          <p className={styles.profile_des}>Quote: {user?.description}</p>
          {user?.gender === 1 ? (
            <div>Gender: Male</div>
          ) : (
            <div>Gender: Female</div>
          )}
        </div>
      </div>
      <div className={styles.PostList}>
        <div className={styles.tabs}>
          <div
            className={`tab ${activeTab === 'post' ? 'active' : ''}`}
            onClick={() => handleTabChange('post')}
          >
            Recent Posts
          </div>
          <div
            className={`tab ${activeTab === 'cmt' ? 'active' : ''}`}
            onClick={() => handleTabChange('cmt')}
          >
            Recent Comments
          </div>
        </div>
        <div className="tab-content">
          {activeTab === 'post' && (
            <UserPostTab hotPosts={data?.GetUserProfile?.posts} />
          )}
          {activeTab === 'cmt' && (
            <RecentCommentTab hotPosts={data?.GetUserProfile?.comments} />
          )}
        </div>
      </div>
      {/* {userId === getUserId() && <button>Edit Profile</button>} */}
    </div>
  );
};

export default UserPage;
