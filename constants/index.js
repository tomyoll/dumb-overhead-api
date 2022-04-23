module.exports = {
  MODELS: {
    QUESTION: 'Question',
    USER: 'User',
    ROLE: 'Role',
    ANSWER: 'Answer',
  },
  REFRESH_TOKEN_DURATION: 60 * 60 * 24 * 7, // one week
  TOKEN_DURATION: 60 * 60 * 24, // one day
  METHODS: {
    BODY_TYPED_ARRAY: ['POST', 'PUT', 'PATCH', 'DELETE'],
    QUERY_TYPED: 'GET',
  },
  VALIDATION: {
    PASSWORD: /[^\s]{6,}/,
    OBJECT_ID: /^[0-9a-fA-F]{24}$/,
  },

  ROLES: {
    ADMIN: 0,
    USER: 1,
  },
};
