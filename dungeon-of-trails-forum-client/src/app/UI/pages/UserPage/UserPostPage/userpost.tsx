import React, { useState } from 'react';
import styles from './userpost.module.scss';
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
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

interface PostTabProps {
  hotPosts: any;
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

const UserPostTab: React.FC<PostTabProps> = ({ hotPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const nav = useNavigate();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = hotPosts?.slice(indexOfFirstPost, indexOfLastPost);
  // Xử lý sự kiện chuyển trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Tạo danh sách các tùy chọn cho dropdown
  const pageOptions = Array.from(
    {
      length: Math.ceil((hotPosts?.length ?? 0) / postsPerPage) || 0,
    },
    (_, index) => index + 1
  );

  return (
    <div>
      <ul className={styles.list}>
        {currentPosts?.map((post: any) => (
          <li key={post.id}>
            <div>
              <img src="/assets/images/avtar/default-avatar.png" alt="avatar" />
            </div>
            <div>
              <div
                className={styles.title}
                onClick={() => nav(`/Posts/${post.id}`)}
              >
                {post.title}
              </div>
              <div className={styles.postInfo}>
                <div className={styles.author}></div>
                <div className={styles.postedDate}>
                  {formatPostedAt(post.postedAt)}
                </div>
                <div className={styles.commentCount}>
                  {parseInt(post.totalComment) + parseInt(post.totalReply)}{' '}
                  <FontAwesomeIcon icon={faCommentDots} />{' '}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* Hiển thị phân trang */}
      <div>
        {(hotPosts?.length ?? 0) > postsPerPage && (
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
    </div>
  );
};

export { UserPostTab };
