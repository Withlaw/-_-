// recipe data preview
export type RecipeDataPreview = {
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

  constructor(data: RecipeDataPreview) {
    const { id, publisher, title } = data;
    this.id = id;
    this.publisher = publisher;
    this.title = title;
    this.imageUrl = data.image_url || data.imageUrl || "";
  }
}

// recipe data
export type IngredientType = {
  quantity?: number;
  unit: string;
  description: string;
};

export interface RecipeData {
  readonly id?: string;
  readonly publisher: string;
  readonly title: string;
  readonly servings: number;
  readonly source_url?: string;
  readonly sourceUrl?: string;
  readonly image_url?: string;
  readonly imageUrl?: string;
  readonly cooking_time?: number;
  readonly cookingTime?: number;
}

export interface RecipeDetailData extends RecipeData {
  readonly ingredients: IngredientType[];
}

export type RecipeDetailDataRes = {
  recipe: RecipeDetailData;
};

// export interface RecipeDetailI {
//   readonly id?: string;
//   readonly publisher: string;
//   readonly title: string;
//   readonly servings: number;
//   readonly ingredients: IngredientType[];
//   readonly sourceUrl: string;
//   readonly imageUrl: string;
//   readonly cookingTime: number;
// }

export class RecipeDetail implements RecipeDetailData {
  id?: string;
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

// new recipe format
export type inputDataType = {
  [name: string]: string;
};

export class RecipeFormData implements RecipeDetailData {
  publisher: string;
  title: string;
  servings: number;
  ingredients: IngredientType[];
  source_url: string;
  image_url: string;
  cooking_time: number;
  constructor(data: RecipeDetailData) {
    this.publisher = data.publisher;
    this.title = data.title;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    // this.source_url = data.sourceUrl;
    // this.image_url = data.imageUrl;
    // this.cooking_time = data.cookingTime;
    this.source_url = data.sourceUrl || data.source_url || "";
    this.image_url = data.imageUrl || data.image_url || "";
    this.cooking_time = data.cookingTime || data.cooking_time || 0;
  }

  static extractIngredients(data: inputDataType): IngredientType[] {
    return Object.entries(data)
      .filter(el => el[0].startsWith("ingredient") && el[1] !== "")
      .map(el => {
        const ingredientsOnly = el[1].split(",").map(el => el.trim());

        if (ingredientsOnly.length !== 3)
          throw new Error("Wrong ingredient format!");

        const [quantity, unit, description] = ingredientsOnly;

        return {
          quantity: quantity ? +quantity : undefined,
          unit,
          description,
        };
      });
  }
  static extractRecipeData(data: inputDataType): RecipeData {
    // const recipeDataOnlyArr = Object.entries(data).filter(
    //   el => !el[0].startsWith("ingredient")
    // );

    // return Object.fromEntries(recipeDataOnlyArr);

    return {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.image,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
    };
  }
}

// upload res data
/*
export interface Data {
  recipe: Recipe
}

export interface Recipe {
  createdAt: string
  publisher: string
  title: string
  servings: number
  ingredients: Ingredient[]
  source_url: string
  image_url: string
  cooking_time: number
  key: string
  id: string
}

export interface Ingredient {
  quantity: number
  unit: string
  description: string
}

*/
