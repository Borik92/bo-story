import {BoDataService} from './services/bo-data.service.js';
import {BoStoryEventService} from './services/bo-story-event.service';
import {BoStoryPopUpService} from './services/bo-story-pop-up.service';
import {BoCarouselService} from './services/bo-carousel.service';
import {BoStoryService} from './services/bo-story-service';
import {BoUtilsService} from './services/bo-utils.service';
import {BoSvgElementsService} from './services/bo-svg-elements.service';
import './styles/bo-carousel.css';
import './styles/bo-story.css';
import './styles/bo-story-pop-up.css';

export class BoStory {
    #realVhTimeout;
    #dataService =  new BoDataService();
    #eventService = new BoStoryEventService();
    #popUpService = new BoStoryPopUpService();
    #carouselService = new BoCarouselService();
    #storyService = new BoStoryService();
    #utilsService = new BoUtilsService();
    #svgElementsService = new BoSvgElementsService();

    constructor({
                    storyWrapper,
                    storyList,
                    configs,
                    styleConfigs,
                    events
                }) {
        this.#eventService.dataService = this.#dataService;
        this.#eventService.popUpService = this.#popUpService;
        this.#eventService.storyService = this.#storyService;
        this.#eventService.carouselService = this.#carouselService;
        this.#eventService.utilsService = this.#utilsService;
        this.#eventService.onNavigateProfileFn = events?.onNavigateProfile;
        this.#eventService.onUnlikeFn = events?.onUnlike;
        this.#eventService.onLikeFn = events?.onLike;
        this.#eventService.onStoryItemSeenFn = events?.onStoryItemSeen;
        this.#eventService.onStorySeenFn = events?.onStorySeen;
        this.#eventService.onOpenDialogFn = events?.onOpenDialog;
        this.#eventService.onCloseDialogFn = events?.onCloseDialog;
        this.#eventService.onStoryItemViewFn = events?.onStoryItemView;
        this.#popUpService.dataService = this.#dataService;
        this.#popUpService.eventService = this.#eventService;
        this.#popUpService.carouselService = this.#carouselService;
        this.#popUpService.utilsService = this.#utilsService;
        this.#popUpService.svgElementsService = this.#svgElementsService;
        this.#carouselService.dataService = this.#dataService;
        this.#carouselService.eventService = this.#eventService;
        this.#carouselService.popUpService = this.#popUpService;
        this.#storyService.eventService = this.#eventService;
        this.#storyService.dataService = this.#dataService;
        this.#storyService.svgElementsService = this.#svgElementsService;
        this.#utilsService.dataService = this.#dataService;

        if (configs?.document) {
            this.#dataService.document = configs.document;
            this.#dataService.window = configs.document.defaultView;
        }

        this.#storyService.storyItemCountToRend = configs?.storyItemCountToRend ?? 50;
        this.#dataService.seenByStoryItemOpen = configs?.seenByStoryItemOpen ?? true;
        this.#dataService.storyList = storyList;
        this.#dataService.storyList.sort((a, b) => a.seen - b.seen);
        this.#dataService.initCssVariables(styleConfigs);
        this.#dataService.checkBreakpoints();
        this.#dataService.storyContainer = this.#storyService.createStoriesContainer();
        this.#dataService.storyWrapper = storyWrapper;

        if (configs?.svgElements) {
            for (const key in configs.svgElements) {
                this.#svgElementsService[key] = configs.svgElements[key];
            }
        }

        if (!storyWrapper) {
            throw 'Story container element not provided';
        } else if (!Array.isArray(storyList)) {
            throw 'Story array not provided';
        }

        this.#dataService.storyContainer.addEventListener('scroll', this.#storyService.onStoryContainerScroll);
        storyWrapper.append(this.#dataService.storyContainer);
        this.#dataService.window.addEventListener('resize', this.#onResize);

        // Initial stories load
        this.#storyService.loadMoreContent();
        this.#detectDevice();
        this.#detectKeyDown();
        this.#dataService.updateViewportUnits();
        this.#preventTapZoom();
    }

    #onResize = () => {
        clearTimeout(this.#realVhTimeout);
        this.#dataService.checkBreakpoints();
        this.#realVhTimeout = setTimeout(() => {
            this.#dataService.updateViewportUnits();
            this.#popUpService.updateSideWrapperPosition();
        }, 150);
    }

    #detectDevice() {
        const userAgent = this.#dataService.window.navigator.userAgent || this.#dataService.window.navigator.vendor || this.#dataService.window.opera;

        if (
            /android/i.test(userAgent) // Android device
            || /iPhone/.test(userAgent) && !this.#dataService.window.MSStream // ISO device
            || /Windows Phone|IEMobile/i.test(userAgent) // Windows device
        ) {
            this.#dataService.isMobile = true;
            this.#dataService.document.body.classList.add('bo-story-small-screen');
        } else {
            this.#dataService.isMobile = false;
        }
    }

    #preventTapZoom() {
        this.#dataService.document.addEventListener('touchstart', this.#eventService.onTouchstart, { passive: false });
        this.#dataService.document.addEventListener('doubletap', this.#eventService.stopPropagation, { passive: false });
    }

    #detectKeyDown() {
        this.#dataService.document.addEventListener('keydown', this.#eventService.onDetectKeydown);
        this.#dataService.document.addEventListener('mousedown', this.#eventService.onDetectMousedown);
    }

    openStory(id, isVideoMuted = false) {
        const index = this.#dataService.storyList.findIndex(story => story.id === id);

        if (index >= 0) {
            this.#popUpService.isVideoMuted = isVideoMuted;
            this.#dataService.currentStoryIndex = index;
            this.#eventService.openStoryPopup();
        } else {
            console.warn(`openStory: Story with id '${id}' not found`);
        }
    }

    closeDialog() {
        this.#eventService.onClosePopup();
    }

    onDestroy = () => {
        this.#storyService.removeListeners();
        this.#eventService.onClosePopup();
        this.#dataService.storyContainer.remove();
        this.#dataService.document.removeEventListener('touchstart', this.#eventService.onTouchstart);
        this.#dataService.document.removeEventListener('doubletap', this.#eventService.stopPropagation);
        this.#dataService.document.removeEventListener('keydown', this.#eventService.onDetectKeydown);
        this.#dataService.document.removeEventListener('mousedown', this.#eventService.onDetectMousedown);
        this.#dataService.window.removeEventListener('resize', this.#onResize);
        this.#dataService.storyContainer.removeEventListener('click', this.#eventService.onOpenStoryPopup);
        this.#dataService.storyContainer.removeEventListener('keydown', this.#eventService.onOpenStoryPopupByKeyDown);
        this.#dataService.storyContainer.removeEventListener('scroll', this.#storyService.onStoryContainerScroll);
    }
}

try {
    if (typeof window !== 'undefined') {
        window.BoStory = BoStory;
    }
} catch (e) {
    console.warn(`Please set document
        new BoStory({
            configs: {
                document: Document Object here,
                ...
            },
            ...
        })`
    );
}
