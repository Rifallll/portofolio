
import sys

def read_file(filename):
    print(f"Reading {filename}...")
    try:
        with open(filename, 'r', encoding='utf-16') as f:
            return f.read()
    except UnicodeError:
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            return f"Error: {e}"

content = read_file('pages_errors.txt')
for line in content.splitlines():
    if 'error' in line.lower() or 'warning' in line.lower():
        print(line.strip())
