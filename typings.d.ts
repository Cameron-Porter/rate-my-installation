// Defining type for prop Unit
export interface Unit {
  _id: string;
  _createdAt: string;
  title: string;
  branch: {
    name: string;
    logo: string;
    slug: {
      current: string;
    };
  };
  comments: Comment[];
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
  logo: {
    asset: {
      url: string;
    };
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  description: string;
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  unit: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _type: string;
  _updatedAt: string;
}
