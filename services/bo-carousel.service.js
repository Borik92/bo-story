export class BoCarouselService {
    dataService;
    eventService;
    popUpService;
    storyCarouselIndex = 0;
    storyRotateFn = 'rotateY';
    storyCarouselRadius;
    storyCarouselTheta;
    storyCarouseCellCount = 6;
    storyCarouseCellWidth = 0;
    storyCarouseCells = [];
    storyCarouseStartX;
    storyCarouseEndX = 0;
    carouselResizeTimeout;
    isTouchStarted;
    currentAngle = 0;
    clearPlayCurrentVideoTimeout;
    touchDefaultDuration = 150;
    touchStartBodyPausedTimeout;
    touchEndOpacityTriggered = false;
    isTouchendOpacityTriggered = false;
    updateUpcomingStoryTimeout;

    initCarousel = (stories, parentBody) => {
        parentBody.style.left = 'unset';
        this.storyCarouseCells = parentBody.querySelectorAll('.bo-carousel-cell');
        this.storyCarouselIndex = this.dataService.currentStoryIndex;
        this.storyCarouseCellWidth = parentBody.offsetWidth;

        this.dataService.window.addEventListener('resize', this.onScreenSizeChange);

        this.boStoryChangeCarousel();

        setTimeout(() => {
            Array.from(parentBody.children).forEach(child => child.classList.add('bo-carousel-cell-transition'));
        });

        const popupContainer = this.dataService.document.querySelector('.bo-popup-container');
        let isToucheMove = false;
        const swipeThreshold = 25;
        let touchStart = 0;

        if (this.dataService.isMobile) {
            popupContainer.addEventListener('touchstart', (e) => {
                this.touchEndOpacityTriggered = false;
                this.isTouchendOpacityTriggered = false;
                e.preventDefault();
                clearTimeout(this.touchStartBodyPausedTimeout);
                this.touchStartBodyPausedTimeout = setTimeout(() => {
                    if (!isToucheMove && !this.touchEndOpacityTriggered) {
                        this.isTouchendOpacityTriggered = true;
                        popupContainer.classList.add('bo-popup-body-paused');
                    }
                }, 300);

                parentBody.classList.add('bo-popup-body-transition');
                this.storyCarouseStartX = e.touches[0].clientX;
                this.eventService.onStopProgress();
                touchStart = Date.now();
            });

            popupContainer.addEventListener('touchmove', (e) => {
                e.preventDefault();
                this.isTouchStarted = true;
                this.storyCarouseEndX = e.touches?.length ? e.touches[0].clientX : 0;
                const swipeOffset = this.storyCarouseEndX - this.storyCarouseStartX;  // Calculate the offset for the swipe

                // If swipe threshold is not exceeded, don't do anything
                if (Math.abs(swipeOffset) < swipeThreshold || this.isTouchendOpacityTriggered) {
                    return;
                }

                isToucheMove = true;

                if (this.dataService.currentStoryIndex === 0 && swipeOffset > 0 || this.dataService.currentStoryIndex === stories.length - 1 && swipeOffset < 0) {
                    return;
                }

                const percentageIndexer = (1 * this.getPercentageOfSwipe(this.storyCarouseStartX, this.storyCarouseEndX)) / 100;

                if (swipeOffset > 0 && this.dataService.currentStoryIndex > 0) {  // If swipeOffset is positive, it's a right swipe
                    this.currentAngle = this.storyCarouselTheta * (this.storyCarouselIndex - percentageIndexer) * -1;
                } else if (swipeOffset < 0 && this.dataService.currentStoryIndex < stories.length - 1) {  // If swipeOffset is negative, it's a left swipe
                    this.currentAngle = this.storyCarouselTheta * (this.storyCarouselIndex + percentageIndexer) * -1;
                }

                parentBody.style.transform = 'translateZ(' + -(this.storyCarouselRadius - (this.storyCarouselRadius % 1 ? 1 : 0.5)) + 'px) '
                    + this.storyRotateFn + '(' + this.currentAngle + 'deg)';
                parentBody.classList.add('bo-carousel-transition-active');
            });

            ['touchend', 'touchcancel'].forEach(eventName => {
                popupContainer.addEventListener(eventName, (event) => {
                    this.touchEndOpacityTriggered = true;
                    this.isTouchendOpacityTriggered = false;
                    popupContainer.classList.remove('bo-popup-body-paused');
                    parentBody.classList.remove('bo-carousel-transition-active');

                    const swipeOffset = this.storyCarouseEndX - this.storyCarouseStartX;  // Calculate the offset for the swipe

                    const touchEndDuration = Date.now() - touchStart;

                    if (!isToucheMove && touchEndDuration > this.touchDefaultDuration) {
                        this.eventService.onContinueProgress();
                        return;
                    }

                    if (!isToucheMove) {
                        if (event.target.classList.contains('bo-popup-body-left-side') && event.target.closest('.bo-popup-body-left-side')) {
                            this.eventService.onPreviousStoryItem();
                        } else if (event.target.classList.contains('bo-popup-body-right-side') && event.target.closest('.bo-popup-body-right-side')) {
                            this.eventService.onNextStoryItem();
                        }
                        return;
                    }

                    isToucheMove = false;

                    if (swipeOffset > 0 && this.dataService.currentStoryIndex > 0) {
                        this.popUpService.resetCurrentCellElementProgressBarTransition();
                        this.prepareCarouselToPrevious();
                        this.prepareStoriesToRender(false);
                    } else if (swipeOffset < 0 && this.dataService.currentStoryIndex < stories.length - 1) {
                        this.popUpService.resetCurrentCellElementProgressBarTransition();
                        this.prepareCarouselToNext();
                        this.prepareStoriesToRender(true);
                    } else if (
                        swipeOffset > 0
                        && this.dataService.currentStoryIndex === 0
                        || swipeOffset < 0
                        && this.dataService.currentStoryIndex === stories.length - 1) {
                        this.eventService.onClosePopupFromLastElement(swipeOffset > 0 && this.dataService.currentStoryIndex === 0);
                        return;
                    }

                    this.dataService.updateStoryInfo();
                    this.popUpService.updateVideoMutationIcons();
                    this.popUpService.updateCubeCellElement(
                        this.dataService.currentStory,
                        this.dataService.currentStoryItem,
                        this.dataService.currentStoryIndex,
                        false,
                        false
                    );

                    this.eventService.onStoryItemView();
                    this.storyRotateMobileCarousel()

                    this.storyCarouseEndX = 0;
                    this.storyCarouseStartX = 0;
                });
            });
        }
    }

    onScreenSizeChange = () => {
        clearTimeout(this.carouselResizeTimeout);
        this.carouselResizeTimeout = setTimeout(() => {
            const parentBody = this.dataService.document.querySelector('.bo-popup-body-wrapper');
            this.storyCarouseCells = parentBody.querySelectorAll('.bo-carousel-cell');
            this.storyCarouselIndex = this.dataService.currentStoryIndex;
            this.storyCarouseCellWidth = parentBody.offsetWidth;
            this.boStoryChangeCarousel();
        }, 100);
    }

    storyInitialRotateCarousel = () => {
        const parentBody = this.dataService.document.querySelector('.bo-popup-body');

        if (!parentBody) {
            return;
        }

        const angle = this.storyCarouselTheta * (this.storyCarouselIndex) * -1;
        parentBody.style.transform = 'translateZ(' + -this.storyCarouselRadius + 'px) ' +
            this.storyRotateFn + '(' + angle + 'deg)';
    }

    storyRotateMobileCarousel() {
        const parentBody = this.dataService.document.querySelector('.bo-popup-body');
        const targetAngle = this.storyCarouselTheta * (this.storyCarouselIndex) * -1;
        parentBody.style.transition = 'transform 0.2s linear';
        parentBody.style.transform = 'translateZ(' + -this.storyCarouselRadius + 'px) ' +
            this.storyRotateFn + '(' + targetAngle + 'deg)';

        setTimeout(() => {
            parentBody.style.transition = ''; // Remove the transition after it finishes
            this.popUpService.unsetCurrentCellElementProgressBarsTransition();
            clearTimeout(this.popUpService.progressClearInterval);
            this.popUpService.onPlayCurrentStoryItem();
        }, 200);
    }

    storyRotateCarousel(skipSlide = false, callback) {
        return new Promise((resolve, _reject) => {
            const fn = () => {
                const parentBody = this.dataService.document.querySelector('.bo-popup-body');

                if (!parentBody) {
                    return;
                }

                const targetAngle = this.storyCarouselTheta * (this.storyCarouselIndex) * -1;
                const difference = targetAngle - this.currentAngle;
                if (Math.abs(difference) < 0.5 || skipSlide) {
                    // Directly set the currentAngle to targetAngle to avoid intermediate values
                    this.currentAngle = targetAngle;
                    clearTimeout(this.clearPlayCurrentVideoTimeout);
                    clearTimeout(this.popUpService.progressClearInterval);
                    this.clearPlayCurrentVideoTimeout = setTimeout(() => resolve(), 150);
                    if (callback) {
                        callback();
                    }
                } else {
                    // Adjust the angle by a fraction of the difference for smoothness
                    this.currentAngle += difference * 0.2;
                }

                parentBody.style.transform = 'translateZ(' + -this.storyCarouselRadius + 'px) ' +
                    this.storyRotateFn + '(' + this.currentAngle + 'deg)';

                if (Math.abs(targetAngle - this.currentAngle) > 0.01) {  // Using a smaller threshold here
                    requestAnimationFrame(fn);
                }
            }

            fn();
        });
    }

    boStoryChangeCarousel = () => {
        this.storyCarouselTheta = 360 / this.storyCarouseCellCount;
        this.storyCarouselRadius = Math.round( (this.storyCarouseCellWidth / 2) / Math.tan( Math.PI / this.storyCarouseCellCount));

        for ( let i= 0; i < this.storyCarouseCells.length; i++ ) {
            const cell = this.storyCarouseCells[i];
            if ( i < this.storyCarouseCellCount ) {
                // visible cell
                cell.style.opacity = '1';
                const cellAngle = this.storyCarouselTheta * i;
                cell.style.transform = this.storyRotateFn + '(' + cellAngle + 'deg) translateZ(' + this.storyCarouselRadius + 'px)';
            }
        }

        this.storyInitialRotateCarousel();
    }

    getPercentageOfSwipe = (storyCarouseStartX, storyCarouseEndX) => {
        let swipeDistance = Math.abs(storyCarouseEndX - storyCarouseStartX);
        let screenWidth = this.dataService.window.innerWidth;

        return (swipeDistance / screenWidth) * 100;
    }

    prepareCarouselToPrevious = () => {
        if (this.dataService.currentStoryIndex === 0) {
            return;
        }

        this.dataService.currentStoryIndex--;
        this.dataService.updateStoryProp();
        this.dataService.currentStoryItemIndex = this.dataService.currentStory.items.findIndex(item => !item.seen);

        if (this.dataService.currentStoryItemIndex === -1) {
            this.dataService.currentStoryItemIndex = 0;
        }

        this.dataService.updateStoryItemProp();
        this.storyCarouselIndex--;
    }

    prepareCarouselToNext = () => {
        if (this.dataService.currentStoryIndex >= this.dataService.storyList.length - 1) {
            return;
        }

        if (this.dataService.currentStory.items.every(item => item.seen) && this.dataService.seenByStoryItemOpen) {
            this.eventService.onStorySeen();
        }

        this.dataService.currentStoryIndex++;
        this.dataService.updateCurrentStoryIndexBySeen();
        this.storyCarouselIndex++;
        this.eventService.onStoryItemSeenStoryOpen();
    }

    prepareStoriesToRender = (isNext, step = 1) => {
        if (
            this.dataService.currentStoryIndex >= this.dataService.storyList.length - 1 && isNext
            || this.dataService.currentStoryIndex <= 0 && !isNext
        ) {
            return;
        }

        const cellElements = Array.from(this.dataService.document.querySelectorAll('.bo-popup-container .bo-carousel-cell'));
        const currentCellIndex = this.dataService.currentStoryIndex % this.storyCarouseCellCount;
        const prevUrlSkip = currentCellIndex - 1;
        const nextUrlSkip = currentCellIndex + 1;
        for (const [index, cellElement] of cellElements.entries()) {
            if (index !== 0 && index !== this.storyCarouseCellCount - 1 && (index < prevUrlSkip || index > nextUrlSkip)) {
                const videoElement = cellElement.querySelector('.bo-story-item-video');
                const imgElement = cellElement.querySelector('.bo-story-item-img');
                videoElement.src = '';
                imgElement.src = '';
            }
        }

        const index = isNext ? this.dataService.currentStoryIndex + step : this.dataService.currentStoryIndex - step;

        this.updateUpcomingStory(index);

        clearTimeout(this.updateUpcomingStoryTimeout);

        this.updateUpcomingStoryTimeout = setTimeout(() => {
            if (isNext && this.dataService.currentStoryIndex - 1 >= 0) {
                this.updateUpcomingStory(this.dataService.currentStoryIndex - 1);
            } else if (!isNext && this.dataService.currentStoryIndex + 1 <= this.dataService.storyList.length - 1) {
                this.updateUpcomingStory(this.dataService.currentStoryIndex + 1);
            }
        }, 195);
    }

    updateUpcomingStory(index) {
        const story = this.dataService.storyList[index];
        let storyItem = story.items[story.items.findIndex(item => !item.seen)];
        if (!storyItem) {
            storyItem = story.items[0];
        }

        const cellHeaderElement = this.popUpService.getStoryCellElementByIndex(index).querySelector('.bo-story-item-header');
        cellHeaderElement.querySelector('.bo-story-progress-bar-container').remove();
        cellHeaderElement.prepend(this.popUpService.createStoryProgressBar(story));
        this.popUpService.updateCubeCellElement(this.dataService.storyList[index], storyItem, index, false);
    }
}
