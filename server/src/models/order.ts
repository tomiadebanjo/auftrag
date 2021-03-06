export interface Order {
  uid?: string;
  id?: string;
  title?: string;
  customer?: {
    email?: string;
    phone?: string;
    name?: string;
  };
  address?: {
    zip?: string;
    country?: string;
    street?: string;
    city?: string;
  };
  bookingDate?: number;
}
