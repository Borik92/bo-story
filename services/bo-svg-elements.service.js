export class BoSvgElementsService {
    arrowLeftIcon = `
    <svg class="bo-arrow-left-icon bo-arrow-inactive" width="19" height="33" viewBOx="0 0 19 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.75" d="M6.04688 16.5L17.7891 28.7344C18.1641 29.1094 18.1641 29.4844 17.7891 29.8594L15.6797 32.0391C15.3047 32.4141 14.9297 32.4141 14.5547 32.0391L0.210938 17.0625C0.0703125 16.9219 0 16.7344 0 16.5C0 16.2656 0.0703125 16.0781 0.210938 15.9375L14.5547 0.960938C14.8828 0.632812 15.2578 0.65625 15.6797 1.03125L17.7891 3.14062C18.1641 3.51562 18.1641 3.89063 17.7891 4.26562L6.04688 16.5Z" fill="white"/>
    </svg>`;

    arrowRightIcon = `
    <svg class="bo-arrow-right-icon" width="19" height="33" viewBOx="0 0 19 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.75" d="M12.9531 16.5L1.21094 4.26562C0.835938 3.89063 0.835938 3.51562 1.21094 3.14062L3.32031 1.03125C3.74219 0.65625 4.11719 0.632812 4.44531 0.960938L18.7891 15.9375C18.9297 16.0781 19 16.2656 19 16.5C19 16.7344 18.9297 16.9219 18.7891 17.0625L4.44531 32.0391C4.07031 32.4141 3.69531 32.4141 3.32031 32.0391L1.21094 29.8594C0.835938 29.4844 0.835938 29.1094 1.21094 28.7344L12.9531 16.5Z" fill="white"/>
    </svg>`;

    closeIcon = `
    <svg class="bo-close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBOx="0 0 24 24" fill="none">
      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
    </svg>`;


    likeIcon = `
    <svg class="bo-story-item-like-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" id="like-selected" x="0px" y="0px" viewBOx="0 0 16 15.999" xml:space="preserve">
    <g class="st0">
    <path class="bo-like-icon-solid" d="M7.94-0.00198C7.3783,0.00614,6.83319,0.18967,6.38104,0.52299C6.18085,0.68223,6.06445,0.92423,6.065,1.17997   v2.19104L4.19604,6.99997h0.00098v9h8.33399c0.02264,0.00074,0.04528,0.00111,0.06776,0.00111   c1.09039,0,1.99169-0.86554,2.02769-1.96345c0.00611-0.1853-0.01324-0.37054-0.05743-0.55066   c0.47235-0.38287,0.74622-0.95892,0.745-1.56695c-0.00086-0.16211-0.02063-0.32355-0.05903-0.48102   c0.79425-0.64685,0.97828-1.78601,0.42804-2.65002c0.2417-0.40137,0.34955-0.86927,0.30799-1.336   c-0.14002-1.14321-1.11114-2.00021-2.25963-2.00021c-0.01047,0-0.02083,0.00007-0.03133,0.00021h-3.56903   c0.219-0.72357,0.34369-1.47241,0.37097-2.22797C10.50201,1.51798,9.07001-0.00198,7.94-0.00198L7.94-0.00198z"/>
    <path class="bo-like-icon-solid" d="M3.39704,6.99998H1.93103C0.83631,7.03269-0.026,7.94419,0.00202,9.03898v4.922   c-0.02802,1.09485,0.83429,2.00635,1.92901,2.039h1.46601V6.99998L3.39704,6.99998z"/>
    </g>
    <g>
    <path class="st1" d="M7.94589,0.99807c0.51639,0.00776,1.55612,1.0352,1.55677,2.19087   C9.4785,3.85813,9.36789,4.5224,9.17392,5.16329L8.78357,6.45298h1.34747l3.60036-0.00021   c0.64401,0,1.18872,0.48226,1.26357,1.0889c0.02291,0.2573-0.03539,0.51023-0.1686,0.73144l-0.31952,0.5306l0.33271,0.52243   c0.27768,0.43603,0.1848,1.01102-0.21605,1.33747l-0.48965,0.39879l0.14961,0.61351   c0.01984,0.08137,0.03013,0.16528,0.03056,0.24612c0.00062,0.30733-0.13595,0.59458-0.37469,0.78809l-0.4926,0.39928   l0.15109,0.61584c0.02245,0.09152,0.03227,0.18554,0.02917,0.27962c-0.01832,0.55863-0.46997,0.99622-1.02823,0.99622   l-0.06776-0.00111h-7.3341L5.19607,7.24229l1.75795-3.41342L7.065,3.61339V3.37101V1.2655   C7.32835,1.09622,7.63057,1.00418,7.94589,0.99807 M7.94-0.00198C7.3783,0.00614,6.83319,0.18967,6.38104,0.52299   C6.18085,0.68223,6.06445,0.92423,6.065,1.17997v2.19104L4.19604,6.99997h0.00098v9h8.33399   c0.02264,0.00074,0.04528,0.00111,0.06776,0.00111c1.09039,0,1.99169-0.86554,2.02769-1.96345   c0.00611-0.1853-0.01324-0.37054-0.05743-0.55066c0.47235-0.38287,0.74622-0.95892,0.745-1.56695   c-0.00086-0.16211-0.02063-0.32355-0.05903-0.48102c0.79425-0.64685,0.97828-1.78601,0.42804-2.65002   c0.2417-0.40137,0.34955-0.86927,0.30799-1.336c-0.14002-1.14321-1.11114-2.00021-2.25963-2.00021   c-0.01047,0-0.02083,0.00007-0.03133,0.00021h-3.56903c0.219-0.72357,0.34369-1.47241,0.37097-2.22797   C10.50201,1.51798,9.07001-0.00198,7.94-0.00198L7.94-0.00198z"/>
    <path class="st1" d="M2.39704,7.99998v7.00031l-0.4362,0.00013c-0.54277-0.01618-0.97304-0.471-0.95882-1.03944L1.00169,9.01339   C0.9878,8.47057,1.4181,8.01575,1.93103,7.99998H2.39704 M3.39704,6.99998H1.93103C0.83631,7.03269-0.026,7.94419,0.00202,9.03898   v4.922c-0.02802,1.09485,0.83429,2.00635,1.92901,2.039h1.46601V6.99998L3.39704,6.99998z"/>
    </g>
    </svg>`;

    fullScreenIcon = `
    <svg class="bo-full-screen-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBOx="0 0 24 24" fill="none">
      <path d="M10 21V19H6.41L10.91 14.5L9.5 13.09L5 17.59V14H3V21H10ZM14.5 10.91L19 6.41V10H21V3H14V5H17.59L13.09 9.5L14.5 10.91Z" fill="white"/>
    </svg>`;

    exitFullScreenIcon = `
    <svg class="bo-exit-full-screen-icon" width="24" height="24" viewBOx="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.9998 10.9998V8.99984H16.4098L20.9098 4.49984L19.4998 3.08984L14.9998 7.58984V3.99984H12.9998V10.9998H19.9998ZM4.49984 20.9098L8.99984 16.4098V19.9998H10.9998V12.9998H3.99984V14.9998H7.58984L3.08984 19.4998L4.49984 20.9098Z" fill="white"/>
    </svg>`;


    mutatedIcon = `
    <svg class="bo-muted-icon" width="24" height="24" viewBOx="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4697 8.46967C15.7626 8.17678 16.2374 8.17678 16.5303 8.46967L19 10.9393L21.4697 8.46967C21.7626 8.17678 22.2374 8.17678 22.5303 8.46967C22.8232 8.76256 22.8232 9.23744 22.5303 9.53033L20.0607 12L22.5303 14.4697C22.8232 14.7626 22.8232 15.2374 22.5303 15.5303C22.2374 15.8232 21.7626 15.8232 21.4697 15.5303L19 13.0607L16.5303 15.5303C16.2374 15.8232 15.7626 15.8232 15.4697 15.5303C15.1768 15.2374 15.1768 14.7626 15.4697 14.4697L17.9393 12L15.4697 9.53033C15.1768 9.23744 15.1768 8.76256 15.4697 8.46967Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8418 4.81931L7.85451 8.19291C7.8487 8.19947 7.84277 8.20593 7.83674 8.21228C7.67583 8.38164 7.48229 8.51666 7.26779 8.6092C7.05329 8.70174 6.82227 8.74987 6.58866 8.7507L6.586 8.7507H3C2.8897 8.7507 2.75 8.85288 2.75 9.0407V14.9597C2.75 15.149 2.89016 15.2507 3 15.2507H6.58024C6.81768 15.2514 7.05243 15.301 7.26989 15.3964C7.48734 15.4917 7.68283 15.6308 7.8442 15.805L7.85494 15.8169L10.8367 19.1765C10.8836 19.2248 10.9252 19.2411 10.9567 19.2471C10.9936 19.2542 11.0383 19.2507 11.0846 19.2311C11.1728 19.1938 11.25 19.1074 11.25 18.9577V5.0437C11.25 4.89533 11.1735 4.80864 11.0857 4.77073C11.0397 4.75092 10.9953 4.74707 10.9586 4.7537C10.9278 4.75925 10.8875 4.77445 10.8418 4.81931ZM9.75206 3.7882C10.8955 2.59754 12.75 3.50763 12.75 5.0437V18.9577C12.75 20.5061 10.8717 21.4095 9.73636 20.1961L9.72306 20.1815L6.7402 16.8206C6.71947 16.7992 6.69476 16.782 6.66745 16.7701C6.63874 16.7575 6.60776 16.7509 6.57642 16.7507H3C2.00584 16.7507 1.25 15.9204 1.25 14.9597V9.0407C1.25 8.08052 2.0063 7.2507 3 7.2507H6.58421C6.61497 7.25048 6.64538 7.24408 6.67362 7.2319C6.69951 7.22073 6.72311 7.2049 6.74324 7.18524L9.73149 3.8105C9.7382 3.80293 9.74505 3.7955 9.75206 3.7882Z" fill="white"/>
    </svg>
    `;

    unmutatedIcon = `
    <svg class="bo-unmutated-icon" width="24" height="24" viewBOx="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8418 4.81931L7.85451 8.19291C7.8487 8.19947 7.84277 8.20593 7.83674 8.21228C7.67583 8.38164 7.48229 8.51666 7.26779 8.6092C7.05329 8.70174 6.82227 8.74987 6.58866 8.7507L6.586 8.7507H3C2.8897 8.7507 2.75 8.85288 2.75 9.0407V14.9597C2.75 15.149 2.89016 15.2507 3 15.2507H6.58024C6.81768 15.2514 7.05243 15.301 7.26989 15.3964C7.48734 15.4917 7.68283 15.6308 7.8442 15.805L7.85494 15.8169L10.8367 19.1765C10.8836 19.2248 10.9252 19.2411 10.9567 19.2471C10.9936 19.2542 11.0383 19.2507 11.0846 19.2311C11.1728 19.1938 11.25 19.1074 11.25 18.9577V5.0437C11.25 4.89533 11.1735 4.80864 11.0857 4.77073C11.0397 4.75092 10.9953 4.74707 10.9586 4.7537C10.9278 4.75925 10.8875 4.77445 10.8418 4.81931ZM9.75206 3.7882C10.8955 2.59754 12.75 3.50763 12.75 5.0437V18.9577C12.75 20.5061 10.8717 21.4095 9.73636 20.1961L9.72306 20.1815L6.7402 16.8206C6.71947 16.7992 6.69476 16.782 6.66745 16.7701C6.63874 16.7575 6.60776 16.7509 6.57642 16.7507H3C2.00584 16.7507 1.25 15.9204 1.25 14.9597V9.0407C1.25 8.08052 2.0063 7.2507 3 7.2507H6.58421C6.61497 7.25048 6.64538 7.24408 6.67362 7.2319C6.69951 7.22073 6.72311 7.2049 6.74324 7.18524L9.73149 3.8105C9.7382 3.80293 9.74505 3.7955 9.75206 3.7882ZM18.4576 4.48276C18.7436 4.18318 19.2184 4.17222 19.5179 4.45827C23.8121 8.55865 23.8437 15.4643 19.5145 19.5464C19.2132 19.8305 18.7385 19.8166 18.4543 19.5152C18.1702 19.2139 18.1841 18.7392 18.4855 18.455C22.1803 14.9711 22.1639 9.05875 18.4821 5.54313C18.1825 5.25708 18.1715 4.78233 18.4576 4.48276ZM15.5501 7.90062C15.8815 7.65215 16.3516 7.7194 16.6001 8.05081C17.3937 9.10937 17.7498 10.5909 17.7498 12.0007C17.7498 13.4105 17.3937 14.892 16.6001 15.9506C16.3516 16.282 15.8815 16.3493 15.5501 16.1008C15.2187 15.8523 15.1515 15.3822 15.3999 15.0508C15.9393 14.3314 16.2498 13.2019 16.2498 12.0007C16.2498 10.7995 15.9393 9.67004 15.3999 8.9506C15.1515 8.61918 15.2187 8.14909 15.5501 7.90062Z" fill="white"/>
    </svg>
    `;

    playIcon = `
    <svg class="bo-play-icon" width="96" height="96" viewBOx="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="48" cy="48" r="48" fill="black" fill-opacity="0.6"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M38.4353 35.027C38.7822 34.8257 39.21 34.8243 39.5582 35.0232L60.5582 47.0232C60.9087 47.2235 61.125 47.5963 61.125 48C61.125 48.4037 60.9087 48.7765 60.5582 48.9768L39.5582 60.9768C39.21 61.1757 38.7822 61.1743 38.4353 60.973C38.0885 60.7717 37.875 60.401 37.875 60V36C37.875 35.599 38.0885 35.2283 38.4353 35.027ZM40.125 37.9386V58.0614L57.7325 48L40.125 37.9386Z" fill="white"/>
    </svg>`;

    pauseIcon = `
    <svg class="bo-pause-icon" width="96" height="96" viewBOx="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="48" cy="48" r="48" fill="black" fill-opacity="0.6"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M39.375 37.5C39.375 36.8787 39.8787 36.375 40.5 36.375H45C45.6213 36.375 46.125 36.8787 46.125 37.5V58.5C46.125 59.1213 45.6213 59.625 45 59.625H40.5C39.8787 59.625 39.375 59.1213 39.375 58.5V37.5ZM41.625 38.625V57.375H43.875V38.625H41.625ZM49.875 37.5C49.875 36.8787 50.3787 36.375 51 36.375H55.5C56.1213 36.375 56.625 36.8787 56.625 37.5V58.5C56.625 59.1213 56.1213 59.625 55.5 59.625H51C50.3787 59.625 49.875 59.1213 49.875 58.5V37.5ZM52.125 38.625V57.375H54.375V38.625H52.125Z" fill="white"/>
    </svg>`;

    storyImageLoaderIcon = `
        <svg class="bo-story-image-loader-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style="shape-rendering: auto; display: block; background: transparent;">
            <g>
                <g transform="translate(80,50)">
                    <g transform="rotate(0)">
                        <circle fill-opacity="1" fill="#000" r="6" cy="0" cx="0">
                            <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.875s" type="scale" attributeName="transform" />
                            <animate begin="-0.875s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                        </circle>
                    </g>
                </g>
                <g transform="translate(71.21320343559643,71.21320343559643)">
                    <g transform="rotate(45)">
                        <circle fill-opacity="0.875" fill="#000" r="6" cy="0" cx="0">
                            <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.75s" type="scale" attributeName="transform" />
                            <animate begin="-0.75s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                        </circle>
                    </g>
                </g>
                <g transform="translate(50,80)">
                    <g transform="rotate(90)">
                        <circle fill-opacity="0.75" fill="#000" r="6" cy="0" cx="0">
                            <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.625s" type="scale" attributeName="transform" />
                            <animate begin="-0.625s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                        </circle>
                    </g>
                </g>
                <g transform="translate(28.786796564403577,71.21320343559643)">
                    <g transform="rotate(135)">
                        <circle fill-opacity="0.625" fill="#000" r="6" cy="0" cx="0">
                            <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.5s" type="scale" attributeName="transform" />
                            <animate begin="-0.5s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                        </circle>
                    </g>
                </g>
                <g transform="translate(20,50.00000000000001)">
                    <g transform="rotate(180)">
                        <circle fill-opacity="0.5" fill="#000" r="6" cy="0" cx="0">
                            <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.375s" type="scale" attributeName="transform" />
                            <animate begin="-0.375s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                        </circle>
                    </g>
                </g>
                <g transform="translate(28.78679656440357,28.786796564403577)">
                    <g transform="rotate(225)">
                        <circle fill-opacity="0.375" fill="#000" r="6" cy="0" cx="0">
                            <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.25s" type="scale" attributeName="transform" />
                            <animate begin="-0.25s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                        </circle>
                    </g>
                </g>
                <g transform="translate(49.99999999999999,20)">
                    <g transform="rotate(270)">
                        <circle fill-opacity="0.25" fill="#000" r="6" cy="0" cx="0">
                            <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.125s" type="scale" attributeName="transform" />
                            <animate begin="-0.125s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                        </circle>
                    </g>
                </g>
                <g transform="translate(71.21320343559643,28.78679656440357)">
                    <g transform="rotate(315)">
                        <circle fill-opacity="0.125" fill="#000" r="6" cy="0" cx="0">
                            <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="0s" type="scale" attributeName="transform" />
                            <animate begin="0s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                        </circle>
                    </g>
                </g>
                <g/>
            </g>
        </svg>`;

    storyItemImageLoaderIcon = `
        <svg class="bo-story-item-image-loader-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style="shape-rendering: auto; display: block; background: #000;">
        <g>
            <g transform="translate(80,50)">
                <g transform="rotate(0)">
                    <circle fill-opacity="1" fill="#FFF" r="6" cy="0" cx="0">
                        <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.875s" type="scale" attributeName="transform" />
                        <animate begin="-0.875s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                    </circle>
                </g>
            </g>
            <g transform="translate(71.21320343559643,71.21320343559643)">
                <g transform="rotate(45)">
                    <circle fill-opacity="0.875" fill="#FFF" r="6" cy="0" cx="0">
                        <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.75s" type="scale" attributeName="transform" />
                        <animate begin="-0.75s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                    </circle>
                </g>
            </g>
            <g transform="translate(50,80)">
                <g transform="rotate(90)">
                    <circle fill-opacity="0.75" fill="#FFF" r="6" cy="0" cx="0">
                        <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.625s" type="scale" attributeName="transform" />
                        <animate begin="-0.625s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                    </circle>
                </g>
            </g>
            <g transform="translate(28.786796564403577,71.21320343559643)">
                <g transform="rotate(135)">
                    <circle fill-opacity="0.625" fill="#FFF" r="6" cy="0" cx="0">
                        <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.5s" type="scale" attributeName="transform" />
                        <animate begin="-0.5s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                    </circle>
                </g>
            </g>
            <g transform="translate(20,50.00000000000001)">
                <g transform="rotate(180)">
                    <circle fill-opacity="0.5" fill="#FFF" r="6" cy="0" cx="0">
                        <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.375s" type="scale" attributeName="transform" />
                        <animate begin="-0.375s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                    </circle>
                </g>
            </g>
            <g transform="translate(28.78679656440357,28.786796564403577)">
                <g transform="rotate(225)">
                    <circle fill-opacity="0.375" fill="#FFF" r="6" cy="0" cx="0">
                        <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.25s" type="scale" attributeName="transform" />
                        <animate begin="-0.25s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                    </circle>
                </g>
            </g>
            <g transform="translate(49.99999999999999,20)">
                <g transform="rotate(270)">
                    <circle fill-opacity="0.25" fill="#FFF" r="6" cy="0" cx="0">
                        <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.125s" type="scale" attributeName="transform" />
                        <animate begin="-0.125s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                    </circle>
                </g>
            </g>
            <g transform="translate(71.21320343559643,28.78679656440357)">
                <g transform="rotate(315)">
                    <circle fill-opacity="0.125" fill="#FFF" r="6" cy="0" cx="0">
                        <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="0s" type="scale" attributeName="transform" />
                        <animate begin="0s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity" />
                    </circle>
                </g>
            </g>
            <g/>
        </g>
    </svg>`;
}
