// Defining type for prop Unit
export interface Unit {
  _id: string;
  _createdAt: string;
  title: string;
  branch: {
    name: string;
    image: string;
    slug: {
      current: string;
    };
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

export interface Branch {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
}
