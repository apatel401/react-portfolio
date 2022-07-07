# Flashcards

![](https://img.shields.io/badge/Flashcards-purple)
![](https://img.shields.io/badge/-Built%20With-white) ![](https://img.shields.io/badge/-React-blue) ![](https://img.shields.io/badge/-Sass-blue) ![](https://img.shields.io/badge/-Gulp-blue) ![](https://img.shields.io/badge/-Webpack-blue)

**Configurable, reusable manipulative to help students learn English/French vocabulary and memorization. Can be used with images, words definitions and sounds.**

_This repo contains the source code, CSS, and build scripts required to build the Flashcards Widget._

---

###Table of Contents
[TOC]

---

## Getting started

**[This documentation](https://content-solutions.s3.ca-central-1.amazonaws.com/documentation/ILOs/prerequisites.html) provides information on:**

:gear: **setting up `GIT` on your local machine**
:gear: **setting up `NodeJS` and `NPM`**
:gear: **setting up `GitLab` credentials**

### Installation of widget in course

To install, `cd` (change directory) to point at your course repo then execute the following command on the command line:

```bash
npm install @digital-learning/flashcards@latest
```

This will install all of the node modules and files needed by the app to run in the course repo.

---

## Implementation

**To yield the best results for all screen sizes, it is advised that the widget be given its own wrapper using** `<div class="ilo_col">`.

Include the following snippet in the HTML where you want the widget to appear:

```html
<div class="row">
  <div class="k8_col">
    <h3>Flashcard example</h3>
  </div>
  <!-- flashcard snippit - start -->
  <div class="ilo_col">
    <div
      class="ilo-brightspace-block flashcard-container"
      data-config="../widgets/flashcard.json"
    ></div>
  </div>
  <!-- flashcard snippit - end -->
</div>

<!-- data-config is a relative path to the json config file with your parameters for the widget (see Step 2) -->
... etc.
```

<br>

| :exclamation: `.ilo-brightspace-block` is a reserved class name maintained by the k8-bootstrap-css stylesheet for rendering inside Brightspace. The ILO does not specifically use this class, but all ILOs should include it to avoid issues on Brightspace. |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

<br>

---

## Configuration

**Configure your .json file by all of the data you want your Flashcards to have once rendered in the course.**

Some fields you may want to leave empty to start, while others allow you to set or alter the style settings for different parts of the calculator.

### JSON

```json
"iloStartText": "A message for screen readers when learner entering the ILO."
"iloEndText": "A message for screen readers when learner exit the ILO."
"iloStartLink": "A message appears when learner enters ILO."
"iloEndLink": "A message appears when learner exits ILO."
"shuffleButton": "(true or false) set this field to true, if a shuffle button is needed."
"instruction": "information that will display at the top of the ILO to give the student an understanding of their task."

"Under items:"
"title": "A title name for screen reader only. (Recommended, but not required)"
"imgFront": "this line inputs the content for the left column. It is comprised of 2 strings of information:"

1". The filename of the image to add to the front card (Not required)"
2". The alt text for the image (Not required)"

"headerValueFront": "a title for the front, a visible label for the image, a word alone, etc. (Not required)"
"textValueFront": "any text to appear on the front card, a visible label for the image, a word alone, etc. (Not required)"
"audioFileFront": "the filename of the audio to add to the front card (Not required)"
"imgBack": "this line inputs the content for the left column. It is comprised of 2 strings of information:"

1". The filename of the image to add to the back card (Not required)"
2". The alt text for the image (Not required)"


"headerValueBack": "a title for the back, a visible label for the image, a word alone, etc. (Not required)"
"textValueBack": "any text to appear on the front card, a visible label for the image, a word alone, etc. (Not required)"
"audioFileBack": "the filename of the audio to add to the back card (Not required)"

```

_NOTE: Any combination of items to be displayed can be used on front and back._

### JSON Example 1

<p>The widget below has an example one of value.  There will be a shuffle button with an image and audio in the front.

PLEASE NOTE: Each card must have a title for screen readers only.</p>

```json
{
    "iloStartText": "Beginning of Flashcards 1 interactive activity.",
    "iloEndText": "End of Flashcards 1 interactive activity.",
    "iloStartLink": "Enter interactive activity Flashcards 1 or press link to skip to end of activity.",
    "iloEndLink": "Press link to return to start of interactive activity Flashcards 1.",
    "shuffleButton": true,
    "instruction": "What are the steps of the water cycle? Click flip button to reveal the answer. Use the arrow keys to navigate between cards. This ILO contains audio. To toggle between playing and pausing use the audio button.",
    "items": [
        {
            "title": "card 1",
            "headerValueFront": "Evaporation",
            "imgFront": ["evaporation.svg","LXD to provide detailed description for image alt tag"],
            "audioFileFront": "2",
            "headerValueBack": "Evaporation",
            "textValueBack": "Evaporation happens when a liquid turns into a gas."
        },
        {
            "title": "card 2",
            "headerValueBack": "Deposition",
            "imgFront": ["Deposition.svg","LXD to provide detailed description for image alt tag"],
            "headerValueFront": "Evaporation",
            "textValueFront": "Deposition is the opposite of sublimation, where water vapor changes directly into ice.",
            "audioFileFront": "3",
            "textValueBack": "Deposition is the opposite of sublimation, where water vapor changes directly into ice."
        },
        {
            "title": "card 3",
            "headerValueBack": "Sublimation",
            "imgFront": ["T1.svg","LXD to provide detailed description for image alt tag"],
            "headerValueFront": "Sublimation",
            "textValueFront": "Sublimation",
            "audioFileFront": "4",
            "textValueBack": "Sublimation is the transition of a substance directly from the solid to the gas state, without passing through the liquid state."
        }
    ]
}
```

![View of front of ILO when image, audio, and header text appear](src/img/front-audio-Img.png)
![View of back of ILO when header text and text appear](src/img/back-audio-Img.png)

### JSON Example 2

<p>The widget below does not randomize the shuffle button and no audio button.

PLEASE NOTE: Each card must have a title for screen readers only.</p>

```json
{
  "iloStartText": "Beginning of Flashcards 2 interactive activity.",
  "iloEndText": "End of Flashcards 2 interactive activity.",
  "iloStartLink": "Enter interactive activity Flashcards 2 or press link to skip to end of activity.",
  "iloEndLink": "Press link to return to start of interactive activity Flashcards 2.",
  "instruction": "What is the natural habitat of these animals? Click flip button to reveal the answer. Use the arrow keys to navigate between cards.",
  "items": [
    {
      "title": "card 1",
      "headerValueFront": "Whale",
      "imgFront": [
        "whale.png",
        "LXD to provide detailed description for image alt tag"
      ],
      "headerValueBack": "Whale",
      "textValueBack": "The blue whale lives in every ocean in the world, this means it inhabits every aquatic habitat."
    },
    {
      "title": "card 2",
      "headerValueFront": "Parrot",
      "imgFront": [
        "parrot.png",
        "LXD to provide detailed description for image alt tag"
      ],
      "headerValueBack": "Parrot",
      "textValueBack": "Most wild parrots live in the warm areas of the Southern Hemisphere."
    }
  ]
}
```

![View of front of ILO when image and header text appear](src/img/front-Shuffle-Img.png)
![View of back of ILO when header text and text appear](src/img/back-Shuffle-Img.png)

### JSON Example 3

<p>The widget below does not randomize the shuffle button, no audio button and only displays an image on the front.

PLEASE NOTE: Each card must have a title for screen readers only.</p>

```json
{
  "iloStartText": "Beginning of Flashcards 3 interactive activity.",
  "iloEndText": "End of Flashcards 3 interactive activity.",
  "iloStartLink": "Enter interactive activity Flashcards 3 or press link to skip to end of activity.",
  "iloEndLink": "Press link to return to start of interactive activity Flashcards 3.",
  "instruction": "How many legs do these animals have? Click flip button to reveal the answer. Use the arrow keys to navigate between cards.",
  "items": [
    {
      "title": "card 2",
      "imgFront": [
        "cat.jpg",
        "LXD to provide detailed description for image alt tag"
      ],
      "headerValueBack": "Cat",
      "textValueBack": "Four"
    },
    {
      "title": "card 3",
      "imgFront": [
        "cow.jpg",
        "LXD to provide detailed description for image alt tag"
      ],
      "headerValueBack": "Cow",
      "textValueBack": "Four"
    },
    {
      "title": "card 6",
      "imgFront": [
        "fish.jpg",
        "LXD to provide detailed description for image alt tag"
      ],
      "headerValueBack": "Fish",
      "textValueBack": "Zero"
    },
    {
      "title": "card 7",
      "imgFront": [
        "monkey.jpg",
        "LXD to provide detailed description for image alt tag"
      ],
      "headerValueBack": "Monkey",
      "textValueBack": "Two"
    }
  ]
}
```

![View of front of ILO when image only appear](src/img/front-Img.png)
![View of back of ILO when header text and text appear](src/img/back-Img.png)

| :exclamation: **_BE ADVISED:_** unlike other widgets in the HTML5 courses, this widget **_DOES NOT_** require ANY script snippets at the bottom of the page. The install will add everything else required. |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

---

### CSS

**The following CSS classes can be targetted in your additional CSS files to override any default styles:**

![](https://img.shields.io/badge/-File%20Location-white) ![](https://img.shields.io/badge/-./src/css/app.scss-grey)
![](https://img.shields.io/badge/-Sass-blue?style=plastic&logo=appveyor) ![](https://img.shields.io/badge/-Default%20Settings-grey)

```scss
.flash-card-container {
  display: flex;
  justify-content: center;
  background-color: transparent;
  flex-shrink: 0;
  box-sizing: border-box;
  align-content: center;
  width: 100%;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  filter: drop-shadow(0px 4px 0px rgba(0 0 0 / 0.1));
  padding-top: 20px;
  padding-left: 1rem;
  padding-right: 1rem;

  & p {
    font-size: 1.2rem;
  }
}

.flash-cards {
  display: grid;
}

.flash-card {
  perspective: 40rem;
}

.flash-card-body {
  display: flex;
  transform-style: preserve-3d;
  transition: transform 1.5s;
  height: 100%;
}

.cardHeaderFront,
.cardHeaderBack {
  font-size: 1.5rem !important;
  padding-top: 15px;
}

.cardTextBody {
  margin: auto;
  padding: 10px;
}

.flash-card-front,
.flash-card-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0 5px 10px black;
  padding: 0.5rem;
}
```

You can also add custom classes into the `<div>` wrapper for further customization as shown below.

```html
<div
  class="ilo-brightspace-block flashcards-container your-custom-class-here"
  data-config="../widgets/flashcards1.json"
></div>
```

---

## Widget Updates

Periodically there will be updates to the Flashcards Widget. In order to update your local copies, you can use the following steps:

<br>

1. Change directory to point at your course repo

```bash
cd /path/to/project
```

<br>

2. Run this command to check if there are any new updates

   _check for new package updates_

```bash
npm outdated
```

`Sample response:`

```bash
$ npm outdated
Package                          Current  Wanted  Latest  Location                                      Depended by
@babel/core                       7.17.0  7.17.5  7.17.5  node_modules/@babel/core                      flashcards
@digital-learning/widget-common    1.1.0   1.1.5   1.1.5  node_modules/@digital-learning/widget-common  flashcards
css-loader                         5.2.7   5.2.7   6.6.0  node_modules/css-loader                       flashcards
fancy-log                          1.3.3   1.3.3   2.0.0  node_modules/fancy-log                        flashcards
sass                              1.49.7  1.49.9  1.49.9  node_modules/sass                             flashcards
sass-loader                       10.2.1  10.2.1  12.6.0  node_modules/sass-loader                      flashcards
source-map-loader                  1.1.3   1.1.3   3.0.1  node_modules/source-map-loader                flashcards
style-loader                       2.0.0   2.0.0   3.3.1  node_modules/style-loader                     flashcards
webpack                           5.68.0  5.69.1  5.69.1  node_modules/webpack                          flashcards
webpack-stream                     6.1.2   6.1.2   7.0.0  node_modules/webpack-stream                   flashcards
yargs                             16.2.0  16.2.0  17.3.1  node_modules/yargs                            flashcards
```

<br>

3. If Updates are available install latest version of ILO with the following command

```bash
npm install
```

`Sample response:`

```bash
$ npm install

changed 17 packages, and audited 910 packages in 5s

49 packages are looking for funding
  run `npm fund` for details

17 vulnerabilities (6 moderate, 11 high)
```

<br>

| :exclamation:**DO NOT** run a global `npm update` on a repo as this will update ALL widgets, not just the one you want to update, which could break other widgets!!! |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
