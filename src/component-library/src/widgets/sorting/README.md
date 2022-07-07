# Sorting Table ILO

![](https://img.shields.io/badge/Sorting%Table%20k-8%20-purple)
![](https://img.shields.io/badge/-Built%20With-white) ![](https://img.shields.io/badge/-React-blue) ![](https://img.shields.io/badge/-Sass-blue) ![](https://img.shields.io/badge/-Gulp-blue) ![](https://img.shields.io/badge/-Webpack-blue)

***Configurable, reusable widget to re-enforce students' learning by sorting cards in up to 4 different categories.***

***These widgets can be placed into HTML5 pages.***

***This repo contains the source code, CSS and build scripts required to build the The Sorting Table Widget.***

---

###Table of Contents
[TOC]

---

### Getting started

[This documentation](https://content-solutions.s3.ca-central-1.amazonaws.com/documentation/ILOs/prerequisites.html) provides information on:
- setting up Git on your local machine
- setting up NodeJS and NPM
- setting up GitLab credentials

### Installation of widget in course

To install, cd to point at your course repo then execute the following command on the command line:

`npm install @digital-learning/sorting-table@latest`

This will install all of the node modules and files needed by the app to run in the course repo.

## Implementation

**Step 1**-- To yield the best results for all screen sizes, it is advised that widget be given its own wrapper using `<div class="ilo_col">`.
Include the following snippet in the HTML where you want the widget to appear:

```html
<div class="row">
  <div class="k8_col">
    <h3>Sorting-Table example</h3>
  </div>
</div>
<!-- column chart snippit - start -->
<div class="row">
  <div class="ilo_col">
    <div
      class="ilo-brightspace-block sorting-container"
      data-config="../widgets/sorting.json"
    ></div>
  </div>
</div>
<!-- column chart snippit - end -->

<!-- data-config is a relative path to the json config file with your parameters for the widget (see Step 2) -->

<br />
... etc.
```

| :exclamation: `.ilo-brightspace-block` is a reserved class name maintained by the k8-bootstrap-css stylesheet for rendering inside Brightspace. The ILO does not specifically use this class, but all ILOs should include it to avoid issues on Brightspace. |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

**Step 2**-- Configure your .json file by all of the data you want your sorting table to have once rendered in the course. 

### JSON Example

```javascript

{
    "instructions": "Place the cards into categories that best match. Which places are Cities, Countries, Provinces or Planets?", // add your instructions for the ILO's use
    "validation": true,  // set this field to true if there is a correct answer for each card & false if not
    "fontSizeMain": 20, // you can control the font size of card text here
    "fontSizeHeading": 28,  // you can control the font size of category headings here
    "successMessage": "",  // add the message you wish to appear when the student has successfully completed ILO
    "tryAgainMessage": "",  // add the try again message you wish to appear when card is mismatched to a category
    "replayMessage": "Play Again", // add replay message here
    "iloStartText": "Beginning of sorting table 1 interactive activity.",  // below four lines for screenreader optimization. Please include the title of the ilo so the screenreader user is aware of what ilo they are interacting with. e.g. start of sorting table interactive titled: Places. 
    "iloEndText": "End of sorting table 1 interactive activity.",
    "iloStartLink": "Enter interactive activity Sorting Table 1 or press link to skip to end of activity.",
    "iloEndLink": "Press link to return to start of interactive activity Sorting Table 1.",
    "cards": [
    {   // you can add text to each card, an image to each card, or an image and a caption to each card
        // whatever fields you are not using can remain empty
        "text": "",
        "src": "http://placekitten.com/g/200/300",
        "alt": "cute kitten",
        "caption": "",
        "category_id": 1 // give each card the category_id for its matching category
    },
    {
        "text": "Ontario",
        "src": "",
        "alt": "",
        "caption": "",
        "category_id": 4
    },
    {
        "text": "France",
        "src": "",
        "alt": "",
        "caption": "",
        "category_id": 2
    },
    {   "text": "Saturn",
        "src": "",
        "alt": "",
        "caption": "",
        "category_id": 3 
    }
    ],
    
    "categories": [
        {
            "title": "Cities",
            "id": 1   // this is the number that will be given as category_id to all cards matching Cities
        },
        {
            "title": "Countries",
            "id": 2
        },
        {
            "title": "Planets",
            "id": 3
        },
        {
            "title": "Provinces",
            "id": 4
        }
    ]
}       
```

**_BE ADVISED:_** unlike other widgets in the HTML5 courses, this widget **_DOES NOT_** require ANY script snippets at the bottom of the page. The install will add everything else required.

## Configuration

The following CSS classes can be targetted in your additional CSS files to override any default styles:

```scss
// the wrapper div containing the column chart widget
.sorting-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: #c6e3dc 0% 0% no-repeat padding-box;
    border-radius: 20px;
    min-height: 450px;

    .category-wrapper {
        color: #1C3C45;
        margin: 0 10px 20px 10px;
        min-height: calc(50% - 30px);
        width: calc(50% - 30px);
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
            margin-top: 1rem;
        }
    }

    .category-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .category {
        border: none;
        background: #8fb5af;
        border-radius: 20px;
        min-height: 200px;
        width: 350px;
    }

    .card {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width:400px;
        height: fit-content;
        min-height: 115px;
        background-clip: border-box;
        border: 0;
        background: #fff;
        -webkit-hyphens: auto;
        hyphens: auto;
        padding: 14px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border-radius: 20px;
        box-shadow: 0px 2px 0px 0px rgb(0 0 0 / 30%);
        color: #000000;
        }
}
```

You can also add custom classes into the wrapper div if you'd like, as below:

```html
<div
  class="ilo-brightspace-block sorting-container your-custom-class-here" data-config="../widgets/sorting.json"
></div>
```

## Widget Updates

Periodically there will be updates to the Sorting Widget. In order to update your local copies, you can use the following steps:

If you know there has been an update, run:

Verify there has been an update through the following steps:

`cd /path/to/project`

`npm outdated`

You will be alerted as to whether an update is available, as below:

![](https://content-solutions.s3.ca-central-1.amazonaws.com/courseware/wip/images/running_outdated.png)

If there is an update available, then run:

`npm update @digital-learning/sorting-table`

![](https://content-solutions.s3.ca-central-1.amazonaws.com/courseware/wip/images/running_update.png)

**DO NOT** run a global `npm update` on a repo as this will update ALL widgets, not just the one you want to update, which could break other widgets!!!
