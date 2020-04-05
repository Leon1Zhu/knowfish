type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value;
};

declare namespace defs {
  export class Article {
    /** articleContent */
    articleContent?: string;

    /** articleId */
    articleId?: number;

    /** articleImgs */
    articleImgs?: string;

    /** articleTtile */
    articleTtile?: string;

    /** comment */
    comment?: Array<defs.Comment>;

    /** createTime */
    createTime?: string;

    /** praiseNum */
    praiseNum?: number;

    /** status */
    status?: number;

    /** topStatus */
    topStatus?: number;

    /** user */
    user?: defs.User;
  }

  export class Comment {
    /** commentId */
    commentId?: string;

    /** content */
    content?: string;

    /** praiseNum */
    praiseNum?: number;

    /** replyCommentId */
    replyCommentId?: string;

    /** status */
    status?: number;

    /** topStatus */
    topStatus?: number;

    /** user */
    user?: defs.User;
  }

  export class IdentifyHistory {
    /** createTime */
    createTime?: string;

    /** id */
    id?: number;

    /** img */
    img?: string;

    /** result */
    result?: string;

    /** user */
    user?: defs.User;
  }

  export class Result<T0 = any> {
    /** code */
    code?: number;

    /** data */
    data?: Array<defs.Article>;

    /** message */
    message?: string;
  }

  export class User {
    /** userId */
    userId?: string;

    /** userName */
    userName?: string;
  }
}

declare namespace API {
  /**
   * Andriod Controller
   */
  export namespace andriod {
    /**
     * getInfo
     * /api/getInfo.do
     */
    export namespace getInfo {
      export class Params {
        /** type */
        type: string;
      }

      export type Response = defs.Result;

      export const init: Response;

      export function request(params: Params, options?: any): Promise<Response>;
    }

    /**
     * Identify
     * /api/identify.do
     */
    export namespace Identify {
      export class Params {
        /** type */
        type: string;
      }

      export type Response = defs.Result;

      export const init: Response;

      export function request(
        params: Params,
        form: FormData,
        body: ObjectMap<any, object>,
        options?: any,
      ): Promise<Response>;
    }

    /**
     * IdentifyByBase64
     * /api/identifyByBase64.do
     */
    export namespace IdentifyByBase64 {
      export class Params {
        /** img */
        img: string;
        /** type */
        type: string;
      }

      export type Response = defs.Result;

      export const init: Response;

      export function request(
        params: Params,
        body: ObjectMap<any, object>,
        options?: any,
      ): Promise<Response>;
    }
  }

  /**
   * Identify History Controller
   */
  export namespace identifyHistory {
    /**
     * getIdentifyHistory
     * /api/getIdentifyHistory
     */
    export namespace getIdentifyHistory {
      export class Params {}

      export type Response = defs.Result<Array<defs.IdentifyHistory>>;

      export const init: Response;

      export function request(
        params: Params,
        body: defs.User,
        options?: any,
      ): Promise<Response>;
    }
  }

  /**
   * Weibo Controller
   */
  export namespace weibo {
    /**
     * getArticles
     * /api/getArticles
     */
    export namespace getArticles {
      export class Params {}

      export type Response = defs.Result<Array<defs.Article>>;

      export const init: Response;

      export function request(
        params: Params,
        body: number,
        options?: any,
      ): Promise<Response>;
    }
  }
}
