export class BoStory {
    constructor(options?: IBoStoryOptions);

    openStory: (id: string | number, isVideoMuted?: boolean) => void;
    closeDialog: () => void;
    onDestroy: () => void;
}

interface IBoStoryOptions {
    storyWrapper: HTMLElement;
    storyList: IBoStory[];
    configs?: IBoConfigs;
    styleConfigs?: IBoStyleConfigs;
    events?: IBoEvents;
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

interface IBoStory {
    seen: boolean;
    id: number | string;
    name: string;
    imageUrl: string;
    titleNestedHtml?: string;
    items: IBoStoryItem[];
    imgAlt?: string;
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
    footerNestedActionHtml?: string;
    imgAlt?: string;
}

interface IBoConfigs {
    seenByStoryItemOpen?: boolean;
    storyItemCountToRend?: number;
    document?: Document,
    svgElements?: {
        arrowLeftIcon?: string;
        arrowRightIcon?: string;
        closeIcon?: string;
        likeIcon?: string;
        fullScreenIcon?: string;
        exitFullScreenIcon?: string;
        mutatedIcon?: string;
        unmutatedIcon?: string;
        playIcon?: string;
        pauseIcon?: string;
        storyImageLoaderIcon?: string;
        storyItemImageLoaderIcon?: string;
    }
}

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
    bo_is_sm_screen_scrollbar_hidden ?: boolean;
    bo_is_custom_scrollbar ?: boolean;
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
