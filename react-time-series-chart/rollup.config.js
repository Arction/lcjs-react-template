import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'

const packageJson = require('./package.json')

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	{
		input: 'src/index.tsx',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: packageJson.module,
				format: 'esm',
				sourcemap: true,
			},
		],
		plugins: [external(), resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' })],
	},
	{
		input: 'src/index.tsx',
		output: [{ file: 'dist/types/index.d.ts', format: 'esm' }], // Output to a dedicated "types" directory
		plugins: [dts.default()],
		external: [/\.css$/],
	},
]
