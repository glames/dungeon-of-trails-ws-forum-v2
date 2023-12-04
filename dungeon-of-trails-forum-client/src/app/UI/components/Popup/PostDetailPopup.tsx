import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentsArea from '../../components/CommentsAreaComponent/CommentsArea';
import {
  useCheckVotedPostQuery,
  useDeletePostMutation,
  useDeleteUserPostMutation,
  useGetUserPostDetailQuery,
  useVotePostMutation,
} from '~/app/api-interaction/GraphQL/schema';
import styles from './PostsDetail.module.scss';
import { formatPostedAt } from '../../pages/ThreadsPage/SubTab';
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
interface PostDetailProps {
  postId: string;
  postData: any;
  showPostDetailModal: boolean;
  onClose: () => void;
  onDeletePost: () => void;
}
const PostDetailPopup: React.FC<PostDetailProps> = ({
  postId,
  postData,
  showPostDetailModal,
  onClose,
  onDeletePost,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

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

  // const {
  //   loading,
  //   error,
  //   data: postData,
  //   refetch: refetchPostData,
  // } = useGetUserPostDetailQuery({
  //   variables: {
  //     postId: postId,
  //   },
  //   fetchPolicy: 'network-only', // Thêm fetchPolicy: 'network-only'
  // });

  const [DeletePost] = useDeleteUserPostMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDeletePost = async () => {
    try {
      const response = await DeletePost({
        variables: {
          postId: postId,
        },
      }).then((response) => {
        if (response.data?.DeleteUserPost == 'Success') {
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
      {showPostDetailModal && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_container}>
            <div className={styles.PostPageContainer}>
              <div className={styles.PostContainer}>
                <div className={styles.PostInfoContainer}>
                  <div className={styles.AuthorAvtContainer}>
                    <img
                      src={
                        postData?.postedUser?.avatarUrl ||
                        '/assets/images/avtar/default-avatar.png'
                      }
                      style={{ borderRadius: '50%' }}
                      alt="avatar"
                    />
                  </div>
                  <div className={styles.PostInfo}>
                    <div className={styles.PostThread}>
                      <a
                        href={`/Threads/${postData?.GetUserPostDetail?.thread.name}`}
                      >
                        Threads/{postData?.thread.name}
                      </a>
                    </div>
                    <div className={styles.PostAuthor}>
                      by:{' '}
                      <a href={`Users/${postData?.postedUser?.id}`}>
                        {postData?.postedUser?.name}
                      </a>
                    </div>
                    <div>
                      <i>
                        {formatPostedAt(postData?.GetUserPostDetail?.postedAt)}
                      </i>
                    </div>
                  </div>

                  <div className={styles.OptionsDropListContainer}>
                    {postData?.GetUserPostDetail?.postedUser?.id === userId && (
                      <button
                        className={styles.OptionsButton}
                        onClick={() => setShowOptions(!showOptions)}
                      >
                        <FontAwesomeIcon icon={faEllipsisH} />
                      </button>
                    )}
                    {showOptions && (
                      <ul className={styles.OptionsList}>
                        <li onClick={() => setShowDeleteModal(true)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                          &nbsp; Delete
                        </li>
                      </ul>
                    )}
                  </div>
                  <h1 className={styles.PostTitle}>{postData?.title}</h1>
                </div>

                <div
                  className={styles.PostContent}
                  dangerouslySetInnerHTML={{
                    __html: postData?.body || '',
                  }}
                />
              </div>
            </div>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'black',
              }}
              onClick={onClose}
            >
              X
            </button>
            <button
              style={{
                backgroundColor: 'red',
                padding: '5px 10px',
                border: 'none',
                position: 'absolute',
                top: '60px',
                right: '20px',
                color: 'white',
                borderRadius: '5px',
              }}
              onClick={onDeletePost}
            >
              Delete
            </button>
            {postData?.comments.length > 0 && (
              <CommentsArea
                comments={postData?.comments}
                refetchComments={() => console.log(1)} // Truyền callback refetchComments
              />
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
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetailPopup;
