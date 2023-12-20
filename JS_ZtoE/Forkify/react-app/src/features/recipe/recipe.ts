export type RecipeData = {
  id: string;
  publisher: string;
  title: string;
  image_url?: string;
  imageUrl?: string;
};

export type RecipesType = {
  recipes: RecipeData[];
};

interface RecipeType {
  readonly id: string;
  readonly imageUrl: string;
  readonly publisher: string;
  readonly title: string;
}

export class Recipe implements RecipeType {
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
