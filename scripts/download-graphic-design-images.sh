#!/bin/bash
# Downloads graphic design images from Wix portfolio at FULL ORIGINAL RESOLUTION
# Uses base URLs (no /v1/fill/...) - Wix serves originals when transformation params are omitted
# Run this, then move files into Illustrations, Logos, Events, Food, or Corporate as you see fit

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(dirname "$SCRIPT_DIR")"
DOWNLOAD_DIR="$BASE_DIR/assets/graphic-design/downloaded"
mkdir -p "$DOWNLOAD_DIR"

# Category folders - ready for you to sort files into
mkdir -p "$BASE_DIR/assets/graphic-design/Illustrations"
mkdir -p "$BASE_DIR/assets/graphic-design/Logos"
mkdir -p "$BASE_DIR/assets/graphic-design/Events"
mkdir -p "$BASE_DIR/assets/graphic-design/Food"
mkdir -p "$BASE_DIR/assets/graphic-design/Corporate"

# ORIGINAL resolution URLs - base URL without /v1/fill/... returns full-size image
# All 24 images from the graphic design gallery (extracted from page source)
IMAGES=(
  "https://static.wixstatic.com/media/15338d_0548153f4e41478da17687f61b3e071af003.jpg"
  "https://static.wixstatic.com/media/15338d_17695ef43b004b8892f08fa4d59a157af003.jpg"
  "https://static.wixstatic.com/media/15338d_1d29dc5994594b2db16b18d0c9ce7f8b~mv2.png"
  "https://static.wixstatic.com/media/15338d_20f83192a3164d7d9e0f8b7384bef735~mv2_d_10800_21600_s_4.png"
  "https://static.wixstatic.com/media/15338d_21525abed643465b9250dfe188d2b54e~mv2_d_3300_5100_s_4_2.jpg"
  "https://static.wixstatic.com/media/15338d_33016fba0429425294683dcc68e53b80f003.jpg"
  "https://static.wixstatic.com/media/15338d_3b0ddbf7bd804de79a1979cd6f7eea9c~mv2.jpg"
  "https://static.wixstatic.com/media/15338d_60ea096286e147d5adeb7795665fa7f0~mv2.jpeg"
  "https://static.wixstatic.com/media/15338d_6c72621eb2484b958a75f3f82b1e3d01f003.jpg"
  "https://static.wixstatic.com/media/15338d_6ee6e780b5fd46b99592c9b70c98709a~mv2_d_4000_2500_s_4_2.jpg"
  "https://static.wixstatic.com/media/15338d_743e643de36146a0b2f5522d2b9d8480~mv2.jpg"
  "https://static.wixstatic.com/media/15338d_918b8718d0d04ff7b2acb3e52ed01c01~mv2_d_4000_2333_s_2.jpg"
  "https://static.wixstatic.com/media/15338d_9a4004caa7d24dbd984ff533e9a8e819~mv2.jpg"
  "https://static.wixstatic.com/media/15338d_9a6a6b6a6f514d05bab8650e8445aad7f003.jpg"
  "https://static.wixstatic.com/media/15338d_a011a2cbae1440d2a669e14ed3537681~mv2.jpg"
  "https://static.wixstatic.com/media/15338d_a0a13a2870bc460aa862fbbb9ccb1a52~mv2.jpg"
  "https://static.wixstatic.com/media/15338d_a96f621b32c245e78c4840a4c34381c4~mv2.jpg"
  "https://static.wixstatic.com/media/15338d_b5dfcdc90d6b4fa2a8f3a2b0b1f3c2bef003.jpg"
  "https://static.wixstatic.com/media/15338d_b9b3adbaffe642859a795c3ce5c4f041f003.jpg"
  "https://static.wixstatic.com/media/15338d_bfae7e0a5dc04ff0bcb71bbf2207b158f003.jpg"
  "https://static.wixstatic.com/media/15338d_c0bac4b180f64896ad7cafc56165627e~mv2.jpg"
  "https://static.wixstatic.com/media/15338d_c5612b8b912040dbab329cda043eae73~mv2_d_4500_5625_s_4_2.jpg"
  "https://static.wixstatic.com/media/15338d_c8ae932ad7b84e8f9e181e70126a1ce0f003.jpg"
  "https://static.wixstatic.com/media/15338d_d8d4fe2774144be6a2e84313f32769c9~mv2.png"
  "https://static.wixstatic.com/media/15338d_f48ae0fc0c114d7682b912304f03ec8d~mv2.jpg"
)

echo "Downloading ${#IMAGES[@]} images to $DOWNLOAD_DIR"
echo ""

for i in "${!IMAGES[@]}"; do
  url="${IMAGES[$i]}"
  # Extract filename from URL (last part before any query string)
  filename=$(echo "$url" | sed 's|.*/\([^/]*\)$|\1|' | sed 's/[?].*//')
  # Ensure unique names
  base="${filename%.*}"
  ext="${filename##*.}"
  if [[ "$ext" == "$base" ]]; then ext="jpg"; fi
  outfile="$DOWNLOAD_DIR/design-$((i+1))-$base.$ext"
  
  echo "  [$((i+1))/${#IMAGES[@]}] $filename"
  curl -sL -o "$outfile" "$url" || echo "    (failed)"
done

echo ""
echo "Done! Images saved to: $DOWNLOAD_DIR"
echo ""
echo "Next step: Move the images you want to keep into these category folders:"
echo "  $BASE_DIR/assets/graphic-design/Illustrations/"
echo "  $BASE_DIR/assets/graphic-design/Logos/"
echo "  $BASE_DIR/assets/graphic-design/Events/"
echo "  $BASE_DIR/assets/graphic-design/Food/"
echo "  $BASE_DIR/assets/graphic-design/Corporate/"
