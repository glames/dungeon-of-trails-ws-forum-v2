import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentsArea from '../../components/CommentsAreaComponent/CommentsArea';
import {
  useDeletePostMutation,
  useGetPostDetailQuery,
} from '~/app/api-interaction/GraphQL/schema';
import styles from './Posts.module.scss';
import { formatPostedAt } from '../ThreadsPage/SubTab';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/app/redux-tk/slices/auth.slice';
import { getUserEmail, getUserId } from '~/app/utils/local-storage';
import EditPostModal from '../../components/Modal/EditPostModal';
import {
  faEllipsisH,
  faPenToSquare,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostPage = () => {
  const { postId, page } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  var pageNo = 1;
  if (page != null && page != '') {
    pageNo = parseInt(page);
  }
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const accessToken = currentUser.accessToken;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const refreshToken = currentUser.refreshToken;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successClass, setSuccessClass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const userEmail = getUserEmail();
  const userId = getUserId();
  const {
    loading,
    error,
    data: postData,
    refetch: refetchPostData,
  } = useGetPostDetailQuery({
    variables: {
      postId: postId,
      commentPageNo: pageNo,
    },
    fetchPolicy: 'network-only', // Thêm fetchPolicy: 'network-only'
  });

  const [DeletePost] = useDeletePostMutation();

  const totalComments = postData?.GetPostDetail?.totalComment || 0;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const handlePageChange = (newPageNo: any) => {
    navigate(`/Posts/${postId}/${newPageNo}`);
  };

  const renderPageOptions = () => {
    const totalPages = Math.ceil(totalComments / 10);
    const pageOptions = [];

    for (let i = 1; i <= totalPages; i++) {
      pageOptions.push(
        <option key={i} value={i} selected={i === pageNo}>
          {i}
        </option>
      );
    }

    return pageOptions;
  };
  const handleCloseModal = () => {
    setShowEditModal(false);
    refetchPostData();
  };

  const handleSelectChange = (event: any) => {
    const newPageNo = parseInt(event.target.value);
    handlePageChange(newPageNo);
  };

  const handleDeletePost = async () => {
    try {
      const response = await DeletePost({
        variables: {
          postId: postId,
        },
      }).then((response) => {
        if (response.data?.DeletePost == 'Success') {
          setShowSuccessModal(true);
          setSuccessMessage('Delete post successful!');
          setSuccessClass('success_msg');
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
            navigate('/');
          }, 1000);
        } else {
          setShowSuccessModal(true);
          setSuccessClass('error_msg');
          setSuccessMessage('Delete post failed! Please try again');
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
          }, 2000);
        }
      });
    } catch (error) {
      console.error('Failed to Delete post', error);
    }
  };

  return (
    <>
      <div className={styles.PostPageContainer}>
        <div className={styles.PostContainer}>
          <div className={styles.PostInfoContainer}>
            <div className={styles.AuthorAvtContainer}>
              <img src="/assets/images/avtar/default-avatar.png" alt="avatar" />
            </div>
            <div className={styles.PostInfo}>
              <div className={styles.PostThread}>
                <a href={`/Threads/${postData?.GetPostDetail?.thread.name}`}>
                  Threads/{postData?.GetPostDetail?.thread.name}
                </a>
              </div>
              <div className={styles.PostAuthor}>
                by:{' '}
                <a href={`Users/${postData?.GetPostDetail?.postedUser?.id}`}>
                  {postData?.GetPostDetail?.postedUser?.name}
                </a>
              </div>
              <div>
                <i>{formatPostedAt(postData?.GetPostDetail?.postedAt)}</i>
              </div>
            </div>

            <div className={styles.OptionsDropListContainer}>
              {postData?.GetPostDetail?.postedUser?.id === userId && (
                <button
                  className={styles.OptionsButton}
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              )}
              {showOptions && (
                <ul className={styles.OptionsList}>
                  <li
                    onClick={() => {
                      setShowEditModal(!showEditModal);
                      setIsModalVisible(!isModalVisible);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} /> &nbsp;Edit
                  </li>
                  <li onClick={() => setShowDeleteModal(true)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    &nbsp; Delete
                  </li>
                </ul>
              )}
            </div>
            <h1 className={styles.PostTitle}>
              {postData?.GetPostDetail?.title}
            </h1>
          </div>

          <div
            className={styles.PostContent}
            dangerouslySetInnerHTML={{
              __html: postData?.GetPostDetail?.body || '',
            }}
          />
        </div>
        <CommentsArea
          comments={postData?.GetPostDetail?.comments}
          refetchComments={refetchPostData} // Truyền callback refetchComments
        />
        <div className={styles.Pager}>
          <label htmlFor="pageSelect">Page&nbsp;</label>
          <select id="pageSelect" value={pageNo} onChange={handleSelectChange}>
            {renderPageOptions()}
          </select>
        </div>
      </div>
      {showEditModal && (
        <div
          className={`${styles.modal_overlay} ${
            isModalVisible ? 'visible' : ''
          }`}
        />
      )}
      {showEditModal && (
        <EditPostModal
          showUploadModal={showEditModal}
          postId={postId || ''}
          currentContent={postData?.GetPostDetail?.body || ''}
          currentTitle={postData?.GetPostDetail?.title || ''}
          closeBtnHandle={handleCloseModal}
        />
      )}
      {showDeleteModal && (
        <div className={styles.modal_overlay_delete}>
          <div className={styles.delete_modal}>
            <h2>Confirm Delete</h2>
            <h5>Are you sure you want to delete this post?</h5>
            <div className={styles.delete_modal_buttons}>
              <button
                className={styles.ConfirmDeleteBtn}
                onClick={handleDeletePost}
              >
                Delete
              </button>
              <button
                className={styles.CancelDeleteBtn}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
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
    </>
  );
};

export default PostPage;
