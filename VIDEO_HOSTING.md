# Video Hosting Guide

Your video production page is set up to embed videos. Here are the best hosting options for a static portfolio (no backend, free/cheap):

## Recommended: YouTube (Unlisted)

**Pros:** Free, reliable, easy embed, no file size limits  
**Cons:** YouTube branding (minimal when embedded)

1. Upload your videos to [YouTube](https://youtube.com)
2. Set visibility to **Unlisted** (only people with the link can find it)
3. Copy the video ID from the URL: `youtube.com/watch?v=**dQw4w9WgXcQ**`
4. In `video-production.html`, replace `VIDEO_ID` with your ID in each iframe `src`

```html
<!-- Change this -->
src="https://www.youtube.com/embed/VIDEO_ID?rel=0"

<!-- To this (example) -->
src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
```

## Alternative: Vimeo

**Pros:** Cleaner, no ads, more professional look  
**Cons:** Free tier limits (500MB/week, 5GB total)

1. Upload to [Vimeo](https://vimeo.com)
2. Get the video ID from the URL: `vimeo.com/**123456789**`
3. Use this embed format instead of YouTube:

```html
<iframe src="https://player.vimeo.com/video/123456789" title="Video title" allow="autoplay; fullscreen" allowfullscreen></iframe>
```

## Page Structure

The video-production page has these sections (matching your Wix layout):

- **Devoted to Motion**: hero headline
- **Social Media**: 3×6 grid of vertical (9:16) video previews
- **HD Videos**: clickable card that opens a modal with your full YouTube playlist
- **My First Release**: project with description
- **Music Video**: Vacca project with description

## Social Media Grid

The Social Media section is a 3-column × 6-row grid (18 cells) for vertical videos. Each cell uses 9:16 aspect ratio.

To add a video, replace the placeholder div with:

```html
<a href="https://youtube.com/watch?v=YOUR_VIDEO_ID" target="_blank" rel="noopener">
  <img src="https://img.youtube.com/vi/YOUR_VIDEO_ID/hqdefault.jpg" alt="Video title">
  <span class="vp-play-overlay">
    <span class="vp-play-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
    </span>
  </span>
</a>
```

Thumbnails open the video in a new tab. For vertical videos (Shorts, Reels), YouTube’s thumbnail may be cropped; `object-fit: cover` fills the cell neatly.

## HD Videos Carousel

The HD Videos section is an inline horizontal carousel. To add videos, copy a `vp-hd-slide` block in `video-production.html` and replace `VIDEO_ID` in the href and img src with your YouTube video ID.
