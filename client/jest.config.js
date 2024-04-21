
module.exports = {
    verbose:true,
    moduleFileExtensions:["js", "jsx", "ts", "tsx"],
    moduleDirectories: ["node_modules", "src"],
    transform: {
       '^.+\\.(ts|tsx)?$':'ts-jest',
       "^.+\\.(js|jsx)$":"babel-jest",
    },
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
      },

    setupFilesAfterEnv: ['./src/setupTests.js'],
    // transformIgnorePatterns: [
    //     "node_modules/(?!my-library-dir)/"
    //   ],
    
  };
  