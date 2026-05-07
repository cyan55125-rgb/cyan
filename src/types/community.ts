export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  createdAt: string;
}

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    level: string;
  };
  title: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  createdAt: string;
  commentList?: Comment[];
}
