const firebase: any = jest.createMockFromModule('firebase-admin');

firebase.auth = () => {
  return {
    verifyIdToken: async (id: string) => {
      return { uid: id };
    },
  };
};

const store = () => {
  return {
    collection: (collectionName: string) => {
      return {
        collectionName,
        doc: (docId: string) => {
          return {
            docId,
            get: () => {
              return {
                exists: true,
                ref: {
                  update: jest.fn((data: any) => {
                    return {
                      status: true,
                      data,
                    };
                  }),
                },
              };
            },
          };
        },
      };
    },
  };
};

const storeTWO = () => {
  return {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => ({
          update: jest.fn(() => 'trdu'),
        })),
      })),
    })),
  };
};

firebase.firestore = store;

export default firebase;
