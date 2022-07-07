# TFO Drag and Drop - Matching

![](https://img.shields.io/badge/-Built%20With-white) ![](https://img.shields.io/badge/-React-blue) ![](https://img.shields.io/badge/-Sass-blue) ![](https://img.shields.io/badge/-Gulp-blue) ![](https://img.shields.io/badge/-Webpack-blue)

---
## How to start the repo
* Run the following commands in the terminal.
```code
npm i
npm run dev
```
* Open tfo.html with Live Server. Path to tfo.html is /drag-drop-matching/test/lessons/tfo.html.
---

## Sample JSON

<ul>
  <li>If there is a benner image, add the data into src and alt in matchingImage. For example:</li>
</ul>

```javascript
  {
    "matchingImage": [{"src": "../assets/img/sample_image.png", "alt": "Matching ILO sample image"}],
  }
```

<ul>
  <li>If no banner image, please leave it blank. </li>
</ul>

```javascript
  {
    "matchingImage": [{"src": "", "alt": ""}],
  }
```

<ul>
  <li>The total set of items would be more than 2 but no more than 6. </li>
</ul>

```javascript
{
  "matchingQuestion": "The matching question goes here",
  // If there is a banner image, add the data into src and alt. If no image, please leave it blank.
  "matchingImage": [{"src": "", "alt": ""}],
  "successMessage": "Feedback Message",
  
  // The items should be more than 2, and max at 6. 
  "items": [
    {
      "first": "First Card 1",
      "second": "Second Card 1"
    },
    {
      "first": "First Card 2",
      "second": "Second Card 2"
    },
    {
      "first": "First Card 3",
      "second": "Second Card 3"
    },
    {
      "first": "First Card 4",
      "second": "Second Card 4"
    },
    {
      "first": "First Card 5",
      "second": "Second Card 5"
    },
    {
      "first": "First Card 6",
      "second": "Second Card 6"
    }
  ],
  "iloStartLink": "The Beginning of SkipLink Link Text",
  "iloStartText": "The Beginning of SkipLink Message",
  "iloEndLink": "The End of SkipLink Link Text",
  "iloEndText": "The End of SkipLink Link Message"
}
```