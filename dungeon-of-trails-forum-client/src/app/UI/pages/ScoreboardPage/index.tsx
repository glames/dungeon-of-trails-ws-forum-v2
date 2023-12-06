import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentsArea from '../../components/CommentsAreaComponent/CommentsArea';
import {
  useCheckVotedPostQuery,
  useDeletePostMutation,
  useGetGameScoreQuery,
  useGetPostDetailQuery,
  useVotePostMutation,
} from '~/app/api-interaction/GraphQL/schema';
import '@fontsource/oswald'; // Defaults to weight 400
import '@fontsource/oswald/400.css'; // Specify weight
import styles from './Scoreboard.module.scss';
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

const ScoreboardPage = () => {
  const { data, loading, error } = useGetGameScoreQuery({
    fetchPolicy: 'no-cache',
  });
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.ScoreboardContainer}>
        <div className={styles.ScoreboardTitle}>
          <h3>Top Scoreboard</h3>
        </div>
        <div className={styles.ScoreboardBody}>
          <ul className={styles.List}>
            <li className={styles.ScoreboardHeader}>
              <div
                style={{ fontWeight: 'bold' }}
                className="u-text--left u-text--small u-text--medium"
              >
                Rank
              </div>
              <div
                className="u-text--left u-text--small u-text--medium"
                style={{ textAlign: 'center' }}
              ></div>
              <div
                className="u-text--left u-text--small u-text--medium"
                style={{ textAlign: 'center', fontWeight: 'bold' }}
              >
                Player Name
              </div>
              <div
                style={{ fontWeight: 'bold' }}
                className="u-text--right u-text--small u-text--medium"
              >
                Score
              </div>
            </li>
            {data?.GetGameScore &&
              data?.GetGameScore.map((score, index) => (
                <li
                  onClick={() => {
                    navigate('/Users/' + score?.userId);
                  }}
                >
                  <div className={styles.RankNo}>
                    <div>{index + 1}</div>
                  </div>
                  <div className={styles.AvatarContainer}>
                    <img
                      className="c-avatar c-media__img"
                      style={{ borderRadius: '50%' }}
                      src={
                        score?.user?.avatarUrl ||
                        '/assets/images/avtar/default-avatar.png'
                      }
                    />
                  </div>
                  <div className={styles.NameCont}>
                    <div className="c-media__title">{score?.user?.name}</div>
                  </div>
                  <div className={styles.ScoreCont}>
                    <strong>{score?.score}</strong>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ScoreboardPage;
