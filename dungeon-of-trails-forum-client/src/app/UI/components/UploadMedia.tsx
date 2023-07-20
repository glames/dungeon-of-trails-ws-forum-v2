import React, { useState, ChangeEvent } from 'react';

interface UploadMediaProps {
  onMediaUpload?: (mediaUrl: string) => void;
}

function UploadMedia({ onMediaUpload }: UploadMediaProps) {
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedMedia(file);
    }
  };

  const handleUpload = () => {
    if (selectedMedia) {
      const mediaName = selectedMedia.name;
      const mediaPath = `/assets/posts/${mediaName}`;

      const reader = new FileReader();
      reader.onload = () => {
        const mediaData = reader.result;
        saveMedia(mediaPath, mediaData as ArrayBuffer)
          .then(() => {
            setUploadedMediaUrl(mediaPath);
            if (onMediaUpload) {
              onMediaUpload(mediaPath);
            }
          })
          .catch((error) => {
            console.error('Lỗi khi lưu media:', error);
          });
      };
      reader.readAsArrayBuffer(selectedMedia);
    }
  };

  const saveMedia = (mediaPath: string, mediaData: ArrayBuffer) => {
    return new Promise<void>((resolve, reject) => {
      // Triển khai phần lưu media vào frontend server của bạn ở đây
      // Đây chỉ là một hàm giả định, bạn cần thay thế nó bằng phương thức lưu media thực tế

      // Simulate saving media
      setTimeout(() => {
        console.log('Media đã được lưu:', mediaPath);
        resolve();
      }, 2000);
    });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Tải lên</button>
      {uploadedMediaUrl && <p>URL của media đã lưu: {uploadedMediaUrl}</p>}
    </div>
  );
}

export default UploadMedia;
