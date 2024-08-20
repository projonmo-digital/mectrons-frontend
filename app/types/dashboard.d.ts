interface IDashboardItem {
  title: string;
  total_quantity: number;
  price: number;
}

export interface IAdminDashbordResponse {
  totalCustomer: number;
  totalSellers: number;
  totalProducts: number;
  totalCategories: number5;
  totalSells: number;
  totalSellsAmountThisMonth: number;
  totalSellsThisMonth: number;
  totalOrders: number;
  totalPlacedOrders: number;
  totalConfirmedOrders: number;
  totalRejectedOrders: number;
  totalProcessingOrders: number;
  totalProcessedOrders: number;
  topSoldAllTime: IDashboardItem;
  topSoldDaily: IDashboardItem;
  topSoldWeek: IDashboardItem;
  topSoldMonth: IDashboardItem;
}

export interface ISellerDashboardResponse {
  totalProducts: number;
  totalSells: number;
  totalSellsPrice: number;
  totalSellsAmountThisMonth: number;
  totalConfirmedOrders: number;
  totalRejectedOrders: number;
  totalProcessingOrders: number;
  totalProcessedOrders: number;
}

export interface IuserDashboardResponse {
  totalProductsInWhitelist: number
  totalOrders: number
}
