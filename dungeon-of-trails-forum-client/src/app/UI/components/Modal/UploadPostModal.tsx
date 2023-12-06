import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
// import {
//   UploadYourPostQuery,
//   UploadYourPostMutation,
// } from '~/app/api-interaction/GraphQL/schema';
// import { UPLOAD_YOUR_POST_MUTATION } from '~/app/api-interaction/GraphQL/mutations';
import styles from './UploadPostModal.module.scss';
import { useUploadPostMutation } from '~/app/api-interaction/GraphQL/schema';

type FormData = {
  content: string;
  postTitle: string;
};

const UploadPostModal = ({ showUploadModal }: { showUploadModal: boolean }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm<FormData>({
    mode: 'onSubmit',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successClass, setSuccessClass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState('');

  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    setShowModal(showUploadModal);
  }, [showUploadModal]);

  const [uploadPost] = useUploadPostMutation();

  const handleClose = () => {
    setShowModal(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedThreadId(event.target.value);
  };

  const onSubmit = async (data: FormData) => {
    console.log(data.content);
    console.log(data.postTitle);
    console.log(selectedThreadId);
    if (
      data.content == null ||
      data.postTitle == null ||
      selectedThreadId == null
    ) {
      setShowSuccessModal(true);
      setSuccessClass('error_msg');
      setSuccessMessage('Do not leave any field blank!');
      setTimeout(() => {
        setShowSuccessModal(false);
        setSuccessMessage('');
        setSuccessClass('');
      }, 2000);
      return;
    }
    try {
      const response = await uploadPost({
        variables: {
          threadId: selectedThreadId,
          content: data.content,
          postTitle: data.postTitle,
        },
      }).then((response) => {
        if (response.data?.UploadPost == 'Success') {
          setShowSuccessModal(true);
          setSuccessMessage('Upload post successful!');
          setSuccessClass('success_msg');
          setShowModal(false);
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
          }, 2000);
        } else {
          setShowSuccessModal(true);
          setSuccessClass('error_msg');
          setSuccessMessage('Upload post failed! Please try again');
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
          }, 2000);
        }
      });

      reset();
      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error('Failed to upload post', error);
    }
  };

  const textareaRef = useRef<any>(null);
  const { ref: titleRef } = register('postTitle');

  return (
    <div className={styles.UploadPostContainer}>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <h2 className="text-center">Upload Post</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formGroup}>
                <label>
                  <b>Select Thread</b>
                </label>
                <br />
                <select
                  onChange={handleChange} // Thêm onChange để cập nhật selectedThreadId
                  value={selectedThreadId} // Sử dụng giá trị selectedThreadId để đồng bộ hóa giá trị được chọn trong select
                  required
                >
                  <option value="">Select a thread</option>{' '}
                  {/* Thêm một option trống nếu muốn có lựa chọn mặc định */}
                  <option value="ddb885ef-b1fd-464f-9df7-e04481e0486a">
                    Discussion
                  </option>
                  <option value="db4d3314-8079-4000-bc99-b28b755f94bd">
                    News
                  </option>
                  <option value="9f6997f8-4b28-4989-84e9-3b14c5a7294a">
                    Tips
                  </option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="postTitle">
                  <b>Title</b>
                </label>
                <br />
                <input
                  type="text"
                  id="postTitle"
                  required
                  {...register('postTitle')}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="content">
                  <b>Body</b>
                </label>
                <br />
                <Editor
                  id="content"
                  apiKey="jioaerqaehwh4wq0klpujtl4rxoxmeb4uid27hive9k014n2"
                  onEditorChange={(content: any) =>
                    setValue('content', content)
                  }
                  initialValue=""
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
                  }}
                />
              </div>
              <br />
              <button className={styles.submitButton} type="submit">
                Upload
              </button>
            </form>
          </div>
          <hr />
        </div>
      </div>
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
  );
};

export default UploadPostModal;
