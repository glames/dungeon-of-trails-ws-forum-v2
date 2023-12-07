import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import axios from 'axios'; // Import Axios library
import { getAccessToken } from '~/app/utils/local-storage';
import styles from './LandingPage.module.scss';

const AdminLandingPage = () => {
  const fileTypes = ['apk', 'zip'];
  const [file, setFile] = useState<any | null>(null);
  const handleChange = (file: any) => {
    setFile(file);
    console.log(file);
  };
  const navigate = useNavigate();

  const updateGameFile = async () => {
    try {
      if (file != null) {
        const formData = new FormData();
        const allowedFileTypes = ['apk', 'zip'];

        // Kiểm tra loại file

        const fileType = file.name.split('.').pop()?.toLowerCase() || '';
        if (!allowedFileTypes.includes(fileType)) {
          console.error(
            'Invalid file type. Only .apk and .zip files are allowed.'
          );
          // Xử lý khi loại file không hợp lệ
          return;
        }

        formData.append('file', file);

        // Đặt giá trị 'os' dựa trên loại file
        const os = fileType === 'apk' ? 'Android' : 'Windows';
        formData.append('os', os);

        // Replace 'your-api-endpoint' with the actual endpoint URL
        const response = await axios.post(
          `https://dungeon-of-trials-api.azurewebsites.net/UpdateGameFile/${os}`,
          formData,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'multipart/form-data',
              Authorization: 'bearer ' + getAccessToken(),
            },
          }
        );
        if (response.data != null) {
          console.log('Change avatar successfully!');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
        console.log(response.data);
      } else {
        console.error('No file selected.');
      }
    } catch (error) {
      // Handle errors
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <div className={styles.UpdateGameFileCont}>
        <FileUploader
          handleChange={handleChange}
          label="Drag and drop new file here"
          name="file"
          types={fileTypes}
        />
        <button onClick={updateGameFile}>Update Game File</button>
      </div>
    </>
  );
};

export default AdminLandingPage;
