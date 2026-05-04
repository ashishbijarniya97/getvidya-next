export interface Exam {
  id: string;
  name: string;
  slug: string;
  icon_url: string;
  description: string;
  tests_count: number;
  questions_count: number;
  is_active: boolean;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  status: "new" | "contacted" | "converted" | "closed";
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  exam: string;
  avatar_url: string;
  rating: number;
  review: string;
  is_active: boolean;
  created_at: string;
}

export interface SiteContent {
  id: string;
  key: string;
  value: string;
  type: "text" | "html" | "number" | "boolean" | "json";
  label: string;
  section: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  tags: string[];
  is_published: boolean;
  published_at: string;
  created_at: string;
}
