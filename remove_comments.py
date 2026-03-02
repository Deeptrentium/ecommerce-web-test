import sys
import re
import os

def remove_comments(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove multi-line comments /* ... */
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # Remove single-line comments // ... (but be careful not to match URLs)
    # This regex matches // only if it's not preceded by : (to avoid http://)
    content = re.sub(r'(?<!:)\/\/.*', '', content)

    # For CSS, also remove common headers with special characters
    content = re.sub(r'\/\* ─── .*? ─── \*\/', '', content)

    # Optional: cleanup empty lines left behind or trailing spaces
    lines = [line.rstrip() for line in content.splitlines()]
    # Remove consecutive empty lines
    cleaned_lines = []
    prev_line_empty = False
    for line in lines:
        if line == '':
            if not prev_line_empty:
                cleaned_lines.append(line)
            prev_line_empty = True
        else:
            cleaned_lines.append(line)
            prev_line_empty = False
            
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(cleaned_lines))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python remove_comments.py <file_path>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    if os.path.isdir(file_path):
        for root, dirs, files in os.walk(file_path):
            for file in files:
                if file.endswith(('.js', '.jsx', '.ts', '.tsx', '.css')):
                    remove_comments(os.path.join(root, file))
    else:
        remove_comments(file_path)
