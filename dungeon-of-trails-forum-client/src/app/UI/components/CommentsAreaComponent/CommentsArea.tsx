import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Editor } from '@tinymce/tinymce-react';
import styles from './commentsArea.module.scss';
import { formatPostedAt } from '../../pages/ThreadsPage/SubTab';
import { useAddCommentMutation } from '~/app/api-interaction/GraphQL/schema';

const CommentsArea = (props: any) => {
  const { comments, refetchComments } = props;
  const { postId, page = '1' } = useParams<{ postId: string; page?: string }>();
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10));
  const [hiddenReplies, setHiddenReplies] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successClass, setSuccessClass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [replyEditorContent, setReplyEditorContent] = useState('');
  const [commentEditorContent, setCommentEditorContent] = useState('');

  const [addComment] = useAddCommentMutation();
  const [addReply] = useAddCommentMutation();

  const handleToggleReplies = (commentId: string) => {
    if (hiddenReplies.includes(commentId)) {
      setHiddenReplies(hiddenReplies.filter((id) => id !== commentId));
    } else {
      setHiddenReplies([...hiddenReplies, commentId]);
    }
  };

  const handleReply = (commentId: string) => {
    setHiddenReplies([...hiddenReplies, commentId]);
    setReplyEditorContent('');
  };

  const handleReplyEditorChange = (content: string) => {
    setReplyEditorContent(content);
  };

  const handleCommentEditorChange = (content: string) => {
    setCommentEditorContent(content);
    console.log(commentEditorContent);
  };

  const handleSubmitComment = () => {
    var tmp = commentEditorContent.replace(/&nbsp;/g, '');
    tmp = tmp.replace(/<p> <\/p>/g, '');
    tmp = tmp.replace(/<p>\s+<\/p>/g, '');

    console.log(tmp);
    if (tmp == null || tmp.trim() == '') {
      setShowSuccessModal(true);
      setSuccessClass('error_msg');
      setSuccessMessage('Comment failed! Please try again');
      setTimeout(() => {
        setShowSuccessModal(false);
        setSuccessMessage('');
        setSuccessClass('');
      }, 2000);
    } else {
      console.log(commentEditorContent);
      addComment({
        variables: { postId, body: commentEditorContent, parentId: null },
      })
        .then(() => {
          setCommentEditorContent('');
          setShowSuccessModal(true);
          setSuccessMessage('Comment successful!');
          setSuccessClass('success_msg');
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
          }, 2000);
          refetchComments(); // Gọi callback refetchComments
        })
        .catch((error) => {
          setShowSuccessModal(true);
          setSuccessClass('error_msg');
          setSuccessMessage('Comment failed! Please try again');
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage('');
            setSuccessClass('');
          }, 2000);
          console.error('Error submitting comment:', error);
        });
    }
  };

  const handleSubmitReply = (commentId: string) => {
    console.log(commentEditorContent);

    addReply({
      variables: { postId, body: replyEditorContent, parentId: commentId },
    })
      .then(() => {
        setHiddenReplies(hiddenReplies.filter((id) => id !== commentId));
        setReplyEditorContent('');
        setShowSuccessModal(true);
        setSuccessMessage('Reply successful!');
        setSuccessClass('success_msg');
        setTimeout(() => {
          setShowSuccessModal(false);
          setSuccessMessage('');
          setSuccessClass('');
        }, 2000);
        refetchComments(); // Gọi callback refetchComments
      })
      .catch((error) => {
        setShowSuccessModal(true);
        setSuccessMessage('Reply failed! Please try again');
        setSuccessClass('success_msg');
        setTimeout(() => {
          setShowSuccessModal(false);
          setSuccessMessage('');
          setSuccessClass('');
        }, 2000);
        console.error('Error submitting reply:', error);
      });
  };

  useEffect(() => {
    const commentIds = comments.map((comment: any) => comment.id);
    setHiddenReplies(commentIds);
  }, [comments]);

  const [isUnmounted, setIsUnmounted] = useState(false);
  useEffect(() => {
    return () => {
      setIsUnmounted(true);
    };
  }, []);

  const editorConfig = {
    height: 300,
  };
  return (
    <div>
      <h3>Leave Your Comments Here:</h3>
      {isUnmounted && (
        <Editor
          apiKey="jioaerqaehwh4wq0klpujtl4rxoxmeb4uid27hive9k014n2"
          value={commentEditorContent}
          onEditorChange={handleCommentEditorChange}
          init={{ editorConfig, menubar: false }}
        />
      )}

      <button className={styles.SubmitComment} onClick={handleSubmitComment}>
        Submit Comment
      </button>
      <h3 className={styles.commentListTitle}>Comments List</h3>
      <div className={styles.CommentContainer}>
        {comments.map((comment: any) => (
          <div className={styles.EachComment} key={comment.id}>
            <div className={styles.CommentInfoContainer}>
              <div className={styles.AuthorAvtContainer}>
                <img
                  src={
                    comment.commentUser.avatarUrl ||
                    '/assets/images/avtar/default-avatar.png'
                  }
                  style={{ borderRadius: '50%' }}
                  alt="avatar"
                />
              </div>
              <div className={styles.CommentInfo}>
                <div className={styles.PostAuthor}>
                  <div>{comment.commentUser.name} ·&nbsp;</div>
                </div>
                <div>
                  <i>{formatPostedAt(comment.commentTime)}</i>
                </div>
              </div>
            </div>
            <p
              className={styles.commentBody}
              dangerouslySetInnerHTML={{
                __html: comment.body || '',
              }}
            ></p>
            <button
              className={styles.ShowReplyButton}
              onClick={() => handleToggleReplies(comment.id)}
            >
              {hiddenReplies.includes(comment.id) ? 'Show' : 'Hide'}{' '}
              {comment.inverseParent.length} Replies
            </button>
            {!hiddenReplies.includes(comment.id) && (
              <div className={styles.ReplyContainer}>
                {comment.inverseParent.map((reply: any) => (
                  <div className={styles.EachReply} key={reply.id}>
                    <div className={styles.CommentInfoContainer}>
                      <div className={styles.AuthorAvtContainer}>
                        <img
                          src={
                            reply.commentUser.avatarUrl ||
                            '/assets/images/avtar/default-avatar.png'
                          }
                          style={{ borderRadius: '50%' }}
                          alt="avatar"
                        />
                      </div>
                      <div className={styles.CommentInfo}>
                        <div className={styles.PostAuthor}>
                          <div>{reply.commentUser.name} ·&nbsp;</div>
                        </div>
                        <div>
                          <i>{formatPostedAt(reply.commentTime)}</i>
                        </div>
                      </div>
                    </div>
                    <p
                      className={styles.commentBody}
                      dangerouslySetInnerHTML={{
                        __html: reply.body || '',
                      }}
                    ></p>
                  </div>
                ))}
                <div className={styles.replyEditor}>
                  <Editor
                    apiKey="jioaerqaehwh4wq0klpujtl4rxoxmeb4uid27hive9k014n2"
                    value={replyEditorContent}
                    onEditorChange={handleReplyEditorChange}
                    init={{
                      height: 200,
                      plugins: [],
                      toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
                    }}
                  />
                  <button
                    className={styles.submitReply}
                    onClick={() => handleSubmitReply(comment.id)}
                  >
                    Submit Reply
                  </button>
                </div>
              </div>
            )}
            <hr />
          </div>
        ))}
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

export default CommentsArea;
