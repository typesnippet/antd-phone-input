import json
import re
from pathlib import Path
from xml.etree import ElementTree

project_root = Path(__file__).parent.parent.parent
metadata_path = project_root / "resources" / "metadata.xml"
countries_path = project_root / "src" / "metadata" / "countries.json"

tree = ElementTree.parse(metadata_path)
territories = tree.find("territories")


def update_mask(mask, length):
    """
    update slots of the mask to match the given length

    e.g., update_mask("+1 (664) ....", 10) -> "+1 (664) .... ..."
    """
    length_without_cc = len(re.findall(r"[\d.]", re.sub(r"\+\d+\s", "", mask)))
    if length_without_cc != length:
        ac_mask = re.match(r"\+\d+\s(\S+)\s", mask).group(1)
        ac_mask_length = len(re.findall(r"[\d.]", ac_mask))
        pn_mask_expected_length = length - ac_mask_length
        pn_mask_prefix = re.sub(r"\+\d+\s\S+\s", "", mask).split()[0]
        pn_mask_parts = [pn_mask_prefix]
        while len("".join(pn_mask_parts)) < pn_mask_expected_length:
            pn_mask_parts.append("." * len(pn_mask_prefix))
        pn_mask = " ".join(pn_mask_parts)
        while len(pn_mask.replace(" ", "")) > pn_mask_expected_length:
            pn_mask = pn_mask[:-1]
        assert len(re.findall(r"[\d.]", re.sub(r"\+\d+\s", "", f"{ac_mask} {pn_mask}"))) == length
        return f"{ac_mask} {pn_mask}"
    return mask


with open(countries_path) as fp:
    countries = json.load(fp)

for territory in territories:
    # if territory.get("id") != "MS":
    #     continue
    possibleLengths = map(lambda e: territory.find(f"{e.tag}/possibleLengths"), territory.iter())
    possibleLengths = map(lambda e: e.get("national"), filter(lambda e: e is not None, possibleLengths))
    possibleLengths = list(map(int, re.findall(r"\d+", ",".join(possibleLengths))))
    # todo: (re)generate phone masks and basic regexes for checking only the length (non-strict validation)
    # print(min(possibleLengths), max(possibleLengths))
    for country in [c for c in countries if c[0] == territory.get("id").lower()]:
        mask = country[4]
        # print(mask, max(possibleLengths))
        print(update_mask(mask, max(possibleLengths)))
        # pn_mask = re.sub(r"\+\d+\s\S+\s", "", mask)
        # print(pn_mask.split()[0])
