export interface ChatLinkType {
  messageId: string;
  ts: string;
  urls: UrlInfo[];
}

export interface UrlInfo {
  url: string;
  meta: {
    pageTitle: string;
    ogImage: string;
    twitterCard: string;
    ogTitle: string;
    twitterSite: string;
  };
  headers: {
    contentType: string;
  };
  parsedUrl: {
    host: string;
    hash: null;
    pathname: string;
    protocol: string;
    port: null;
    query: null;
    search: null;
    hostname: string;
  };
}

export interface ChatUrlsQueryParam {
  authToken: string;
  userId: string;
  type?: string;
  roomId?: string;
}

export interface Attachment {
  audio_url?: string;
  author_icon?: string;
  author_link?: string;
  author_name?: string;
  collapsed?: boolean;
  color?: string;
  fields?: AttachmentFields[];
  image_url?: string;
  message_link?: string;
  text?: string;
  thumb_url?: string;
  title?: string;
  title_link?: string;
  title_link_download?: boolean;
  ts?: string;
  video_url?: string;
}

export interface AttachmentFields {
  short?: boolean;
  title?: string;
  value?: string;
}
