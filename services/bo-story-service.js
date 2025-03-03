export class BoStoryService {
    eventService;
    dataService;
    loadedIndex = 0;
    svgElementsService;
    storyItemCountToRend = 0;

    createStoryElement = (storyData, index) => {
        const storyBody = this.dataService.document.createElement('div');
        const story = this.dataService.document.createElement('div');
        const img = this.dataService.document.createElement('img');
        const imgWrapper = this.dataService.document.createElement('div');
        const badge = this.dataService.document.createElement('div');
        const badgeText = this.dataService.document.createElement('span');
        const encodedLoadingSvg = encodeURIComponent(this.svgElementsService.storyImageLoaderIcon)
            .replace(/'/g, '%27')
            .replace(/"/g, '%22');

        storyBody.classList.add('bo-story-body');
        story.classList.add('bo-story');
        imgWrapper.classList.add('bo-story-img-wrapper');
        img.classList.add('bo-story-img');
        badge.classList.add('bo-story-badge');

        if (storyData.id) {
            storyBody.setAttribute('id', storyData.id.toString());
        }

        if (storyData.seen) {
            story.classList.add('bo-story-seen');
        }

        storyBody.append(story);
        story.append(imgWrapper);
        imgWrapper.append(img);
        story.append(badge);
        badge.append(badgeText);

        if (storyData.titleNestedHtml) {
            const titleNestedHtml = this.dataService.document.createElement('div');
            titleNestedHtml.classList.add('bo-title-nested-html');
            titleNestedHtml.innerHTML = storyData.titleNestedHtml;
            storyBody.append(titleNestedHtml);
        }

        story.setAttribute('id', `story-${storyData.id}`);
        story.setAttribute('index', index);
        imgWrapper.setAttribute('tabindex', '0');
        img.setAttribute('src', storyData.imageUrl);
        img.setAttribute('alt', storyData.imgAlt ?? 'Story photo');
        img.setAttribute('loading', 'lazy');
        img.setAttribute('fetchpriority', 'low');
        img.style.backgroundImage = `url("data:image/svg+xml,${encodedLoadingSvg}")`;

        badgeText.innerText = storyData.items.length.toString();

        return storyBody;
    }

    createStoriesContainer = () => {
        const container = this.dataService.document.createElement('div');
        container.classList.add('bo-story-container');
        container.setAttribute('tabindex', '0');
        container.addEventListener('click', this.eventService.onOpenStoryPopup);
        container.addEventListener('keydown', this.eventService.onOpenStoryPopupByKeyDown);

        return container;
    }

    removeListeners() {
        this.dataService.storyContainer.removeEventListener('click', this.eventService.onOpenStoryPopup);
        this.dataService.storyContainer.removeEventListener('keydown', this.eventService.onOpenStoryPopupByKeyDown);
    }

    onStoryContainerScroll = () => {
        if (
            this.dataService.storyContainer.scrollLeft + this.dataService.storyContainer.offsetWidth
            >= this.dataService.storyContainer.scrollWidth - 200
        ) {
            this.loadMoreContent();
        }
    }

    loadMoreContent = () => {
        // If we've already loaded all items, return
        if (this.loadedIndex >= this.dataService.storyList.length) {
            this.dataService.storyContainer.removeEventListener('scroll', this.onStoryContainerScroll);
            return;
        }

        const itemsToLoad = this.dataService.storyList.slice(this.loadedIndex, this.loadedIndex + this.storyItemCountToRend);

        itemsToLoad.forEach((story, index) => {
            const storyElement = this.createStoryElement(story, this.loadedIndex + index);
            this.dataService.storyContainer.append(storyElement);
        });

        this.loadedIndex += this.storyItemCountToRend;
    }

    rendStoriesContent = () => {
        this.dataService.storyList.sort((a, b) => (!!a.seen) - (!!b.seen));
        this.dataService.storyContainer.innerHTML = '';
        const itemsToLoad = this.dataService.storyList.slice(0, this.loadedIndex);

        itemsToLoad.forEach((story, index) => {
            const storyElement = this.createStoryElement(story, index);
            this.dataService.storyContainer.append(storyElement);
        });
    }
}
