// Poll types
export interface Poll {
  id: string;
  admin_token: string;
  title: string;
  description?: string;
  duration: string;
  expected: number;
  open_access: number;
  date1: string;
  date2: string;
  date3: string;
  timer_end?: string;
  created_at: string;
}

export interface Vote {
  id: number;
  poll_id: string;
  voter_name: string;
  choice: 'date1' | 'date2' | 'date3' | 'none';
  alt_date?: string;
  voter_token: string;
  submitted_at: string;
}

export interface Invite {
  id: number;
  poll_id: string;
  email: string;
}

export interface VoteCounts {
  date1: number;
  date2: number;
  date3: number;
  none: number;
}

export interface VotePreview {
  initials: string;
  choice: string;
}

export interface PollWithCounts extends Poll {
  vote_count: number;
}

// Event types
export interface Event {
  title: string;
  description: string;
  url: string;
  image: string;
  start: string;
  end: string;
  source: string;
}

// API Response types
export interface ApiResponse<T> {
  ok?: boolean;
  error?: string;
  data?: T;
  [key: string]: any;
}
