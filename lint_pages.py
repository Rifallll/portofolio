
import os
import subprocess

directory = r'c:\Users\ASUS\dyad-apps\Portofolio Rifal Azhar Perrmana\src\pages'
for filename in os.listdir(directory):
    if filename.endswith(".tsx") or filename.endswith(".ts"):
        filepath = os.path.join(directory, filename)
        try:
            result = subprocess.run(['npx.cmd', 'eslint', filepath, '--no-color'], capture_output=True, text=True, encoding='utf-8')
            if result.returncode != 0:
                print(f"Errors in {filename}:")
                print(result.stdout)
        except Exception as e:
            print(f"Failed to lint {filename}: {e}")
