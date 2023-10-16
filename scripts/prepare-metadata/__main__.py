import json
import re
from pathlib import Path
from xml.etree import ElementTree

project_root = Path(__file__).parent.parent.parent
metadata_path = project_root / "resources" / "metadata.xml"
patterns_path = project_root / "src" / "legacy" / "validations.json"

country_codes = [
    "ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb",
    "bd", "be", "bf", "bg", "bh", "bi", "bj", "bl", "bm", "bn", "bo", "br", "bs", "bt", "bw", "by", "bz", "ca", "cc",
    "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dj",
    "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga",
    "gb", "gd", "ge", "gh", "gi", "gl", "gm", "gn", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hn", "hr", "ht",
    "hu", "ic", "id", "ie", "il", "im", "in", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki",
    "xk", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly",
    "ma", "mc", "md", "me", "mf", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv",
    "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe",
    "pf", "pg", "ph", "pk", "pl", "pn", "pr", "ps", "pt", "pw", "py", "qa", "ro", "rs", "ru", "rw", "sa", "sb", "sc",
    "sd", "se", "sg", "sh", "si", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "sv", "sy", "sz", "tc", "td", "tf",
    "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "us", "uy", "uz", "va",
    "vc", "ve", "vg", "vi", "vn", "vu", "ws", "ye", "za", "zm", "zw"
]

tree = ElementTree.parse(metadata_path)
territories = tree.find("territories")
patterns = dict()

for territory in territories:
    general_desc = territory.find("generalDesc")
    national_number_pattern = general_desc.find("nationalNumberPattern").text
    national_number_pattern = re.sub(r"[\s\n]", "", national_number_pattern)
    iso_code = territory.get("id").lower()
    if iso_code in country_codes:
        patterns[iso_code] = f"^{national_number_pattern}$"

with open(patterns_path, "w") as fp:
    json.dump(patterns, fp, indent=2)
