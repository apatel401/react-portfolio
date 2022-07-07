# "Flowchart" Widget

![](https://img.shields.io/badge/Flowchart-Elementary-purple)
![](https://img.shields.io/badge/-Built%20With-white) ![](https://img.shields.io/badge/-React-blue) ![](https://img.shields.io/badge/-Sass-blue) ![](https://img.shields.io/badge/-Gulp-blue) ![](https://img.shields.io/badge/-Webpack-blue) ![](https://img.shields.io/badge/-NodeJS-blue)

**Configurable, reusable manipulative to help students learn sequential and cyclical sequences. Can be used with images, words, phrases, etc.**

_This repo contains the source code, CSS and build scripts required to build the The Flowchart Widget._

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

To install, cd to point at your course repo then execute the following command on the command line:

```bash
npm install @digital-learning/flowchart@latest
```

This will install all of the node modules and files needed by the app to run in the course repo.

## Implementation
**Step 1**-- To yield the best results for all screen sizes, it is advised that widget be given its own wrapper using `<div class="ilo_col">`. 
Include the following snippet in the HTML where you want the widget to appear:

```html
      <div class="row">
        <div class="k8_col">
            <h3>Flowchart example</h3>
        </div>
        <!-- flowchart snippit - start -->
        <div class="ilo_col">
            <div class="ilo-brightspace-block flowchart-container" data-config="../widgets/flowchart.json"></div>
        </div>
        <!-- flowchart snippit - end -->
      </div>
      
      <!-- data-config is a relative path to the json config file with your parameters for the widget (see Step 2) -->

      <br/>
        ... etc.

```

| :exclamation:  `.ilo-brightspace-block` is a reserved class name maintained by the k8-bootstrap-css stylesheet for rendering inside Brightspace. The ILO does not specifically use this class, but all ILOs should include it to avoid issues on Brightspace. |
|-----------------------------------------|

**Step 2**-- Configure your .json file by adding all of the images, words, alt text, etc. you want to appear on the cards. Ensure that the fields and values are inputted.

- ***"iloStartText":*** message read to screen reader users when they enter ILO. Include the title or iteration number of ILO in message. 
- ***"iloEndText":*** message read to screen reader users when they exit ILO. Include the title or iteration number of ILO in message. 
- ***"iloStartLink":*** text displayed on the link that allows keyboard user to skip to end of ILO.Include the title or iteration number of ILO in message. 
- ***"iloEndLink":*** text displayed on the link that allows keyboard user to skip to start of ILO.Include the title or iteration number of ILO in message. 
- ***"type":*** (sequential or cyclical) the style of the Flowchart ILO.
- ***"draggable":*** (true or false) the draggable (options) method declares that an HTML element can be moved in the HTML page.
- ***"freeplay":*** (true or false) this value will determine whether the student has to place their answers in the correct order to be able to move onto the next step in the flow or if they can play their guesses anywhere.
- ***"successMessage":*** the words you want to appear in the final screen of the widget when all the pairs have been matched.
- ***"instruction":*** information that will display at the top of the ILO to give the student an understanding of their task
- ***"options":*** state the complete flow in the order that it should appear here. 

Under options:
- ***"textValue":*** provide the text value of what should appear on one card here
- ***"image":*** provide the file name and the alt text of the image inside the card


## json Example 1
<p>The widget below will have the player work on a sequential flowchart and start from the beginning of the flow and they must place a correct answer before they can attempt a match to the next and so on until the whole flow is complete. This example contains images in the cards. </p>

```javascript

{
    "iloStartText": "Beginning of Flowchart 2 interactive activity.",
    "iloEndText": "End of Flowchart 2 interactive activity.",
    "iloStartLink": "Enter interactive activity Flowchart 2 or press link to skip to end of activity.",
    "iloEndLink": "Press link to return to start of interactive activity Flowchart 2.",
    "type": "sequential",
    "draggable": true,
    "freeplay": false,
    "successMessage": "You did it! Way to go!",
    "instruction": "The following cards contain items that fit together in a sequence. Place the items in the correct order by dropping the cards into each answer box in sequential order.",
    "options": [{
            "textValue": "I'm a little teapot ",
            "image": ["teapot.png", "a little teapot"]
        },
        {
            "textValue": "short and stout",
            "image": ["stout.png", "a stout teapot"]

        },
        {
            "textValue": "here is my handle",
            "image": ["short.png", "a short teapot"]

        },
        {
            "textValue": "here is my spout",
            "image": ["spout.png", "a spout on a teapot"]

        }
    ]
}

```
![screenshot of sequential flowchart example](./src/img/flowchart-seq.png)

## json Example 2
<p>The widget below will have the player work on a cyclical flowchart and they are able to place a guess anywhere until they get everything correct. This example is without images. 

NOTE: The first textValue given will be locked into place to give the student a starting point.</p>

```javascript
{
    "iloStartText": "Beginning of Flowchart 3 interactive activity.",
    "iloEndText": "End of Flowchart 3 interactive activity.",
    "iloStartLink": "Enter interactive activity Flowchart 3 or press link to skip to end of activity.",
    "iloEndLink": "Press link to return to start of interactive activity Flowchart 3.",
    "type": "cyclical",
    "draggable": true,
    "freeplay": true,
    "successMessage": "You did it! Way to go!",
    "instruction": "The following cards are items that fit together in a cycle. Put the items in the correct place in the cycle by dropping the cards into the answer boxes below.",
    "options": [
        {
            "textValue": "Spring"
        },
        {
            "textValue": "Summer"
        },
        {
            "textValue": "Autumn"
        },
        {
            "textValue": "Winter"
        }
    ]
}
```
![screenshot of cyclical flowchart example](./src/img/flowchart-cyc.png)

***BE ADVISED:*** unlike other widgets in the HTML5 courses, this widget ***DOES NOT*** require ANY script snippets at the bottom of the page. The install will add everything else required.


## Configuration

### CSS

![](https://img.shields.io/badge/-File%20Location-white) ![](https://img.shields.io/badge/-./src/css/style.scss-grey)
![](https://img.shields.io/badge/-Sass-blue?style=plastic&logo=appveyor) ![](https://img.shields.io/badge/-Default%20Settings-grey)

**The following CSS classes can be targetted in your additional CSS files to override any default styles:**

**card-cyclical is used in cyclical flow charts when only words are in the cards, other wise we use .board .card below for styling.**

```scss
.card-cyclical {
    padding: 15px 15px;
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0); 
    cursor: pointer;
    margin-bottom: 15px; 
    width: 8rem;
    height: 4rem;
    border: solid 4px 
    transparent; 
    border-radius: 10px; 
    margin: 5px;
    text-align: center; 
    box-shadow: 0px 2px 0px 0px rgb(0 0 0 / 30%); 
    position: relative;
        &:hover {
            outline: none; 
            border: solid 4px #7d1863
        } 
        
        &:focus {
            outline: none; 
            border: solid 4px #7d1863 
        } 
}

.board .card {
     display: flex;
     justify-content: center;
     padding: 6px 4px;
     background-color: rgb(255, 255, 255);
     color: rgb(0, 0, 0);
     cursor: pointer;
     border: 4px solid transparent;
     border-radius: 10px;
     margin: 5px;
     min-height: 5rem;
     align-items: center;
     z-index: 5;
     box-shadow: 0px 7px 0px -2px rgb(0 0 0 / 10%);
        @media (max-width: 480px) {
            flex: 0 0 45%;}
            }


```


You can also add custom classes into the wrapper div if you'd like, as below:

```html
<div class="ilo-brightspace-block flowchart-tray your-custom-class-here" data-config="../widgets/flowchart1.json"></div>
```


## Widget Updates

Periodically there will be updates to the Flowchart Widget. In order to update your local copies, you can use the following steps:

If you know there has been an update, run:

Verify there has been an update through the following steps:

1. Change directory to point at your course repo

```bash
cd /path/to/project
```
2. Run this command to check if there are any new updates

```bash
npm outdated
```

`Sample response:`

You will be alerted as to whether an update is available, as below: 

```bash
$ npm outdated
Package            Current  Wanted  Latest  Location                        Depended by
css-loader           5.2.7   5.2.7   6.6.0  node_modules/css-loader         flowchart
fancy-log            1.3.3   1.3.3   2.0.0  node_modules/fancy-log          flowchart
sass-loader         10.2.1  10.2.1  12.6.0  node_modules/sass-loader        flowchart
source-map-loader    1.1.3   1.1.3   3.0.1  node_modules/source-map-loader  flowchart
style-loader         2.0.0   2.0.0   3.3.1  node_modules/style-loader       flowchart
webpack-stream       6.1.2   6.1.2   7.0.0  node_modules/webpack-stream     flowchart
yargs               16.2.0  16.2.0  17.3.1  node_modules/yargs              flowchart
```

3. If Updates are available install latest version of ILO with the following command

```bash
npm update @digital-learning/flowchart
```

```bash
Sample response:
```

```bash
$ npm update @digital-learning/flowchart
+ @digital-learning/flowcharte@1.0.1
changed 1 packages, and audited 5 packages in 0.5s

0 vulnerabilities
```

| :exclamation:**DO NOT** run a global `npm update` on a repo as this will update ALL widgets, not just the one you want to update, which could break other widgets!!! |
| 