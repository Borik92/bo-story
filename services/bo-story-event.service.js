export class BoStoryEventService {
    storyItemLikeEventName = 'bo-story-item-like';
    storyItemUnlikeEventName = 'bo-story-item-unlike';
    storyItemSeenEventName = 'bo-story-item-seen';
    storySeenEventName = 'bo-story-seen';
    storyItemView = 'bo-story-item-view';
    storyItemNavigateProfile = 'bo-navigate-profile';
    storyOpenDialogEventName = 'bo-open-dialog';
    storyCloseDialogEventName = 'bo-close-dialog';
    utilsService;
    dataService;
    popUpService;
    carouselService;
    mouseDownTime;
    longPressThreshold = 150;
    isStoryPlaying = false;
    isStoryPlayingBeforeTabChange = false;
    longPressDetected = false;
    videoPlayIconTimeout;
    storyService;
    onStoryItemViewFn;
    onNavigateProfileFn;
    onUnlikeFn;
    onLikeFn;
    onStoryItemSeenFn;
    onStorySeenFn;
    onOpenDialogFn;
    onCloseDialogFn;

    onPopupContainerClick = (event) => {
        const eventTarget = event.target;

        if (
            this.findByClass(eventTarget, 'bo-poster-container')
        ) {
            this.onNavigateProfile();

            return;
        }

        if (this.findByClass(eventTarget, 'bo-story-item-mutation-icon')) {
            this.onToggleVideoMute();
            return;
        }

        if (this.findByClass(eventTarget, 'bo-close-icon')) {
            this.onClosePopup();
            return;
        }

        if (this.findByClass(eventTarget, 'bo-exit-full-screen-icon')) {
            this.onToggleFullScreen();
            return;
        }

        if (this.findByClass(eventTarget, 'bo-story-item-like-btn')) {
            this.onToggleLikeStoryItem();
            return;
        }

        if (this.findByClass(eventTarget, 'bo-arrow-left-icon')) {
            clearInterval(this.popUpService.progressClearInterval);
            this.onPreviousStoryItem();
            return;
        }

        if (this.findByClass(eventTarget, 'bo-arrow-right-icon')) {
            clearInterval(this.popUpService.progressClearInterval);
            this.onNextStoryItem();
            return;
        }

        if (
            this.findByClass(eventTarget, 'bo-story-item-footer')
            || this.findByClass(eventTarget, 'bo-story-item-header')
        ) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }

        if (
            this.findByClass(eventTarget, 'bo-popup-body-left-side')
            && !this.dataService.isMobile
            && this.dataService.window.innerWidth <= this.dataService.smScreenMax
        ) {
            event.stopPropagation();
            this.onPreviousStoryItem();
            return;
        }

        if (
            this.findByClass(eventTarget, 'bo-popup-body-right-side')
            && !this.dataService.isMobile
            && this.dataService.window.innerWidth <= this.dataService.smScreenMax
        ) {
            event.stopPropagation();
            this.onNextStoryItem();

            return;
        }

        if (
            this.findByClass(eventTarget, 'bo-popup-body-wrapper')
            && this.dataService.window.innerWidth > this.dataService.smScreenMax
            && !this.dataService.isMobile
        ) {
            this.onToggleStoryPlayOrPauseByValue(!this.isStoryPlaying);

            if (!this.isStoryPlaying) {
                clearInterval(this.popUpService.progressClearInterval);
            } else {
                this.popUpService.triggerStoryItemProgressBar(false);
            }

            return;
        }
    }

    onPopupContainerKeyDown = (event) => {
        const eventTarget = event.target;

        if (event.key === 'Enter') {
            if (this.findByClass(eventTarget, 'bo-story-item-mutation-icon')) {
                this.onToggleVideoMute();
                return;
            }

            if (this.findByClass(eventTarget, 'bo-close-icon')) {
                this.onClosePopup();
                return;
            }

            if (this.findByClass(eventTarget, 'bo-exit-full-screen-icon')) {
                this.onToggleFullScreen();
                return;
            }

            if (this.findByClass(eventTarget, 'bo-story-item-like-btn')) {
                this.onToggleLikeStoryItem();
                return;
            }
        } else if (event.key === 'ArrowRight') {
            this.onNextStoryItem();
        } else if (event.key === 'ArrowLeft') {
            this.onPreviousStoryItem();
        } else if (event.code === 'Space') {
            this.onToggleStoryPlayOrPauseByValue(!this.isStoryPlaying);

            if (!this.isStoryPlaying) {
                clearInterval(this.popUpService.progressClearInterval);
            } else {
                this.popUpService.triggerStoryItemProgressBar(false);
            }
        } else if (event.key.toLowerCase() === 'f') {
            this.onToggleFullScreen();
        } else if (event.key === 'Escape' && !this.dataService.document.fullscreenElement) {
            this.onClosePopup();
        }
    }

    onMouseDownStorySideNavigation = () => {
        if (this.dataService.isMobile) {
            return;
        }

        this.onToggleStoryVideoPlayOrPause();
        this.mouseDownTime = Date.now();
        this.longPressDetected = false;
    }

    onMouseUpStorySideNavigation = () => {
        if (this.dataService.isMobile) {
            return;
        }

        const duration = Date.now() - this.mouseDownTime;
        if (duration >= this.longPressThreshold) {
            this.longPressDetected = true;
        }

        if (this.longPressDetected) {
            this.onToggleStoryVideoPlayOrPause();
        }
        this.mouseDownTime = 0;
    }

    onPopupContainerMouseDown = (event) => {
        const eventTarget = event.target;

        if (
            this.findByClass(eventTarget, 'bo-popup-body-side-wrapper')
            && !this.dataService.isMobile
            && this.dataService.window.innerWidth <= this.dataService.smScreenMax
        ) {
            this.onMouseDownStorySideNavigation();
            return;
        }
    }

    onPopupContainerMouseUp = (event) => {
        const eventTarget = event.target;

        if (
            this.findByClass(eventTarget, 'bo-popup-body-side-wrapper')
            && !this.dataService.isMobile
            && this.dataService.window.innerWidth <= this.dataService.smScreenMax
        ) {
            this.onMouseUpStorySideNavigation();
            return;
        }
    }

    onOpenStoryPopup = (event) => {
        const storyElement = event.target.closest('.bo-story');
        if (storyElement) {
            this.dataService.currentStoryIndex = +storyElement.getAttribute('index');
            this.openStoryPopup();
        }
    }

    openStoryPopup = () => {
        this.popUpService.isStoryPopupOpened = true;
        this.dataService.updateCurrentStoryIndexBySeen();
        this.popUpService.createPopup();
        this.dataService.storyContainer.removeEventListener('click', this.onOpenStoryPopup);
        this.dataService.storyContainer.removeEventListener('keydown', this.onOpenStoryPopupByKeyDown);
        this.dataService.document.addEventListener("visibilitychange", this.onTabChange);

        const eventData = new CustomEvent(this.storyOpenDialogEventName, { detail: this.dataService.currentStory});
        this.dataService.storyWrapper.dispatchEvent(eventData);

        if (typeof this.onOpenDialogFn === 'function') {
            this.onOpenDialogFn(this.dataService.currentStory);
        }
    }

    findByClass = (element, className) => {
        return element.classList.contains(className) || element.closest(`.${className}`);
    }

    onOpenStoryPopupByKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onOpenStoryPopup(event);
        }
    }

    onClosePopup = (closeDuration = 0) => {
        const popupContainer = this.dataService.document.querySelector('.bo-popup-container');
        this.dataService.window.removeEventListener('resize', this.carouselService.onScreenSizeChange);
        this.dataService.document.body.classList.remove('bo-overflow-hidden');
        this.dataService.document.body.classList.remove('bo-keyboard-user');
        this.dataService.document.removeEventListener('fullscreenchange', this.fullscreenChanged);
        this.dataService.document.removeEventListener("visibilitychange", this.onTabChange);
        this.dataService.storyContainer.addEventListener('click', this.onOpenStoryPopup);
        this.dataService.storyContainer.addEventListener('keydown', this.onOpenStoryPopupByKeyDown);
        this.popUpService.isStoryPopupOpened = false;
        clearInterval(this.popUpService.mediaLoadingTimeout);
        clearInterval(this.popUpService.progressClearInterval);
        clearTimeout(this.carouselService.carouselResizeTimeout);
        clearTimeout(this.videoPlayIconTimeout);
        clearTimeout(this.popUpService.videoPlayingProgressTimeout);
        clearTimeout(this.popUpService.imgPlayingProgressTimeout);
        clearTimeout(this.carouselService.clearPlayCurrentVideoTimeout);

        this.storyService.rendStoriesContent();

        setTimeout(() => {
            popupContainer?.remove();
        }, closeDuration);

        const eventData = new CustomEvent(this.storyCloseDialogEventName, { detail: this.dataService.currentStory});
        this.dataService.storyWrapper.dispatchEvent(eventData);

        if (typeof this.onCloseDialogFn === 'function') {
            this.onCloseDialogFn(this.dataService.currentStory);
        }
    }

    onClosePopupFromLastElement = (isLeft = true) => {
        if (!this.popUpService.isStoryPopupOpened) {
            return;
        }
        const popupContainer = this.dataService.document.querySelector('.bo-popup-container');
        if (isLeft) {
            popupContainer.classList.add('bo-popup-container-closed-to-left');
        } else {
            popupContainer.classList.add('bo-popup-container-closed-to-right');
        }
        this.onClosePopup(200);
    }

    onNextStoryItem = () => {
        this.onStoryItemView();
        if (this.dataService.currentStoryItemIndex === this.dataService.currentStory.items.length - 1) {
            this.onStoryItemSeenAfterView();

            if (this.dataService.currentStoryIndex >= this.dataService.storyList.length - 1) {
                if (this.dataService.currentStory.items.every(item => item.seen) && !this.dataService.configs.seenByStoryItemOpen) {
                    this.onStorySeen();
                }

                this.onClosePopupFromLastElement(false);
            } else {
                if (!this.dataService.configs.seenByStoryItemOpen) {
                    this.onStorySeen();
                }

                this.onNextStory();
                this.dataService.updateStoryInfo();
                this.popUpService.updateCubeCellElement(
                    this.dataService.currentStory,
                    this.dataService.currentStoryItem,
                    this.dataService.currentStoryIndex
                );

                this.onStoryItemSeenStoryOpen();
                return;
            }
        } else {
            this.onStoryItemSeenAfterView();
            this.dataService.currentStoryItemIndex++;
        }

        this.dataService.updateStoryInfo();
        this.popUpService.updateCubeCellElement(
            this.dataService.currentStory,
            this.dataService.currentStoryItem,
            this.dataService.currentStoryIndex
        );

        this.onStoryItemSeenStoryOpen();
    }

    onPreviousStoryItem = () => {
        this.onStoryItemView();
        if (this.dataService.currentStoryItemIndex === 0) {
           this.onStoryItemSeenAfterView();

            if (this.dataService.currentStoryIndex === 0) {
                if (this.dataService.currentStory.items.every(item => item.seen) && !this.dataService.configs.seenByStoryItemOpen) {
                    this.onStorySeen();
                }

                this.onClosePopupFromLastElement();
            } else {
                this.onPreviousStory();
                this.dataService.updateStoryInfo();
                this.popUpService.updateCubeCellElement(
                    this.dataService.currentStory,
                    this.dataService.currentStoryItem,
                    this.dataService.currentStoryIndex
                );

                this.onStoryItemSeenStoryOpen();

                return;
            }
        } else {
            this.onStoryItemSeenAfterView();
            this.dataService.currentStoryItemIndex--;
        }

        this.dataService.updateStoryInfo();
        this.popUpService.updateCubeCellElement(
            this.dataService.currentStory,
            this.dataService.currentStoryItem,
            this.dataService.currentStoryIndex
        );

        this.onStoryItemSeenStoryOpen();
    }

    onNextStory = () => {
        this.popUpService.resetCurrentCellElementProgressBarTransition();
        if (this.longPressDetected) {
            this.longPressDetected = false; // Reset the flag
        } else {
            // Logic for going to the next video
            this.carouselService.prepareCarouselToNext();
            this.carouselService.storyRotateCarousel(true);
            this.carouselService.storyCarouseEndX = 0;
            this.carouselService.storyCarouseStartX = 0;
        }

        this.carouselService.prepareStoriesToRender(true);
    }

    onPreviousStory = () => {
        this.popUpService.resetCurrentCellElementProgressBarTransition();
        if (this.longPressDetected) {
            this.longPressDetected = false; // Reset the flag
        } else {
            // Logic for going to the next video
            this.carouselService.prepareCarouselToPrevious();
            this.carouselService.storyRotateCarousel(true);
            this.carouselService.storyCarouseEndX = 0;
            this.carouselService.storyCarouseStartX = 0;
        }

        this.carouselService.prepareStoriesToRender();
    }

    onToggleStoryVideoPlayOrPause = () => {
        if (!this.popUpService.isStoryPopupOpened) {
            return;
        }

        const currentCellElement = this.popUpService.getCurrentStoryCellElement();

        if (this.dataService.currentStoryItem) {
            return;
        }

        if (this.videoPlayIconTimeout) {
            clearTimeout(this.videoPlayIconTimeout);
        }

        if (this.dataService.currentStoryItem.mediaType === this.utilsService.BO_STORY_MEDIA_TYPE.video) {
            const video = currentCellElement.querySelector('video');
            const {pauseElement, playElement} = this.getPlayPauseElements();
            pauseElement.classList.add('bo-hidden-opacity');
            playElement.classList.add('bo-hidden-opacity');
            playElement.classList.remove('bo-hidden');
            pauseElement.classList.remove('bo-hidden');

            if (video.paused) {
                pauseElement.classList.remove('bo-hidden-opacity');
                pauseElement.classList.add('bo-active-video-action');
                playElement.classList.remove('bo-active-video-action');
                video.play();
            } else {
                playElement.classList.remove('bo-hidden-opacity');
                pauseElement.classList.remove('bo-active-video-action');
                playElement.classList.add('bo-active-video-action');
                video.pause();
            }
        }

        this.videoPlayIconTimeout = setTimeout(() => {
            const { pauseElement, playElement} = this.getPlayPauseElements();
            pauseElement?.classList.add('bo-hidden-opacity');
            playElement?.classList.add('bo-hidden-opacity');
        }, 500);
    }

    onToggleStoryPlayOrPauseByValue = (isPlay) => {
        this.isStoryPlaying = isPlay;
        if (!this.popUpService.isStoryPopupOpened) {
            return;
        }

        const currentCellElement = this.popUpService.getCurrentStoryCellElement();

        if (this.videoPlayIconTimeout) {
            clearTimeout(this.videoPlayIconTimeout);
        }

        if (this.dataService.currentStoryItem.mediaType === this.utilsService.BO_STORY_MEDIA_TYPE.video) {
            const video = currentCellElement.querySelector('video');
            const {pauseElement, playElement} = this.getPlayPauseElements();
            pauseElement.classList.add('bo-hidden-opacity');
            playElement.classList.add('bo-hidden-opacity');
            playElement.classList.remove('bo-hidden');
            pauseElement.classList.remove('bo-hidden');

            if (isPlay) {
                pauseElement.classList.remove('bo-hidden-opacity');
                pauseElement.classList.add('bo-active-video-action');
                playElement.classList.remove('bo-active-video-action');
                video.play();
            } else {
                playElement.classList.remove('bo-hidden-opacity');
                pauseElement.classList.remove('bo-active-video-action');
                playElement.classList.add('bo-active-video-action');
                video.pause();
            }
        }

        this.videoPlayIconTimeout = setTimeout(() => {
            const { pauseElement, playElement} = this.getPlayPauseElements();
            pauseElement?.classList.add('bo-hidden-opacity');
            playElement?.classList.add('bo-hidden-opacity');
        }, 500);
    }

    onStopProgress = () => {
        this.onToggleStoryPlayOrPauseByValue(false);
        clearInterval(this.popUpService.progressClearInterval);
    }

    onContinueProgress = () => {
        this.onToggleStoryPlayOrPauseByValue(true);
        this.popUpService.triggerStoryItemProgressBar(false);
    }

    getPlayPauseElements = () => {
        const currentCellElement = this.popUpService.getCurrentStoryCellElement();
        return {
            pauseElement: currentCellElement.querySelector('.bo-popup-body .bo-pause-icon'),
            playElement: currentCellElement.querySelector('.bo-popup-body .bo-play-icon')
        }
    }

    onToggleVideoMute = () => {
        const currentCellElement = this.popUpService.getCurrentStoryCellElement();
        const mutatedElement = currentCellElement.querySelector('.bo-muted-icon');
        const unmutatedElement = currentCellElement.querySelector('.bo-unmutated-icon');
        const video = currentCellElement.querySelector('video');
        this.popUpService.isVideoMuted = !this.popUpService.isVideoMuted;
        video.muted = this.popUpService.isVideoMuted;
        mutatedElement.classList.add('bo-hidden');
        unmutatedElement.classList.add('bo-hidden');
        if (video.muted) {
            mutatedElement.classList.remove('bo-hidden');
        } else {
            unmutatedElement.classList.remove('bo-hidden');
        }
    }

    stopPropagation = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    onTouchstart = (event) => {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }

    onDetectKeydown = (event) => {
        if (event.key === 'Tab') {
            this.dataService.document.body.classList.add('bo-keyboard-user');
        }
    }

    onDetectMousedown = () => {
        this.dataService.document.body.classList.remove('bo-keyboard-user');
    }

    onToggleFullScreen = () => {
        const popupContainer = this.dataService.document.querySelector('.bo-popup-container');

        if (!this.dataService.document.fullscreenElement) {
            // Request full-screen mode
            if (popupContainer.requestFullscreen) {
                popupContainer.requestFullscreen();
            } else if (popupContainer.mozRequestFullScreen) { // Firefox
                popupContainer.mozRequestFullScreen();
            } else if (popupContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
                popupContainer.webkitRequestFullscreen();
            } else if (popupContainer.msRequestFullscreen) { // IE/Edge
                popupContainer.msRequestFullscreen();
            }
        } else {
            // Exit full-screen mode
            if (this.dataService.document.exitFullscreen) {
                this.dataService.document.exitFullscreen();
            } else if (this.dataService.document.mozCancelFullScreen) { // Firefox
                this.dataService.document.mozCancelFullScreen();
            } else if (this.dataService.document.webkitExitFullscreen) { // Chrome, Safari and Opera
                this.dataService.document.webkitExitFullscreen();
            } else if (this.dataService.document.msExitFullscreen) { // IE/Edge
                this.dataService.document.msExitFullscreen();
            }
        }
    }

    fullscreenChanged = () => {
        const currentCellElement = this.popUpService.getCurrentStoryCellElement();
        const exitFullScreenIconElement = currentCellElement.querySelector('.bo-exit-full-screen-icon');
        const fullScreenIconElement = currentCellElement.querySelector('.bo-full-screen-icon');
        fullScreenIconElement.classList.add('bo-hidden');
        exitFullScreenIconElement.classList.add('bo-hidden');

        const popupContainer = this.dataService.document.querySelector('.bo-popup-container');

        if (this.dataService.document.fullscreenElement) {
            popupContainer.classList.add('bo-full-screen');
            exitFullScreenIconElement.classList.remove('bo-hidden');
        } else {
            popupContainer.classList.remove('bo-full-screen');
            fullScreenIconElement.classList.remove('bo-hidden');
        }
    }

    onTabChange = () => {
        if (!this.popUpService.isStoryPopupOpened) {
            return;
        }

        if (this.dataService.document.hidden){
            this.isStoryPlayingBeforeTabChange = this.isStoryPlaying;
            this.onStopProgress();
        } else if (this.isStoryPlayingBeforeTabChange) {
            this.onContinueProgress();
        }
    }

    onToggleFullScreenByKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onToggleFullScreen();
        }
    }

    onToggleLikeStoryItem = () => {
        const currentCellElement = this.popUpService.getCurrentStoryCellElement();
        const likeBtnElement = currentCellElement.querySelector('.bo-story-item-like-btn');
        const likeCountElement = currentCellElement.querySelector('.bo-story-item-like-count');
        this.dataService.currentStoryItem.liked = !this.dataService.currentStoryItem.liked;

        if (this.dataService.currentStoryItem.liked) {
            this.dataService.currentStoryItem.likeCount++;
            likeBtnElement.classList.add('bo-story-item-liked');
        } else {
            likeBtnElement.classList.remove('bo-story-item-liked');
            this.dataService.currentStoryItem.likeCount--;
        }

        likeCountElement.innerText = this.dataService.currentStoryItem.likeCount.toString();
        let likeEvent = new CustomEvent(
            this.dataService.currentStoryItem.liked ? this.storyItemLikeEventName : this.storyItemUnlikeEventName,
            { detail: this.dataService.currentStoryItem});
        this.dataService.storyWrapper.dispatchEvent(likeEvent);

        if (this.dataService.currentStoryItem.liked && typeof this.onLikeFn === 'function') {
            this.onLikeFn(this.dataService.currentStoryItem);
        } else if (!this.dataService.currentStoryItem.liked && typeof this.onUnlikeFn === 'function') {
            this.onUnlikeFn(this.dataService.currentStoryItem);
        }
    }

    onStoryItemSeenAfterView = () => {
        if (!this.dataService.configs.seenByStoryItemOpen) {
            this.onStoryItemSeen();
        }
    }

    onStoryItemSeenStoryOpen = () => {
        if (this.dataService.configs.seenByStoryItemOpen) {
            this.onStoryItemSeen();
        }
    }

    onStoryItemSeen = () => {
        if (this.dataService.currentStoryItem.seen) {
            return;
        }

        this.dataService.currentStoryItem.seen = true;
        const seenEvent = new CustomEvent(this.storyItemSeenEventName, { detail: this.dataService.currentStoryItem});
        this.dataService.storyWrapper.dispatchEvent(seenEvent);

        if (typeof this.onStoryItemSeenFn === 'function') {
            this.onStoryItemSeenFn(this.dataService.currentStoryItem);
        }
    }

    onStorySeen = () => {
        if (this.dataService.currentStory.seen) {
            return;
        }

        this.dataService.currentStory.seen = true;
        let seenEvent = new CustomEvent(this.storySeenEventName, { detail: this.dataService.currentStory});
        this.dataService.storyWrapper.dispatchEvent(seenEvent);

        if (typeof this.onStorySeenFn === 'function') {
            this.onStorySeenFn(this.dataService.currentStory);
        }
    }

    onNavigateProfile() {
        const seenEvent = new CustomEvent(this.storyItemNavigateProfile, { detail: this.dataService.currentStory});
        this.dataService.storyWrapper.dispatchEvent(seenEvent);

        if (typeof this.onNavigateProfileFn === 'function') {
            this.onNavigateProfileFn(this.dataService.currentStory);
        }
    }

    onStoryItemView() {
        const seenEvent = new CustomEvent(this.storyItemView, { detail: this.dataService.currentStoryItem});
        this.dataService.storyWrapper.dispatchEvent(seenEvent);

        if (typeof this.onStoryItemViewFn === 'function') {
            this.onStoryItemViewFn(this.dataService.currentStoryItem);
        }
    }
}
