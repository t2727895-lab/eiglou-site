import blogsData from './blogs.json';

export interface BlogComment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  text: string;
}

export interface Blog {
  id: number;
  slug: string;
  image: string;
  tags: string[];
  author: string;
  authorAvatar: string;
  date: string;
  dateDay: number;
  dateMonth: string;
  comments: number;
  readTime: string;
  title: string;
  excerpt: string;
  text1: string;
  text2: string;
  text3: string;
  quote: string;
  quoteAuthor: string;
  quoteTitle: string;
  subheading: string;
  detailImages: string[];
  blogTags: string[];
  blogComments: BlogComment[];
}

const blogs: Blog[] = blogsData as Blog[];

export default blogs;
