const firebase: any = jest.createMockFromModule('firebase-admin');

firebase.auth = () => {
  return {
    verifyIdToken: async (id: string) => {
      return { uid: id };
    },
  };
};

firebase.firestore = () => {
  return {
    verifyIdToken: async (id: string) => {
      return { uid: id };
    },
  };
};

export default firebase;
