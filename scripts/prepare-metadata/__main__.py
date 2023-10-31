import json
import re
from pathlib import Path
from xml.etree import ElementTree

project_root = Path(__file__).parent.parent.parent
metadata_path = project_root / "resources" / "metadata.xml"
patterns_path = project_root / "src" / "metadata" / "validations.json"
countries_path = project_root / "src" / "metadata" / "countries.json"

country_codes = [
    "ad", "ae", "af", "ag", "ai", "al", "am", "ao", "ar", "as", "at", "au", "aw", "az", "ba", "bb", "bd", "be", "bf",
    "bg", "bh", "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bw", "by", "bz", "ca", "cd", "cf", "cg", "ch", "ci",
    "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee",
    "eg", "er", "es", "et", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gh", "gi", "gl", "gm",
    "gn", "gp", "gq", "gr", "gt", "gu", "gw", "gy", "hk", "hn", "hr", "ht", "hu", "id", "ie", "il", "in", "io", "iq",
    "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "xk", "km", "kn", "kp", "kr", "kw", "ky", "kz",
    "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mk", "ml",
    "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng",
    "ni", "nl", "bq", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pr", "ps",
    "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sk", "sl",
    "sm", "sn", "so", "sr", "ss", "st", "sv", "sx", "sy", "sz", "tc", "td", "tg", "th", "tj", "tk", "tl", "tm", "tn",
    "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf",
    "ws", "ye", "za", "zm", "zw"
]

tree = ElementTree.parse(metadata_path)
territories = tree.find("territories")
patterns = dict()

with open(countries_path) as fp:
    countries = json.load(fp)


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


for territory in territories:
    # Update phone validation patterns
    general_desc = territory.find("generalDesc")
    national_number_pattern = general_desc.find("nationalNumberPattern").text
    national_number_pattern = re.sub(r"[\s\n]", "", national_number_pattern)
    iso_code = territory.get("id").lower()
    if iso_code in country_codes:
        patterns[iso_code] = f"^{national_number_pattern}$"

    # Regenerate masks based on possible maximum lengths
    possibleLengths = map(lambda e: territory.find(f"{e.tag}/possibleLengths"), territory.iter())
    possibleLengths = map(lambda e: e.get("national"), filter(lambda e: e is not None, possibleLengths))
    possibleLengths = list(map(int, re.findall(r"\d+", ",".join(possibleLengths))))
    for country in [c for c in countries if c[0] == territory.get("id").lower()]:
        country[4] = update_mask(country[4], max(possibleLengths))

with open(patterns_path, "w") as fp:
    json.dump(patterns, fp, indent=2)

with open(countries_path, "w") as fp:
    json.dump(countries, fp, indent=2)
