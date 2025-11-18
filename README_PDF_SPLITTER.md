# PDF Splitter Utility

A Python utility to split large PDF files into smaller chunks (max 3MB each by default).

## Installation

Install the required Python dependency:

```bash
pip install PyPDF2
```

## Usage

### Basic Usage (3MB chunks)
```bash
python pdf_splitter.py your_large_file.pdf
```

This will create a `pdf_parts/` directory with the split files:
- `your_large_file_part1.pdf`
- `your_large_file_part2.pdf`
- `your_large_file_part3.pdf`
- etc.

### Custom Max Size
```bash
python pdf_splitter.py your_large_file.pdf 2.5
```

This will split into 2.5MB chunks.

### Custom Output Directory
```bash
python pdf_splitter.py your_large_file.pdf 3 my_output_folder
```

## Examples

```bash
# Split reference_notes.pdf into 3MB chunks
python pdf_splitter.py reference_notes.pdf

# Split into 2MB chunks
python pdf_splitter.py reference_notes.pdf 2

# Split into 3MB chunks in 'notes_split' folder
python pdf_splitter.py reference_notes.pdf 3 notes_split
```

## Output

The script will show:
- Total pages in the PDF
- Original file size
- Progress as it creates each chunk
- Final summary of chunks created

Example output:
```
Input PDF: reference_notes.pdf
Total pages: 150
File size: 9.24 MB
Max chunk size: 3 MB
--------------------------------------------------
Created: pdf_parts/reference_notes_part1.pdf (45 pages, 2.98 MB)
Created: pdf_parts/reference_notes_part2.pdf (48 pages, 2.95 MB)
Created: pdf_parts/reference_notes_part3.pdf (47 pages, 2.89 MB)
Created: pdf_parts/reference_notes_part4.pdf (10 pages, 0.42 MB)
--------------------------------------------------
✓ Split complete! Created 4 chunks in 'pdf_parts/' directory
```

## Notes

- The script splits by pages while keeping each chunk under the size limit
- All chunks except the last one will be close to (but not exceed) the max size
- The last chunk may be smaller
- Original PDF is not modified
