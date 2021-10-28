# pool-league

Pool league table created with:
- Vite
- Vue 3
- Tailwind CSS
- Cloud Firebase

![alt text](https://github.com/therealJonSnow/pool-league/blob/master/screenshot.png)

## Scoring

Scoring a league like this is a nightmare and I've spent too much time thinking of various ways. We wanted something dynamic whereby nobody could get too far out ahead.
We ended with a simple system that allows for losing points and negative scoring:
- Beat someone the same points as you or one position above *+3 points*
- Beat someone above you *+(3 * place_difference) points*

If you lose you get the points above removed from your score.

*place_difference*: If you play someone placed 1st and you are 4th that is a difference of 3.

This is currently a test to see how the scoring functions and will be changed if it requires balancing.

## Firebase
The Firebase database requires database of 'users' with following data:

```
{
  "name": "John",
  "record": {
    "win": 0,
    "loss": 0,
    "played": 0,
    "points": 0
  }
}
```

A function to programatically add players is found in firebase.js
