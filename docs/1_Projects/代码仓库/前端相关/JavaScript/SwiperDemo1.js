const leftSwiper = new Swiper('.leftSwiper', {
    direction: "vertical",
    slidesPerView: "auto",
    slidesPerGroup: 1,
    on: {
        // �˴�ǿ�ҽ���ʹ�� ���� �� ����
        sliderMove: debounce(function(this) {
            rightSwiper.slideTo(this.activeIndex, 0, false);
        }, 100),
        touchEnd: function() { isSliding = false },
    }
})

const rightSwiper = new Swiper('.rightSwiper', {
    direction: "vertical",
    slidesPerView: "auto",
    slidesPerGroup: 1,
    on: {
        sliderMove: debounce(function(this) {
            leftSwiper.slideTo(this.activeIndex, 0, false);
        }, 100),
        touchEnd: function() { isSliding = false },
    }
})