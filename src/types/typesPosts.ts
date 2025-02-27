export interface TypesPosts {
  _id: string;
  title: string;
  text: string;
  category: string;
  type: string;
  createdAt: string;
}

export interface BlogPost {
  id: number;
  metatitle: string;
  metadescription: string;
  textTitle: string;
  textPage: string;
}

export interface TypesBlog {
  id: number;
  metatitle: string;
  metadescription: string;
  textTitle: string;
  textPage: string;
  type: string;
  category: string;
  url: string;
}
