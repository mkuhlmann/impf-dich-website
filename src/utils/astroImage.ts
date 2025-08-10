const imageImports = import.meta.glob<{ default: ImageMetadata }>('/src/**/*.{jpeg,jpg,png,gif}');

export const resolveImage = (path: string) => {
	if (!imageImports[path]) throw new Error(`"${path}" does not exist in glob: "src/**/*.{jpeg,jpg,png,gif}"`);

	return imageImports[path];
};
