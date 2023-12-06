import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCheckVotedPostQuery,
  useDeletePostMutation,
  useDeleteUserMutation,
  useDeleteUserPostMutation,
  useGetGameScoreQuery,
  useGetPostDetailQuery,
  useGetUserListQuery,
  useGetUserPostDetailQuery,
  useGetUserPostListQuery,
  useVotePostMutation,
} from '~/app/api-interaction/GraphQL/schema';
import DataTable from 'react-data-table-component';
import '@fontsource/oswald'; // Defaults to weight 400
import '@fontsource/oswald/400.css'; // Specify weight
import styles from './UserPostList.module.scss';
import PostDetailPopup from '~/app/UI/components/Popup/PostDetailPopup';

const UserPostListPage = () => {
  const [DeleteUser] = useDeleteUserMutation();
  const [showModal, setShowModal] = useState(false);
  const [showUploadPostModal, setShowUploadPostModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [forgetEmail, setForgetEmail] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [successClass, setSuccessClass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [postToView, setPostToView] = useState('');

  const handleViewPostDetailPopup = (id: string) => {
    fetchPost();
    setShowDetailModal(true);
    setPostToView(id);
  };
  const closePostDetailPopup = () => {
    console.log('close');
    setShowDetailModal(false);
  };
  const naviagate = useNavigate();
  const columns = [
    {
      name: 'Post title',
      cell: (row: any) => (
        <div onClick={() => naviagate('/Posts/' + row.id)}>{row.title}</div>
      ),
      width: '50%',
    },
    {
      name: 'Thread',
      cell: (row: any) => row.thread.name,
      width: '10%',
    },
    {
      name: 'Posted user',
      cell: (row: any) => row.postedUser.name,
      width: '20%',
    },
    {
      name: 'Actions',
      cell: (row: any) => (
        <button
          style={{
            backgroundColor: '#DD1618',
            border: 'none',
            color: 'white',
            padding: '5px 10px',
            fontWeight: 'bold',
            borderRadius: '5px',
          }}
          id={row.id}
          onClick={(e: any) => {
            handleViewPostDetailPopup(row.id);
          }}
        >
          View Details
        </button>
      ),
      width: '20%',
    },
  ];
  const dataCol = [
    {
      id: '1',
      title: 'ákdskdk',
      thread: {
        name: '1',
      },
      postedUser: {
        name: '1',
      },
    },
    {
      id: '2',
      title: 'title',
      thread: {
        name: '1',
      },
      postedUser: {
        name: '1',
      },
    },
  ];

  const {
    data: datalist,
    loading,
    error,
    refetch,
  } = useGetUserPostListQuery({
    fetchPolicy: 'no-cache',
  });
  const { data: postData, refetch: fetchPost } = useGetUserPostDetailQuery({
    variables: { postId: postToView },
    skip: postToView == '',
    fetchPolicy: 'no-cache',
  });

  const navigate = useNavigate();

  const [DeletePost] = useDeleteUserPostMutation();

  const onDeletePost = async () => {
    const response = await DeletePost({
      variables: {
        postId: postToView,
      },
    });
    refetch();
    setShowDetailModal(false);
  };

  const [searchData, setSearchData] = useState(dataCol);

  function transformData(data: any) {
    return data.map((item: any, index: number) => {
      const transformedItem = {
        id: item.id,
        title: item.title || '',
        postedUser: {
          name: item.postedUser.name,
          id: item.postedUser.id,
          email: item.postedUser.email,
        },
        body: item.body,
        totalComment: item.totalComment,
        isDelete: item.isDelete,
        postedAt: item.postedAt,
        totalPostVote: item.totalPostVote,
        thread: {
          id: item.thread.id,
          name: item.thread.name,
        },
      };
      return transformedItem;
    });
  }
  function handleFilter(e: any) {
    const newData = datalist?.GetUserPostList?.filter((row) => {
      return row?.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchData(transformData(newData));
  }

  useEffect(() => {
    if (datalist?.GetUserPostList) {
      setSearchData(transformData(datalist?.GetUserPostList));
    }
  }, [datalist]);
  if (loading) {
    return <div>'loading...'</div>;
  }
  return (
    <>
      <div>
        <div>
          <input
            type="text"
            onChange={handleFilter}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '100%',
              borderRadius: '3px',
              marginBottom: '10px',
            }}
            placeholder="    Search post with title"
          ></input>
        </div>
        <DataTable
          columns={columns}
          data={searchData}
          pagination={true}
        ></DataTable>
        <PostDetailPopup
          showPostDetailModal={showDetailModal}
          postData={postData?.GetUserPostDetail}
          postId={postToView}
          onClose={() => closePostDetailPopup()}
          onDeletePost={() => onDeletePost()}
        />
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
    </>
  );
};

export default UserPostListPage;
