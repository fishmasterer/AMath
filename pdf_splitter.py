#!/usr/bin/env python3
"""
PDF Splitter Utility
Splits large PDF files into smaller chunks (max 3MB each)
"""

import os
import sys
from PyPDF2 import PdfReader, PdfWriter

def get_file_size_mb(filepath):
    """Get file size in MB"""
    return os.path.getsize(filepath) / (1024 * 1024)

def split_pdf_by_size(input_pdf, max_size_mb=3, output_dir="pdf_parts"):
    """
    Split a PDF into chunks not exceeding max_size_mb

    Args:
        input_pdf: Path to input PDF file
        max_size_mb: Maximum size of each chunk in MB (default: 3)
        output_dir: Directory to save the split PDFs (default: pdf_parts)
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Read the input PDF
    reader = PdfReader(input_pdf)
    total_pages = len(reader.pages)

    print(f"Input PDF: {input_pdf}")
    print(f"Total pages: {total_pages}")
    print(f"File size: {get_file_size_mb(input_pdf):.2f} MB")
    print(f"Max chunk size: {max_size_mb} MB")
    print("-" * 50)

    # Extract base filename
    base_name = os.path.splitext(os.path.basename(input_pdf))[0]

    chunk_num = 1
    current_writer = PdfWriter()
    pages_in_chunk = 0

    for page_num in range(total_pages):
        # Add page to current writer
        current_writer.add_page(reader.pages[page_num])
        pages_in_chunk += 1

        # Write to temporary file to check size
        temp_output = os.path.join(output_dir, f"{base_name}_part{chunk_num}_temp.pdf")
        with open(temp_output, 'wb') as temp_file:
            current_writer.write(temp_file)

        # Check if we've exceeded max size or reached last page
        current_size = get_file_size_mb(temp_output)
        is_last_page = (page_num == total_pages - 1)

        if current_size > max_size_mb or is_last_page:
            if current_size > max_size_mb and pages_in_chunk > 1:
                # Remove the last page and save current chunk
                current_writer = PdfWriter()
                for i in range(page_num - pages_in_chunk + 1, page_num):
                    current_writer.add_page(reader.pages[i])

                # Save the chunk (without the last page)
                final_output = os.path.join(output_dir, f"{base_name}_part{chunk_num}.pdf")
                with open(final_output, 'wb') as output_file:
                    current_writer.write(output_file)

                chunk_size = get_file_size_mb(final_output)
                print(f"Created: {final_output} ({pages_in_chunk - 1} pages, {chunk_size:.2f} MB)")

                # Start new chunk with the page we couldn't fit
                chunk_num += 1
                current_writer = PdfWriter()
                current_writer.add_page(reader.pages[page_num])
                pages_in_chunk = 1

                # If this is the last page, save it
                if is_last_page:
                    final_output = os.path.join(output_dir, f"{base_name}_part{chunk_num}.pdf")
                    with open(final_output, 'wb') as output_file:
                        current_writer.write(output_file)
                    chunk_size = get_file_size_mb(final_output)
                    print(f"Created: {final_output} ({pages_in_chunk} pages, {chunk_size:.2f} MB)")
            else:
                # Save current chunk as is
                final_output = os.path.join(output_dir, f"{base_name}_part{chunk_num}.pdf")
                os.rename(temp_output, final_output)
                chunk_size = get_file_size_mb(final_output)
                print(f"Created: {final_output} ({pages_in_chunk} pages, {chunk_size:.2f} MB)")

                if not is_last_page:
                    chunk_num += 1
                    current_writer = PdfWriter()
                    pages_in_chunk = 0
        else:
            # Remove temp file and continue adding pages
            os.remove(temp_output)

    print("-" * 50)
    print(f"✓ Split complete! Created {chunk_num} chunks in '{output_dir}/' directory")

def main():
    if len(sys.argv) < 2:
        print("Usage: python pdf_splitter.py <input_pdf> [max_size_mb] [output_dir]")
        print("\nExample:")
        print("  python pdf_splitter.py large_file.pdf")
        print("  python pdf_splitter.py large_file.pdf 3")
        print("  python pdf_splitter.py large_file.pdf 3 custom_output")
        sys.exit(1)

    input_pdf = sys.argv[1]
    max_size_mb = float(sys.argv[2]) if len(sys.argv) > 2 else 3
    output_dir = sys.argv[3] if len(sys.argv) > 3 else "pdf_parts"

    if not os.path.exists(input_pdf):
        print(f"Error: File '{input_pdf}' not found!")
        sys.exit(1)

    try:
        split_pdf_by_size(input_pdf, max_size_mb, output_dir)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
