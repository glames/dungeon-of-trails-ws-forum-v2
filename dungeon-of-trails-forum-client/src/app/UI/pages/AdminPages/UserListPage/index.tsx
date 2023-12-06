import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCheckVotedPostQuery,
  useDeletePostMutation,
  useDeleteUserMutation,
  useGetGameScoreQuery,
  useGetPostDetailQuery,
  useGetUserListQuery,
  useVotePostMutation,
} from '~/app/api-interaction/GraphQL/schema';
import DataTable from 'react-data-table-component';
import '@fontsource/oswald'; // Defaults to weight 400
import '@fontsource/oswald/400.css'; // Specify weight
import styles from './userList.module.scss';

const UserListPage = () => {
  const [DeleteUser] = useDeleteUserMutation();
  const [showModal, setShowModal] = useState(false);
  const [showUploadPostModal, setShowUploadPostModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [forgetEmail, setForgetEmail] = useState('');

  const [successClass, setSuccessClass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handlerDeleteUser = async (id: string) => {
    const response = await DeleteUser({
      variables: {
        userId: id,
      },
    });
    if (response.data?.DeleteUser == null || response.data == null) {
      setShowSuccessModal(true);
      setSuccessClass('error_msg');
      setSuccessMessage('Delete user failed! Please try again');
      setTimeout(() => {
        setShowSuccessModal(false);
        setSuccessMessage('');
        setSuccessClass('');
      }, 2000);
    } else {
      setShowSuccessModal(true);
      refetch();
      setSuccessMessage('Delete user successful!');
      setSuccessClass('success_msg');
      setShowModal(false);
      setTimeout(() => {
        setShowSuccessModal(false);
        setSuccessMessage('');
        setSuccessClass('');
      }, 2000);
    }
  };
  const naviagate = useNavigate();
  const columns = [
    {
      name: 'Name',
      cell: (row: any) => (
        <div onClick={() => naviagate('/Users/' + row.id)}>{row.name}</div>
      ),
      width: '30%',
    },
    {
      name: 'Email',
      cell: (row: any) => row.email,
      width: '30%',
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
            handlerDeleteUser(row.id);
          }}
        >
          DELETE
        </button>
      ),
      width: '40%',
    },
  ];
  const dataCol = [
    {
      id: '1',
      name: 'ákdskdk',
      email: '1',
    },
    {
      id: '2',
      name: 'oi',
      email: '1',
    },
  ];

  const {
    data: datalist,
    loading,
    error,
    refetch,
  } = useGetUserListQuery({
    fetchPolicy: 'no-cache',
  });
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState(dataCol);

  function transformData(data: any) {
    return data.map((item: any, index: number) => {
      const transformedItem = {
        id: item.id,
        name: item.name || '',
        email: item.email || '',
      };
      return transformedItem;
    });
  }
  function handleFilter(e: any) {
    const newData = datalist?.GetUserList?.filter((row) => {
      return row?.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchData(transformData(newData));
  }

  useEffect(() => {
    if (datalist?.GetUserList) {
      setSearchData(transformData(datalist?.GetUserList));
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
            placeholder="    Search user with name"
          ></input>
        </div>
        <DataTable
          columns={columns}
          data={searchData}
          pagination={true}
        ></DataTable>
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

export default UserListPage;
