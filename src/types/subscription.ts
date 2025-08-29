export interface Subscriptions {
  id: number;
  originalPrice: number;
  displayPrice: string;
  rate: string;
  tenure: number;
  discount: number;
  discountedPrice: number;
  popular: boolean;
  firstTimeDiscount: number;
  secondTimeDiscount: number;
  firstTimeDiscountedPricePerDay: number;
  secondTimeDiscountedPricePerDay: number;
  totalPrice: number;
  totalPriceWithFirstTimeDiscount: number;
  totalPriceWithSecondTimeDiscount: number;
}
