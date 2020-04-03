{
    "extends": [
      "react-app",
      "airbnb",
      "plugin:jsx-a11y/recommended",
      "prettier",
      "prettier/react"
    ],
    "plugins": [
      "jsx-a11y",
      "prettier"
    ],
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
      "prettier/prettier": [
        "error", {
          "semi": false
        }
      ]
    }
  }