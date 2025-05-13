# Guess That Super! - Superhero Guessing Game 🦸‍♂️🦸‍♀️

![Game Screenshot](https://github.com/AdamDabre/Guess-That-Super/blob/main/guessing.png) *Example: Replace with your actual screenshot*

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [How to Play](#how-to-play)
- [Technologies Used](#technologies-used)
- [API Usage](#api-usage)

## Introduction

Guess That Super! is a fun, interactive guessing game where players attempt to identify a mystery superhero from the DC or Marvel universe in 10 guesses or less. Inspired by Wordle but with a superhero twist, the game provides feedback after each guess to help narrow down the possibilities.

## Features

🎮 **Two Game Modes:**
- **Casual Mode**: Get hints on publisher, gender, powerstats, and more
- **Super Fan Mode**: For true comic experts - fewer and more challenging hints

✨ **Key Features:**
- Daily challenge with the same hero for all players
- Free play mode with unlimited random heroes
- Visual feedback system (🟢 Correct, 🟡 Close, ⚪️ Wrong)
- Responsive design works on all devices
- Comic book-inspired UI with vibrant colors

## How to Play

1. **Start Guessing**: Enter a superhero name in the search box
2. **Get Feedback**: After each guess, see how your guess compares to the target hero
3. **Use Clues**: Narrow down possibilities based on the feedback
4. **Win**: Identify the hero in 10 guesses or less!

## Technologies Used

- **Frontend**: React, Vite
- **Styling**: CSS Modules
- **Routing**: React Router
- **API**: [Superhero API](https://superheroapi.com/)
- **Hosting**: Netlify/Vercel

## API Usage

This project uses the [Superhero API](https://superheroapi.com/) to fetch character data. Due to API limitations, we use a pre-generated list of character IDs with the following filters:

- Only DC and Marvel characters
- Valid powerstats and biography data

[Live Demo](https://adamdabre.github.io/Guess-That-Super/) 

*This product uses the Superhero API but is not endorsed or certified by Superhero API.*
