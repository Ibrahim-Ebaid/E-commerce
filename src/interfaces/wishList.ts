export interface WishlistResponse {
	products: {
	  _id: string;
	  title: string;
	  price: number;
	  quantity?: number;
	  image?: string;
	}[];
	totalItems: number;
  }