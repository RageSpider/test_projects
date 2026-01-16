Yearbook Design Architecture & Print Specifications

Project: Class of '26 Yearbook

Format: US Letter (Hardcover Case Bound)

Standard: 300 DPI / Print-Ready

1. Executive Summary (Quick Reference)

Component

Physical Size

Pixel Size (300 DPI)

Note

Page Format

8.5" x 11"

2550 x 3300

The final size of a single internal page.

Single Page Bleed

8.75" x 11.25"

2625 x 3375

Includes 0.125" bleed on all sides.

Full Cover Sheet

20.4" x 12.85"

6120 x 3855

The massive wrap-around sticker for the cardboard.

Spine Width

0.5" (Approx)

150 px

Variable based on page count (see Section 2).

2. PART I: The Hardcover Architecture (External)

The cover is not printed on the cardboard; it is printed on a large paper sheet that is glued and wrapped around the cardboard.

The Master Canvas (Figma Frame 3)

Total Canvas Size: 6120w x 3855h pixels

X-Axis Breakdown (Left to Right)

These coordinates assume X=0 is the left edge of the canvas.

Left Wrap (Fold-over): 0 - 240px (0.8")

Content: Background color/pattern only. No text.

Back Cover Board: 240 - 2865px (8.75")

Safe Zone: Keep text 150px away from all edges of this zone.

Left Hinge (Gutter): 2865 - 2985px (0.4")

Content: Background color only. This area bends.

The Spine: 2985 - 3135px (0.5")

Note on Scaling: If your book exceeds 150 pages, add 30px (0.1") to this width for every 50 extra pages. You must expand the total canvas width accordingly.

Right Hinge (Gutter): 3135 - 3255px (0.4")

Content: Background color only.

Front Cover Board: 3255 - 5880px (8.75")

Safe Zone: Keep text 150px away from all edges.

Right Wrap (Fold-over): 5880 - 6120px (0.8")

Y-Axis Breakdown (Top to Bottom)

Top Wrap: 0 - 240px (0.8")

Visual Height: 240 - 3615px (11.25")

Bottom Wrap: 3615 - 3855px (0.8")

3. PART II: The Internal Pages (Internal)

These are the actual pages inside the book. Do NOT design these on the Cover Canvas. Create a separate Figma Page for these.

Single Page Setup

Total Frame Size (With Bleed): 2625 x 3375 px

Trim Line (Physical Cut): The printer will cut off the outer 38px (0.125") on all sides.

Safe Area: Keep all faces, names, and text at least 150px (0.5") away from the edge of the frame.

The "Gutter" Rule (Crucial)

When two pages face each other (A Spread), the middle part gets sucked into the binding.

Left Page: Right margin must be 250px.

Right Page: Left margin must be 250px.

Why? If you don't do this, the names of students listed near the middle will disappear into the spine crack.

4. PART III: Typography & Visual Hierarchy

To maintain the "Premium" look, strict adherence to font sizing is required. Figma sizes (points) generally translate well to print, but visual checking is required.

Font Sizing (Reference for Print)

Element

Size (pt/px)

Style

Notes

Headline

72 - 120

Serif / Display

Use for "Senior Class", Section Dividers.

Sub-Headline

36 - 48

Sans-Serif

Use for "Dhaka College", "Faculty".

Body Copy

10 - 12

Serif / Sans

NEVER go below 9pt. It becomes unreadable.

Captions

9

Sans / Italic

Photo credits or names.

Folio (Page #)

12

Bold / Mono

Place at bottom corners.

Color Profiles (Figma Warning)

Figma displays in RGB (Light). Printers print in CMYK (Ink).

Avoid: Neon Green, Electric Blue, Bright Magenta.

Use: The "Leather & Parchment" palette provided in the Studio tool.

Black Text: Use #231F20 (Rich Black) or #3B2F2F (Deep Brown) instead of #000000 (Pure Black) for a softer, more professional look on cream paper.

5. PART IV: Scaling & Adaptability

"What if we have to print on A4?"

If budget forces you to switch from US Letter to A4 at the last minute, here is the scaling math:

Aspect Ratio Mismatch:

US Letter Ratio: 1.29 (Wider)

A4 Ratio: 1.41 (Taller)

The Consequence: You cannot just "shrink" the design.

If you fit the width, the page will have empty white space at the top/bottom.

If you fit the height, the sides (and your margins) will get cut off.

The Solution:

Design with generous margins (at least 200px on sides).

If printing A4, instruct the printer to "Center & Crop Sides". You will lose about 1cm of width, but if your margins are safe, the content survives.

6. Export Checklist (The "Go" Signal)

Before sending files to the press:

[ ] Convert to Curves: Select all text layers -> Right Click -> Outline Stroke (or Flatten). This prevents font missing errors at the print shop.

[ ] Check Resolution: Ensure all imported photos are effectively 300 DPI. In Figma, if you scaled an image up by 200%, its quality dropped by half.

[ ] Export Format: PDF (Standard).

[ ] Color Space: If you have Adobe Acrobat, convert the exported PDF to "Coated FOGRA39" (CMYK). If not, explicitly tell the printer: "These files are RGB. Please convert to CMYK before printing."