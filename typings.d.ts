// Defining type for prop Unit
export interface Unit {
  _id: string;
  _createAt: string;
  title: string;
  branch: {
    name: string;
    image: string;
  };
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
}
