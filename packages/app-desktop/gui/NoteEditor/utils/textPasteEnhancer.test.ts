import enhancePastedText from './textPasteEnhancer';

describe('enhancePastedText', () => {
	it('should replace spaces with "%20" in file paths', () => {
		const input = 'This is a file path: file:///Users/john/Documents/file with spaces.txt';
		const expectedOutput = 'This is a file path: file:///Users/john/Documents/file%20with%20spaces.txt';
		const output = enhancePastedText(input);
		expect(output).toEqual(expectedOutput);
	});

	it('should not modify non-file paths', () => {
		const input = 'This is not a file path: https://example.com/file.txt';
		const expectedOutput = 'This is not a file path: https://example.com/file.txt';
		const output = enhancePastedText(input);
		expect(output).toEqual(expectedOutput);
	});

	it('should modify multiple file URLs', () => {
		const input = 'This is a file path: file:///Users/john/Documents/file with spaces.txt\nThis is another file path: file:///Users/john/Documents/file with spaces.txt';
		const expectedOutput = 'This is a file path: file:///Users/john/Documents/file%20with%20spaces.txt\nThis is another file path: file:///Users/john/Documents/file%20with%20spaces.txt';
		const output = enhancePastedText(input);
		expect(output).toEqual(expectedOutput);
	});

	describe('toMarkdownLink is true', () => {
		it('should convert to markdown link', () => {
			const input = 'This is a file path: file:///Users/john/Documents/file with spaces.txt';
			const expectedOutput = 'This is a file path: [file with spaces.txt](file:///Users/john/Documents/file%20with%20spaces.txt)';
			const output = enhancePastedText(input, true);
			expect(output).toEqual(expectedOutput);
		});

		it('should convert images to markdown image links', () => {
			const input = 'This is a file path: file:///Users/john/Documents/file with spaces.png';
			const expectedOutput = 'This is a file path: ![file with spaces.png](file:///Users/john/Documents/file%20with%20spaces.png)';
			const output = enhancePastedText(input, true);
			expect(output).toEqual(expectedOutput);
		});
	});
});
