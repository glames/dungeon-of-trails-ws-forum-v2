import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UploadMedia from '../../components/UploadMedia';
import { HotPostTab, NewestPostTab } from './SubTab';
import styles from './Threads.module.scss';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

const ThreadsPage = () => {
  const { something } = useParams(); // Lấy giá trị "something" từ URL path

  // Xử lý dữ liệu tại đây, ví dụ:
  const fetchData = () => {
    // Gửi request API hoặc thao tác với dữ liệu tương ứng với "something"
    console.log(`Fetching data for "${something}"`);
  };
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState(null);

  const handleMediaUpload = (mediaUrl: any) => {
    setUploadedMediaUrl(mediaUrl);
  };

  React.useEffect(() => {
    fetchData();
  }, [something]);

  const [activeTab, setActiveTab] = useState('hot'); // State để theo dõi tab hiện tại

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className={styles.ThreadTopContainer}>
        <h1>Threads: {something}</h1>
      </div>
      <div className={styles.PostList}>
        <div className={styles.tabs}>
          <div
            className={`tab ${activeTab === 'hot' ? 'active' : ''}`}
            onClick={() => handleTabChange('hot')}
          >
            Hot Post
          </div>
          <div
            className={`tab ${activeTab === 'newest' ? 'active' : ''}`}
            onClick={() => handleTabChange('newest')}
          >
            Newest Post
          </div>
        </div>
        <div className="tab-content">
          {activeTab === 'hot' && <HotPostTab threadName={something} />}

          {activeTab === 'newest' && <NewestPostTab threadName={something} />}
        </div>
      </div>

      {/* <UploadMedia onMediaUpload={handleMediaUpload} />
      {uploadedMediaUrl && (
        <p>
          URL của media đã lưu:{' '}
          <a href={uploadedMediaUrl}>{uploadedMediaUrl}</a>
        </p>
      )} */}
    </>
  );
};

export default ThreadsPage;
