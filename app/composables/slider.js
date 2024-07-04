export const useSlider = () => {
    function useSlide(date){
        const sliderDivWidht = document?.querySelector('.slider-width')?.offsetWidth;
        console.log(sliderDivWidht);
        const showNum = ref(4);
        const gap = ref(10);
        const currentIndex = ref(0);
        const slideWidht = ref(parseFloat(sliderDivWidht) / parseFloat(showNum.value));
        const gapbad = ref((gap.value * (showNum.value - 1)) /showNum.value);
        const gapextplus = ref(gap.value - gapbad.value);
    
        const divWidth = ref(sliderDivWidht);
        const singleWidth = ref(parseFloat(slideWidht.value) - parseFloat(gapbad.value));
        const allGallery = ref([]);
        var galleryData = {
            gallery: [
                {
                    id: 0,
                    bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
                    imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img1.jpg",
                    imgDesc: "Hello I am image 0"
                },
                {
                    id: 1,
                    bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
                    imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img2.jpg",
                    imgDesc: "Hello I am image 1"
                },
                {
                    id: 2,
                    bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
                    imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img3.jpg",
                    imgDesc: "Hello I am image 2"
                },
                {
                    id: 3,
                    bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
                    imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img4.jpg",
                    imgDesc: "Hello I am image 3"
                },
                {
                    id: 4,
                    bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
                    imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img5.jpg",
                    imgDesc: "Hello I am image 4"
                },
                {
                    id: 5,
                    bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
                    imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img6.jpg",
                    imgDesc: "Hello I am image 5"
                },
                {
                    id: 5,
                    bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
                    imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img7.jpg",
                    imgDesc: "Hello I am image 5"
                },
                {
                    id: 5,
                    bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
                    imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img8.jpg",
                    imgDesc: "Hello I am image 5"
                }
            ]
        };
        allGallery.value = galleryData.gallery;
    
        const next = () => {
            if (currentIndex.value < allGallery.value.length - showNum.value) {
                showSlide(currentIndex.value + 1);
            }
        }
    
        const prev = () => {
            if (currentIndex.value > 0) {
                showSlide(currentIndex.value - 1);
            }
        }
    
        function showSlide(index) {
            const sliderContent = document?.querySelector('#sliderContent');
            currentIndex.value = index;
            let translateValue = -index * (slideWidht.value + gapextplus.value);
            sliderContent.style.transform = 'translateX(' + translateValue + 'px)';
        }
    }

    return { useSlide }
}