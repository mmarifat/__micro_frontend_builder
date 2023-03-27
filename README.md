This is micro-frontend driven Email Builder Application

## Used libraries

```bash
1. @module-federation/nextjs-mf
2. antd
3. react-email-editor
4. sass
5. tailwindcss
6. typescript
```

## Getting Started

To run locally:

```bash
yarn dev
# or
npm run dev
```

## How to use?

=> With NextJs

```bash
1. Install dependencies
yarn add @module-federation/nextjs-mf webpack@5.75.0
#or
npm i @module-federation/nextjs-mf webpack@5.75.0

2. Add to next.config.js
module.exports = {
  webpack(config, options) {
	const { isServer } = options;
	Object.assign(config.experiments, { topLevelAwait: true });
	config.plugins.push(
		new NextFederationPlugin({
		  name: 'microFrontend',
		  filename: 'static/chunks/remoteEntry.js',
		  remotes: {
			microContentBuilder: `microContentBuilder@http://localhost:7100/_next/static/${ isServer ?
				'ssr' :
				'chunks' }/remoteEntry.js`,
		  },
		  shared: {},
		}),
	);
	return config;
  },
};

3. Import to the component
const EbBuilderComponent = dynamic(() => import('microContentBuilder/EbBuilderComponent'), {ssr: false})
```
