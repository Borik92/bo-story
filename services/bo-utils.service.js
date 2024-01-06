export class BoUtilsService {
    dataService;
    BO_STORY_MEDIA_TYPE = {
        photo: 'image',
        video: 'video'
    }

    convertStrToSvgElement = (iconStr) => {
        const div = this.dataService.document.createElement('div');
        div.innerHTML = iconStr;
        const svgElement = div.querySelector('svg');
        div.remove();

        return svgElement;
    }

    lastIndexOfObjectByProperty = (arr, key, value) => {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i][key] === value) return i;
        }

        return -1;
    }
}
