# PitchPilot Video Explanation Guide

## 30 Seconds: Introduction

Hello, my name is your name, and I am applying for the Frontend Developer role. My project is PitchPilot, a preparation workspace that helps developer candidates create a clear 5-7 minute project explanation video.

## 45 Seconds: Project Overview

PitchPilot solves the problem of unstructured project explanations. Many candidates either list technologies or explain the whole team project without showing their own contribution. This app gives them a guided workspace for project overview, contribution, implementation, technical challenges, learnings, and closing.

## 1 Minute: My Contribution

I built the complete frontend architecture. My main contributions were the protected setup flow, dashboard layout, reusable metric cards, storyline builder, technical checklist, rehearsal timer, challenge editor, and generated speaking guide. I also implemented state persistence so the user's preparation progress remains available after refresh.

## 2 Minutes: Technical Implementation

The project uses React with TypeScript and Vite. I organized the app into reusable components such as Sidebar, TopBar, MetricCard, StorySegmentCard, FocusChecklist, TimerPanel, ChallengeEditor, and VideoScript.

For state management, I used Context API with a typed reducer. This keeps user profile, active view, story segments, technical checklist, challenge cards, and notes in one predictable state model.

For API integration, I created an async mock API service. It simulates loading, saving, and session creation, then stores the full project state in local storage. This keeps the frontend structured in a way that can later connect to real REST APIs.

For authentication behavior, I implemented a protected workspace pattern. The dashboard is unavailable until the candidate creates a session with name, project, and role. In a production version, this same boundary can be connected to JWT authentication.

For performance, readiness metrics are derived from the state and calculated efficiently. The UI is split into small focused components, which improves maintainability and keeps rendering predictable.

## 1 Minute: Challenge and Solution

One challenge was keeping the explanation specific instead of generic. At first, the preparation flow could become a technology checklist. I solved this by separating the project into story segments, technical evidence, and challenge cards. This helps the candidate explain what they built, why they built it, and how they solved real problems.

Another challenge was timing. Project videos often exceed the 5-7 minute range. I solved this by assigning target durations to each section and adding a live rehearsal timer with feedback.

## 30 Seconds: Learnings

This project improved my understanding of component design, typed state management, persistence, responsive UI, and user-focused workflow design. If I rebuilt it, I would add a backend with JWT authentication, database persistence, and real analytics for rehearsal history.

## 20 Seconds: Closing

Thank you for watching my project explanation. I would be happy to answer technical questions about the architecture, state management, component design, and implementation decisions.
