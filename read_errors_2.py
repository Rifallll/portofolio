
import sys

try:
    # Try utf-16 first as suspected
    with open('lint_final.txt', 'r', encoding='utf-16') as f:
        content = f.read()
except UnicodeError:
    try: 
        # Fallback to utf-8
        with open('lint_final.txt', 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        sys.exit(1)

lines = content.splitlines()
count = 0
for line in lines:
    if 'error' in line.lower() or 'warning' in line.lower() or 'problem' in line.lower():
        print(line.strip())
        count += 1
    if count > 50:
        print("... (truncated)")
        break
