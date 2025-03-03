export class BoDataService {
    storyList = [];
    isMobile = false;
    storyContainer;
    storyWrapper;
    document;
    window;

    currentStory = null
    currentStoryItem = null;
    currentStoryIndex = 0;
    currentStoryItemIndex = 0;
    smScreenMax = 768;
    seenByStoryItemOpen = true;

    styleConfigs = {
        /* Story variables */
        bo_story_height: '100px',
        bo_story_width: '100px',
        bo_story_border_radius: '50%',
        bo_story_padding: '3px',
        bo_story_border_color: '#B70D4B',
        bo_story_seen_border_color: '#959595',
        bo_story_border_width: '2px',
        bo_story_border_type: 'solid',
        bo_story_gap: '18px',

        /* Story image variables */
        bo_story_img_height: '100%',
        bo_story_img_width: '100%',
        bo_story_img_border_radius: '50%',
        bo_story_img_background_size: '25px',

        /* Story badge */
        bo_story_badge_height: '24px',
        bo_story_badge_width: '24px',
        bo_story_badge_font_size: '14px',
        bo_story_badge_font_weight: '400',
        bo_story_badge_font_line_height: '20px',
        bo_story_badge_font_style: 'normal',
        bo_story_badge_bg_color: '#EEBD22',
        bo_story_badge_color: '#000000',

        /*  Pop_up  */
        bo_pop_up_bg_color: 'rgba(0, 0, 0, 0.90)',
        bo_popup_body_height: '90vh',
        bo_popup_body_wrapper_width: '495px',
        bo_popup_body_wrapper_fullscreen_width: '700px',
        bo_popup_body_max_height: '700px',
        bo_popup_z_index: '100001',

        /*  Custom Scrollbar  */
        bo_is_sm_screen_scrollbar_hidden : true,
        bo_is_custom_scrollbar : false,
        bo_custom_scrollbar_width: '4px',
        bo_custom_scrollbar_height: '4px',
        bo_scrollbar_distance: '0',
        bo_custom_scrollbar_border_radius: '2px',
        bo_custom_scrollbar_thumb_bg_color: '#959595',
        bo_custom_scrollbar_thumb_bg_outline: '0 solid #959595',
        bo_custom_scrollbar_thumb_bg_color_hover: '#7a7979',
        bo_custom_scrollbar_thumb_bg_outline_hover: '0 solid #7a7979',
        bo_custom_scrollbar_track_shadow: 'inset 0 0 4px #313131',
        bo_custom_scrollbar_track_thumb_bg_color: '#111',
        bo_custom_scrollbar_track_thumb_bg_outline: '0 solid #111'
    };

    constructor() {
        try {
            this.document = document;
            this.window = window;
        } catch {

        }
    }

    initCssVariables(configs) {
        if (configs) {
            this.styleConfigs = {
                ...this.styleConfigs,
                ...configs
            }
        }

        for (const configsKey in this.styleConfigs) {
            this.document.documentElement.style.setProperty(
                `--${configsKey.replaceAll('_', '-')}`, `${this.styleConfigs[configsKey]}`
            );
        }

        if (this.styleConfigs.bo_is_custom_scrollbar) {
            this.document.body.classList.add('bo-custom-scrollbar');
        }

        if (this.styleConfigs.bo_is_sm_screen_scrollbar_hidden) {
            this.document.body.classList.add('bo-sm-screen-scrollbar-hidden');
        }
    }

    updateStoryInfo = () => {
        this.updateStoryProp();
        this.updateStoryItemProp();
    }

    updateStoryProp = () => {
        this.currentStory = this.storyList[this.currentStoryIndex];
    }

    updateStoryItemProp = () => {
        this.currentStoryItem = this.currentStory.items[this.currentStoryItemIndex];
    }

    updateCurrentStoryIndexBySeen = () => {
        this.updateStoryProp();
        if (!this.currentStory.seen) {
            this.currentStoryItemIndex = this.currentStory.items.findIndex(item => !item.seen);
            if (this.currentStoryItemIndex < 0) {
                this.currentStoryItemIndex = 0;
            }
        } else {
            this.currentStoryItemIndex = 0;
        }
        this.updateStoryItemProp();
    }

    checkBreakpoints = () => {
        const width = this.window.innerWidth;
        const bodyElement = this.document.body;

        if (this.isMobile) {
            bodyElement.classList.add('bo-story-small-screen');
        } else if (width <= this.smScreenMax) {
            bodyElement.classList.add('bo-story-small-screen');
            bodyElement.classList.remove('bo-story-large-screen');
        } else {
            bodyElement.classList.add('bo-story-large-screen');
            bodyElement.classList.remove('bo-story-small-screen');
        }

        setTimeout(() => {
            if (this.storyContainer.scrollWidth > this.storyContainer.clientWidth) {
                this.storyContainer.classList.add('has-scrollbar');
            }
        });
    }

    // Set the value when the page is loaded
    updateViewportUnits = () => {
        let vh = this.window.innerHeight * 0.01;
        let vw = this.window.innerWidth * 0.01;
        this.document.documentElement.style.setProperty('--real-vh', `${vh}px`);
        this.document.documentElement.style.setProperty('--real-vw', `${vw}px`);
    }
}
