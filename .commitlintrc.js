module.exports = {
    rules: {
      'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test']],
      'type-case': [2, 'always', 'lowerCase'],
      'type-empty': [2, 'never'],
      'subject-empty': [2, 'never'],
      'subject-max-length': [2, 'always', 100],
      'body-max-line-length': [2, 'always', 72],
      'footer-max-line-length': [2, 'always', 72],
    },
  };
  