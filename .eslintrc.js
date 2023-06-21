module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'react', 'import'],
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'import/order': 'warn',
		'linebreak-style': ['error', 'unix'],
		'import/no-named-as-default-member': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'lines-between-class-members': ['error', 'always'],
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': { typescript: {}, node: {} },
	},
	overrides: [
		{
			files: ['*.md'],
			rules: {
				'@typescript-eslint/no-empty-function': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
			},
		},
	],
};
