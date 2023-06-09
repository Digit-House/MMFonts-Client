/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, options) => {
		config.resolve.fallback = { fs: false };

		config.module.rules.push({
			test: /\.csv$/,
			use: [
				{
					loader: "csv-loader",
					options: {
						dynamicTyping: true,
						header: true,
						skipEmptyLines: true,
					},
				},
			],
		});

		return config;
	},
};

module.exports = nextConfig;
