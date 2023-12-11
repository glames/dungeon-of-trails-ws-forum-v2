import React, { useState } from 'react';
import styles from './Substab.module.scss';
import {
  useGetThreadHotPostsQuery,
  useGetThreadPostsQuery,
} from '~/app/api-interaction/GraphQL/schema';
import { some } from 'lodash';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

// import {
//   faSpinner,
//   faCircleNotch,
//   faCommentDots,
// } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots, faHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import NoData from '~/app/UI/components/Elements/EditPostModal';
import { toast } from 'react-toastify';

interface PostTabProps {
  threadName: string | undefined;
}

const formatPostedAt = (postedAt: string) => {
  const now = moment();
  const postTime = moment(postedAt);
  const duration = moment.duration(now.diff(postTime));

  if (duration.asMinutes() < 60) {
    const minutes = Math.floor(duration.asMinutes());
    return `${minutes}m ago`;
  } else if (duration.asHours() < 24) {
    const hours = Math.floor(duration.asHours());
    return `${hours}h ago`;
  } else if (duration.asDays() < 8) {
    const days = Math.floor(duration.asDays());
    return `${days}d ago`;
  } else {
    return moment(postedAt).format('DD/MM/YYYY HH:mm:ss');
  }
};

const HotPostTab: React.FC<PostTabProps> = ({ threadName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const { data: hotPosts, refetch } = useGetThreadHotPostsQuery({
    variables: {
      thread: threadName,
    },
    fetchPolicy: 'no-cache',
  });
  const nav = useNavigate();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = hotPosts?.GetThreadHotPosts?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  // Xử lý sự kiện chuyển trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Tạo danh sách các tùy chọn cho dropdown
  const pageOptions = Array.from(
    {
      length:
        Math.ceil((hotPosts?.GetThreadHotPosts?.length ?? 0) / postsPerPage) ||
        0,
    },
    (_, index) => index + 1
  );

  return (
    <div>
      <ul className={styles.list}>
        {currentPosts && currentPosts.length > 0 ? (
          currentPosts?.map((post: any, index) => (
            <li key={index}>
              <div>
                <img
                  src={
                    post.postedUser.avatarUrl ||
                    '/assets/images/avta2r/default-avatar.png'
                  }
                  alt="avatar"
                  style={{ borderRadius: '50%' }}
                />
              </div>
              <div>
                <div
                  className={styles.title}
                  onClick={() => nav(`/Posts/${post.id}`)}
                >
                  {post.title}
                </div>
                <div className={styles.postInfo}>
                  <div className={styles.author}>
                    Author: {post.postedUser.name}
                  </div>
                  <br />
                  <div className={styles.postedDate}>
                    {formatPostedAt(post.postedAt)}
                  </div>
                </div>
                <div className={styles.infoCount}>
                  <div className={styles.commentCount}>
                    {parseInt(post.totalComment) + parseInt(post.totalReply)}{' '}
                    <FontAwesomeIcon icon={faCommentDots} />{' '}
                  </div>

                  <div className={styles.totalVotes}>
                    {post.totalPostVote} <FontAwesomeIcon icon={faHeart} />{' '}
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <NoData />
        )}
      </ul>

      {/* Hiển thị phân trang */}
      <div>
        {(hotPosts?.GetThreadHotPosts?.length ?? 0) > postsPerPage && (
          <select
            value={currentPage}
            onChange={(e) => paginate(Number(e.target.value))}
          >
            {pageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className={styles.reloadButton} onClick={() => refetch()}>
        <FontAwesomeIcon icon={faRotateRight} />
      </div>
    </div>
  );
};

const NewestPostTab: React.FC<PostTabProps> = ({ threadName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const { data: newestPosts, refetch } = useGetThreadPostsQuery({
    variables: { thread: threadName },

    fetchPolicy: 'no-cache',
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = newestPosts?.GetThreadPosts?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const nav = useNavigate();

  // Xử lý sự kiện chuyển trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Tạo danh sách các tùy chọn cho dropdown
  const pageOptions = Array.from(
    {
      length:
        Math.ceil((newestPosts?.GetThreadPosts?.length ?? 0) / postsPerPage) ||
        0,
    },
    (_, index) => index + 1
  );

  return (
    <div>
      <ul className={styles.list}>
        {currentPosts && currentPosts.length > 0 ? (
          currentPosts?.map((post: any, index) => (
            <li key={index}>
              <div>
                <img
                  src={
                    post.postedUser.avatarUrl ||
                    '/assets/images/avta2r/default-avatar.png'
                  }
                  alt="avatar"
                  style={{ borderRadius: '50%' }}
                />
              </div>
              <div>
                <div
                  className={styles.title}
                  onClick={() => nav(`/Posts/${post.id}`)}
                >
                  {post?.title}
                </div>
                <div className={styles.postInfo}>
                  <div className={styles.author}>
                    Author: {post.postedUser.name}
                  </div>
                  <br />
                  <div className={styles.postedDate}>
                    {formatPostedAt(post.postedAt)}
                  </div>
                </div>
                <div className={styles.infoCount}>
                  <div className={styles.commentCount}>
                    {parseInt(post.totalComment) + parseInt(post.totalReply)}{' '}
                    <FontAwesomeIcon icon={faCommentDots} />{' '}
                  </div>
                  <div className={styles.totalVotes}>
                    {post.totalPostVote} <FontAwesomeIcon icon={faHeart} />{' '}
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <NoData />
        )}
      </ul>

      <div className={styles.reloadButton} onClick={() => refetch()}>
        <FontAwesomeIcon icon={faRotateRight} />
      </div>
    </div>
  );
};

export { HotPostTab, NewestPostTab, formatPostedAt };
