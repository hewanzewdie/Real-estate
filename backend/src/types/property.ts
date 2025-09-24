export interface Property {
  id: string;
  title: string;
  description: string;
  bedrooms: number;
  bathrooms:number;
  area: number;
  location: string;
  createdAt: Date;
  forSale: boolean;
  forRent: boolean;
  salePrice?: number;
  rentPrice?: number;
  leaseTerm?: string;
  status: 'available' | 'sold' | 'rented' | 'pending'; 
}