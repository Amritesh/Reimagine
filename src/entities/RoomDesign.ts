export interface RoomDesign {
  id: string;
  originalImage: string;
  styledImage: string;
  style: string;
  createdAt: number;
  isFavorite: boolean;
}

export type InteriorStyle = 
  | 'modern' 
  | 'scandinavian' 
  | 'industrial' 
  | 'bohemian' 
  | 'minimalist' 
  | 'mid-century' 
  | 'coastal' 
  | 'rustic';

export interface StyleOption {
  id: InteriorStyle;
  label: string;
  image: string;
  prompt: string;
}
