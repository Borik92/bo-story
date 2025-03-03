import { BoStory } from '/dist/bo-story-bundle.mjs';

const storyList = [
    {
        id: 111,
        name: 'Camera',
        imageUrl: 'https://api.fourthway.am/static-media/story/camera-1.png',
        seen: false,
        titleNestedHtml: `<div style="display: flex; flex-direction: column; align-items: center"><b style='color: #d61f79; font-size: 12px'>Camera</b><span style="color: #949496; font-size: 10px">24 minutes</span></div>`,
        items: [
            {
                id: 211,
                mediaExt: 'mov',
                mediaType: 'video',
                isMuted: false,
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 2,
                storyUrl: 'https://api.fourthway.am/static-media/story/video/camera.mov',
                footerNestedHtml: `<p style='color: white; padding: 5px'>Capture the moment and let the world see through your lens. Unveiling the art of photography with our PRO II series — where every click tells a story. 📸✨ #PhotographyPassion #PROIISeries</p>`,
                footerNestedActionHtml: `<button>Click me</button>`,
                caption: "Daddy facciamo un viaggio insieme? :P",
                poster: "Hhhhh hh hh h hh hh",
            },
            {
                id: 311,
                mediaExt: 'jpg',
                mediaType: 'image',
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 0,
                storyUrl: 'https://api.fourthway.am/static-media/story/camera-2.png',
                // footerNestedHtml: `<p style='color: red; font-weight: bold'>Hello</p>`
            },
            {
                id: 41,
                mediaExt: 'jpg',
                mediaType: 'image',
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 0,
                storyUrl: 'https://api.fourthway.am/static-media/story/camera-3.png',
                // footerNestedHtml: `<p style='color: red; font-weight: bold'>Hello</p>`
            },
            {
                id: 51,
                mediaExt: 'jpg',
                mediaType: 'image',
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 0,
                storyUrl: 'https://api.fourthway.am/static-media/story/camera-4.png',
                // footerNestedHtml: `<p style='color: red; font-weight: bold'>Hello</p>`
            }
        ]
    },
    {
        id: 61,
        name: 'Drone',
        imageUrl: 'https://api.fourthway.am/static-media/story/drone-1.png',
        seen: false,
        titleNestedHtml: `<div style="display: flex; flex-direction: column; align-items: center"><b style='color: #d61f79; font-size: 12px'>Drone</b><span style="color: #949496; font-size: 10px">10 minutes</span></div>`,
        items: [
            {
                id: 71,
                mediaExt: 'mov',
                mediaType: 'video',
                isMuted: false,
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 0,
                storyUrl: 'https://api.fourthway.am/static-media/story/video/drone-1.mov',
            },
            {
                id: 81,
                mediaExt: 'mov',
                mediaType: 'video',
                isMuted: true,
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 0,
                storyUrl: 'https://api.fourthway.am/static-media/story/video/drone-2.mov',
            },
            {
                id: 91,
                mediaExt: 'jpg',
                mediaType: 'image',
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 0,
                storyUrl: 'https://api.fourthway.am/static-media/story/drone-2.png',
            }
        ]
    },
    {
        id: 101,
        name: 'Math',
        imageUrl: 'https://api.fourthway.am/static-media/story/math-1.png',
        seen: false,
        titleNestedHtml: `<div style="display: flex; flex-direction: column; align-items: center"><b style='color: #d61f79; font-size: 12px'>Math</b><span style="color: #949496; font-size: 10px">53 minutes</span></div>`,
        items: [
            {
                id: 111,
                mediaExt: 'mov',
                mediaType: 'video',
                isMuted: true,
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 0,
                storyUrl: 'https://api.fourthway.am/static-media/story/video/math.mov',
            }
        ]
    },
    {
        id: 121,
        name: 'Medicine',
        imageUrl: 'https://api.fourthway.am/static-media/story/medicine-1.png',
        seen: false,
        titleNestedHtml: `<div style="display: flex; flex-direction: column; align-items: center"><b style='color: #d61f79; font-size: 12px'>Medicine</b><span style="color: #949496; font-size: 10px">33 minutes</span></div>`,
        items: [
            {
                id: 131,
                mediaExt: 'mov',
                mediaType: 'video',
                isMuted: true,
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 0,
                storyUrl: 'https://api.fourthway.am/static-media/story/video/medicine.mov',
            },
            {
                id: 141,
                mediaExt: 'jpg',
                mediaType: 'image',
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 0,
                storyUrl: 'https://api.fourthway.am/static-media/story/medicine-2.png',
            }
        ]
    },
    {
        id: 121,
        name: 'Rolling',
        imageUrl: 'https://api.fourthway.am/static-media/story/rolling-1.png',
        seen: false,
        titleNestedHtml: `<div style="display: flex; flex-direction: column; align-items: center"><b style='color: #d61f79; font-size: 12px'>Rolling</b><span style="color: #949496; font-size: 10px">44 minutes</span></div>`,
        items: [
            {
                id: 131,
                mediaExt: 'mov',
                mediaType: 'video',
                isMuted: true,
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 0,
                storyUrl: 'https://api.fourthway.am/static-media/story/video/rolling.mov',
            },
            {
                id: 141,
                mediaExt: 'jpg',
                mediaType: 'image',
                liked: false,
                seen: false,
                timeSince: '22 hours',
                likeCount: 0,
                storyUrl: 'https://api.fourthway.am/static-media/story/rolling-2.png',
            }
        ]
    }
];

new BoStory({
    storyList,
    storyWrapper: document.getElementById('my-container-1'),
    events: {
        onLike: event => console.log(event),
        onUnlike: event => console.log(event),
        onStorySeen: event => console.log(event),
        onStoryItemSeen: event => console.log(event),
        onNavigateProfile: event => console.log(event),
        onCloseDialog: event => console.log(event),
        onOpenDialog: event => console.log(event)
    }
});
