function enhancePastedText(text: string, toMarkdownLink = false): string {
	const FILE_PATH_REGEX = /file:\/\/(\/([\w.]+ ?)+)+/g;

	return text.replace(FILE_PATH_REGEX, (match) => {
		const fileName = extractFileName(match);
		const enhancedText = match.replace(/\s/g, '%20');
		if (toMarkdownLink) {
			return isImage(fileName) ? `![${fileName}](${enhancedText})` : `[${fileName}](${enhancedText})`;
		}
		return enhancedText;
	});
}

function extractFileName(filePath: string): string {
	return filePath.split('/').pop();
}

function isImage(fileName: string): boolean {
	const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'tiff', 'avif', 'pjp'];

	const extension = fileName.split('.').pop().toLowerCase();
	return IMAGE_EXTENSIONS.includes(extension);
}

export default enhancePastedText;
