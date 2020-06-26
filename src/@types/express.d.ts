declare namespace Express {
  // allow to insert prop user.id in the lib Express
  export interface Request {
    user: {
      id: string;
    };
  }
}
