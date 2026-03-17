import json
import re
import subprocess
import sys
from pathlib import Path

project_root = Path(__file__).parent.parent.parent
localization_file = project_root / "src" / "resources" / "localization.json"

locale_name_pattern = re.compile(r'^[a-z]{2,3}[A-Z][A-Za-z]{1,3}$')
locale_value_pattern = re.compile(r"locale:\s*'([^']+)'")

try:
    result = subprocess.run(
        ['curl', '-s', '-H', 'User-Agent: react-phone-hooks',
         'https://api.github.com/repos/ant-design/ant-design/contents/components/locale'],
        capture_output=True,
        text=True,
        timeout=30
    )
    if result.returncode == 0 and result.stdout.strip():
        files = json.loads(result.stdout)
        antd_locales = {}
        for file in files:
            name = file['name']
            if name.endswith('.ts') and name != 'index.ts':
                stem = name[:-3]
                key = stem.replace('_', '')
                if locale_name_pattern.match(key):
                    antd_locales[key] = stem
    else:
        antd_locales = {}
except Exception:
    antd_locales = {}

localization = {}
for key, stem in sorted(antd_locales.items()):
    locale_path = project_root / "node_modules" / "antd" / "es" / "locale" / f"{stem}.js"
    if locale_path.exists():
        match = locale_value_pattern.search(locale_path.read_text())
        if match:
            localization[match.group(1)] = key

with open(localization_file, 'w') as f:
    json.dump(localization, f, indent=2)

sys.exit(0)
