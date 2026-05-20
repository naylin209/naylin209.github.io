# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Nay Lin Aung — a single-page static site with no build tools, bundler, or package manager.

## Architecture

The entire site lives in a single `index.html` file containing:
- Inline `<style>` block with all CSS (lines 11–261)
- HTML structure with sections: hero, about, experience, projects, skills, contact (lines 263–494)
- Inline `<script>` block with all JS (lines 496–541)

## Key Technical Details

- **No build step** — open `index.html` directly in a browser or serve with any static file server
- **External dependencies** (loaded via CDN):
  - EmailJS (`@emailjs/browser@4`) for contact form submission
  - Google Fonts: Cormorant Garamond (serif) and IBM Plex Mono (mono)
- **CSS custom properties** defined in `:root` (line 15): `--black`, `--white`, `--dim`, `--border`, `--blue`, `--blue-dim`, `--serif`, `--mono`
- **Responsive breakpoint** at 860px (line 248)
- **JS features**: scroll-triggered nav styling, IntersectionObserver reveal animations, typing effect for hero roles, EmailJS form handler

## Development

No install or build commands. To preview: open `index.html` in a browser, or use any local server (e.g., `python -m http.server`).
