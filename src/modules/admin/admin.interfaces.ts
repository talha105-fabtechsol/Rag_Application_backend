export interface IAdminStats {
  totalUsers: number;
  totalDocuments: number;
  totalChats: number;
  totalMessages: number;
  totalImages: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  recentUsers: any[];
  recentDocuments: any[];
  recentChats: any[];
}

export interface IAdminUserFilter {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  sortBy?: string;
}

export interface IAdminDocumentFilter {
  page?: number;
  limit?: number;
  search?: string;
  fileType?: string;
  status?: string;
  userId?: string;
  sortBy?: string;
}

export interface IAdminChatFilter {
  page?: number;
  limit?: number;
  search?: string;
  chatType?: string;
  userId?: string;
  sortBy?: string;
}

export interface IAdminImageFilter {
  page?: number;
  limit?: number;
  search?: string;
  userId?: string;
  sortBy?: string;
}
