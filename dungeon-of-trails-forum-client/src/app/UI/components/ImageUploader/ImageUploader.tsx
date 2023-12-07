import React, { useState, useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './Demo.css';
import axios from 'axios'; // Import thư viện Axios
import { getAccessToken } from '~/app/utils/local-storage';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const defaultSrc =
  'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg';

export const ImageUploader: React.FC<{
  onCrop: (croppedImage: string) => void;
}> = ({ onCrop }) => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState('#');
  const cropperRef = useRef<ReactCropperElement>(null);
  const locations = useLocation();
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const headers = {
    Authorization: `bearer ${getAccessToken()}`,
    'Content-Type': 'multipart/form-data', // Đảm bảo đặt Content-Type đúng cho việc gửi FormData
  };

  const getCropData = async () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      const croppedImage = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      const base64Response = await fetch(croppedImage);
      const blob = await base64Response.blob();

      // Sử dụng thư viện Axios để gửi request POST đến endpoint
      try {
        const formData = new FormData();
        formData.append('file', blob);

        // Thay thế URL bằng địa chỉ endpoint của bạn
        const response = await axios.post(
          'https://dungeon-of-trials-api.azurewebsites.net/ChangeAvatar',
          formData,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `bearer ${getAccessToken()}`,
              'Content-Type': 'multipart/form-data', // Đảm bảo đặt Content-Type đúng cho việc gửi FormData
            },
          }
        );

        if (response.data == null || response.status !== 200) {
        }

        window.location.reload();
      } catch (error: any) {
        console.error('Error changing avatar:', error.message);
      }
    } else {
      console.log('????');
    }
  };

  return (
    <div>
      <div style={{ width: '100%' }}>
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />
        <br />
        <Cropper
          style={{ height: 400, width: '100%' }}
          initialAspectRatio={1}
          aspectRatio={1}
          src={image}
          ref={cropperRef}
          viewMode={0}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={false}
          zoomable={false}
          checkOrientation={false}
        />
      </div>
      <div>
        <div className="box" style={{ width: '100%', float: 'right' }}>
          <button
            style={{
              backgroundColor: 'rgb(84, 154, 60)',
              color: 'white',
              width: '100%',
              fontWeight: 'bold',
              border: 'none',
              padding: '10px 30px',
              textAlign: 'center',
              margin: 'auto auto',
            }}
            onClick={getCropData}
          >
            Crop and Change Avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
