const firebase: any = jest.createMockFromModule('firebase-admin');

firebase.auth = () => {
  return {
    verifyIdToken: jest.fn((id: string) => {
      return { uid: id };
    }),
  };
};

const collectionGet = jest.fn(() => {
  return {
    id: 'mock-order',
    exists: true,
    ref: {
      update: jest.fn((data: any) => {
        return {
          status: true,
          data,
        };
      }),
    },
    data: jest.fn(() => {
      return {
        status: true,
        id: 'mock-order',
        title: 'mock-title',
      };
    }),
  };
});

const store = () => {
  return {
    collection: (collectionName: string) => {
      return {
        collectionName,
        doc: (docId: string) => {
          return {
            docId,
            get: collectionGet,
          };
        },
        add: jest.fn((data: any) => {
          return {
            get: collectionGet,
          };
        }),
      };
    },
  };
};

firebase.firestore = store;

export default firebase;
