export class Article {
  /** articleContent */
  articleContent = '';

  /** articleId */
  articleId = undefined;

  /** articleImgs */
  articleImgs = '';

  /** articleTtile */
  articleTtile = '';

  /** comment */
  comment = [];

  /** createTime */
  createTime = '';

  /** praiseNum */
  praiseNum = undefined;

  /** status */
  status = undefined;

  /** topStatus */
  topStatus = undefined;

  /** user */
  user = new User();
}

export class Comment {
  /** commentId */
  commentId = '';

  /** content */
  content = '';

  /** praiseNum */
  praiseNum = undefined;

  /** replyCommentId */
  replyCommentId = '';

  /** status */
  status = undefined;

  /** topStatus */
  topStatus = undefined;

  /** user */
  user = new User();
}

export class IdentifyHistory {
  /** createTime */
  createTime = '';

  /** id */
  id = undefined;

  /** img */
  img = '';

  /** result */
  result = '';

  /** user */
  user = new User();
}

export class Result {
  /** code */
  code = undefined;

  /** data */
  data = [];

  /** message */
  message = '';
}

export class User {
  /** userId */
  userId = '';

  /** userName */
  userName = '';
}
