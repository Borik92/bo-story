export class BoStoryPopUpService {
    svgElementsService;
    utilsService;
    eventService;
    dataService;
    carouselService;
    photoProgressDuration = 5;
    storyPopupPlayingVideos = [];
    progressIndicator = 0;
    storyCellPrefix = 'bo-story-';
    isVideoMuted = false;
    isStoryPopupOpened = false;
    mediaLoadingTimeout;
    videoPlayingProgressTimeout;
    imgPlayingProgressTimeout;
    progressClearInterval;

    createPopup = () => {
        if (!this.dataService.currentStoryItem) {
            return;
        }

        const popupContainer = this.dataService.document.createElement('div');
        const popupWrapper = this.dataService.document.createElement('div');
        const popupBodyWrapper = this.dataService.document.createElement('div');
        const popupBody = this.dataService.document.createElement('div');
        const previousElement = this.utilsService.convertStrToSvgElement(this.svgElementsService.arrowLeftIcon);
        const nextElement = this.utilsService.convertStrToSvgElement(this.svgElementsService.arrowRightIcon);
        const closeElement = this.utilsService.convertStrToSvgElement(this.svgElementsService.closeIcon);

        this.dataService.document.body.append(popupContainer);
        popupContainer.append(popupWrapper);
        popupWrapper.append(popupBodyWrapper);
        popupBodyWrapper.append(popupBody);
        popupBodyWrapper.append(this.createPopupBodySideNavigations());

        popupWrapper.prepend(nextElement);
        popupWrapper.appendChild(closeElement);
        popupWrapper.appendChild(previousElement);

        closeElement.setAttribute('tabindex', '1');
        previousElement.setAttribute('tabindex', '1');
        nextElement.setAttribute('tabindex', '1');

        popupContainer.setAttribute('tabindex', '1');
        popupContainer.classList.add('bo-popup-container');
        popupWrapper.classList.add('bo-popup-wrapper');
        popupBodyWrapper.classList.add('bo-popup-body-wrapper');
        popupBody.classList.add('bo-popup-body');
        this.dataService.document.body.classList.add('bo-overflow-hidden');
        popupContainer.addEventListener('click', this.eventService.onPopupContainerClick);
        popupContainer.addEventListener('keydown', this.eventService.onPopupContainerKeyDown);
        popupContainer.addEventListener('mousedown', this.eventService.onPopupContainerMouseDown);
        popupContainer.addEventListener('mouseup', this.eventService.onPopupContainerMouseUp);
        popupContainer.focus();

        this.dataService.document.addEventListener('fullscreenchange', this.eventService.fullscreenChanged);
        this.initStoryItems();

        this.carouselService.initCarousel(this.dataService.storyList, popupBody);
        this.updateCubeCellElement(
            this.dataService.currentStory,
            this.dataService.currentStoryItem,
            this.dataService.currentStoryIndex
        );

        this.carouselService.prepareStoriesToRender();
        this.carouselService.prepareStoriesToRender(true);
        this.updateSideWrapperPosition();

        this.eventService.onStoryItemSeenStoryOpen();
    }

    updateSideWrapperPosition = () => {
        requestAnimationFrame(() => {
            const currentCellElement = this.getCurrentStoryCellElement();

            if (!currentCellElement) {
                setTimeout(() => this.updateSideWrapperPosition());
                return;
            }

            const header = currentCellElement.querySelector('.bo-story-item-header');
            const footer = currentCellElement.querySelector('.bo-story-item-footer');
            const popupBodySideWrapper = this.dataService.document.querySelector('.bo-popup-body-side-wrapper');
            const popupContainer = this.dataService.document.querySelector('.bo-popup-container');
            const topMargin = 30;

            popupBodySideWrapper.style.height = `${popupContainer.offsetHeight  + topMargin - (header.offsetHeight + footer.offsetHeight + 30)}px`;
            popupBodySideWrapper.style.top = `${header.offsetHeight}px`;
        });
    }

    createPopupBodySideNavigations = () => {
        const sideBody = this.dataService.document.createElement('div');
        const leftSide = this.dataService.document.createElement('div');
        const rightSide = this.dataService.document.createElement('div');

        sideBody.append(leftSide);
        sideBody.append(rightSide);

        sideBody.classList.add('bo-popup-body-side-wrapper');
        leftSide.classList.add('bo-popup-body-left-side');
        rightSide.classList.add('bo-popup-body-right-side');

        return sideBody;
    }

    initStoryItems = () => {
        const popupBody = this.dataService.document.querySelector('.bo-popup-body');
        popupBody.innerHTML = '';
        let startIndex = this.dataService.currentStoryIndex;
        let currentStoryPositionIndex = this.dataService.currentStoryIndex % this.carouselService.storyCarouseCellCount;
        let backCount;


        for (let i = 0; i < this.carouselService.storyCarouseCellCount; i++) {
            if (this.dataService.storyList[startIndex - currentStoryPositionIndex] && backCount === undefined) {
                popupBody.append(this.createCubeCellElement(
                    this.dataService.storyList[startIndex - currentStoryPositionIndex],
                    this.dataService.storyList[startIndex - currentStoryPositionIndex].items[0],
                    i
                ));
            } else if (this.dataService.storyList[backCount]) {
                popupBody.append(this.createCubeCellElement(
                    this.dataService.storyList[backCount],
                    this.dataService.storyList[backCount].items[0],
                    i
                ));
            }

            if (backCount !== undefined) {
                backCount--;
                continue;
            }

            if (currentStoryPositionIndex !== 0) {
                currentStoryPositionIndex--;
            } else if (this.dataService.storyList[startIndex - currentStoryPositionIndex]) {
                startIndex++;
            } else {
                i--;
                backCount = this.dataService.currentStoryIndex - 1;
            }
        }


        const currentCellElement = this.getCurrentStoryCellElement();
        const currentVideoElement = currentCellElement.querySelector('.bo-story-item-video');
        const currentImgElement = currentCellElement.querySelector('.bo-story-item-img');
        const preloader = currentVideoElement.closest('.bo-story-item').querySelector('.bo-media-preloader-body');

        if (this.dataService.currentStoryItem.mediaType === this.utilsService.BO_STORY_MEDIA_TYPE.video) {
            currentVideoElement.addEventListener('canplaythrough',  this.videoLoadingState(currentVideoElement, preloader));
        } else {
            currentImgElement.src = this.dataService.currentStoryItem.storyUrl;
            currentImgElement.addEventListener('load', function checkProgress () {
                preloader.classList.add('bo-hidden');
                currentImgElement.removeEventListener('load', checkProgress);
            });
        }
    }

    onPlayCurrentStoryItem = () => {
        if (!this.isStoryPopupOpened) {
            return;
        }

        const currentCellElement = this.getCurrentStoryCellElement();
        const videoElement = currentCellElement.querySelector('.bo-story-item-video');
        const imgElement = currentCellElement.querySelector('.bo-story-item-img');
        const preloader = currentCellElement.querySelector('.bo-media-preloader-body');
        videoElement.classList.add('bo-hidden');
        imgElement.classList.add('bo-hidden');

        this.pausePlayingVideos();

        const progressItems = Array.from(currentCellElement.querySelectorAll('.bo-story-progress-bar-item-body'));
        this.progressIndicator = 0;
        for (let i = 0; i < progressItems.length; i++) {
            const progressElement = progressItems[i].querySelector('.bo-story-progress-bar-item');
            progressElement.style.width = '0%';
            progressElement.style.transition = 'unset';
        }

        for (let i = this.dataService.currentStoryItemIndex - 1; i >= 0; i--) {
            progressItems[i].querySelector('.bo-story-progress-bar-item').style.width = '100%';
        }

        this.updateVideoMutationIcons();
        clearTimeout(this.mediaLoadingTimeout);
        clearTimeout(this.videoPlayingProgressTimeout);
        clearTimeout(this.imgPlayingProgressTimeout);
        this.eventService.isStoryPlaying = true;

        if (
            !this.dataService.currentStoryItem?.isPlayingVideo
            && this.dataService.currentStoryItem?.mediaType === this.utilsService.BO_STORY_MEDIA_TYPE.video
        ) {
            videoElement.classList.remove('bo-hidden');

            if (!videoElement.getAttribute('src')) {
                videoElement.src = this.dataService.currentStory.items[this.dataService.currentStoryItemIndex].storyUrl;
            }

            videoElement.muted = this.dataService.currentStoryItem.isMuted ? true : this.isVideoMuted;
            videoElement.play();
            this.dataService.currentStoryItem.isPlayingVideo = true;
            this.storyPopupPlayingVideos.push({
                videoElement,
                story: this.dataService.currentStory,
                storyItem: this.dataService.currentStory.items[this.dataService.currentStoryItemIndex]
            });

            if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
                this.triggerStoryItemProgressBar();
                preloader.classList.add('bo-hidden');
            } else {
                this.mediaLoadingTimeout = setTimeout(() => {
                    if (!(videoElement.readyState >= videoElement.HAVE_METADATA)) {
                        preloader.classList.remove('bo-hidden');
                    }

                    if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
                        if (videoElement.getAttribute('id') === this.mediaElementIdGenerator(this.dataService.currentStoryItem.id, 'video')) {
                            this.triggerStoryItemProgressBar();
                        }
                    } else {
                        const checkProgress  = () => {
                            if (!this.isStoryPopupOpened) {
                                videoElement.removeEventListener('canplaythrough', checkProgress);
                                return;
                            }

                            this.videoPlayingProgressTimeout = setTimeout(() => {
                                if (videoElement.getAttribute('id') === this.mediaElementIdGenerator(this.dataService.currentStoryItem.id, 'video')) {
                                    this.triggerStoryItemProgressBar();
                                }
                            });
                            preloader.classList.add('bo-hidden');
                            videoElement.removeEventListener('canplaythrough', checkProgress);
                        }
                        videoElement.addEventListener('canplaythrough',  checkProgress);
                    }

                }, 100);
            }
        } else if (this.dataService.currentStoryItem.mediaType === this.utilsService.BO_STORY_MEDIA_TYPE.photo) {
            imgElement.classList.remove('bo-hidden');
            if (imgElement.complete) {
                preloader.classList.add('bo-hidden');
                this.triggerStoryItemProgressBar();
            } else {
                this.mediaLoadingTimeout = setTimeout(() => {
                    if (!imgElement.complete) {
                        preloader.classList.remove('bo-hidden');
                    }

                    if (imgElement.complete) {
                        preloader.classList.add('bo-hidden');
                        this.triggerStoryItemProgressBar();
                        return;
                    }

                    const checkProgress = () => {
                        if (!this.isStoryPopupOpened) {
                            imgElement.removeEventListener('load', checkProgress);
                            return;
                        }

                        this.imgPlayingProgressTimeout = setTimeout(() => {
                            if (imgElement.getAttribute('id') === this.mediaElementIdGenerator(this.dataService.currentStoryItem.id, 'img')) {
                                this.triggerStoryItemProgressBar();
                            }
                        }, 100);
                        preloader.classList.add('bo-hidden');
                        imgElement.removeEventListener('load', checkProgress);
                    }
                    imgElement.addEventListener('load', checkProgress );
                }, 100);
            }
        }
    }

    pausePlayingVideos = () => {
        this.storyPopupPlayingVideos.forEach(item => {
            item.storyItem.isPlayingVideo = false;
            item.videoElement.pause();
            item.videoElement.currentTime = 0;
        });
        this.storyPopupPlayingVideos = [];
    }

    createCubeCellElement = (story, storyItem, index) => {
        const cubeCellElement = this.createStoryItem(story, storyItem);
        cubeCellElement.classList.add('bo-carousel-cell');
        cubeCellElement.setAttribute('id', this.generateCellStoryElementId(false, index));

        return cubeCellElement;
    }

    mediaElementIdGenerator = (id, prefix = '') => {
        return `media-element-${prefix}-${id}`;
    }

    updateVideoMutationIcons = () => {
        const cubeCell = this.getCurrentStoryCellElement();
        const unmutatedIcon = cubeCell.querySelector(`.bo-unmutated-icon`);
        const mutedIcon = cubeCell.querySelector(`.bo-muted-icon`);
        mutedIcon.classList.add('bo-hidden');
        unmutatedIcon.classList.add('bo-hidden');

        if (this.dataService.currentStoryItem.mediaType !== this.utilsService.BO_STORY_MEDIA_TYPE.video || this.dataService.currentStoryItem.isMuted) {
            return;
        }

        if (this.isVideoMuted) {
            mutedIcon.classList.remove('bo-hidden');
        } else {
            unmutatedIcon.classList.remove('bo-hidden');
        }
    }

    updateCubeCellElement = (story, storyItem, index, isPlay = true) => {
        if (!this.isStoryPopupOpened) {
            return;
        }

        this.updateArrowNavigations();
        this.unsetCurrentCellElementProgressBarsTransition();
        const cellElement = this.getStoryCellElementByIndex(index);
        const headerUserImg = cellElement.querySelector(`.bo-story-item-header-user-img`);
        const headerInfoText = cellElement.querySelector(`.bo-story-item-header-info-text`);
        const headerInfoTimer = cellElement.querySelector(`.bo-story-item-header-info-timer`);
        const videoElement = cellElement.querySelector(`.bo-story-item-video`);
        const imgElement = cellElement.querySelector(`.bo-story-item-img`);
        const unmutatedIcon = cellElement.querySelector(`.bo-unmutated-icon`);
        const mutedIcon = cellElement.querySelector(`.bo-muted-icon`);
        const storyItemLikeCount = cellElement.querySelector(`.bo-story-item-like-count`);
        const storyItemCaption = cellElement.querySelector(`.bo-story-tem-caption`);
        const likeIconBtn = cellElement.querySelector(`.bo-story-item-like-btn`);
        const footerNestedHtmlBody = cellElement.querySelector(`.bo-footer-nested-html-body`);
        const fullScreenIcon = cellElement.querySelector(`.bo-full-screen-icon`);
        const exitFullScreenIcon = cellElement.querySelector(`.bo-exit-full-screen-icon`);

        headerUserImg.src = story.imageUrl;
        headerInfoText.innerText = story.name;
        headerInfoTimer.innerText = storyItem.timeSince;
        mutedIcon.classList.add('bo-hidden');
        unmutatedIcon.classList.add('bo-hidden');
        storyItemCaption.classList.add('bo-hidden');
        videoElement.classList.add('bo-hidden');
        imgElement.classList.add('bo-hidden');
        fullScreenIcon.classList.add('bo-hidden');
        exitFullScreenIcon.classList.add('bo-hidden');

        if (this.dataService.document.fullscreenElement) {
            exitFullScreenIcon.classList.remove('bo-hidden');
        } else {
            fullScreenIcon.classList.remove('bo-hidden');
        }

        if (storyItem.mediaType === this.utilsService.BO_STORY_MEDIA_TYPE.video) {
            videoElement.src = storyItem.storyUrl;
            videoElement.load();
            videoElement.classList.remove('bo-hidden');
            videoElement.setAttribute('id', this.mediaElementIdGenerator(storyItem.id, 'video'))
        } else {
            imgElement.setAttribute('id', this.mediaElementIdGenerator(storyItem.id, 'img'))
            imgElement.src = storyItem.storyUrl;
            imgElement.classList.remove('bo-hidden');
        }

        if (isPlay) {
            this.onPlayCurrentStoryItem();
        }

        storyItemLikeCount.innerText = storyItem.likeCount.toString();
        if (storyItem.liked) {
            likeIconBtn.classList.add('bo-story-item-liked');
        } else {
            likeIconBtn.classList.remove('bo-story-item-liked');
        }

        if (storyItem.caption) {
            storyItemCaption.classList.remove('bo-hidden');
            storyItemCaption.innerText = storyItem.caption;
        }

        footerNestedHtmlBody.innerHTML = storyItem.footerNestedHtml ?? '';

        this.updateSideWrapperPosition();
        return cellElement;
    }

    updateArrowNavigations = () => {
        const arrowLeft = this.dataService.document.querySelector('.bo-arrow-left-icon');
        const arrowRight = this.dataService.document.querySelector('.bo-arrow-right-icon');

        arrowLeft?.classList.remove('bo-arrow-inactive');
        arrowRight?.classList.remove('bo-arrow-inactive');

        if (this.dataService.currentStoryIndex === 0 && this.dataService.currentStoryItemIndex === 0) {
            arrowLeft?.classList.add('bo-arrow-inactive');
        } else if (
            this.dataService.currentStoryIndex === this.dataService.storyList.length - 1
            && this.dataService.currentStoryItemIndex === this.dataService.currentStory.items.length - 1
        ) {
            arrowRight?.classList.add('bo-arrow-inactive');
        }
    }

    videoLoadingState = (video, preloader) => {
        const fn = () => {
            preloader.classList.add('bo-hidden');
            video.removeEventListener('canplaythrough', fn);
        }

        return fn;
    }

    createStoryItem = (storyData, storyItemData) => {
        const storyItem = this.dataService.document.createElement('div');
        const layer = this.dataService.document.createElement('div');
        const playElement = this.utilsService.convertStrToSvgElement(this.svgElementsService.playIcon);
        const pauseElement = this.utilsService.convertStrToSvgElement(this.svgElementsService.pauseIcon);
        const { videoElement, imgElement } = this.createStoryMedia(storyItemData);
        storyItem.append(videoElement);
        storyItem.append(imgElement);
        storyItem.append(layer);
        layer.append(this.createStoryItemHeader(storyData, storyItemData));
        layer.append(this.createFooterNestedHtmlBody(storyItemData));
        layer.append(this.createStoryItemFooter(storyItemData));
        layer.append(this.createMediaPreloader());

        storyItem.classList.add('bo-story-item');
        layer.classList.add('bo-story-item-layer');

        playElement.classList.add('bo-hidden-opacity');
        pauseElement.classList.add('bo-hidden-opacity');
        playElement.classList.add('bo-hidden');
        pauseElement.classList.add('bo-active-video-action');
        storyItem.appendChild(playElement);
        storyItem.appendChild(pauseElement);

        return storyItem;
    }

    createStoryMedia = (storyItem) => {
        const videoElement = this.dataService.document.createElement('video');
        const imgElement = this.dataService.document.createElement('img');

        videoElement.setAttribute('height', '100%');
        videoElement.setAttribute('width', '100%');
        videoElement.setAttribute('playsinline', 'true');
        videoElement.setAttribute('webkit-playsinline', 'true');
        videoElement.classList.add('bo-story-item-media');
        videoElement.classList.add('bo-story-item-video');
        videoElement.classList.add('bo-hidden');

        imgElement.setAttribute('height', '100%');
        imgElement.setAttribute('width', '100%');
        imgElement.classList.add('bo-story-item-media');
        imgElement.classList.add('bo-story-item-img');
        imgElement.classList.add('bo-hidden');

        if (storyItem.mediaType === this.utilsService.BO_STORY_MEDIA_TYPE.video) {
            videoElement.src = '';
            videoElement.setAttribute('type', `${storyItem.mediaType}/${storyItem.mediaExt}`);
            videoElement.controls = false;
            videoElement.muted = true;
            videoElement.loop = false;
            videoElement.preload = 'metadata';
            videoElement.autoplay = false;
            videoElement.classList.remove('bo-hidden');
            videoElement.setAttribute('id', this.mediaElementIdGenerator(storyItem.id, 'video'));
        } else {
            imgElement.setAttribute('id', this.mediaElementIdGenerator(storyItem.id, 'img'));
            imgElement.classList.remove('bo-hidden');
            imgElement.src = storyItem.storyUrl;
        }

        return {
            videoElement,
            imgElement
        };
    }

    createMediaPreloader = () => {
        const mediaPreloaderBody = this.dataService.document.createElement('div');
        const mediaPreloader = this.dataService.document.createElement('div');
        mediaPreloaderBody.append(mediaPreloader);
        mediaPreloaderBody.classList.add('bo-hidden');
        mediaPreloaderBody.classList.add('bo-media-preloader-body');
        mediaPreloader.classList.add('bo-media-preloader');

        return mediaPreloaderBody;
    }

    createLikeButton = (storyItemData) => {
        const btn = this.dataService.document.createElement('button');
        const likeCount  = this.dataService.document.createElement('span');
        const likeIconElement  = this.utilsService.convertStrToSvgElement(this.svgElementsService.likeIcon);
        btn.append(likeIconElement);
        btn.append(likeCount);
        likeCount.innerText = storyItemData.likeCount.toString();
        btn.classList.add('bo-story-item-like-btn');
        likeCount.classList.add('bo-story-item-like-count');

        if (storyItemData.liked) {
            btn.classList.add('bo-story-item-liked');
        }

        return btn;
    }

    createStoryItemHeader = (storyData, storyItemData) => {
        const header = this.dataService.document.createElement('div');
        const contentBody = this.dataService.document.createElement('div');
        const poster = this.dataService.document.createElement('a');
        const img = this.dataService.document.createElement('img');
        const infoContainer = this.dataService.document.createElement('div');
        const infoText = this.dataService.document.createElement('span');
        const timerText = this.dataService.document.createElement('span');
        const fullScreenIconElement = this.utilsService.convertStrToSvgElement(this.svgElementsService.fullScreenIcon);
        const exitFullScreenIconElement = this.utilsService.convertStrToSvgElement(this.svgElementsService.exitFullScreenIcon);
        const closeElement = this.utilsService.convertStrToSvgElement(this.svgElementsService.closeIcon);

        header.append(this.createStoryProgressBar(storyData));
        header.append(contentBody);
        contentBody.append(poster);
        poster.append(img);
        poster.append(infoContainer);
        infoContainer.append(infoText);
        infoContainer.append(timerText);
        poster.classList.add('bo-poster-container');
        closeElement.classList.add('bo-close-icon-mobile');

        this.stopElementToucheEvents(header);

        const mutatedIconElement = this.utilsService.convertStrToSvgElement(this.svgElementsService.mutatedIcon);
        const unmutatedIconElement = this.utilsService.convertStrToSvgElement(this.svgElementsService.unmutatedIcon);
        unmutatedIconElement.classList.add('bo-story-item-mutation-icon');
        mutatedIconElement.classList.add('bo-story-item-mutation-icon');
        unmutatedIconElement.setAttribute('tabindex', '1');
        mutatedIconElement.setAttribute('tabindex', '1');
        contentBody.append(unmutatedIconElement);
        contentBody.append(mutatedIconElement);
        unmutatedIconElement.classList.add('bo-hidden');
        mutatedIconElement.classList.add('bo-hidden');

        contentBody.append(fullScreenIconElement);
        contentBody.append(exitFullScreenIconElement);
        contentBody.append(closeElement);

        if (this.dataService.document.fullscreenElement) {
            fullScreenIconElement.classList.add('bo-hidden');
        } else {
            exitFullScreenIconElement.classList.add('bo-hidden');
        }

        img.src = storyData.imageUrl;
        img.height = 60;
        img.width = 60;
        infoText.innerText = storyData.name;
        timerText.innerText = storyItemData.timeSince;

        header.classList.add('bo-story-item-header');
        contentBody.classList.add('bo-story-item-content-body');
        infoContainer.classList.add('bo-story-item-header-info-container');
        infoText.classList.add('bo-story-item-header-info-text');
        timerText.classList.add('bo-story-item-header-info-timer');
        img.classList.add('bo-story-item-header-user-img');

        fullScreenIconElement.addEventListener('click', this.eventService.onToggleFullScreen);
        fullScreenIconElement.addEventListener('keydown', this.eventService.onToggleFullScreenByKeyDown);
        return header;
    }

    stopElementToucheEvents = (element) => {
        if (this.dataService.isMobile) {
            element.addEventListener('touchstart', this.eventService.onPopupContainerClick);
            element.addEventListener('touchstart', this.eventService.stopPropagation);
            element.addEventListener('touchmove', this.eventService.stopPropagation);
            element.addEventListener('touchcancel', this.eventService.stopPropagation);
            element.addEventListener('touchend', this.eventService.stopPropagation);
        }
    }

    createStoryProgressBar = (story) => {
        const progressBarContainer = this.dataService.document.createElement('div');
        progressBarContainer.classList.add('bo-story-progress-bar-container');

        story.items.forEach((storyItem, index) => {
            const progressBarItemBody = this.dataService.document.createElement('div');
            const progressBarItem = this.dataService.document.createElement('div');
            progressBarItemBody.append(progressBarItem);
            progressBarItemBody.classList.add('bo-story-progress-bar-item-body');
            progressBarItem.classList.add('bo-story-progress-bar-item');

            if (!story.seen && storyItem.seen && index < this.dataService.currentStoryItemIndex) {
                progressBarItem.style.width = '100%';
            }

            progressBarContainer.append(progressBarItemBody);
        });

        return progressBarContainer;
    }

    triggerStoryItemProgressBar = (isResetProgress = true) => {
        let progressDuration = this.photoProgressDuration;
        const currentCellElement = this.getCurrentStoryCellElement();
        const videoElement = currentCellElement.querySelector('.bo-story-item-video');
        const progressItems = Array.from(currentCellElement.querySelectorAll('.bo-story-progress-bar-item-body'));
        const currentProgressElement = progressItems[this.dataService.currentStoryItemIndex].querySelector('.bo-story-progress-bar-item');

        if (isResetProgress) {
            this.progressIndicator = 0;
            for (let i = 0; i < progressItems.length; i++) {
                progressItems[i].querySelector('.bo-story-progress-bar-item').style.width = '0%';
            }
        }

        if (this.dataService.currentStoryItem.mediaType === this.utilsService.BO_STORY_MEDIA_TYPE.video) {
            progressDuration = videoElement.duration;
        }

        clearInterval(this.progressClearInterval);

        for (let i = this.dataService.currentStoryItemIndex - 1; i >= 0; i--) {
            progressItems[i].querySelector('.bo-story-progress-bar-item').style.width = '100%';
        }

        setTimeout(() => currentProgressElement.style.transition = 'width .1s linear');

        this.progressClearInterval = setInterval(() => {
            if (this.progressIndicator >= progressDuration * 10) {
                clearInterval(this.progressClearInterval);
                this.progressIndicator = 0;

                this.eventService.onNextStoryItem();
                return;
            }

            this.progressIndicator++;
            currentProgressElement.style.width = this.progressIndicator / (progressDuration * 10) * 100 + '%';
        }, 100);
    }

    unsetCurrentCellElementProgressBarsTransition() {
        const currentCellElement = this.getCurrentStoryCellElement();
        const progressItems = Array.from(currentCellElement.querySelectorAll('.bo-story-progress-bar-item-body'));

        progressItems.forEach(item => {
            item.style.transition = 'unset';
        });
    }

    resetCurrentCellElementProgressBarTransition() {
        const currentCellElement = this.getCurrentStoryCellElement();
        const progressItems = Array.from(currentCellElement.querySelectorAll('.bo-story-progress-bar-item-body'));

        for (let i = 0; i < progressItems.length; i++) {
            progressItems[i].querySelector('.bo-story-progress-bar-item').style.width = '0%';
            progressItems[i].style.transition = 'unset';
        }

        for (let i = this.dataService.currentStoryItemIndex - 1; i >= 0; i--) {
            progressItems[i].querySelector('.bo-story-progress-bar-item').style.width = '100%';
        }
    }

    createStoryItemFooter = (storyItemData) => {
        const footer = this.dataService.document.createElement('div');
        const caption = this.dataService.document.createElement('span');
        footer.append(caption);
        footer.append(this.createLikeButton(storyItemData));
        footer.classList.add('bo-story-item-footer');
        caption.classList.add('bo-hidden');
        caption.classList.add('bo-story-tem-caption');

        if (storyItemData.caption) {
            caption.classList.remove('bo-hidden');
            caption.innerText = storyItemData.caption;
        }

        this.stopElementToucheEvents(footer);
        return footer;
    }

    createFooterNestedHtmlBody = (storyItemData) => {
        const footerNestedHtmlBody = this.dataService.document.createElement('div');
        footerNestedHtmlBody.classList.add('bo-footer-nested-html-body');
        footerNestedHtmlBody.innerHTML = storyItemData.footerNestedHtml ?? '';

        return footerNestedHtmlBody;
    }

    getCurrentStoryCellElement = () => {
        return this.dataService.document.querySelector('.bo-popup-container')?.querySelector(this.generateCellStoryElementId(true));
    }

    getStoryCellElementByIndex = (index) => {
        return this.dataService.document.querySelector('.bo-popup-container').querySelector(this.generateCellStoryElementId(true, index));
    }

    generateCellStoryElementId = (isQuery = false, storyIndex = this.dataService.currentStoryIndex) => {
        return `${isQuery ? '#' : ''}${this.storyCellPrefix}${storyIndex % this.carouselService.storyCarouseCellCount}`;
    }
}
