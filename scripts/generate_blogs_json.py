# -*- coding: utf-8 -*-
"""
Merges part1, part2, and part3 blogs and writes clean UTF-8 JSON
"""
import json
import os
import sys

from generate_part1 import blogs_part1
from generate_part2 import blogs_part2
from generate_part3 import blogs_part3

all_blogs = blogs_part1 + blogs_part2 + blogs_part3

output_path = os.path.join(os.path.dirname(__file__), "blogsData.json")

print(f"Total blogs to export: {len(all_blogs)}")
for idx, b in enumerate(all_blogs, 1):
    words = len(b["content"].split())
    chars = len(b["content"])
    exc_len = len(b["excerpt"])
    seo_len = len(b["seoDescription"])
    print(f"{idx:2d}. [{b['slug'][:40]:<40}] Words: {words:5d} | Chars: {chars:6d} | Excerpt: {exc_len:3d} | SeoDesc: {seo_len:3d}")

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(all_blogs, f, ensure_ascii=False, indent=2)

print(f"\nSuccessfully wrote {output_path} ({os.path.getsize(output_path):,} bytes)")

