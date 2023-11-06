import json
import re
from pathlib import Path
from xml.etree import ElementTree

project_root = Path(__file__).parent.parent.parent
metadata_path = project_root / "resources" / "metadata.xml"
patterns_path = project_root / "src" / "metadata" / "validations.json"
countries_path = project_root / "src" / "metadata" / "countries.json"

tree = ElementTree.parse(metadata_path)
territories = tree.find("territories")


def update_mask(mask, length):
    length_without_cc = len(re.findall(r"[\d.]", re.sub(r"\+\d+\s", "", mask)))
    if length_without_cc != length:
        cc_mask = re.match(r"(\+\d+)\s", mask).group(1)
        ac_mask = re.match(r"\+\d+\s(?:(\S+)\s)?", mask).group(1) or ""
        ac_mask_length = len(re.findall(r"[\d.]", ac_mask))
        pn_mask_expected_length = length - ac_mask_length
        pn_mask_prefix = re.sub(r"\+\d+\s(?:\S+\s)?", "", mask).split()[0]
        pn_mask_parts = [pn_mask_prefix]
        while len("".join(pn_mask_parts)) < pn_mask_expected_length:
            pn_mask_parts.append("." * len(pn_mask_prefix))
        pn_mask = " ".join(pn_mask_parts)
        while len(pn_mask.replace(" ", "")) > pn_mask_expected_length:
            pn_mask = pn_mask[:-1]
        mask = f"{cc_mask} {ac_mask} {pn_mask}" if ac_mask else f"{cc_mask} {pn_mask}"
    return re.sub(r"\s(\.{1,2})$", r"\1", mask)


with open(patterns_path) as fp:
    patterns = json.load(fp)

with open(countries_path) as fp:
    countries = json.load(fp)

for territory in territories:
    # Regenerate masks based on possible maximum lengths
    possible_lengths = map(lambda e: territory.find(f"{e.tag}/possibleLengths"), territory.iter())
    possible_lengths = map(lambda e: e.get("national"), filter(lambda e: e is not None, possible_lengths))
    possible_lengths = list(map(int, re.findall(r"\d+", ",".join(possible_lengths))))
    min_length, max_length = min(possible_lengths), max(possible_lengths)
    for country in [c for c in countries if c[0] == territory.get("id").lower()]:
        country[3] = update_mask(country[3], max_length)

    # Update phone validation patterns
    general_desc = territory.find("generalDesc")
    national_number_pattern = general_desc.find("nationalNumberPattern").text
    national_number_pattern = re.sub(r"[\s\n]", "", national_number_pattern)
    patterns[territory.get("id").lower()] = [
        f"^\\d{{{min_length},{max_length}}}$" if min_length != max_length else f"^\\d{{{max_length}}}$",
        f"^{national_number_pattern}$"
    ]

with open(patterns_path, "w") as fp:
    json.dump(patterns, fp, indent=2)

with open(countries_path, "w") as fp:
    json.dump(countries, fp, indent=2)
