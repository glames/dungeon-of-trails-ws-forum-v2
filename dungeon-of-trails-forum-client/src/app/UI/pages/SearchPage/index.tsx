import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentsArea from '../../components/CommentsAreaComponent/CommentsArea';
import {
  useCheckVotedPostQuery,
  useDeletePostMutation,
  useGetGameScoreQuery,
  useGetPostDetailQuery,
  useSearchPostQuery,
  useVotePostMutation,
} from '~/app/api-interaction/GraphQL/schema';
import '@fontsource/oswald'; // Defaults to weight 400
import '@fontsource/oswald/400.css'; // Specify weight
import styles from './SearchPage.module.scss';
import { formatPostedAt } from '../ThreadsPage/SubTab';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/app/redux-tk/slices/auth.slice';
import { getUserEmail, getUserId } from '~/app/utils/local-storage';
import EditPostModal from '../../components/Modal/EditPostModal';
import {
  faCommentDots,
  faEllipsisH,
  faHeart,
  faPenToSquare,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoData from '../../components/Elements/EditPostModal';
import Loader from '../../components/Loader';

const SearchPage = () => {
  const { searchData } = useParams();
  const postsPerPage = 3;

  const nav = useNavigate();
  const { data, loading, error } = useSearchPostQuery({
    variables: {
      seachData: searchData,
    },
  });
  const pageOptions = Array.from(
    {
      length: Math.ceil((data?.SearchPost?.length ?? 0) / postsPerPage) || 0,
    },
    (_, index) => index + 1
  );
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = data?.SearchPost?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.searchCont}>
        <div className={styles.showOf}>
          {data?.SearchPost?.length} search results for '{searchData}'
        </div>
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
                      Author: {post.postedUser.name} -
                    </div>
                    <div className={styles.postedDate}>
                      {formatPostedAt(post.postedAt)}
                    </div>
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
        <div className={styles.paginateCont}>
          {(data?.SearchPost?.length ?? 0) > postsPerPage && (
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
    </>
  );
};

export default SearchPage;
