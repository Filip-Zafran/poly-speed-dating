# 🔗 Connectors Feature - User Guide

## Overview

**Connectors** is a feature that helps PSD participants discover shared interests with their matches and suggests relevant events and meetup ideas in Berlin.

### How It Works

1. **Complete the Questionnaire** - Select activities and interests you enjoy
2. **View Your Matches** - See who you matched with from the event
3. **Find Overlaps** - Discover shared interests with each match
4. **Get Event Suggestions** - See curated events for your common interests
5. **Mark Your Interest** - Save events you'd like to explore with that person

---

## Getting Started

### Opening Connectors

Navigate to the Connectors page:
```
http://localhost:8080/connectors.html
```

You'll see the **Connectors Questionnaire** with interest categories.

---

## Using the Questionnaire

### Step 1: Select Your Interests

Choose activities from these categories that you'd enjoy doing with a match:

**Movement / Sport**
- Hiking, Bouldering, Climbing, Stretching, Yoga, Swimming, Cycling, Dancing

**Music / Nightlife**
- Techno, House, Jazz, Punk, Metal, Indie concerts, Karaoke, Sober parties

**Creative / Culture**
- Museums, Galleries, Cinema, Photography, Drawing, Pottery, Workshops, Flea markets

**Social / Lifestyle**
- Cafés, Brunch, Board games, Gaming, Cooking, Picnics, Queer events, Poly events

**Preferred Meetup Energy**
- Sober, Casual drinks, Party, Deep talks, Daytime, Evening

### Step 2: Share Instagram (Optional)

If you're comfortable, share your Instagram handle so matches can find you.

### Step 3: Submit

Click **"Save & Unlock Matches"** to submit your questionnaire.

---

## Viewing Your Matches

### Matching Process

After submission, the system:

1. **Finds matches** - Shows people you matched with at the PSD event
2. **Calculates overlaps** - Compares your interests with theirs
3. **Suggests events** - Recommends events based on shared interests

### Match Card Layout

Each match shows:

```
Name: Alex
Type: Romantic Match

Overlapping Interests:
  🏔️ hiking  |  🧗 bouldering  |  🎨 museums  |  ☕ cafes

Suggested Connector Events:
  [Event cards with details]
  
Instagram Connection:
  [If both people shared Instagram handles]
```

---

## Understanding Event Suggestions

### What You'll See

For each overlapping interest, you'll see **3-7 event suggestions** with:

- **Title** - Name of the event/activity
- **Description** - What the event is about
- **Date** - When it's happening
- **Time** - What time it runs
- **Price** - Cost (approximate)
- **Location** - Where in Berlin
- **Source** - Where the event info comes from (Eventbrite, Meetup, etc.)

### Event Sources

Events come from various platforms:
- **Eventbrite API** - Official event listings
- **Google Search** - Curated search results
- **Berlin.de** - City events database
- **Meetup.com** - Community meetups
- **Luma.ma** - Event discovery

---

## Interacting with Events

### Mark Your Interest

Click **"I'm interested"** on an event:
- Your preference is saved
- Button changes to show "Interested"
- If both people mark the same event, it shows "You both liked this event" ✨

### Open Event Details

Click **"Open event"** to:
- See full event details on the source website
- Read reviews or more information
- Book tickets if needed

---

## API Integration (Behind the Scenes)

### How Events Are Fetched

The system:
1. Identifies shared interests between you and a match
2. Calls the backend API: `GET /api/events?keyword=<interest>`
3. Returns 3-7 relevant events from Eventbrite
4. Displays results on the page

### Current Implementation

- **API Endpoint**: `http://localhost:3000/api/events`
- **Response Time**: ~500ms per interest
- **Cache**: Events refresh each session
- **Fallback**: Shows template events if API is unavailable

---

## Testing the Feature

### Quick Test Setup

1. **Open test page**:
   ```
   http://localhost:8080/test-connectors.html
   ```

2. **Click button**: "🚀 Load Test Data & Display Matches"

3. **Observe**:
   - Test data loads automatically
   - Person 1 (you): 5 interests selected
   - Person 2 (Alex): 4 overlapping interests
   - Events display from the API

### Manual Testing

To test without the test page:

1. **Fill questionnaire** with your interests
2. **Click "Save & Unlock Matches"**
3. **Scroll down** to see matches and events
4. **Click "I'm interested"** on an event
5. **Verify** event count is between 3-7

---

## Troubleshooting

### No Matches Showing

**Problem**: "Your Matches" section is hidden

**Solution**:
1. Make sure you saved the questionnaire (at least 3 interests)
2. Check browser localStorage isn't cleared
3. Try refreshing the page

### No Events Appearing

**Problem**: Match card shows but no event suggestions

**Solution**:
1. Check if overlapping interests exist
2. Verify Node server is running:
   ```bash
   curl http://localhost:3000/api/events?keyword=hiking
   ```
3. Check browser console for errors (`F12`)

### API Error: "Failed to fetch events"

**Problem**: Events endpoint returns error

**Solution**:
1. Ensure Node server is running: `npm start`
2. Check Eventbrite token in `.env` file (valid token required for production)
3. Look at server logs: `cat /tmp/server.log`

### Can't Open Test Page

**Problem**: `http://localhost:8080/test-connectors.html` doesn't load

**Solution**:
1. Start HTTP server:
   ```bash
   python3 -m http.server 8080
   ```
2. Wait 2 seconds and refresh

### Instagram Not Showing

**Problem**: "Instagram is only shown when people choose to share it"

**Solution**:
- This is expected! Instagram only shows if:
  - You shared your handle
  - The match shared their handle
  - Then it displays the match's handle

---

## Feature Architecture

### File Structure

```
connectors.html          # Main page and form
server.js               # Node/Express API server
.env                    # Configuration (Eventbrite token)
test-connectors.html    # Testing harness
```

### Data Flow

```
User fills form
    ↓
Save to localStorage
    ↓
renderMatches() called
    ↓
For each match, calculate overlaps
    ↓
For each overlap, fetch from API:
    curl /api/events?keyword=<interest>
    ↓
Display 3-7 events per interest
    ↓
User clicks "Interested"
    ↓
Save preference to localStorage
```

---

## API Endpoint Reference

### Get Events

**Request**:
```
GET http://localhost:3000/api/events?keyword=hiking
```

**Response** (3-7 events):
```json
[
  {
    "title": "Berlin Forest Hiking Tour",
    "description": "Explore the forests around Berlin...",
    "url": "https://example.com/hiking1",
    "image": "",
    "start": "2026-05-24",
    "end": "2026-05-24"
  },
  ...
]
```

**Supported Keywords**:
- hiking, bouldering, yoga, museums, cafes, techno, etc.
- Any interest from the questionnaire will work

---

## Advanced: Local Storage Data

### Profile Data

Stored as: `dda_connectors_demo_profile`

```json
{
  "connectorsCompleted": true,
  "instagram": "@username",
  "interests": ["hiking", "museums", "cafes"]
}
```

### Event Likes

Stored as: `dda_connectors_demo_event_likes`

```json
{
  "match_1": {
    "api_hiking_0": true,
    "api_museums_2": true
  }
}
```

### Clear Data

To reset everything:
```javascript
// In browser console (F12)
localStorage.removeItem("dda_connectors_demo_profile");
localStorage.removeItem("dda_connectors_demo_event_likes");
location.reload();
```

---

## Frequently Asked Questions

### Q: How many matches will I see?

**A**: Currently showing 1-3 demo matches. In production, this pulls from actual PSD event matches.

### Q: Can I see events before completing the questionnaire?

**A**: No, you must select at least 3 interests and submit first.

### Q: Do the events actually happen?

**A**: The current version uses mock data for testing. In production, it will fetch real events from Eventbrite.

### Q: What if someone didn't complete the questionnaire?

**A**: Their card shows a message: "This person has not completed Connectors yet. Check back later."

### Q: Can I edit my interests after submitting?

**A**: Yes, fill the form again and click "Save & Unlock Matches" - it will overwrite your previous data.

### Q: Are my "Interested" votes saved?

**A**: Yes, they're stored in localStorage. Clear your browser data to reset them.

---

## Support

### Check Logs

Server logs are at:
```
/tmp/server.log
```

### Browser Console

Press `F12` to open DevTools and check for JavaScript errors.

### Reset Everything

```bash
# Clear test data
rm -f /tmp/server.log

# Restart servers
pkill -f "node server.js"
npm start
```

---

## What's Next?

### Production Improvements

- [ ] Real Eventbrite API with valid token
- [ ] Save matches to database
- [ ] Send notifications when mutual interest
- [ ] Direct messaging between matches
- [ ] Calendar integration
- [ ] Event RSVP tracking

### Current Limitations

- ⚠️ Using mock event data (for testing)
- ⚠️ Demo matches hardcoded
- ⚠️ Data not persisted between sessions
- ⚠️ No real user authentication

---

**Last Updated**: May 21, 2026  
**Version**: 1.0 (Testing/MVP)

For questions or issues, check the server logs or browser console.
