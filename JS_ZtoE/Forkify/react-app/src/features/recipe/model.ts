export type RecipeData = {
  id: string;
  publisher: string;
  title: string;
  image_url?: string;
  imageUrl?: string;
};

export interface RecipeI {
  readonly id: string;
  readonly imageUrl: string;
  readonly publisher: string;
  readonly title: string;
}

export class Recipe implements RecipeI {
  id: string;
  imageUrl: string;
  publisher: string;
  title: string;

  constructor(data: RecipeData) {
    const { id, publisher, title } = data;
    this.id = id;
    this.publisher = publisher;
    this.title = title;
    this.imageUrl = data.image_url || data.imageUrl || "";
  }
}

//
export type IngredientType = {
  quantity?: number;
  unit: string;
  description: string;
};

export type RecipeDetailData = {
  id: string;
  publisher: string;
  title: string;
  servings: number;
  ingredients: IngredientType[];
  source_url?: string;
  sourceUrl?: string;
  image_url?: string;
  imageUrl?: string;
  cooking_time?: number;
  cookingTime?: number;
};
export type RecipeDetailDataRes = {
  recipe: RecipeDetailData;
};

export interface RecipeDetailI {
  readonly id: string;
  readonly publisher: string;
  readonly title: string;
  readonly servings: number;
  readonly ingredients: IngredientType[];
  readonly sourceUrl: string;
  readonly imageUrl: string;
  readonly cookingTime: number;
}

export class RecipeDetail implements RecipeDetailI {
  id: string;
  publisher: string;
  title: string;
  servings: number;
  ingredients: IngredientType[];
  sourceUrl: string;
  imageUrl: string;
  cookingTime: number;
  constructor(data: RecipeDetailData) {
    this.id = data.id;
    this.publisher = data.publisher;
    this.title = data.title;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    this.sourceUrl = data.sourceUrl || data.source_url || "";
    this.imageUrl = data.imageUrl || data.image_url || "";
    this.cookingTime = data.cookingTime || data.cooking_time || 0;
  }
}
