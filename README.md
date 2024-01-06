# BO Story JavaScript Project

Welcome to the BO Story library. Use this library to integrate story-styled interfaces into your projects.

## Table of Contents
- [Demo](#Demo)
- [Installation](#Installation)
- [Usage](#Usage)
- [Destroy](#Destroy)
- [Configurations](#Configurations)
- [GitHub](#GitHub)

## Demo

Check out the [Live Demo](https://story.bo-view.com) here.

## Installation

1. Navigate to your project's root directory.
2. Ensure you have `node` and `npm` installed on your machine.
3. Install the required project dependencies:

```bash
npm install bo-story
```

## Usage

To use the `BO Story` library in your project, follow these steps:

Include `node_modules/bo-story/bo-story-bundle.css` and `node_modules/bo-story/bo-story-bundle.mjs`to your project.

```ts
import {BoStory} from 'bo-story/bo-story-bundle';

const options: IBoStoryOptions = {
    storyList: stories,
    storyWrapper: document.getElementById('story-list-container'),
    configs, // Optional
    styleConfigs, // Optional
    events: { // Optional
        onStorySeen: (event: IBoStory): void => {/* Code here */},
        onStoryItemSeen: (event: IBoStoryItem): void => {/* Code here */},
        onStoryItemView: (event: IBoStory): void => {/* Code here */},
        onLike: (event: IBoStoryItem): void => {/* Code here */},
        onUnlike: (event: IBoStoryItem): void => {/* Code here */},
        onNavigateProfile: (event: IBoStoryItem): void => {/* Code here */},
        onOpenDialog: (event: IBoStory): void => {/* Code here */},
        onCloseDialog: (event: IBoStory): void => {/* Code here */},
    }
};

const boStory = new BoStory(options);
```

## Events
`bo-story-seen`

`bo-story-item-seen`

`bo-story-item-like`

`bo-story-item-unlike`

`bo-navigate-profile`

```html
<div id="your-story-container-id"></div>
```

```ts
/* AddEventListener approch */
const storyContainer = document.getElementById('your-story-container-id');
storyContainer.addEventListener('bo-story-seen', (event: IBoStory): void => {/* Code here */});
storyContainer.addEventListener('bo-story-item-seen', (event: IBoStoryItem): void => {/* Code here */});
storyContainer.addEventListener('bo-story-item-view', (event: IBoStoryItem): void => {/* Code here */});
storyContainer.addEventListener('bo-story-item-like', (event: IBoStoryItem): void => {/* Code here */});
storyContainer.addEventListener('bo-story-item-unlike', (event: IBoStoryItem): void => {/* Code here */});
storyContainer.addEventListener('bo-navigate-profile', (event: IBoStoryItem): void => {/* Code here */});
storyContainer.addEventListener('bo-open-dialog', (event: IBoStory): void => {/* Code here */});
storyContainer.addEventListener('bo-close-dialog', (event: IBoStory): void => {/* Code here */});

const options: IBoStoryOptions = {
    storyList: stories,
    storyWrapper: document.getElementById('story-list-container')
};

const boStory = new BoStory(options);
```
## Destroy

```ts
/* To destroy stories call onDestroy method */
boStory.onDestroy();
```


## Configurations

```ts
interface IBoStoryOptions {
    storyWrapper: HTMLElement;
    storyList: IBoStory[];
    configs?: IBoConfigs;
    styleConfigs?: IBoStyleConfigs;
    events?: IBoEvents;
}

interface IBoStory {
    seen: boolean;
    id: number | string;
    name: string;
    imageUrl: string;
    items: IBoStoryItem[];
    titleNestedHtml?: string;
}

interface IBoStoryItem {
    id: string | number;
    mediaType: 'image' | 'video';
    mediaExt: string;
    liked: boolean;
    seen: boolean;
    likeCount: number;
    timeSince: string;
    storyUrl: string;
    isMuted?: boolean;
    description?: string;
    footerNestedHtml?: string;
    caption?: string;
}

interface IBoEvents {
    onStorySeen?: (event: IBoStory) => void,
    onStoryItemSeen?: (event: IBoStoryItem) => void,
    onStoryItemView?: (event: IBoStory) => void,
    onLike?: (event: IBoStoryItem) => void,
    onUnlike?: (event: IBoStoryItem) => void,
    onNavigateProfile?: (event: IBoStoryItem) => void,
    onOpenDialog?: (event: IBoStory) => void,
    onCloseDialog?: (event: IBoStory) => void
}

/* Available configs. Configs object and it's all properties are optional */
interface IBoConfigs {
    isSmScreenScrollbarHidden?: boolean; // true by default
    seenByStoryItemOpen?: boolean;
    isCustomScrollbar?: boolean;
    document?: Document; // In case of SRR is need to pass Document object
}

/* Available style configs. Style configs object and it's all properties are optional */
interface IBoStyleConfigs {
    /* Story variables */
    bo_story_height?: string,
    bo_story_width?: string,
    bo_story_border_radius?: string,
    bo_story_padding?: string,
    bo_story_border_color?: string,
    bo_story_seen_border_color?: string,
    bo_story_border_width?: string,
    bo_story_border_type?: string,
    bo_story_gap?: string,

    /* Story image variables */
    bo_story_img_height?: string,
    bo_story_img_width?: string,
    bo_story_img_border_radius?: string,

    /* Story badge */
    bo_story_badge_height?: string,
    bo_story_badge_width?: string,
    bo_story_badge_font_size?: string,
    bo_story_badge_font_weight?: string,
    bo_story_badge_font_line_height?: string,
    bo_story_badge_font_style?: string,
    bo_story_badge_bg_color?: string,
    bo_story_badge_color?: string,

    /* Pop_up */
    bo_pop_up_bg_color?: string,
    bo_popup_body_height?: string,
    bo_popup_body_wrapper_width?: string,
    bo_popup_body_wrapper_fullscreen_width?: string,
    bo_popup_body_max_height?: string,
    bo_popup_z_index?: string,

    /*  Custom Scrollbar  */
    bo_custom_scrollbar_width?: string,
    bo_custom_scrollbar_height?: string,
    bo_scrollbar_distance?: string,
    bo_custom_scrollbar_border_radius?: string,
    bo_custom_scrollbar_thumb_bg_color?: string,
    bo_custom_scrollbar_thumb_bg_outline?: string,
    bo_custom_scrollbar_thumb_bg_color_hover?: string,
    bo_custom_scrollbar_thumb_bg_outline_hover?: string,
    bo_custom_scrollbar_track_shadow?: string,
    bo_custom_scrollbar_track_thumb_bg_color?: string,
    bo_custom_scrollbar_track_thumb_bg_outline?: string
}

/* As alternative can be overwritten css variables */
    /* Story variables */
    --bo-story-height
    --bo-story-width
    --bo-story-border-radius
    --bo-story-padding
    --bo-story-border-color
    --bo-story-seen-border-color
    --bo-story-border-width
    --bo-story-border-type
    --bo-story-gap

    /* Story image variables */
    --bo-story-img-height
    --bo-story-img-width
    --bo-story-img-border-radius

    /* Story badge */
    --bo-story-badge-height
    --bo-story-badge-width
    --bo-story-badge-font-size
    --bo-story-badge-font-weight
    --bo-story-badge-font-line-height
    --bo-story-badge-font-style
    --bo-story-badge-bg-color
    --bo-story-badge-color

    /* Pop-up */
    --bo-pop-up-bg-color
    --bo-popup-body-height
    --bo-popup-body-wrapper-width
    --bo-popup-body-wrapper-fullscreen-width
    --bo-popup-body-max-height
    --bo-popup-z-index

    /*  Custom Scrollbar  */
    --bo-custom-scrollbar-width
    --bo-custom-scrollbar-height
    --bo-scrollbar-distance
    --bo-custom-scrollbar-border-radius
    --bo-custom-scrollbar-thumb-bg-color
    --bo-custom-scrollbar-thumb-bg-outline
    --bo-custom-scrollbar-thumb-bg-color-hover
    --bo-custom-scrollbar-thumb-bg-outline-hover
    --bo-custom-scrollbar-track-shadow
    --bo-custom-scrollbar-track-thumb-bg-color
    --bo-custom-scrollbar-track-thumb-bg-outline
```

## GitHub

You can find the source code for this project on GitHub:

[GitHub Repository](https://github.com/Borik92/bo-story)
