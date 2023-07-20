export interface NotificationModel {
  targetUserId: string;
  causerUserId: string;
  postId: string;
  commentId: string;
  action: string;
  url: string;
  isSeen: boolean;
}
