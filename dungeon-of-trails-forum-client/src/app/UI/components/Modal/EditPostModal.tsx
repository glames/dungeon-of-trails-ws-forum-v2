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
import styles from './EditPostModal.module.scss';
import {
  useEditPostMutation,
  useUploadPostMutation,
} from '~/app/api-interaction/GraphQL/schema';

type FormData = {
  content: string;
  postTitle: string;
};

type Props = {
  showUploadModal: boolean;
  postId: string;
  currentContent: string;
  currentTitle: string;
  closeBtnHandle: () => void;
};

const EditPostModal = ({
  showUploadModal,
  postId,
  currentContent,
  currentTitle,
  closeBtnHandle,
}: Props) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm<FormData>({
    mode: 'onSubmit',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successClass, setSuccessClass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(showUploadModal);
  }, [showUploadModal]);

  const [editPost] = useEditPostMutation();

  const handleClose = () => {
    setShowModal(false);
  };

  const onSubmit = async (data: FormData) => {
    console.log(data.content);
    console.log(data.postTitle);
    try {
      const response = await editPost({
        variables: {
          postId: postId,
          content: data.content,
          postTitle: data.postTitle,
        },
      }).then((response) => {
        if (response.data?.EditPost == 'Success') {
          setShowSuccessModal(true);
          setSuccessMessage('Edit post successful!');
          setSuccessClass('success_msg');
          setShowModal(false);
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
            closeBtnHandle();
          }, 2000);
        } else {
          setShowSuccessModal(true);
          setSuccessClass('error_msg');
          setSuccessMessage('Edit post failed! Please try again');
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
            closeBtnHandle();
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

  useEffect(() => {
    setValue('content', currentContent); // Đặt giá trị ban đầu cho trường content
    setValue('postTitle', currentTitle); // Đặt giá trị ban đầu cho trường postTitle
  }, [currentContent, currentTitle, setValue]);

  return (
    <div className={styles.UploadPostContainer}>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <h2 className="text-center">Edit Post</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <br />
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
              <br />
              <div className={styles.formGroup}>
                <label htmlFor="content">
                  <b>Body</b>
                </label>
                <br />
                <Editor
                  id="content"
                  apiKey="YOUR_API_KEY"
                  onEditorChange={(content: any) =>
                    setValue('content', content)
                  }
                  initialValue={currentContent || ''}
                  init={
                    {
                      // ...
                    }
                  }
                />
              </div>
              <br />
              <button className={styles.submitButton} type="submit">
                Edit
              </button>
              <button className={styles.closeButton} onClick={closeBtnHandle}>
                Close
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

export default EditPostModal;
