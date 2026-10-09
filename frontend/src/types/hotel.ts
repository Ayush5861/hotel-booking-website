export interface CreateHotelData {
  name: string;
  city: string;
  area: string;
  address: string;
  description: string;
  amenities: string[];
}

export interface UpdateHotelData {
  name?: string;
  city?: string;
  area?: string;
  address?: string;
  description?: string;
  amenities?: string[];
}

export interface Hotel extends CreateHotelData {
  _id: string;
  ownerId: string;
}